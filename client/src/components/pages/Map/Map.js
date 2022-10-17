import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  Popup,
  useMapEvents,
  Marker,
  useMap,
} from "react-leaflet";
import "./Map.css";

function SideButtons(){
  const [infoVisible, setVisibility] = useState(false);
  const [searchClicked, setSearchState] = useState(false);

  const mapUse = useMap();
  const OpenMoreInfo = ()=>{
    setVisibility(!infoVisible);
  };
  const ClickZoomIn = ()=>{
    mapUse.zoomIn();
  };
  const ClickZoomOut = ()=>{
    mapUse.zoomOut();
  };
  const OpenSearch = ()=>{
    setSearchState(!searchClicked);
    setTimeout(()=>{document.getElementsByClassName('textInput')[0].focus();},100);
  };
  const [inputLength, setInputLength] = useState(0);
  const AddInputEventListener = ()=>{
    setInputLength((document.getElementsByClassName('textInput')[0].value.toString().length));
  };
  const inputField = document.getElementsByClassName('textInput')[0];
  return (
    <>
      <button className={infoVisible?'sideButtonActive':'sideButtonNotActive'} id='openMoreInfoButton' onClick={OpenMoreInfo}>&#128712;</button>
      <button className='sideButton' id='zoomInButton' onClick={ClickZoomIn}>+</button>
      <button className='sideButton' id='zoomOutButton' onClick={ClickZoomOut}>-</button>
      <button className='sideButton' id='openSearchButton' onClick={OpenSearch}>&#128269;</button>
      <img alt='legend' className={infoVisible?'infoImage':'infoImage hidden'} src='http://avoinkara.mmm.fi/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=avoin%3Akalastusrajoitus'></img>
      <div className={searchClicked?'searchBar':'searchBar hidden'}>
        <input className='textInput' onInput={AddInputEventListener} onKeyDown={(e)=>(e.key.toString()=='Enter'?OpenSearch():false)}></input>
        <button className={(searchClicked?'searchInputButton':'searchBar hidden')} disabled={inputLength>0?false:true} onClick={OpenSearch}>Search</button>
      </div>
      <div className={searchClicked?'backgroundDiv':'backgroundDiv hidden'} onClick={OpenSearch}></div>
    </>
  )
}
function Map() {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  return (
    <>
      <MapContainer center={[62.60118, 29.76316]} zoom={13} id="map" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <WMSTileLayer
          attribution='&copy; <a href="https://paikkatietojentuottajat-koekaytto.maanmittauslaitos.fi/aineisto/1a855a17-ea46-425c-88b3-faaf9834d29f/kalastusrajoituspalvelun-avoin-data">MMM, Kalastusrajoitus, CC 4.0</a>'
          layers={"kalastusrajoitus"}
          transparent={true}
          format={"image/png"}
          url="http://avoinkara.mmm.fi:80/geoserver/ows?SERVICE=WMS&"
        />
        <Marker position={[62.60118, 29.76316]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <SideButtons/>
        <LocationMarker />
      </MapContainer>
    </>
  );
}

export default Map;
