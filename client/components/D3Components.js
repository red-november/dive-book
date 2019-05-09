import React from 'react'
import {Donut, Legend, Line, Bar} from 'britecharts-react'
import {ColorMaker} from '../../utilities/d3Utils'

export const CircleChart = ({data}) => {
  const colorSchema = ColorMaker(data)
  console.log('data in D3TEST', data)
  return (
    <div>
      <Donut
        data={data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        colorSchema={colorSchema}
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
  console.log('data in D3TEST', data)
  return (
    <div>
      <Donut
        data={data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        colorSchema={colorSchema}
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
        colorSchema={colorSchema}
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
        colorSchema={colorSchema}
      />
      <Legend data={data} colorSchema={colorSchema} />
    </div>
  )
}
