function FilterClass({ selectedClass, setSelectedClass, classList }) {
  function handleClass(e) {
    setSelectedClass(e.target.value);
  }

  return (
    <div className="filter">
      <select id="filter-class" value={selectedClass} onChange={handleClass}>
        <option value="">Select a class</option>
        {classList.map((meteorClass) => (
          <option key={meteorClass} value={meteorClass}>
            {meteorClass}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterClass;