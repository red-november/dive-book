import React from 'react'
import {Line, Tooltip} from 'britecharts-react'

export const LineChart = ({data}) => {
  const margin = {
    top: 60,
    right: 30,
    bottom: 60,
    left: 70
  }
  const renderLine = props => (
    <Line margin={margin} lineCurve="basis" {...props} />
  )

  ;<Tooltip
    data={lineData.oneSet()}
    render={renderLine}
    topicLabel="topics"
    title="Tooltip Title"
  />
  //   return (
  //     <div>
  //       <Line
  //         dataByTopic={data}
  //         lineCurve="basis"
  //         margin={{top: 60, bottom: 30, left: 70, right: 30}}
  //         colorSchema={colorSchema}
  //         // {...props}
  //       />
  //       <Tooltip
  //         data={data}
  //         // render={renderLine}
  //         topicLabel="topics"
  //         title="Tooltip Title"
  //         colorSchema={colorSchema}
  //       />
  //     </div>
}
