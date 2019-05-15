import React, {Component} from 'react';
import {TimeStringToFloat, TestForce} from '../../utilities/d3Utils'
import * as d3 from 'd3'


class TestMap extends Component {

  TestTheTest = async () => {
    const canvas = d3.select('.canva')
    await TestForce(canvas)
  }

  render() {
    this.TestTheTest()
    return (
      <div className="canva"/>
   )
  }
}

export default TestMap
