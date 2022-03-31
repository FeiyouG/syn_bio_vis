import React from "react";
import * as d3 from "d3";
import { sliderBottom } from "d3-simple-slider";

import { useD3 } from '../../hooks/useD3';

function SDSimulation(props) {
  const data = parseData(props.data);
  const simulationRef = useD3((svg) => drawSimulation(svg, data), [data]);
  const scatterPlotRef = useD3((svg) => drawScatterPlot(svg, data), [data]);

  if (data.length == 0) {
    return (
      <div>
        <h1>NO DATA</h1>
      </div>
    )
  }

  return (
    <div>
      <svg
        ref={simulationRef}
        title="Simulation"
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        // <g className="sim-area" />
        <g className="sim-slider" />
      </svg>

      <svg
        ref={scatterPlotRef}
        title="Scatter Plot"
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-dots" />
        <g className="plot-line" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )

}

/**
* Draw a scatter plot of energy vs time using data onto svg
*/
function drawScatterPlot(svg, data) {
  if (data.length == 0) return;

  // Constants
  const height = 500;
  const width = 1000;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const stroke_width = 1;
  const axis_text_size = 10;

  const x_scale = d3
    .scaleLinear()
    // .domain([0, d3.max(data.time, d => parseFloat(d))])
    .domain([0, d3.max(data, d => d.time)]).nice()
    .rangeRound([margin.left + stroke_width, width - margin.right])
  // .paddingOuter(10)
  // .nice()

  const y_scale = d3
    .scaleLinear()
    // .domain([d3.min(data.energy, d => parseFloat(d)), d3.max(data.energy, d => parseFloat(d))])
    .domain([d3.min(data, d => d.energy), d3.max(data, d => d.energy)]).nice()
    .rangeRound([height - margin.bottom, margin.top])
  // .nice()

  const x_axis = (g) => g
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x_scale))
    .append('text')
    .attr('text-anchor', 'end')
    .attr('fill', 'black')
    .attr('font-size', axis_text_size)
    .attr('font-weight', 'bold')
    .attr('x', width - margin.right)
    .attr('y', - margin.bottom / 4)
    .text('Time (ms)');

  const y_axis = (g) => g
    .attr("transform", `translate(${margin.left},0)`)
    .style("color", "steelblue")
    .call(d3.axisLeft(y_scale))
    .append('text')
    .attr('transform', `translate(${margin.left / 2}, ${margin.top}) rotate(-90)`)
    .attr('text-anchor', 'end')
    .attr('fill', 'black')
    .attr('font-size', axis_text_size)
    .attr('font-weight', 'bold')
    .text('Energy (unit)');

  svg.select(".x-axis").call(x_axis);
  svg.select(".y-axis").call(y_axis);

  svg.select(".plot-dots")
    .selectAll(".dot")
    .data(data, d => d.time) // Use time as key since they are unique
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d => x_scale(d.time))
    .attr("cy", d => y_scale(d.energy))
    .attr("r", 5)
    .style("fill", "black")

  svg
    .select(".plot-line")
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", d3.line()
      .x(d => x_scale(d.time))
      .y(d => y_scale(d.energy))
      .curve(d3.curveMonotoneX))
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", 2)

}

/**
* Draw a strand displacement simulation using data onto svg
*/
function drawSimulation(svg, data) {
  if (data.length == 0) return;
  // Constants
  const height = 500;
  const width = 1000;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const stroke_width = 1;
  const axis_text_size = 10;

  const bp_size = 10
  const bp_dist = 3

  const minTime = d3.min(data, d => d.time)
  const maxTime = d3.max(data, d => d.time)

  // Construct the slider
  const slider = sliderBottom()
    .min(minTime)
    .max(maxTime)
    .step((maxTime - minTime) / data.length)
    .tickValues(data.map(d => d.time))
    .width(width)
    .on("end", time => update(time))

  svg.select(".sim-slider")
    .attr("transform", "translate(10, 30)")
    .call(slider);

  // Construct the actual simulation
  svg.select(".sim-area")
    .selectAll(".rect")
    .data(data, d => d.conformation)
    .attr("x", d => d.state.index * (bp_size + bp_dist))
    .attr("y", d => 0)
    .attr("width", bp_size)
    .attr("height", bp_size)
    .attr("fille", "red")


  function update(time) {
    // TODO: can't get the slider to work properly
    // It stops at random rather specified ticks
    // const states = data.filter(d => d.time == time).state
    const states = data[0].state

    // TODO: The simulation does draw, but only after slider is dragged for
    // at least once.
    console.log(time, states)
    svg.select(".sim-area")
      .selectAll(".dot")
      .data(states, d => d.id) // Use time as key since they are unique
      .join("circle")
      .attr("class", "dot")
      .attr("cx", d => d.index * (bp_size + bp_dist))
      .attr("cy", d => d.strand_num * 20 + 50)
      .attr("r", 5)
      .style("fill", "black")

  }
}

/**
* Parse data into a list of objects that can be used by d3 to draw simulation
*
* @param  object  data  an object containing the information of the simulation
*                       returned by the server in the following format:
*                       { sequences:[], energy: [], conformation: [], time: []}
* @return list          a list of object in the following format:
*                       {energy: 123, time: 123, conformation: "...",
*                       state: [
*                           { nucleic_acid: A, strand_num: 0, index: 0,
*                             comp_strand_num: 1, comp_index: 5 },
*                           ...
*                       ]}
*/
function parseData(data) {
  var arr = [];

  for (var i = 0; i < data.conformation.length; i++) {
    var snapshot = {}
    snapshot.conformation = data.conformation[i]
    snapshot.state = parseDotParen(snapshot.conformation, data.sequences)
    snapshot.energy = data.energy[i];
    snapshot.time = Math.round(data.time[i] * 1000000000) // Convert to nanosecond
    arr.push(snapshot);
  }

  console.log(arr)
  return arr;
}


/**
* Parse a dot-parenthesis representation to a list of objects that is easier
* to be used to draw the simulation with d3.
*
* @param  string  dotParen  a dot-paranthesis representation of the secondary
*                           structures of multiple DNA strands, concatenated
*                           using "+" character.
* @param  list    sequences a list of strings containing the neocleic acid
*                           sequences of each strand; must be in the same order
*                           as the strands in dotParen
* @return list              A list of objects in the following fommat:
*                           { nucleic_acid: A, strand_num: 0, index: 0,
*                             comp_strand_num: 1, comp_index: 5 }
*/
function parseDotParen(dotParen, sequences) {
  // NOTE:  This function currently only handles very simple dot-paren notations,
  //        i.e. dot-paran that only includes ".", "(", ")", and "+".

  var conformations = dotParen.split(/[/+ ]/);        // Split by "+" or space
  var state = [];
  var stack = [];
  var id = 0;

  for (var i = 0; i < conformations.length; i++) {
    var conformation = conformations[i];
    var strand_state = []

    for (var j = 0; j < conformation.length; j++) {
      var note = conformation[j];
      var na_state = {}                               // nucleic_acid state

      // The dot-paren conformation for every the other strand is reversed.
      na_state.index = i % 2 == 0 ? j : conformation.length - j - 1;
      na_state.strand_num = i;
      na_state.nucleic_acid = sequences[i][na_state.index];
      na_state.id = id + na_state.index;

      if (note == "(") {
        stack.push(na_state);
      } else if (note == ")") {
        var comp_na = stack.pop();
        na_state.comp_id = comp_na.id;
        comp_na.comp_id = na_state.id;
        // na_state.comp_strand_num = comp_na.strand_num;
        // na_state.comp_index = comp_na.index;
        // comp_na.comp_strand_num = na_state.strand_num;
        // comp_na.comp_index = na_state.index;
      }
      // strand_state.push(na_state);
      state.push(na_state)
    }
    id += conformation.length;
  }

  // Sort by id
  state.sort((a, b) => a.id - b.id)
  return state;
}

export default SDSimulation;
