import React, { Component } from 'react'
import './user-settings.css'
import '../App.css';
import LANGUAGE_INFO from './translation-map.js'
import LabelElement from '../elements/label/label-element.js'

class Settings extends Component {
	constructor() {
		super();
		this.languageUsed = 'en';
		this.state = {
			hasStorage: false,
			text: {
				title: '',
				label: {
					languageUsed: '',
					filenameModifier: ''
				},
				button: ''
			},
			view: {
				storage: {
					cl: 'DN',
					text: ''
				},
				nostorage: {
					cl: 'DN',
					text: ''
				}
			}
		}
	}

	componentDidMount() {
		if (this.detectLocalStorage()) {
			this.languageUsed = window.localStorage.getItem("language-used") || 'en';
			this.setSettingsState();
			document.getElementById("language-used").value = this.languageUsed;
			document.getElementById("filename-modifier").value = window.localStorage.getItem("filename-modifier") || '';
		}
	}

	setSettingsState() {
		const textUsed = LANGUAGE_INFO.TEXT_MAP[this.languageUsed];
		this.setState({
			hasStorage: true,
			text: {
				label: {
					languageUsed: textUsed.label.languageUsed,
					filenameModifier: textUsed.label.filenameModifier
				},
				button: textUsed.button
			},
			view: {
				storage: {
					cl: '',
					text: textUsed.heading
				},
				nostorage: {
					cl: 'DN',
					text: textUsed.noStorage
				}
			}
		});
	}

  	detectLocalStorage() {
		if ('hasStorageAccess' in document) {
			return true;
		} else {
			return this.detectLocalStorageLegacy();
		}
	}

	detectLocalStorageLegacy = () => {
		try {
			var value = '1',
				testkey = 'aaa',
				storage = window.localStorage;
			storage.setItem(testkey, value);
			storage.removeItem(testkey);
			return true;
		} catch (e) {
			return false;
		}
	}

	updateLocalStorage = () => {
		const set = document.getElementsByClassName("field");
		const storage = window.localStorage;
		let i, val;
		for(i in set) {
			if (set[i]?.nodeName) {
				val = set[i].value;
				if (set[i].type === 'checkbox') {
					val = set[i].checked ? 1 : 0;
				}
				storage.setItem(set[i].id, val.replace(/\s/g, ''));
				if (set[i].id === 'language-used') {
					this.languageUsed = set[i].value;
					this.setSettingsState();
					let elem = document.getElementById("about");
					if (!!elem) {
						elem.innerHTML = LANGUAGE_INFO.TEXT_MAP[this.languageUsed].about.dvp;
					}
					elem = document.getElementById("about-cod");
					if (!!elem) {
						elem.innerHTML = LANGUAGE_INFO.TEXT_MAP[this.languageUsed].about.cod;
					}
				}
			}
		}
	}

	languageOptions() {
		let options = [],
			i = 0,
			selectedLanguage = window?.localStorage?.getItem("language-used") || 'en',
			src = LANGUAGE_INFO.LANGUAGES[selectedLanguage],
			len = src.length;
		for(; i < len; i++) {
			options.push(<option key={'l' + i} value={src[i].value}>{src[i].label}</option>);
		}
		return options;
	}

	render() {
		return ( 
			<main id="settings">
				<section className="main-wrapper">
					<div className={this.state.view.storage.cl}>
						<h2 dangerouslySetInnerHTML={{__html: this.state.view.storage.text}}></h2>
						<div className="flex-field MT32">
							<select id="language-used" className="field">
								{this.languageOptions()}
							</select>
							<LabelElement labelFor={'language-used'} text={this.state.text.label.languageUsed} tooltip={false} />
						</div>
						<div className="flex-field MT32">
							<input id="filename-modifier" className="field" type="text" />
							<LabelElement labelFor={'filename-modifier'} text={this.state.text.label.filenameModifier} tooltip={'filenameModifier'} />
						</div>
						<button type="button" className="primary" onClick={this.updateLocalStorage}>{this.state.text.button}</button>
					</div>
					<div className={this.state.view.nostorage.cl}>
						<h2 dangerouslySetInnerHTML={{__html: this.state.view.nostorage.text}}></h2>
					</div>
				</section>
			</main>
		);
    }
}

export default Settings;
