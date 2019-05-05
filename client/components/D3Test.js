import React from 'react'
import {Donut} from 'britecharts-react'

export const CircleChart = ({data}) => {
  return (
    <Donut data={data} margin={{top: 30, bottom: 30, left: 30, right: 30}} />
  )
}
