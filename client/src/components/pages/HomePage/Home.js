import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Home.css";

function Home() {
  return (
    <div className='home-container'>
      <br/> {/*Nää vois tehä kauniimmin :D*/}
      <Card style={{backgroundColor: "#2EAF62"}} sx={{ borderRadius: '50%' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{color: "#fff"}}>
            Open the map
          </Typography>
        </CardContent>
      </Card>
      <br/>
      <Card style={{backgroundColor: "#2A282D"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{color: "#fff"}}>
            Fish recognition
          </Typography>
        </CardContent>
      </Card>
      <br/>
      <Card style={{backgroundColor: "#fff"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{color: "black"}}>
            About
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This Card's children are wrapped in a CardContent component, which
            adds 16px of padding around the edges. The last CardContent in a group
            of children will get 24px of padding on the bottom.
          </Typography>
          <br/>
          <Typography gutterBottom variant="h5" component="h2" style={{color: "black"}}>
            Datasources etc.          
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This Card's children are wrapped in a CardContent component, which
            adds 16px of padding around the edges. The last CardContent in a group
            of children will get 24px of padding on the bottom.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
