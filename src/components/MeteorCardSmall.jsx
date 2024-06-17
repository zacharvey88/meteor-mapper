function MeteorCardSmall({ meteor }) {

  const formattedYear = meteor.year ? meteor.year.split("-")[0] : "Unknown"
  let formattedMass = ""

  if(meteor.mass) {
    const mass = Math.round(meteor.mass, 2)
    if(mass >= 1000) {
      formattedMass += `${mass.toString().slice(0,-3)}kg`
    }
    else {
      formattedMass += `${mass}g`
    }
  }
  else {
    formattedMass += "Unknown"
  }

  return (
    <div className="meteor-card-small">
      <h3 className="meteor-name">{meteor.name}</h3>
      <p className="meteor-class"><b>Class:</b> {meteor.recclass}</p>
      <p className="meteor-fall"><b>Observed:</b> {meteor.fall === "Fell" ? "Yes" : "No"}</p>
      <p className="meteor-year"><b>Year:</b> {formattedYear}</p>
      <p className="meteor-mass"><b>Mass:</b> {formattedMass}</p>
  </div>
  );
}

export default MeteorCardSmall;
