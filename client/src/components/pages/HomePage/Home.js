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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            efficitur ornare accumsan. Mauris imperdiet vestibulum nisl ac
            faucibus. Nullam tincidunt massa vel nulla luctus, quis placerat
            purus viverra. Nullam sed mi metus. Curabitur vulputate neque
            lacinia mauris ultricies, sed sollicitudin lorem sollicitudin.
            Vivamus scelerisque ullamcorper libero ut elementum. Pellentesque eu
            dolor id sem suscipit pretium. Integer in gravida nibh. Aliquam in
            urna nulla. Curabitur id facilisis diam, ut accumsan nunc. Maecenas
            maximus ornare lectus, at tincidunt tortor mollis nec.
          </Typography>
          <br />
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ color: "black" }}
          >
            Datasources etc.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            efficitur ornare accumsan. Mauris imperdiet vestibulum nisl ac
            faucibus. Nullam tincidunt massa vel nulla luctus, quis placerat
            purus viverra. Nullam sed mi metus. Curabitur vulputate neque
            lacinia mauris ultricies, sed sollicitudin lorem sollicitudin.
            Vivamus scelerisque ullamcorper libero ut elementum. Pellentesque eu
            dolor id sem suscipit pretium. Integer in gravida nibh. Aliquam in
            urna nulla. Curabitur id facilisis diam, ut accumsan nunc. Maecenas
            maximus ornare lectus, at tincidunt tortor mollis nec.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
