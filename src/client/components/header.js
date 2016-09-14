import React, { Component } from 'react'

import { Router, Route, Link } from 'react-router'
export default function(props){
  return (<div>Header <Link to={'/post'}>Create</Link></div>)
}
