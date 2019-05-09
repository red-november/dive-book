import React from 'react'
import {Donut, Legend, Line, Bar, StackedArea, Tooltip} from 'britecharts-react'
import {ColorMaker} from '../../utilities/d3Utils'

export const CircleChart = ({data}) => {
  const colorSchema = ColorMaker(data)

  return (
    <div className="Chart">
      <Donut
        data={data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        colorSchema={colorSchema}
        width="600"
        height="600"
        externalRadius="250"
        isAnimated="true"
      />
      <Legend
        data={data}
        colorSchema={colorSchema}
        numberFormat=","
        height={data.length * 25}
      />
    </div>
  )
}
export const CircleChartObservation = ({data}) => {
  const colorSchema = ColorMaker(data)

  return (
    <div>
      <Donut
        data={data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        colorSchema={colorSchema}
        width="600"
        height="600"
        externalRadius="250"
        isAnimated="true"
      />
    </div>
  )
}

export const LineChart = ({data}) => {
  const colorSchema = ColorMaker(data.dataByTopic)
  return (
    <div>
      <Line
        data={data}
        lineCurve="basis"
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        width="700"
        colorSchema={colorSchema}
        isAnimated="true"
      />
    </div>
  )
}

export const BarChart = ({data}) => {
  const colorSchema = ColorMaker(data)
  return (
    <div>
      <Bar
        data={data}
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        width={400}
        colorSchema={colorSchema}
        isAnimated="true"
      />
    </div>
  )
}

export const DepthChart = ({data}) => {
  const colorSchema = ColorMaker(data)
  return (
    <div>
      <StackedArea
        data={data}
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        colorSchema={colorSchema}
        isAnimated="true"
      />
      {/* <Tooltip data={data}  /> */}
    </div>
  )
}
