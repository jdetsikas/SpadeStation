import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { Home, Landing } from './components/site_layout'
import { AuthForm, UserAccount } from './components/user'
import { Games, GameDetails } from './components/games'

function Routes(props) {
  const { user, setUser, cartGames, setCartGames } = props
  
  return (
    <Switch>
      <Route path='/login' render={ (props) => <AuthForm type='login' {...props} setUser={setUser}/> }/>
      <Route path='/signup' render={ (props) => <AuthForm type='register' {...props} setUser={setUser}/> }/>
      <Route path='/account' render={ (props) => <UserAccount {...props} user={user} setUser={setUser}/> }/>

      <Route path='/games/:gameId' render={ (props) => <GameDetails {...props} setCartGames={setCartGames}/> }/>
      <Route path='/games' render={ (props) => <Games {...props} /> }/>
      
      <Route path='/landing' component={Landing}/>
      <Route path='/' component={Home}/>
    </Switch> )
}

export default withRouter(Routes)
