import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
        <nav>
          <Link to="/project1/index">project1</Link>
          <Link to="/project2/index">project2</Link>
          <Link to="/home/index">home</Link>
        </nav>
        home 主页
      </div>
    )
  }
}
