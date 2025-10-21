import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const center = [51.505, -0.09];
  const zoom = 10;

  return (
    <div className={'map-container'}>
      <MapContainer
        style={{ height: '600px', width: '100%' }}
        center={center}
        zoom={zoom}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}

export default Map;