import axios from 'axios';
import convert from 'xml-js';

import { WGS84_a, ZULUGIS_ZWS_URL } from './constants.js';

export const getPointData = async (coords, layer, zoom) => {
  const scale = 2 * Math.PI * WGS84_a / (256 * (1 << zoom))

  let xml= `<?xml version="1.0" encoding="UTF-8"?>
    <zulu-server service='zws' version='1.0.0'>
      <Command>
        <SelectElemByXY>
          <Layer>" + layer + "</Layer>
          <X>" + ${coords[0]} + "</X>
          <Y>" + ${coords[1]} + "</Y>
          <Scale>" + ${scale} + "</Scale>
          <CRS>'EPSG:4326'</CRS>
        </SelectElemByXY>
      </Command>;
    </zulu-server>`;

  return axios.post(ZULUGIS_ZWS_URL,
    xml,
    {
      headers: { 'Content-Type': 'text/xml' },
    }).then(res=> {
      const fullData = convert.xml2js(res, { compact: true, spaces: 2 });
      const fields = fullData?.zwsResponse?.SelectElemByXY?.Element?.Records?.Record?.Field;

      return fields?.map(field => ({
        name: field.UserName?._text,
        value: field.Value?._text
      }));
    }).catch(err=>{
      console.log(err)
    });
}