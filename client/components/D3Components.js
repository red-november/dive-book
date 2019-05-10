import React from 'react'
import {Donut, Legend, Line, Bar, StackedArea, Tooltip, withResponsiveness, ResponsiveContainer} from 'britecharts-react'
import {ColorMaker} from '../../utilities/d3Utils'
// const ResponsiveStackedArea = withResponsiveness(StackedArea)

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
const CircleChartObservation = (props) => {
  const colorSchema = ColorMaker(props.data)

  return (
      <Donut
        data={props.data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        colorSchema={colorSchema}
        width="600"
        height="600"
        externalRadius="250"
        isAnimated="true"
      />
  )
}

export const LineChart = (props) => {
  const colorSchema = ColorMaker(props.data.dataByTopic)
  console.log(props.data)
  return (
      <Line
        data={props.data}
        lineCurve="basis"
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        width="700"
        colorSchema={colorSchema}
        isAnimated="true"
        {...props}
      />
  )
}

export const BarChart = ({data}) => {
  const colorSchema = ColorMaker(data)
  return (
    <div>
      <Bar
        data={data}
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        width={600}
        colorSchema={colorSchema}
        isAnimated="true"

      />
    </div>
  )
}

const DepthChart = (props) => {
  const colorSchema = ColorMaker(props.data)
  return (
    <div>
      <StackedArea
        data={props.data}
        margin={{top: 50, bottom: 50, left: 50, right: 50}}
        colorSchema={colorSchema}
        isAnimated="true"
        {...props}
      />
      </div>
  )
}

export const DepthChartWithToolTip = ({data}) => {
  return (
    <Tooltip
      data = {data}
      render = {DepthChart}
      title = "Max Depth"
    />
  )
}

export const LineChartWithToolTip = ({data}) => {
  return (
    <Tooltip
      data = {data}
      render = {LineChart}
      title = "Line Graph"
      topicLabel="topics"
    />
  )
}

export const CircleChartObservationToolTip = ({data}) => {
  return (
    <Tooltip
      data = {data}
      render = {CircleChartObservation}
    />
  )
}
