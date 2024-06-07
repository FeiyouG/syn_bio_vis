import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';

import SDSimulation from '../d3/SDSimulation'
import { runSim } from '../../actions/simulation';


function Simulation() {

  const dispatch = useDispatch();

  const pilFile = useRef(null);

  const initialMessage = { message: "Strand Displacement Simulation" }
  const [simData, setSimData] = useState(initialMessage);

  // Callabck triggered by submit button
  const handleSubmit = (e) => {
    e.preventDefault(); // Avoid refreshing automatically on submit

    const fileList = pilFile.current.files

    if (fileList == null || fileList.length == 0) {
      alert("Submission Failed: No file selected")
      return
    }

    setSimData({
      message: "Waiting for server ..."
    })

    const data = new FormData()
    data.append('pilFile', fileList[0])

    dispatch(runSim(data, setSimData))

    console.log("handleSubmit was called");
  }


  // Callback triggered by clear button
  const handleReset = (e) => {
    console.log("handleReset not yet implemented")
  }

  // TODO: Manual input section is currently manully written
  return (
    <div>
      <form
        className="Simulation"
        onSubmit={handleSubmit}
        onReset={handleReset}
        style={{ marginBottom: "50px" }}
      >
        <fieldset disabled>
          <legend>Manual Input (WIP)</legend>
          <fieldset>
            <legend>DOMINS</legend>
            <div>
              <label>Domain 1: </label>
              <input type="text" size={25} placeholder="Enter a sequence of A,T,C,G" />
              <input type="button" name="remove_domain" value="Remove" />
            </div>
            <div>
              <label>Domain 2: </label>
              <input type="text" size={25} placeholder="Enter a sequence of A,T,C,G" />
              <input type="button" name="remove_domain" value="Remove" />
            </div>
            <input type="button" name="add_domain" value="Add" />
          </fieldset>


          <fieldset>
            <legend>STRANDS</legend>
            <div>
              <label>Strand 1: </label>
              <input type="text" size={35} placeholder="Enter names of domains, seperated by comma" />
              <input type="button" name="remove_strand" value="Remove" />
            </div>
            <div>
              <label>Strand 2: </label>
              <input type="text" size={35} placeholder="Enter names of domains, seperated by comma" />
              <input type="button" name="remove_strand" value="Remove" />
            </div>
            <input type="button" name="add_strand" value="Add" />
          </fieldset>


          <fieldset>
            <legend>Complexes</legend>
            <div>
              <label>Complex 1: </label>
              <input type="text" size={35} placeholder="Enter names of strands, seperated by comma" />
              <input type="button" name="remove_complex" value="Remove" />
            </div>
            <input type="button" name="add_complex" value="Add" />
          </fieldset>

          <center>
            <br />
            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" />
          </center>
        </fieldset>

        <fieldset style={{
          marginTop: "20px"
        }}>
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

          <center>
            <br />
            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" />
          </center>
        </fieldset>

        <SDSimulation data={simData} />
      </form>
    </div>
  )
}

export default Simulation
