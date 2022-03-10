import React from 'react'
import { useDispatch } from 'react-redux';

import { getTutorial } from '../../actions/tutorial';

function Tutorial() {
  const dispatch = useDispatch();

  // ####################
  // Local Functions
  // ####################

  // Callabck triggered by submit button
  const handleGetTutorial = (e) => {
    e.preventDefault(); // Avoid refreshing automatically on submit
    dispatch(getTutorial("Lesson" + e.target.id));
  }


  return (
    <div>
      <h2>
        This is a tutorial Page
      </h2>
      <button id="1" type="button" onClick={handleGetTutorial}>Lesson 1</button>
      <button id="2" type="button" onClick={handleGetTutorial}>Lesson 2</button>
    </div>
  );
}

export default Tutorial;
