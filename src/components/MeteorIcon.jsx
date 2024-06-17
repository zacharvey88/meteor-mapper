import colorMap from "./colorMap";

function MeteorIcon({ recclass }) {

  const getColor = () => {
    return colorMap[recclass] || "rgb(33, 39, 71)";
  };

  return (
    <div className="meteor-icon" style={{ backgroundColor: getColor(recclass) }}>
      <i className="fa-solid fa-meteor"></i>
    </div>
  );
}

export default MeteorIcon;
