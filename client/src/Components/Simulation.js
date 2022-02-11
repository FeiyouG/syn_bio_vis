import React, { useState, useRef } from "react"

// import { getSim } from './actions/simulation';

function Simulation(){
  // Set up States
  const [simRes, setSimRes] = useState("");

  // Set up references
  const seqRef = useRef({top1: "", top2: "", base: ""});
  
  function handleInputChange(source, event) {
    const newSeq = event.target.value;
    switch (source) {
      case "top1":
        seqRef.current.top1 = newSeq;
        break;
      case "top2":
        seqRef.current.top2 = newSeq;
        break; 
      case "base":
        seqRef.current.base = newSeq;
        break;
      default:
        break;
    }
  }

  function runSimulation() {
    const seq = seqRef.current;
    
    console.log(seq);

    if (seq.top1 == "" || seq.top2 == "" || seq.base == "") {
      setSimRes("Invalid Input for Simulation");
      console.log("Invalid");
      return;
    }

    setSimRes("Simulation Result goes here!");
  }

  return(
    <>
      <div>
        <h2>Strand Displacement Simulation</h2>
        <div>
          <label>Top 1: </label>
          <input onChange={e => handleInputChange("top1", e)} type="txt" />
        </div>
        <div>
          <label>Top 2: </label>
          <input onChange={e => handleInputChange("top2", e)} ype="txt" />
        </div>
        <div>
          <label>Base:   </label>
          <input onChange={e => handleInputChange("base", e)}  type="txt" />
        </div>
        <button onClick={runSimulation}>Run Simulation</button>
      </div>
      <div>
        <p>{simRes}</p>
      </div>
    </>
    )
}

export default Simulation
