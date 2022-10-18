import * as React from "react";
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
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function SideButtons() {
  const [infoVisible, setVisibility] = React.useState(false);
  const [searchClicked, setSearchState] = React.useState(false);

  const mapUse = useMap();
  const OpenMoreInfo = () => {
    setVisibility(!infoVisible);
  };
  const ClickZoomIn = () => {
    mapUse.zoomIn();
  };
  const ClickZoomOut = () => {
    mapUse.zoomOut();
  };
  const OpenSearch = () => {
    setSearchState(!searchClicked);
    setTimeout(() => {
      document.getElementsByClassName("textInput")[0].focus();
    }, 100);
  };
  const [inputLength, setInputLength] = React.useState(0);
  const AddInputEventListener = () => {
    setInputLength(
      document.getElementsByClassName("textInput")[0].value.toString().length
    );
  };
  const inputField = document.getElementsByClassName("textInput")[0];
  return (
    <>
      <button
        className={infoVisible ? "sideButtonActive" : "sideButtonNotActive"}
        id="openMoreInfoButton"
        onClick={OpenMoreInfo}
      >
        &#128712;
      </button>
      <button className="sideButton" id="zoomInButton" onClick={ClickZoomIn}>
        +
      </button>
      <button className="sideButton" id="zoomOutButton" onClick={ClickZoomOut}>
        -
      </button>
      <button className="sideButton" id="openSearchButton" onClick={OpenSearch}>
        &#128269;
      </button>
      <img
        alt="legend"
        className={infoVisible ? "infoImage" : "infoImage hidden"}
        src="http://avoinkara.mmm.fi/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=avoin%3Akalastusrajoitus"
      ></img>
      <div className={searchClicked ? "searchBar" : "searchBar hidden"}>
        <input
          className="textInput"
          onInput={AddInputEventListener}
          onKeyDown={(e) =>
            e.key.toString() == "Enter" ? OpenSearch() : false
          }
        ></input>
        <button
          className={searchClicked ? "searchInputButton" : "searchBar hidden"}
          disabled={inputLength > 0 ? false : true}
          onClick={OpenSearch}
        >
          Search
        </button>
      </div>
      <div
        className={searchClicked ? "backgroundDiv" : "backgroundDiv hidden"}
        onClick={OpenSearch}
      ></div>
    </>
  );
}

function Map(props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function LocationMarker() {
    const [position, setPosition] = React.useState(null);
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  }

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <MapContainer
        center={[62.60118, 29.76316]}
        zoom={13}
        id="map"
        zoomControl={false}
      >
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
        <LocationMarker />
        <SideButtons />
      </MapContainer>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          onClick={toggleDrawer(true)}
          sx={{
            pointerEvents: "all",
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            left: 0,
            right: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            Click here to open
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {/*
          TODO drawer content here
          */}
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default Map;
