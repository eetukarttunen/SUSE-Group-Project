import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import * as tf from '@tensorflow/tfjs';

const MODEL_URL = 'src/models/model.json'

let model

async function load_model() {
  model = await tf.loadLayersModel('https://raw.githubusercontent.com/eetukarttunen/SUSE-Group-Project/main/client/models/model.json');
  return model
}

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
function Camera() {
  const classes = useStyles();
  const [source, setSource] = useState("");

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        const image = new Image()
        image.src = newUrl
        image.width = '224'
        image.height = '224'
        const a = tf.browser.fromPixels(image, 3)
        a.print()
        
        const prediction = model.predict(a.reshape([1, 224, 224, 3]))
        const label = prediction.argMax(-1).print();
        console.log(label)
      }
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <h5>Open camera</h5>
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
              <PhotoCameraRoundedIcon fontSize="large" color="primary" />
            </IconButton>
          </label>
          {source && (
            <Box
              display="flex"
              justifyContent="center"
              border={1}
              className={classes.imgBox}
            >
              <img src={source} alt={"snap"} className={classes.img}></img>
              
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
export default Camera;
