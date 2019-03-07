import React, { Component } from 'react'

console.log('haha111');

export default class FirstPage extends Component {
  constructor (props) {
    super(props)
    console.log("home 主页");
    
    this.state = {}
  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
       project1
      </div>
    )
  }
}
