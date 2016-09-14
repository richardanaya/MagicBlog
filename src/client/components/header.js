import React, { Component } from 'react'

import { Router, Route, Link } from 'react-router'
export default function(props){
  return (<div><Link to={'/'}>Home</Link> <Link to={'/post'}>Create</Link></div>)
}
