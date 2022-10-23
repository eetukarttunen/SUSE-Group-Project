import * as React from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import "./Map.css";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import getRandomFishingRestriction from "../../../_mock/FishingRestriction";
import getRandomLake from "../../../_mock/Lake";

const drawerBleeding = 56;
const restrictions = getFishingRestrictions();
const lakeName = getRandomLake();

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
  const [locations, setLocations] = React.useState(false);
  const [searchClicked, setSearchState] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);


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
  const setCsv = function(currentCsv){
    const rows = currentCsv.toString().replace(/"/g,'').split(/\n/);
    rows.shift();
    const newArray = [];
    rows.forEach(currentRow => {
      newArray.push(currentRow.split(','));
    });
    newArray.forEach(currentRow => {
      currentRow[0] = currentRow[0].toLowerCase();
      currentRow[1] = parseFloat(currentRow[1]);
      currentRow[2] = parseFloat(currentRow[2]);
    });
    setLocations(newArray);
  }
  const OpenSearch = () => {
    setSearchState(!searchClicked);
    if(!locations){
      //Source of csv: https://github.com/teelmo/geodata
      fetch('Kuntien keskipisteet 2013.csv').then((curResponse)=>curResponse.text()).then((curText)=>setCsv(curText));
    }else{
      const found = false;
      locations.forEach((currentLocation)=>{
        if(document.getElementsByClassName("textInput")[0].value&&currentLocation[0]==document.getElementsByClassName("textInput")[0].value.toLowerCase()){
          document.getElementsByClassName("textInput")[0].value='';
          mapUse.panTo([currentLocation[1],currentLocation[2]]);
          found = true;
        }
      });
      if(!found&&inputLength>0){
        setNotFound(true);
        setTimeout(()=>setNotFound(false),2000);
      }
    }
    document.getElementsByClassName("textInput")[0].value='';
    setInputLength(0);
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
  return (
    <>
      <Typography className={notFound?"notFoundMessage":"notFoundMessageHidden"} style={{fontSize:'27px'}}>
        <b>Location not found</b>
      </Typography>
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
            e.key.toString() === "Enter"&&inputLength>0 ? OpenSearch() : false
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

function getFishingRestrictions() {
  const restrictions = [];

  for (const _ of Array(Math.floor(Math.random() * 9) + 1).keys()) {
    restrictions.push(getRandomFishingRestriction());
  }

  return restrictions;
}

/**
 * Get current location of a user.
 * @returns Marker if it gets user's location
 */
function LocationMarker() {
  const [position, setPosition] = React.useState(null);

  const map = useMap();

  React.useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    });
  }, [map]);

  return position === null ? null : <Marker position={position}></Marker>;
}

function Map() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
        center={[65.192059, 24.945831]}
        zoom={6}
        id="map"
        zoomControl={false}
        doubleClickZoom={false}
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
            {open ? "Click on the map to close" : "Click here to open"}
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              textAling: "left",
              maxWidth: "1024px",
            }}
          >
            <Typography
              sx={{
                color: "text.main",
                fontSize: "30px",
              }}
              component="h1"
              variant="h5"
            >
              Restrictions in your location
            </Typography>
            <Typography gutterBottom component="h3">
              Lake nearby: <strong>{lakeName}</strong>
            </Typography>
            <Typography
              sx={{
                pt: 3,
              }}
              gutterBottom
              variant="h5"
              component="h2"
            >
              Currently effective restrictions
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Fish</TableCell>
                    <TableCell align="right">Validity period</TableCell>
                    <TableCell align="right">Minimum length (cm)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restrictions.map((row) => (
                    <TableRow
                      key={row.fish + row.minLength}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.fish}
                      </TableCell>
                      <TableCell align="right">
                        {row.from.toLocaleDateString("fi-FI")} -{" "}
                        {row.to.toLocaleDateString("fi-FI")}
                      </TableCell>
                      <TableCell align="right">{row.minLength}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default Map;
