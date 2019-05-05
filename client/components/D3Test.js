import React from 'react'
import {Donut, Legend} from 'britecharts-react'

export const CircleChart = ({data}) => {
  return (
    <div>
      <Donut
        data={data}
        margin={{top: 30, bottom: 30, left: 30, right: 30}}
        colorSchema={[
          '#ccf7f6',
          '#70e4e0',
          '#00d8d2',
          '#00acaf',
          '#007f8c',
          '#005e66',
          '#003c3f',
          '#002d2f',
          '#0d2223'
        ]}
      />
      <Legend data={data} />
    </div>
  )
}
