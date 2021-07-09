import React, { useState, useEffect } from 'react'

function Home(props) {
  return (
    <div className='Home'>
      <script src="/konami.js"></script>
      <h1>Welcome to Spades Shopper!</h1>
      <h2>We've got games on deck!</h2>
      <div id="slideshow">
  <div className="slide-wrapper">
    <div className="slide"><div className="slide-img"><img src ="/icons/banner1.jpg" alt="banner1"/></div></div>
    <div className="slide"><div className="slide-img"><img src ="/icons/banner2.jpg" alt="banner2"/></div></div>
    <div className="slide"><div className="slide-img"><img src ="/icons/banner3.jpg" alt="banner3"/></div></div>
    <div className="slide"><div className="slide-img"><img src ="/icons/banner4.jpg" alt="banner4"/></div></div>
    <div className="slide"><div className="slide-img">5</div></div>
  </div>
</div>

<p className="line1">
    <img src ="/icons/action.jpg" alt="action"/>
    <img src ="/icons/rpg.jpg" alt="rpg"/>
    <img src ="/icons/platformer.jpg" alt="paltformer"/>
    <img src ="/icons/strat.jpg" alt="strat"/>   
</p>
      
    </div> );
}

export default Home
