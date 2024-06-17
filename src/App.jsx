import { useState } from 'react';
import Map from "./components/Map";
import List from "./components/List";
import Info from "./components/Info";
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  const [results, setResults] = useState([]);
  const [position, setPosition] = useState([51.505, -0.09]);
  const [selectedMeteorId, setSelectedMeteorId] = useState(null);

  return (
    <div className='container'>
      <Map 
        results={results} 
        position={position} 
        setPosition={setPosition} 
        selectedMeteorId={selectedMeteorId} 
      />
      <Info />
      <List 
        results={results} 
        setResults={setResults} 
        setPosition={setPosition} 
        setSelectedMeteorId={setSelectedMeteorId} 
      />
    </div>
  );
}

export default App;
