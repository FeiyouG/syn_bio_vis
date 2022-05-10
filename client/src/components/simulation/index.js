import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';

import SDSimulation from '../d3/SDSimulation'
import { runSim } from '../../actions/simulation';


function Simulation() {

  const dispatch = useDispatch();

  const pilFile = useRef(null);

  const [simData, setSimData] = useState({
    message: "Waiting for simulation data ..."
  });

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
}

export default Simulation
