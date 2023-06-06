import MapContainer from './components/MapContainer/MapContainer';
import React from 'react';
import globalStyle from './globalStyle.module.css';

function App() {
  return (
    <div className={globalStyle.mapContainerWrapper}>
      <MapContainer />
    </div>
  );
}

export default App;
