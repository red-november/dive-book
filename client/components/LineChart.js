import React from 'react'
import {Line, Tooltip} from 'britecharts-react'

export const LineChart = ({data}) => {
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
  return (
    <div>
      <Line
        dataByTopic={data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        colorSchema={colorSchema}
      />
      <Tooltip dataByTopic={data} colorSchema={colorSchema} />
    </div>
  )
}
