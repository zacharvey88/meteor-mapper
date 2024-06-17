function FilterSize({setSelectedSize}) {

  function handleSize(e) {
    setSelectedSize(e.target.value)
  }

  return (
    <div className="filter">
      <select id="filter size">
        <option>Select size range</option>
        <option>0-100</option>
        <option>101-1,000</option>
        <option>1,001-5,000</option>
        <option>5,001-10,000</option>
        <option>10,000 +</option>
      </select>
    </div>
  )
}

export default FilterSize