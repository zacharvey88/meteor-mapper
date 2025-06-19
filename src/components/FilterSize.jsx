function FilterSize({ selectedSize, setSelectedSize }) {
  function handleSize(e) {
    setSelectedSize(e.target.value);
  }

  return (
    <div className="filter">
      <select id="filter-size" value={selectedSize} onChange={handleSize}>
        <option value="">Select size range</option>
        <option value="0-100">0-100</option>
        <option value="101-1000">101-1,000</option>
        <option value="1001-5000">1,001-5,000</option>
        <option value="5001-10000">5,001-10,000</option>
        <option value="10000+">10,000+</option>
      </select>
    </div>
  );
}

export default FilterSize;