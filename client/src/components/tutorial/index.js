import React, { useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

import { getTutorial } from '../../actions/tutorial';

function Tutorial() {
  // ####################
  // Hooks
  // ####################

  // Strand data input by the user
  const [tutorial, setTutorial] = useState("# This is Lesson page");
  const dispatch = useDispatch();

  // ####################
  // Local Functions
  // ####################

  // Callabck triggered by submit button
  const handleGetTutorial = (e) => {
    e.preventDefault(); // Avoid refreshing automatically on submit
    dispatch(getTutorial("Lesson" + e.target.id, setTutorial));
  }


  // ####################
  // Acutal Compoenent
  // ####################
  return (
    <div>
      <button id="1" type="button" onClick={handleGetTutorial}>Lesson 1</button>
      <button id="2" type="button" onClick={handleGetTutorial}>Lesson 2</button>
      <button id="3" type="button" onClick={handleGetTutorial}>Lesson 3</button>
      <ReactMarkdown>{tutorial}</ReactMarkdown>
    </div>
  );
}

export default Tutorial;
