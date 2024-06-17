function FilterYear({ selectedYear, setSelectedYear }) {
  return (
    <div className="filter">
    <input
      id="filter-year"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      placeholder="Enter a Year"
    />
    </div>
  );
}

export default FilterYear;
