import { useState } from "react"
import * as d3 from "d3";
import { sliderBottom } from "d3-simple-slider";
import Switch from "react-switch"
import uuid from 'react-uuid'

import { useD3 } from '../../hooks/useD3';

function SDSimulation(props) {

  // Parse data
  const data = parseData(props.data);

  // uuid allows multiple simulation to be rendered on the same page
  const simId = props.id ?? uuid()

  // Some constants to use
  const naSimConst = {
    size: { height: 300, width: 1000 },
  }

  const energyPlotConst = {
    size: { height: 400, width: 1000 },
    margin: { top: 0, right: 30, bottom: 0, left: 40 },
    translate: { x: 0, y: naSimConst.size.height }
  }

  const sliderCosnt = {
    size: { height: 50, width: energyPlotConst.size.width },
    margin: { top: 0, right: energyPlotConst.margin.right, bottom: 0, left: energyPlotConst.margin.left },
    translate: { x: 0, y: naSimConst.size.height + energyPlotConst.size.height }
  }

  const svgHeight = naSimConst.size.height + energyPlotConst.size.height + sliderCosnt.size.height

  const simulationRef = useD3((svg) => {
    const setSimState = drawSimulation(svg, data, simId, naSimConst);
    const setPlotState = drawEnergyPlot(svg, data, simId, energyPlotConst);

    const setState = function(state) {
      setSimState(state)
      setPlotState(state)
    }

    drawController(svg, data, simId, sliderCosnt, setState);
  }, [data])

  const [educationMode, setEducationMode] = useState(false)
  const toggleEducationMode = function() {
    setEducationMode(!educationMode)
  }


  if (data.message != null) {
    return (
      <div id="SDSimulation">
        <center>
          <h3>{data.message}</h3>
        </center>
      </div>
    )
  }


  return (
    <div id={"SDSimulation-" + simId}>
      <svg
        ref={simulationRef}
        title={"SDSimulation-" + simId}
        style={{
          height: svgHeight,
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
          <g className={"y-axis-" + simId} />
          <g className={"x-axis-" + simId} />
          <g className={"indicator-" + simId} />
        </g >

        <g id={"slider-" + simId}>
          <g className={"slider-" + simId} />
        </g >
      </svg>

      <label style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>

        <span style={{
          marginRight: "5px"
        }}>
          Education Mode
        </span>

        <Switch
          checked={educationMode}
          onChange={toggleEducationMode}
          disabled={true}
          uncheckedIcon=""
          checkedIcon=""
          height={20}
          width={40}
        />
      </label>
    </div >
  )
}

function drawController(svg, data, id, constants, callback) {
  if (data.message != null) return

  const metadata = data.metadata;
  const snapshots = data.snapshots;

  // Constants
  const size = constants.size
  const margin = constants.margin
  const translate = constants.translate

  // contruct the slider
  const slider = sliderBottom()
    .min(0)
    .max(snapshots.length - 1)
    .step(1)
    .width(size.width - margin.left - margin.right)
    .height(size.height - margin.top - margin.bottom)
    .on("end", i => callback(i))

  // Place the slider in the right origin
  svg.select("#slider-" + id)
    .attr("transform", `translate(${translate.x + margin.left}, ${translate.y + margin.top})`)

  svg.select(".slider-" + id)
    .call(slider);
}
/**
* Draw a scatter plot of energy vs time using data onto svg
*/
function drawEnergyPlot(svg, data, id, constants) {
  if (data.message != null) return

  const snapshots = data.snapshots;
  const metadata = data.metadata;

  // Constants
  const size = constants.size
  const margin = constants.margin
  const translate = constants.translate ?? { x: 0, y: 0 }

  const stroke_width = 1;
  const axis_text_size = 10;
  const dots_radius = 5
  const inidcator_radius = 10

  const x_scale = d3
    .scaleLinear()
    .domain([0, snapshots.length - 1])
    .rangeRound([margin.left, size.width - margin.right])

  const y_scale = d3
    .scaleLinear()
    .domain([d3.min(snapshots, d => d.energy), d3.max(snapshots, d => d.energy)]).nice()
    .rangeRound([size.height - margin.bottom, margin.top])

  const x_axis = (g) => g
    .attr("transform", `translate(0, ${size.height - margin.bottom})`)
    // .call(d3.axisBottom(x_scale))
    .append('text')
    .attr('text-anchor', 'end')
    .attr('fill', 'black')
    .attr('font-size', axis_text_size)
    .attr('font-weight', 'bold')
    .attr('x', size.width - margin.right)
    .attr('y', - axis_text_size)
    .text('Time (ms)');

  const y_axis = (g) => g
    .attr("transform", `translate(${margin.left}, 0)`)
    .style("color", "steelblue")
    .call(d3.axisLeft(y_scale))
    .append('text')
    .attr('transform', `translate(${margin.left / 2}, ${margin.top}) rotate(-90)`)
    .attr('text-anchor', 'end')
    .attr('fill', 'black')
    .attr('font-size', axis_text_size)
    .attr('font-weight', 'bold')
    .text('Energy (unit)');

  // Place the plot in the right origin
  svg.select("#energyPlot-" + id)
    .attr("transform", `translate(${translate.x}, ${translate.y})`)

  svg.select(".x-axis-" + id).call(x_axis);
  svg.select(".y-axis-" + id).call(y_axis);

  svg.select(".plot-dots-" + id)
    .selectAll(".dot")
    .data(snapshots, d => d.time) // Use time as key since they are unique
    .join("circle")
    .attr("class", "dot")
    .attr("cx", (_, i) => x_scale(i))
    .attr("cy", d => y_scale(d.energy))
    .attr("r", dots_radius)
    .style("fill", "black")

  svg
    .select(".plot-line-" + id)
    .append("path")
    .datum(snapshots)
    .attr("class", "line")
    .attr("d", d3.line()
      .x((_, i) => x_scale(i))
      .y(d => y_scale(d.energy))
      .curve(d3.curveMonotoneX))
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", 2)

  svg
    .select(".indicator-" + id)
    .selectAll(".circle")
    // .data(snapshots, d => d.time) // Use time as key since they are unique
    .data([0])
    .join("circle")
    .attr("class", "circle")
    // .attr("cx", d => x_scale(d.time))
    // .attr("cy", d => y_scale(d.energy))
    .attr("cx", x_scale(0))
    .attr("cy", y_scale(snapshots[0].energy))
    .attr("r", inidcator_radius)
    .style("fill", "red")

  return function(i) {
    svg.select(".indicator-" + id)
      .selectAll(".circle")
      .attr("cx", x_scale(i))
      .attr("cy", y_scale(snapshots[i].energy))
  }
}

/**
* Draw a strand displacement simulation using data onto svg
*/
function drawSimulation(svg, data, id, constants) {
  if (data.message != null) return

  const metadata = data.metadata;
  const snapshots = data.snapshots;

  // Constants
  const size = constants.size

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
    // Prevent nodes fly outside of the screen
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
  return function(i) {
    links = get_links(i)
    simulation.force("link").links(links)
    simulation.alpha(0.05).restart()
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
  if (data.message != null) return data

  var res = {};
  res.metadata = {
    strands: data.strands
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
      na_state.na_name = strands[i][na_state.na_id];
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
