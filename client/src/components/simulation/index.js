import React, { useState, useEffect, useRef } from "react";
// import { TextField, Button, Typography, Paper } from '@material-ui/core';
// import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import SDSimulation from '../d3/SDSimulation'
import { runSim } from '../../actions/simulation';
// import useStyles from './Styles';


function Simulation() {

  const dispatch = useDispatch();

  const pilFile = useRef(null);

  const [simData, setSimData] = useState({
    message: "Waiting for simulation data ..."
  });

  // Hooks
  // Strand data input by the user
  // const [strandData, setStrandData] = useState({
  //   top1: '', top2: '', base: ''
  // });

  // Pil file submitted or parsed from user input
  // const [pilFile, setPilFile] = useState({
  // });

  // const classes = useStyle();

  // ####################
  // Local Functions
  // ####################

  // Callabck triggered by submit button
  const handleSubmit = (e) => {
    e.preventDefault(); // Avoid refreshing automatically on submit

    const fileList = pilFile.current.files

    if (fileList == null || fileList.length == 0) {
      alert("Submission Failed: No file selected")
      return
    }

    const data = new FormData()
    data.append('pilFile', fileList[0])

    dispatch(runSim(data, setSimData))
  }

  // Callback triggered by clear button
  const handleReset = () => {
    // setStrandData({ top1: '', top2: '', base: '' })
  }

  return (
    <div>
      <form
        className="Simulation"
        onSubmit={handleSubmit}
        onReset={handleReset}
        style={{ marginBottom: "50px" }}
      >
        <fieldset>
          <legend>File Upload</legend>
          <div>
            <label>*.pil File: </label>
            <input
              name="pilFile"
              type="file"
              ref={pilFile}
              accept=".pil"
            />
          </div>
        </fieldset>

        <center>
          <br />
          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />
        </center>
        <SDSimulation data={simData} />
      </form>
    </div>
  )

  // Function to draw the simulation
  // const updateAnimation = () => {
  //   console.log(simData)
  // }

  // ####################
  // The Actual compoenent
  // ####################
  //   return (
  //     <div>
  //       <Paper>
  //         <form autoComplete="off" noValidate onSubmit={handleSubmit}>
  //           <Typography variant="h6">Run a simulation</Typography>
  //           <TextField
  //             name="top1"
  //             variant="outlined"
  //             label="Top Strand 1"
  //             fullWidth
  //             value={strandData.top1}
  //             onChange={(e) => setStrandData({ ...strandData, top1: e.target.value })}
  //           />
  //           <TextField
  //             name="top2"
  //             variant="outlined"
  //             label="Top Strand 2"
  //             fullWidth
  //             value={strandData.top2}
  //             onChange={(e) => setStrandData({ ...strandData, top2: e.target.value })}
  //           />
  //           <TextField
  //             name="base"
  //             variant="outlined"
  //             label="Base Strand"
  //             fullWidth
  //             value={strandData.base}
  //             onChange={(e) => setStrandData({ ...strandData, base: e.target.value })}
  //           />
  //           <div>
  //             <Button variant="contained" color="primer" size="large" type="submit" fullWidth>Submit</Button>
  //             <Button variant="contained" color="secondary" size="small" onClick={handleClear} fullWidth>Clear</Button>
  //           </div>
  //         </form>
  //       </Paper>
  //       {/* Simulation will be drawn automatically when simData is updated*/}
  //       <SDSimulation data={simData} />
  //     </div>
  //
  //   )
  //
}

export default Simulation
