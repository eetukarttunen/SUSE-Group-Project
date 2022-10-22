import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Home.css";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

function Home() {
  const CardContentNoPadding = styled(CardContent)(`
  
  &:last-child {
    padding-bottom: 10px;
    
  }
`);
  return (
    <div className="home-container">
      <br /> {/*Nää vois tehä kauniimmin :D*/}
      <Link underline="none" component={RouterLink} to="/map">
        <Card className="card" style={{ backgroundColor: "#2EAF62" }}>
          <CardContentNoPadding>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ color: "#fff" }}
            >
              Open the
              <br />
              <strong>map</strong>
            </Typography>
          </CardContentNoPadding>
        </Card>
      </Link>
      <br />
      <Link underline="none" component={RouterLink} to="/camera">
        <Card className="card" style={{ backgroundColor: "#2A282D" }}>
          <CardContentNoPadding>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ color: "#fff" }}
            >
              <strong>Fish</strong>
              <br />
              recognition
            </Typography>
          </CardContentNoPadding>
        </Card>
      </Link>
      <br />
      <Card style={{ backgroundColor: "#fff" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ color: "black" }}
          >
            About
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Ahti AI</b> is an ongoing project with a goal of guiding users
            for following the fishing guidelines when it comes to restrictions
            in Finland.
            <br />
            <br />
            You can find information about your local as well other areas inside
            the boundaries of Finland through{" "}
            <Link component={RouterLink} to="/map" style={{ color: "#2EAF62" }}>
              map view.
            </Link>
            <br />
            <br />
            To recognize the catch which you feel unfamiliar about, you can
            check the specie through{" "}
            <Link
              component={RouterLink}
              to="/camera"
              style={{ color: "#2A282D" }}
            >
              fish recognizing view.
            </Link>
          </Typography>
          <br />
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ color: "black" }}
          >
            Datasources used
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Link style={{ color: "#2EAF62"}} target="_blank" href="https://www.kalastusrajoitus.fi/)">The Ministry of Agriculture and Forestry of Finland</Link>
            <br/>
            <Link style={{ color: "#2EAF62"}} target="_blank" href="https://paikkatietojentuottajat-koekaytto.maanmittauslaitos.fi/aineisto/1a855a17-ea46-425c-88b3-faaf9834d29f/kalastusrajoituspalvelun-avoin-data">Maanmittauslaitos</Link>
            <br/>
            <Link style={{ color: "#2EAF62"}} target="_blank" href="https://www.openstreetmap.org/copyright">Open Street Map</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
