const d3 = require('d3')

const GraphifyDiscoverer = (
  canvas,
  data,
  dimensions,
  margin,
  axisIntervals,

) => {
  const minimum = 1
  const axisLabelSpace = 60
  const barPadding = 4
  const max = dimensions - margin * 2
  const barWidth = (max - axisLabelSpace) / data.length - barPadding
  const xStart = margin + axisLabelSpace
  const yStart = dimensions - margin
  let high = 0
  let xAxisValues = []

  data.forEach(elem => {
    if (elem.height > high) {
      high = elem.height
    }
  })

  high = Math.ceil(high/10) * 10

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
    .attr('y', yStart - max - 0)
    .attr('font-family', 'sans-serif')
    .text(`Discoverer - Unique Observations`)

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
  switch(category) {
    case 'flora':
      data[0].height = data[0].height + 1;
      break;
    case 'mollusks':
      data[1].height = data[1].height + 1;
      break;
    case 'fish':
      data[2].height = data[2].height + 1;
      break;
    case 'coral':
      data[3].height = data[3].height + 1;
      break;
    case 'mammals':
      data[4].height = data[4].height + 1;
      break;
    case 'other living things':
      data[5].height = data[5].height + 1;
      break;
    case 'sponges':
      data[6].height = data[6].height + 1;
      break;
    case 'inanimate objects':
      data[7].height = data[7].height + 1;
      break;
    default:
      break;
  }
  console.log("TYPE ---> ",category)
  console.log("DATA ---> ",data)
  return data
}

module.exports = {GraphifyDiscoverer, FillDiscoverer}
