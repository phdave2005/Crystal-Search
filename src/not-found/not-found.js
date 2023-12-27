import React, { Component } from 'react'
import './not-found.css'
import '../App.css'
import logo from '../logo.svg'
import TEXT_MAP from './translation-map.js'

class NotFound extends Component {
  	constructor() {
		super();
		const languageUsed = window?.localStorage?.getItem("language-used") || 'en';
		const textUsed = TEXT_MAP[languageUsed];
		this.state = {
			text: {
				heading: textUsed.heading,
				content: textUsed.content
			}
		}
	}

  	render() {
		return ( 
			<main id="not-found">
				<section className="main-wrapper">
					<img src={logo} className="App-logo" alt="logo" />
					<h1>{this.state.text.heading}</h1>
					<div>
						<h2 dangerouslySetInnerHTML={{__html: '&emsp;' + this.state.text.content}}></h2>
					</div>
				</section>
			</main>
		);
  	}
}

export default NotFound;
