import MeteorIcon from "./MeteorIcon";

function MeteorCard({ meteor, setPosition, setSelectedMeteorId }) {
  const formattedName =
    meteor.name.length > 20 ? `${meteor.name.slice(0, 20)}...` : meteor.name;
  const formattedYear = meteor.year ? meteor.year.split("-")[0] : "Unk.";
  let formattedMass = "";

  if (meteor.mass) {
    const mass = Math.round(meteor.mass, 2);
    if (mass >= 1000) {
      formattedMass += `${mass.toString().slice(0, -3)}kg`;
    } else {
      formattedMass += `${mass}g`;
    }
  } else {
    formattedMass += "Unknown";
  }

  function handleCardClick() {
    setPosition([meteor.reclat, meteor.reclong]);
    setSelectedMeteorId(meteor.id);
  }

  return (
    <div className="meteor-card" onClick={handleCardClick}>
      <div className="left-section">
        <MeteorIcon recclass={meteor.recclass} />
        <p className="meteor-year">{formattedYear}</p>
      </div>
      <div className="right-section">
        <h3 className="meteor-name">{formattedName}</h3>
        <p className="meteor-class">Class: {meteor.recclass}</p>
        <p className="meteor-mass">Mass: {formattedMass}</p>
        {meteor.fall === "Found" && <i className="fa-solid fa-eye-slash"></i>}
      </div>
    </div>
  );
}

export default MeteorCard;
