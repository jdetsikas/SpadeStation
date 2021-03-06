import React, { useState, useEffect } from 'react'
import './Home.css'

function Home(props) {
	return (
		<div id='home'>

			<div className='welcome'>
				<h1>Welcome to SPADE STATION!</h1>
				<h1>We've Got Games On Deck!</h1>
			</div>

			<div id="slideshow">
				<div className="slide-wrapper">
					<div className="slide">
						<div className="slide-img">
							<img src ="/icons/banner1.jpg" alt="banner1"/>
						</div>
					</div>
					<div className="slide"><div className="slide-img"><img src ="/icons/banner2.jpg" alt="banner2"/></div></div>
					<div className="slide"><div className="slide-img"><img src ="/icons/banner3.jpg" alt="banner3"/></div></div>
					<div className="slide"><div className="slide-img"><img src ="/icons/banner4.jpg" alt="banner4"/></div></div>
				</div>
			</div>

			<p className="line">
				<img src ="/icons/action.jpg" alt="action"/>
				<img src ="/icons/rpg.jpg" alt="rpg"/>
				<img src ="/icons/platformer.jpg" alt="paltformer"/>
				<img src ="/icons/strat.jpg" alt="strat"/>   
			</p>

		</div> 
	)
}

export default Home
