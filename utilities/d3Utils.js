const d3 = require('d3')

const GraphifyDiscoverer = (
  canvas,
  data,
  dimensions,
  margin,
  axisIntervals
) => {
  const minimum = 1
  const axisLabelSpace = 60
  const barPadding = 4
  const max = dimensions - margin * 2
  const barWidth = (max - axisLabelSpace) / data.length - barPadding
  const xStart = margin + axisLabelSpace
  const yStart = dimensions - margin
  const titleMargin = margin / 2
  let high = 0
  let xAxisValues = []

  data.forEach(elem => {
    if (elem.height > high) {
      high = elem.height
    }
  })

  high = Math.ceil(high / 10) * 10

  for (let i = 1; i <= axisIntervals; i++) {
    xAxisValues.push(high * (i / axisIntervals))
  }

  const scaling = d3
    .scaleLinear()
    .domain([0, high])
    .range([1, max])

  const svg = canvas
    .append('svg')
    .attr('width', dimensions)
    .attr('height', dimensions)

  const xaxisline = svg
    .append('line')
    .attr('y1', yStart + 1)
    .attr('y2', yStart + 1)
    .attr('x1', xStart - barPadding)
    .attr('x2', dimensions - margin)
    .attr('stroke-width', 2)
    .attr('stroke', 'black')

  const yaxisline = svg
    .append('line')
    .attr('y1', yStart + 1)
    .attr('y2', yStart - max)
    .attr('x1', xStart - barPadding)
    .attr('x2', xStart - barPadding)
    .attr('stroke-width', 2)
    .attr('stroke', 'black')

  const baseTier = svg
    .append('text')
    .attr('x', xStart - margin)
    .attr('y', yStart + 1)
    .attr('font-family', 'sans-serif')
    .text(`${Math.floor(minimum)}`)

  const title = svg
    .append('text')
    .attr('x', xStart + barWidth * data.length / 3)
    .attr('y', yStart - max - titleMargin)
    .attr('font-family', 'sans-serif')
    .text(`Discoverer - Total Observations`)

  const rect = svg.selectAll('rect')
  const line = svg.selectAll('line.xaxis')
  const text = svg.selectAll('text.xaxis')

  line
    .data(xAxisValues)
    .enter()
    .append('line')
    .attr('y1', (d, i) => yStart - max / axisIntervals * (i + 1))
    .attr('y2', (d, i) => yStart - max / axisIntervals * (i + 1))
    .attr('x1', xStart - barPadding + 1)
    .attr(
      'x2',
      xStart +
        barWidth * data.length +
        barPadding * (data.length - 1) +
        barPadding
    )
    .attr('stroke-width', 2)
    .attr('stroke', 'gray')
    .classed('xaxis')

  text
    .data(xAxisValues)
    .enter()
    .append('text')
    .attr('x', xStart - margin)
    .attr('y', (d, i) => yStart - max * ((i + 1) / axisIntervals))
    .attr('font-family', 'sans-serif')
    .text(d => d)
    .classed('xaxis')

  rect
    .data(data)
    .enter()
    .append('rect')
    .attr('width', barWidth)
    .attr('height', (d, i) => scaling(d.height))
    .attr('fill', (d, i) => d.fill)
    .attr('x', (d, i) => xStart + i * (barWidth + barPadding))
    .attr('y', (d, i) => yStart - scaling(d.height))
}

// eslint-disable-next-line complexity
const FillDiscoverer = (data, category) => {
  switch (category) {
    case 'flora':
      data[0].height = data[0].height + 1
      break
    case 'mollusks':
      data[1].height = data[1].height + 1
      break
    case 'fish':
      data[2].height = data[2].height + 1
      break
    case 'coral':
      data[3].height = data[3].height + 1
      break
    case 'mammals':
      data[4].height = data[4].height + 1
      break
    case 'other living things':
      data[5].height = data[5].height + 1
      break
    case 'sponges':
      data[6].height = data[6].height + 1
      break
    case 'inanimate objects':
      data[7].height = data[7].height + 1
      break
    default:
      break
  }
  return data
}

const ColorMaker = input => {

  let colors = []

  if (input) {
    const growth = (255 - 100) / input.length
    for (let i = 0; i < input.length; i++) {
      colors.push(`rgb(0, ${growth * i + 100}, 230`)
    }
  }

  return colors
}

const TimeStringToFloat = time => {
  let hoursMinutes = time.split(/[.:]/)
  let hours = parseInt(hoursMinutes[0], 10)
  let minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0
  return hours + minutes / 60
}

const Bubbles = (canvas, dataset) => {

    const diameter = 600;

    const bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    // if(dataset.children.length > 0) {

      let svg = canvas
          .append("svg")
          .attr("width", diameter)
          .attr("height", diameter)
          .attr("class", "bubble")

      let defs = svg.append("defs")

      let nodes = d3.hierarchy(dataset)
          .sum(function(d) { return d.Count; });

      let pattern = defs.selectAll('pattern')

      pattern
          .data(dataset.children)
          .enter()
          .append('pattern')
          .attr("id",d => d.Name.replace(/\s/g, ''))
          .attr("height","100%")
          .attr("width","100%")
          .attr("patternContentUnits","objectBoundingBox")
          .append('image')
          .attr("height", "1")
          .attr("width", "1")
          .attr("preserveAspectRatio", "none")
          .attr("xmlns:xlink","http://www.w3.org/1999/xlink")
          .attr("xlink:href",d => (`${d.imageUrl}`))

      let node = svg.selectAll(".node")
          .data(bubble(nodes).descendants())
          .enter()
          .filter(d => !d.children)
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

      node.append("title")
          .text(function(d) {
              return d.Name + ": " + d.Count;
          });

      node.append("circle")
          .attr("r", function(d) {
              return d.r;
          })
          .style("fill","blue")
          .style("fill", d => `url(#${d.data.Name.replace(/\s/g, '')})`)

      node.append("text")
          .attr("dy", ".2em")
          .style("text-anchor", "middle")
          .text(function(d) {
              return d.data.Name;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", function(d){
              return d.r/5;
          })
          .attr("fill", "white");

      node.append("text")
          .attr("dy", "1.3em")
          .style("text-anchor", "middle")
          .text(function(d) {
              return d.data.Count;
          })
          .attr("font-family",  "Gill Sans", "Gill Sans MT")
          .attr("font-size", function(d){
              return d.r/5;
          })
          .attr("fill", "white");

      d3.select(self.frameElement)
          .style("height", diameter + "px");
    // }

  }


  const TestForce = (canvas) => {
    let width = 300, height = 300
    let nodes = [{}, {}, {}, {}, {}]

    let svg = canvas
      .append("svg")
      .attr("width", 600)
      .attr("height", 600)

    let simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked);

      function ticked() {
        var u = d3.select('svg')
          .selectAll('circle')
          .data(nodes)

        u.enter()
          .append('circle')
          .attr('r', 5)
          .merge(u)
          .attr('cx', function(d) {
            return d.x
          })
          .attr('cy', function(d) {
            return d.y
          })

        u.exit().remove()
      }
  }

module.exports = {
  GraphifyDiscoverer,
  FillDiscoverer,
  ColorMaker,
  TimeStringToFloat,
  Bubbles,
  TestForce
}
