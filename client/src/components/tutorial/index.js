import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

import { getTutorial } from '../../actions/tutorial';
import { getSim } from '../../actions/simulation';
import SDSimulation from '../d3/SDSimulation'

function Tutorial() {
  // Hooks
  // Strand data input by the user
  const [tutorial, setTutorial] = useState("# This is Lesson page");
  const [simData, setSimData] = useState({
    strands: [], conformation: [], energy: [], time: []
  });
  const dispatch = useDispatch();

  // Local Functions
  // Callabck triggered by submit button
  const handleGetTutorial = (e) => {
    e.preventDefault(); // Avoid refreshing automatically on submit
    dispatch(getTutorial("Lesson" + e.target.id, setTutorial));
    handleGetSim("example", setSimData)
  }

  const handleGetSim = (simName, setSimData) => {
    dispatch(getSim(simName, setSimData))
  }

  // const handleGetSim = async (simName, setSimData) => {
  //   dispatch(getSim(simName, setSimData))
  // }

  const codeblockRender = ({ inline, className, children, ...props }) => {
    if (inline) return <code>{children}</code>

    const language = className.split("-")[1]

    if (language == "SDSimulation") {
      return SDSimulationRender({ inline, className, children, props })
    }
    return <pre><code className={className}>{children}</code></pre>

  }

  const SDSimulationRender = ({ inline, className, children, ...props }) => {
    const content = JSON.parse(children)
    if (content.name != 'undefined') {     // has pre-defined simulation data
      // var simData =
      //   { strands: [], conformation: [], energy: [], time: [] }
      // handleGetSim(content.name, setSimData)
      return <SDSimulation data={simData} />
    }
    return <pre><code class={className}>INVALID FORMAT</code></pre>
  }


  // Acutal Compoenent
  return (
    <div>
      <button id="1" type="button" onClick={handleGetTutorial}>Lesson 1</button>
      <button id="2" type="button" onClick={handleGetTutorial}>Lesson 2</button>
      <button id="3" type="button" onClick={handleGetTutorial}>Lesson 3</button>
      <ReactMarkdown components={{ code: codeblockRender }}>{tutorial}</ReactMarkdown>
    </div>
  );
}

export default Tutorial;
