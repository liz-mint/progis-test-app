import './App.css'

import Map from './components/Map';

function App() {
  const center = [42.32, 69.59];
  const zoom = 15;
  const layer = 'example:demo';

  return (
    <div>
      <Map center={center} zoom={zoom} layer={layer} />
    </div>
  )
}

export default App
