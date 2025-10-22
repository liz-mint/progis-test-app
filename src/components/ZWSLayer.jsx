import { TileLayer } from 'react-leaflet';

import { ZULUGIS_ZWS_URL } from '../constants.js';

const ZWSLayer = ({ layer }) => {

  return (
    <TileLayer
      attribution='© ZuluGIS'
      url={`${ZULUGIS_ZWS_URL}/GetLayerTile?Layer=${layer}&x={x}&y={y}&z={z}`}
    />
  )
}

export default ZWSLayer;