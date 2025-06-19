import { useEffect } from "react";
import axios from "axios"

function FilterClass({selectedClass, setSelectedClass, classList, setClassList}) {

  function handleClass(e) {
    setSelectedClass(e.target.value)
  }


  useEffect(()=>{
    axios.get(`hhttps://data.nasa.gov/docs/legacy/meteorite_landings/Meteorite_Landings.json`)
    .then((response)=>{
      const arr = []
      response.data.forEach((meteor) => {
        if(!arr.includes(meteor.recclass)) {
          arr.push(meteor.recclass)
        }
      })
      setClassList(arr.filter((mclass) => mclass.length > 6).sort())
    })
  }, [])

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

export default FilterClass