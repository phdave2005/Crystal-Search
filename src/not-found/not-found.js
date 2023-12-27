import React, { Component } from 'react'
import './not-found.css'
import '../App.css'
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
			<main id="about">
				<section className="main-wrapper">
					<h1>{this.state.text.heading}</h1>
					<div>
						<p dangerouslySetInnerHTML={{__html: '&emsp;' + this.state.text.content}}></p>
					</div>
				</section>
			</main>
		);
  	}
}

export default NotFound;
