import { useMapEvent } from 'react-leaflet';

const ClickHandler = ({ handleClick }) => {
  useMapEvent('click', handleClick);

  return null;
}

export default ClickHandler;