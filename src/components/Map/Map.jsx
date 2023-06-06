import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import mapdata from '../../utils/mapdata';
import { geoCentroid } from 'd3-geo';
import { gsap } from 'gsap';

const Map = () => {
  const comp = React.useRef();

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.theState', {
        duration: 0.6,
        stagger: 0.3,
        ease: 'back',
        y: 96,
        opacity: 0,
      });
      gsap.from('.theMarkers', {
        duration: 0.6,
        stagger: 0.3,
        opacity: 0,
      });
      let tl = gsap.timeline();
      tl.to('.theCountry', {
        delay: 5.4,
        fill: '#FF331F',
        duration: 0.8,
      });
      tl.to('.theCountry', {
        fill: 'white',
      });
      tl.to('.theCountry', {
        delay: 0.4,
        fill: '#FF331F',
        duration: 0.8,
      });
      tl.to('.theCountry', {
        fill: 'white',
      });
    }, comp);

    return () => ctx.revert();
  }, [comp]);

  return (
    <ComposableMap
      projection='geoMercator'
      projectionConfig={{
        scale: 3500,
        center: [19, 52],
      }}
      fill='white'
      stroke='black'
      strokeWidth={3}
    >
      <Geographies geography={mapdata.data} ref={comp}>
        {(geographies) => {
          return (
            <>
              {geographies.geographies.map((geo) => {
                const stateName = geo.properties.VARNAME_1;
                return (
                  <Geography
                    onClick={() => console.log(stateName)}
                    key={geo.rsmKey}
                    className='theState theCountry'
                    geography={geo}
                    style={{
                      hover: {
                        fill: '#FF331F',
                      },
                    }}
                  />
                );
              })}

              {geographies.geographies.map((geo) => {
                const provinceCenter = geoCentroid(geo);
                let colorFill = 'black';
                let customPlacement = [15.77209, 53.65369];

                return (
                  <Marker
                    key={geo.rsmKey}
                    coordinates={
                      geo.properties.VARNAME_1 === 'Zachodniopomorskie'
                        ? customPlacement
                        : provinceCenter
                    }
                    className='theMarkers'
                  >
                    <text
                      style={{
                        fill: colorFill,
                        strokeWidth: 0,
                      }}
                      textAnchor='middle'
                    >
                      {geo.properties.VARNAME_1}
                    </text>
                  </Marker>
                );
              })}
            </>
          );
        }}
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
