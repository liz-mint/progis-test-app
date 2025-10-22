import { useEffect, useRef, useState } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { getPointData } from '../api.js';
import ClickHandler from './ClickHandler.jsx';
import ZWSLayer from './ZWSLayer.jsx';

const Map = ({
  center,
  zoom,
  layer,
}) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [pointData, setPointData] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handleClick = (e) => {
    const point= [e.latlng.lat, e.latlng.lng]

    setSelectedPoint(point)
  };

  useEffect(() => {
    if (selectedPoint) {
      const zoom = mapRef.current.getZoom();

      getPointData(selectedPoint, layer, zoom)
        .then(data => {
          setPointData(data);
          if (data && markerRef.current) {
            markerRef.current?.openPopup();
          }
        });
    }
  }, [selectedPoint, layer]);

  return (
    <div className={'map-container'}>
      <MapContainer
        ref={mapRef}
        style={{ height: '600px', width: '100%' }}
        center={center}
        zoom={zoom}
        scrollWheelZoom
      >
        <ClickHandler handleClick={handleClick} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZWSLayer layer={layer} />

        {selectedPoint && (
          <CircleMarker
            ref={markerRef}
            center={selectedPoint}
            pathOptions={{ color: 'red' }}
            radius={10}
          >
            <Popup>
              {pointData?.data || 'some data'}
            </Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </div>
  )
}

export default Map;