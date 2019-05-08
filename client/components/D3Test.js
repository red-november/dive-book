import React from 'react'
import {Donut, Legend} from 'britecharts-react'
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
