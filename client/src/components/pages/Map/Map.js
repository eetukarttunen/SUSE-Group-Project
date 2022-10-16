import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  Popup,
  useMapEvents,
  Marker,
} from "react-leaflet";
import "./Map.css";

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
      <MapContainer center={[62.60118, 29.76316]} zoom={13} id="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <WMSTileLayer
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
        <LocationMarker />
      </MapContainer>
    </>
  );
}

export default Map;
