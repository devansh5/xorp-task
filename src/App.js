import React,{useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import MapGL, { Marker, Popup, NavigationControl} from 'react-map-gl';
import classes from './Map.module.css'
import Pin from './pin';




export default function App() {
  const [showpop, setshowpop] = useState(false);
  const [lng,setLng]=useState(40);
  const [lat,setLat]=useState(40);
  const [viewport, setViewport] = useState({
    latitude: 77,
    longitude: 28,
    zoom: 8,
    bearing: 0,
    pitch: 0
  });
  useEffect(() => {
    setInterval(() => {
      axios.get('https://api.xorp.io/middleware/v1.0/agent/location')
        .then((res) => {
          
          setLng(res.data.data.longitude);
          setLat(res.data.data.latitude);
        })
      }
        ,10000)
      

    }, [])

    return (
      <>
      <div className={classes.sidebarStyle}>
                <div>
                    Longitude: {lng} | Latitude: {lat} 
                </div>
          </div>
        <MapGL
          {...viewport}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={setViewport}
          mapboxApiAccessToken='pk.eyJ1IjoicmFuaml0a3NoYWgiLCJhIjoiY2ticWNkanUzMmllczJybmN3NmV5NmxhbyJ9.xLeI2B_Zuvtze-APbGfctA'
        >
          <Marker
            longitude={lng}
            latitude={lat}
          >
            <button className={classes.button} onClick={()=>{setshowpop(true)}}>CLick</button>
            <Pin size={20} />
            
          </Marker>
          {
                    showpop && <Popup className="popup" longitude={lng} latitude={lat} anchor="top" closeButton={true} onClose={() => setshowpop(false)} closeOnClick={false}>
                        <div>
                            <ul>
                               <li>Longitude: - {lng}</li>
                               <li>Latitude: - {lat}</li>
                            </ul>
                        </div>
                    </Popup>
                }

          <div className={classes.navStyle}>
            <NavigationControl />
          </div>

        </MapGL>
        
      </>
    );
  }
