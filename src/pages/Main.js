import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
<<<<<<< HEAD
import Login from './Login.js'
import AdminIndex from './AdminIndex'

function Main(props){
    return (
        <>
            <Router>
                <Route path='/' exact component={Login} />
=======
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main(){
    return (
        <>
            <Router>
                <Route path='/' exact component={Login}></Route>
>>>>>>> c3219dd2210ad87ef7ec2180b7ec147c57fef36e
                <Route path="/index/" exact component={AdminIndex} />
            </Router>
        </>
    )
}

export  default Main