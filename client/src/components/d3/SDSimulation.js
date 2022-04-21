import React from "react";
import * as d3 from "d3";
import { sliderTop } from "d3-simple-slider";
import uuid from 'react-uuid'

import { useD3 } from '../../hooks/useD3';

function SDSimulation(props) {

  // Parse data
  const data = parseData(props.data);

  // An uuid to make each simulation className unique
  // so that multiple simulation can be rendered on the same page
  const simId = props.id ?? uuid()

  // const simulationRef = useD3((svg) => drawSimulation(svg, data, simId), [data]);
  // const engeryPlotRef = useD3((svg) => drawEnergyPlot(svg, data, simId), [data]);
  // const sliderRef = useD3((svg) => drawController(svg, data, simId), [data]);

  const simulationRef = useD3((svg) => {
    const { simSize, setSimState } = drawSimulation(svg, data, simId);

    const plotTranslate = {x: 0, y:simSize.height}
    const { plotSize, setPlotState } = drawEnergyPlot(svg, data, simId, plotTranslate);

    const set_state = function(state) {
      setSimState(state)
      setPlotState(state)
    }

    const sliderTranslate = {x:0, y:simSize.height + plotSize.height}
    drawController(svg, data, simId, sliderTranslate, set_state);
  }, [data])


  return (
    <div id={"SDSimulation-" + simId}>
      <svg
        ref={simulationRef}
        title={"SDSimulation-" + simId}
        style={{
          height: 1000,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g id={"naSimulation-" + simId}>
          <g className={"bp_links-" + simId} />
          <g className={"bb_links-" + simId} />
          <g className={"nodes-" + simId} />
        </g>

        <g id={"energyPlot-" + simId}>
          <g className={"plot-dots-" + simId} />
          <g className={"plot-line-" + simId} />
          <g className={"x-axis-" + simId} />
          <g className={"y-axis-" + simId} />
        </g >

        <g id={"slider-" + simId}>
          <g className={"slider-" + simId} />
        </g >
      </svg>
    </div>
  )
}

function drawController(svg, data, id, translate, callback) {
  const metadata = data.metadata;
  const snapshots = data.snapshots;

  if (metadata.strands.length == 0) return;

  // Constants
  const sliderSize = {
    width: 1000
  }

  // contruct the slider
  const slider = sliderTop()
    .min(0)
    .max(snapshots.length - 1)
    .step(1)
    // .tickValues()
    .width(sliderSize.width)
    .on("end", i => callback(i))

  if(translate != null) {
    svg.select("#slider-" + id)
      .attr("transform", `translate(${translate.x}, ${translate.y})`)
  }
  svg.select(".slider-" + id)
    .attr("transform", "translate(10, 50)")
    .call(slider);
}
/**
* Draw a scatter plot of energy vs time using data onto svg
*/
function drawEnergyPlot(svg, data, id, translate) {
  // Constants
  const snapshots = data.snapshots;
  const metadata = data.metadata;

  const size = { height: 300, width: 1000 }

  if (metadata.strands.length == 0) {
    return {
      plotSize: size,
      setPlotState: function() { }
    }
  }

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const stroke_width = 1;
  const axis_text_size = 10;

  const x_scale = d3
    .scaleLinear()
    .domain([0, d3.max(snapshots, d => d.time)]).nice()
    .rangeRound([margin.left + stroke_width, size.width - margin.right])

  const y_scale = d3
    .scaleLinear()
    .domain([d3.min(snapshots, d => d.energy), d3.max(snapshots, d => d.energy)]).nice()
    .rangeRound([size.height - margin.bottom, margin.top])

  const x_axis = (g) => g
    .attr("transform", `translate(0, ${size.height - margin.bottom})`)
    .call(d3.axisBottom(x_scale))
    .append('text')
    .attr('text-anchor', 'end')
    .attr('fill', 'black')
    .attr('font-size', axis_text_size)
    .attr('font-weight', 'bold')
    .attr('x', size.width - margin.right)
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

  if(translate != null) {
    svg.select("#energyPlot-" + id)
      .attr("transform", `translate(${translate.x}, ${translate.y})`)
  }

  svg.select(".x-axis-" + id).call(x_axis);
  svg.select(".y-axis-" + id).call(y_axis);

  svg.select(".plot-dots-" + id)
    .selectAll(".dot")
    .data(snapshots, d => d.time) // Use time as key since they are unique
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d => x_scale(d.time))
    .attr("cy", d => y_scale(d.energy))
    .attr("r", 5)
    .style("fill", "black")

  svg
    .select(".plot-line-" + id)
    .append("path")
    .datum(snapshots)
    .attr("class", "line")
    .attr("d", d3.line()
      .x(d => x_scale(d.time))
      .y(d => y_scale(d.energy))
      .curve(d3.curveMonotoneX))
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", 2)

  return {
    plotSize: size,
    setPlotState: function() { }
  }

}

/**
* Draw a strand displacement simulation using data onto svg
*/
function drawSimulation(svg, data, id) {

  // Constants
  const metadata = data.metadata;
  const snapshots = data.snapshots;
  const size = { height: 300, width: 1000 }

  if (metadata.strands.length == 0) {
    return {
      simSize: size,
      setSimState: function() { }
    }
  }

  const na_radius = 12
  const na_fontSize = 15
  const na_dist = 30
  const bb_width = 4
  const bp_width = 2

  const color = d3.scaleOrdinal(d3.schemePastel2)


  // // Construct the slider
  // const slider = sliderTop()
  //   .min(0)
  //   .max(snapshots.length - 1)
  //   .step(1)
  //   // .tickValues()
  //   .width(width)
  //   .on("end", i => set_state(i))
  //
  // svg.select(".slider-" + id)
  //   .attr("transform", "translate(10, 50)")
  //   .call(slider);

  // var nodes = map(snapshots.state, d => d.na_name);
  var nodes = snapshots[0].state.map(d => {
    return { name: d.na_name, id: d.id, strand_id: d.strand_id }
  });

  var links = get_links(0)

  var simulation = d3.forceSimulation(nodes)
    .force('repellance', d3.forceManyBody().strength(-100))
    // .force('center', d3.forceCenter().x(width / 2).y(height / 2))
    .force('link', d3.forceLink().links(links).distance(na_dist).strength(1))
    // .force('bb_link', d3.forceLink().links(filter_links("bb_link")).distance(na_dist).strength(1))
    // .force('bp_link', d3.forceLink().links(filter_links("bp_link")).distance(na_dist).strength(0.8))
    .force('collision', d3.forceCollide().radius(na_radius).strength(0.3))
    .force('forceX', d3.forceX().x(size.width / 2))
    .force('forceY', d3.forceY().y(size.height / 2))
    // .force("boundary", d3.forceRadial().radius(250).x(width / 2).y(height / 2).strength(0.05))
    .on('tick', ticked);



  function get_links(i) {
    var bp_links = snapshots[i].state
      .filter(d => d.bp_link != undefined)
      .map(d => {
        return { source: d.id, target: d.bp_link, type: "bp_link", strand_id: d.strand_id }
      })

    var bb_links = snapshots[i].state
      .filter(d => d.bb_link != undefined)
      .map(d => {
        return { source: d.id, target: d.bb_link, type: "bb_link", strand_id: d.strand_id }

      });

    return bp_links.concat(bb_links);

  }

  function filter_links(type) {
    return links.filter(d => d.type == type)
  }

  // Callback of force simulation
  function ticked() {

    // Base pair links
    var bp_links = svg.select('.bp_links-' + id)
      .selectAll('line')
      .data(filter_links("bp_link"))
    bp_links
      .enter()
      .append('line')

    bp_links
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .style("stroke", "red")
      .style("stroke-width", bp_width)
      .style("stroke-dasharray", "2, 2, 2")

    bp_links
      .exit()
      .remove();

    // Backbone links
    var bb_links = svg.select('.bb_links-' + id)
      .selectAll('line')
      .data(filter_links("bb_link"))

    bb_links
      .enter()
      .append("line")

    bb_links
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .style("stroke-width", bb_width)
      .style("stroke", d => color(d.strand_id))

    bb_links
      .exit()
      .remove()

    // Nodes
    svg.select('.nodes-' + id)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('cx', d => d.x = Math.max(na_radius, Math.min(size.width - na_radius, d.x)))
      .attr('cy', d => d.y = Math.max(na_radius, Math.min(size.width - na_radius, d.y)))
      .attr('r', na_radius)
      .style('fill', d => color(d.strand_id))

    // Node texts
    svg.select('.nodes-' + id)
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.name)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('dy', () => 5)
      .style("font-size", na_fontSize)
      .style("fill", "white")
      .style("text-anchor", "middle")
  }

  // Call back by slider when a new state is set
  function setState(i) {
    links = get_links(i)
    simulation.force("link").links(links)
    simulation.alpha(0.05).restart()
  }

  return {
    simSize: size,
    setSimState: setState
  }


}



/**
* Parse strand displacement data into an object that can be used to draw the
* force-directed graph simulation with d3.
*
* @param  object  data  an object containing the information of the simulation
*                       returned by the server in the following format:
*                       {
*                         sequences:[],
*                         energy: [],
*                         conformation: [],
*                         time: []
*                       }
*
* @return list          An object that contains all the information needed
*                       for d3 to draw force-directed simulation of the
*                       strand dislacement. An arbitrary example of such object
*                       is demonstrated below:
*                       {
*                         metadata: {
*                           strands []              // The sequences of all strands
*                         },
*                         snapshots: [
*                           {
*                             time: 123,            // Time of this snapshot
*                             energy: 123,          // The free enegery of this snapshot
*                             conformation: "...",  // The dot-paren conformation of this snapshot
*                             state: []             // An array returned by parseDotParen
*                           },
*                           ...
*                         ]
*                       }
*/
function parseData(data) {
  var res = {};
  res.metadata = {
    strands: data.strands.map(d => d.sequence)
  }
  res.snapshots = [];

  for (var i = 0; i < data.conformation.length; i++) {
    var snapshot = {}
    snapshot.conformation = data.conformation[i];
    snapshot.state = parseDotParen(snapshot.conformation, data.strands);
    // console.log(parseDotParen2(snapshot.conformation, data.strands));
    snapshot.energy = data.energy[i];
    snapshot.time = Math.round(data.time[i] * 1000000000); // Convert to nanosecond
    res.snapshots.push(snapshot);
  }

  console.log(res)
  return res;
}


/**
* Parse a simple dot-parenthesis representation (single or multiple strands)
* to a list of objects that is easier to be used to draw the force-directed
* graph simulation with d3.
*
* @param  string  dotParen  A dot-paranthesis representation of the secondary
*                           structures of one or more DNA strands, concatenated
*                           using "+" character (if binds through H-bond )
*                           or a space (if no binding).
*
* @param  list    sequences A list of strings containing the neocleic acid
*                           sequences of each strand; must be in the same length
*                           and length as the strands in dotParen
*
* @return pair              A list containing all many useful information
*                           for d3 to draw the simulation using force-directed
*                           graph. An arbitrary example of one element in such
*                           list is demonstrated below:
*                           {
*                             id: 0,        // Unique id of the nucleic acid (na)
*                             na_name: "A", // Type of the na
*                             strand_id: 0, // To which strand this na belongs to
*                             na_id: 0,     // The index of this na in its strand
*                             bb_link: 1,   // The id of the na which this na binds to through backbone
*                             bp_link: 11   // The id of the na which this na binds to through H-bond
*                           }
*
*/
function parseDotParen(dotParen, strands) {
  // NOTE:  This function currently only handles very simple dot-paren notations,
  //        i.e. dot-paran that only includes ".", "(", ")", and "+".

  var conformations = dotParen.split(/[/+ ]/);     // Split strands by "+" and space
  var states = [];
  var stack = [];
  var id = 0;

  for (var i = 0; i < conformations.length; i++) {
    var conformation = conformations[i];

    for (var j = 0; j < conformation.length; j++) {
      var note = conformation[j];
      var na_state = {}                            // nucleic_acid state

      // The dot-paren conformation for every the other strand is reversed.
      na_state.na_id = i % 2 == 0 ? j : conformation.length - j - 1;
      na_state.strand_id = i;
      na_state.na_name = strands[i].sequence[na_state.na_id];
      na_state.id = id + na_state.na_id;

      if (na_state.na_id < conformation.length - 1) {
        na_state.bb_link = na_state.id + 1;      // Backbone link
      }

      if (note == "(") {                        // Base pair link
        stack.push(na_state);
      } else if (note == ")") {
        var comp_na = stack.pop();
        na_state.bp_link = comp_na.id;
        comp_na.bp_link = na_state.id;
      }

      states.push(na_state);
    }
    id += conformation.length;
  }

  // Sort by id
  states.sort((a, b) => a.id - b.id);
  return states;
}


export default SDSimulation;
