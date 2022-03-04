// This module will create visualization for using d3
import React from 'react';
import * as d3 from 'd3';

function Animation(props) {
  return (
    <div>
      <h1>{JSON.stringify(props.data)}</h1>
    </div>
  )

}

export default Animation;
