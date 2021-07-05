import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Home from './components/Home'
import Landing from './components/Landing'

import { AuthForm, UserAccount } from './components/user'
import { Games, Details } from './components/games'

function Routes(props) {
  const { user, setUser } = props
  
  return (
    <Switch>
      <Route path='/login' render={ (props) => <AuthForm type='login' {...props} setUser={setUser}/> }/>
      <Route path='/signup' render={ (props) => <AuthForm type='register' {...props} setUser={setUser}/> }/>
      <Route path='/account' render={ (props) => <UserAccount user={user} setUser={setUser}/> }/>

      <Route path='/games' component={Games}/>
      <Route path='/games/details' component={Details}/>
      
      <Route path='/home' component={Home}/>
      <Route path='/' component={Landing}/>
    </Switch> )
}

export default withRouter(Routes)
