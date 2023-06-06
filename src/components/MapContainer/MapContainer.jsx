import Map from '../Map/Map';
import styles from './styles.module.css';

const MapContainer = () => {
  return (
    <div className={styles.mapContainer}>
      <Map />
    </div>
  );
};

export default MapContainer;
