import { useEffect, useState } from "react";
import axios from "axios";
import MeteorCard from "./MeteorCard";
import FilterClass from "./FilterClass";
import FilterSize from "./FilterSize";
import FilterYear from "./FilterYear";
import ToggleBtn from "./ToggleBtn";

function List({ results, setResults, setPosition, setSelectedMeteorId }) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [toggled, setToggled] = useState(false);
  const [query, setQuery] = useState("/.netlify/functions/fetch-meteorites");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [classList, setClassList] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("desc");
  const [rawData, setRawData] = useState([]);

  const sortResults = (data, key, order) => {
    const sortedResults = [...data];
    sortedResults.sort((a, b) => {
      const aValue = a[key] || "";
      const bValue = b[key] || "";
      if (key === "mass") {
        return order === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
      return order === "asc"
        ? aValue < bValue
          ? -1
          : aValue > bValue
          ? 1
          : 0
        : bValue < aValue
        ? -1
        : bValue > aValue
        ? 1
        : 0;
    });
    return sortedResults;
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    const sorted = sortResults(results, selectedSort, sortOrder);
    setResults(sorted);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    const sorted = sortResults(results, sortBy, newSortOrder);
    setResults(sorted);
  };

  const handleFilter = () => {
    let filteredResults = [...rawData];

    if (selectedClass) {
      filteredResults = filteredResults.filter(
        (meteor) => meteor.recclass === selectedClass
      );
    }

    if (selectedYear) {
      filteredResults = filteredResults.filter(
        (meteor) => meteor.year && meteor.year.startsWith(selectedYear)
      );
    }

    if (toggled) {
      filteredResults = filteredResults.filter(
        (meteor) => meteor.fall === "Fell"
      );
    }

    if (selectedSize) {
      const [min, max] = selectedSize.split("-").map(Number);
      filteredResults = filteredResults.filter((meteor) => {
        const mass = Number(meteor.mass);
        if (selectedSize === "10000+") {
          return mass >= 10000;
        }
        return mass >= min && (max ? mass <= max : true);
      });
    }

    filteredResults = filteredResults.filter(
      (meteor) => meteor.reclat && meteor.reclong
    );

    const sortedResults = sortResults(filteredResults, sortBy, sortOrder);
    setResults(sortedResults);
  };

  const handleReset = () => {
    setSelectedClass("");
    setSelectedYear("");
    setSelectedSize("");
    setToggled(false);
    setSortBy("name");
    setSortOrder("desc");
    const sortedResults = sortResults(
      rawData.filter((meteor) => meteor.reclat && meteor.reclong),
      "name",
      "desc"
    );
    setResults(sortedResults);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(query)
      .then((response) => {
        const data = response.data;
        setRawData(data);
        setClassList([...new Set(data.map((meteor) => meteor.recclass)).sort()]);
        const sortedResults = sortResults(
          data.filter((meteor) => meteor.reclat && meteor.reclong),
          "name",
          "desc"
        );
        setResults(sortedResults);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [query]);

  useEffect(() => {
    handleFilter();
  }, [selectedClass, selectedYear, selectedSize, toggled]);

  if (isError) {
    return (
      <div className="error-message">
        Failed to load meteorite data. Please try again later.
      </div>
    );
  }

  return (
    <div className="list-area">
      <div className="filters">
        Toggle Observed <ToggleBtn toggled={toggled} setToggled={setToggled} />
        <FilterClass
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          classList={classList}
        />
        <FilterSize
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <FilterYear
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <select id="sortby" value={sortBy} onChange={handleSortChange}>
          <option value="name">Sort by Name</option>
          <option value="year">Sort by Year</option>
          <option value="recclass">Sort by Class</option>
          <option value="mass">Sort by Mass</option>
        </select>
        <button className="sort-order-btn" onClick={toggleSortOrder}>
          {sortOrder === "asc" ? "ASC" : "DESC"}
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset <i className="fa-solid fa-rotate-left"></i>
        </button>
      </div>
      <div className="list-items">
        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <ul id="class-list">
            {results.map((meteor) => (
              <MeteorCard
                key={meteor.id}
                meteor={meteor}
                classList={classList}
                setPosition={setPosition}
                setSelectedMeteorId={setSelectedMeteorId}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default List;