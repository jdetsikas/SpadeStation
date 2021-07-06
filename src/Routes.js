import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { Home, Landing } from './components/site_layout'
import { AuthForm, UserAccount } from './components/user'
import { Games, GameDetails } from './components/games'

function Routes(props) {
  const { user, setUser } = props
  
  return (
    <Switch>
      <Route path='/login' render={ (props) => <AuthForm type='login' {...props} setUser={setUser}/> }/>
      <Route path='/signup' render={ (props) => <AuthForm type='register' {...props} setUser={setUser}/> }/>
      <Route path='/account' render={ (props) => <UserAccount {...props} user={user} setUser={setUser}/> }/>

      <Route path='/games/:gameId' component={GameDetails}/>
      <Route path='/games' component={Games}/>
      
      <Route path='/home' component={Home}/>
      <Route path='/' component={Landing}/>
    </Switch> )
}

export default withRouter(Routes)
