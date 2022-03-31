import React from "react";
import * as d3 from "d3";

import { useD3 } from '../../hooks/useD3';

function SDSimulation(props) {
  const data = parseData(props.data);
  const ref = useD3(
    (svg) => {
      console.log("Drawing Simulation...");
      console.log(data);
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

      svg.select(".sim-area")
        .selectAll(".dot")
        .data(data, d => d.time) // Use time as key since they are unique
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d => x_scale(d.time))
        .attr("cy", d => y_scale(d.energy))
        .attr("r", 5)
        .style("fill", "black")

      svg
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

    }, [data]
  )

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="sim-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  )

}
/**
* Parse data into a list of objects that can be used by d3 to draw simulation
*
* @param  object  data  an object containing the information of the simulation
*                       returned by the server in the following format:
*                       { sequences:[], energy: [], conformation: [], time: []}
* @return list          a list of object in the foloowing format:
*                       {energy: 123, time: 123,
*                       conformation: [
*                           { nucleic_acid: A, strand_num: 0, index: 0,
*                             comp_strand_num: 1, comp_index: 5 },
*                           ...
*                       ]}
*/
function parseData(data) {
  var arr = [];

  for (var i = 0; i < data.conformation.length; i++) {
    var state = {}
    state.binding = parseDotParen(data.conformation[i], data.sequences)
    state.energy = data.energy[i];
    state.time = data.time[i] * 1000; // Convert to ms
    arr.push(state);
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

  // Split by "+" or space
  var conformations = dotParen.split(/[/+ ]/);
  var res = [];
  var stack = [];

  for (var i = 0; i < conformations.length; i++) {
    var conformation = conformations[i];
    var strand_info = []

    for (var j = 0; j < conformation.length; j++) {
      var note = conformation[j];

      var na_info = {}
      na_info.strand_num = i;
      na_info.index = i % 2 == 0 ? j : conformation.length - j - 1;
      na_info.nucleic_acid = sequences[i][na_info.index];

      if (note == "(") {
        stack.push(na_info);
      } else if (note == ")") {
        var comp_na = stack.pop();
        na_info.comp_strand_num = comp_na.strand_num;
        na_info.comp_index = comp_na.index;
        comp_na.comp_strand_num = na_info.strand_num;
        comp_na.comp_index = na_info.index;
      }
      strand_info.push(na_info);
    }
    res.push(strand_info);
  }
  return res;
}

export default SDSimulation;
