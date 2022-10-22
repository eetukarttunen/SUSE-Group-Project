import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import * as tf from '@tensorflow/tfjs';
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Helmet from 'react-helmet';

const MODEL_URL = 'src/models/model.json'

let model

async function load_model() {
  model = await tf.loadLayersModel('https://raw.githubusercontent.com/eetukarttunen/SUSE-Group-Project/main/client/models/model.json');
  return model
}
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));
load_model()

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center"
  },
  imgBox: {
    maxWidth: "50%",
    maxHeight: "50%",
    margin: "auto"

  },
  img: {
    height: "inherit",
    maxWidth: "inherit"
  },
  input: {
    display: "none"
  }
}));

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: "black",
    /*theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,*/
}));


function Camera() {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const CardContentNoPadding = styled(CardContent)(`
  
  &:last-child {
    padding-bottom: 10px;
    
  }
`);
  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        setOpen(true)
        const image = new Image()
        image.src = newUrl
        image.width = '224'
        image.height = '224'
        let a = tf.browser.fromPixels(image).reshape([224, 224, 3]).toFloat().expandDims();
        let prediction = await model.predict(a)
        console.log(prediction.dataSync())
      }
    }
  };

  const drawerBleeding = 56;
  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
  }));

  return (
    
    <div className={classes.root}>
    <Helmet bodyAttributes={{style: 'background-color : black'}}/>

    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(70% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Grid container>
        <Grid item xs={12}>
          <h2 style={{color: "#e0e0e0", fontSize: "12px", fontWeight: 500}}>
              Open camera
          </h2>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraRoundedIcon 
              color="success" 
              style={{
                fontSize:"8rem", "background-color": "#D9D9D9",
                "border-radius": "25%",
                fill: "black",
              }} 
              
              />
            </IconButton>
          </label>
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
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {source && (
            <Box
              display="flex"
              justifyContent="center"
              className={classes.imgBox}
            >
              <img src={'https://wiki.fishingplanet.com/images/0/0b/Northern_Pike.png'} 
                   alt={"snap"} 
                   className={classes.img}
                   width={500}
              >
                   
              </img>
              
            </Box>
          )}          
        <Typography sx={{ p: 3, textAlign: 'center', color: "text.main", fontSize: '30px' }}>
          Pike
        </Typography>
        <Card className="card" style={{ backgroundColor: "#2EAF62", marginBottom: '20px' }}>
          <CardContentNoPadding>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ color: "#fff" }}
            >
              <strong>No restrictions on your area</strong>
            </Typography>
          </CardContentNoPadding>
        </Card>
        <Card className="card" style={{ backgroundColor: "#2A282D", marginBottom: '20px' }}>
          <CardContentNoPadding>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ color: "#fff" }}
            >
              <strong>Minimum size:</strong>
              <br />
              40cm
            </Typography>
          </CardContentNoPadding>
        </Card>
        <Card className="card" style={{ backgroundColor: "#2A282D", marginBottom: '20px' }}>
          <CardContentNoPadding>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ color: "#fff" }}
            >
              <strong>Protected</strong>
              <br />
              1.8. - 30.6.
            </Typography>
          </CardContentNoPadding>
        </Card>
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
        </Grid>
      </Grid>
    </Root>
    </div>
  );
}
export default Camera;
