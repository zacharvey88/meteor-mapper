import { useEffect, useState } from "react";
import axios from "axios";
import MeteorCard from "./MeteorCard";
import FilterClass from "./FilterClass";
import FilterYear from "./FilterYear";
import ToggleBtn from "./ToggleBtn";

function List({ results, setResults, setPosition, setSelectedMeteorId }) {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [toggled, setToggled] = useState(false);
  const [query, setQuery] = useState("https://data.nasa.gov/docs/legacy/meteorite_landings/Meteorite_Landings.json");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [classList, setClassList] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("desc"); 

  const sortResults = (key) => {
    const sortedResults = [...results];
    sortedResults.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      } else {
        return b[key] < a[key] ? -1 : b[key] > a[key] ? 1 : 0;
      }
    });
    setResults(sortedResults);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    sortResults(selectedSort);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortResults(sortBy);
  };

  function handleFilter() {
    let searchString = "https://data.nasa.gov/docs/legacy/meteorite_landings/gh4g-9sfh.json";
    const params = [];
    if (selectedClass) {
      params.push(`recclass=${selectedClass}`);
    }
    if (selectedYear) {
      params.push(`year=${selectedYear}-01-01T00:00:00.000`);
    }
    if (toggled) {
      params.push(`fall=Fell`);
    }
    params.push(`$where=reclat IS NOT NULL AND reclong IS NOT NULL`);
    if (params.length > 0) {
      searchString += `?${params.join("&")}`;
    }
    setQuery(searchString);
    setIsLoading(true);
  }

  function handleReset() {
    setSelectedClass("");
    setSelectedYear("");
    setToggled(false);
    setQuery("https://data.nasa.gov/docs/legacy/meteorite_landings/gh4g-9sfh.json");
    setIsLoading(true);
    setSortBy("name");
    setSortOrder("desc"); 
  }

  useEffect(() => {
    axios
      .get(query)
      .then((response) => {
        setResults(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [query]);

  useEffect(() => {
    handleFilter();
  }, [selectedClass, selectedYear, toggled]);

  useEffect(() => {
    sortResults(sortBy);
  }, [sortBy, sortOrder]);

  if (isError) {
    console.log("Error");
  }

  return (
    <div className="list-area">
      <div className="filters">
        Toggle Observed <ToggleBtn toggled={toggled} setToggled={setToggled} />
        <FilterClass selectedClass={selectedClass} setSelectedClass={setSelectedClass} classList={classList} setClassList={setClassList} />
        <FilterYear selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        <select id="sortby" value={sortBy} onChange={handleSortChange}>
          <option value="name">Sort by Name</option>
          <option value="year">Sort by Year</option>
          <option value="recclass">Sort by Class</option>
          <option value="mass">Sort by Mass</option>
        </select>
        <button className="sort-order-btn" onClick={toggleSortOrder}>
          {sortOrder === "asc" ? "ASC" : "DESC"}
        </button>
        <button className="reset-btn" onClick={handleReset}>Reset <i className="fa-solid fa-rotate-left"></i></button>
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
