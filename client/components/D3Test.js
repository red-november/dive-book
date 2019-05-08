import React from 'react'
import {Donut, Legend} from 'britecharts-react'

export const CircleChart = ({data}) => {
  const colorSchema = [
    '#ccf7f6',
    '#70e4e0',
    '#00d8d2',
    '#00acaf',
    '#007f8c',
    '#005e66',
    '#003c3f',
    '#002d2f',
    '#0d2223'
  ]
  console.log('data in D3TEST', data)
  return (
    <div>
      <Donut
        data={data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        colorSchema={colorSchema}
      />
      <Legend data={data} colorSchema={colorSchema} />
    </div>
  )
}
