import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login.js'
import AdminIndex from './AdminIndex'

function Main(props){
    return (
        <>
            <Router>
                <Route path='/' exact component={Login} />
                <Route path="/index/" exact component={AdminIndex} />
            </Router>
        </>
    )
}

export  default Main