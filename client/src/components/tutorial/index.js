import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

import { getTutorial } from '../../actions/tutorial';
import { getSim } from '../../actions/simulation';
import SDSimulation from '../d3/strandDisplacement'

function Tutorial() {
  // Hooks
  // Strand data input by the user
  const [tutorial, setTutorial] = useState("# This is Lesson page");
  const dispatch = useDispatch();

  // Local Functions
  // Callabck triggered by submit button
  const handleGetTutorial = (e) => {
    e.preventDefault(); // Avoid refreshing automatically on submit
    dispatch(getTutorial("Lesson" + e.target.id, setTutorial));
  }

  const handleGetSim = (simName, setSimData) => {
    dispatch(getSim(simName, setSimData))
  }

  // const handleGetSim = async (simName, setSimData) => {
  //   dispatch(getSim(simName, setSimData))
  // }


  // Acutal Compoenent
  return (
    <div>
      <button id="1" type="button" onClick={handleGetTutorial}>Lesson 1</button>
      <button id="2" type="button" onClick={handleGetTutorial}>Lesson 2</button>
      <button id="3" type="button" onClick={handleGetTutorial}>Lesson 3</button>
      <ReactMarkdown
        components={{
          code: ({ inline, className, children, ...props }) => {
            if (inline) return <code>{children}</code>

            const language = className.split("-")[1]

            if (language == "SDSimulation") {
              const content = JSON.parse(children)
              if (content.simName != 'undefined') {     // Has pre-defined simulation data
                var simData =
                  {strands: [], conformation: [], energy: [], time: []}
                handleGetSim(content.simName, (data) => simData = data)
                return <SDSimulation data={simData} />
              }
            }
            return <pre><code class={className}>{children}</code></pre>
          }
        }}
      >{tutorial}</ReactMarkdown>
    </div>
  );
}

export default Tutorial;
