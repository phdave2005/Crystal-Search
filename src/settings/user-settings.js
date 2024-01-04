import React, { Component } from 'react'
import './user-settings.css'
import '../App.css';
import LANGUAGE_INFO from './translation-map.js'
import LabelElement from '../elements/label/label-element.js'
import Switch from 'react-switch'

class Settings extends Component {
    constructor() {
        super();
        this.languageUsed = 'en';
        this.state = {
            checked: false,
            hasStorage: false,
            storageEvent: {
                text: '',
                cl: 'DN'
            },
            text: {
                title: '',
                label: {
                    languageUsed: '',
                    filenameModifier: ''
                },
                button: '',
                switch: ''
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
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.detectLocalStorage()) {
            this.languageUsed = window.localStorage.getItem("language-used") || 'en';
            this.setSettingsState();
            document.getElementById("language-used").value = this.languageUsed;
            document.getElementById("filename-modifier").value = window.localStorage.getItem("filename-modifier") || '';
            document.getElementById("cif-mode").value = window.localStorage.getItem("cif-mode") || '0';
        }
    }

    setSettingsState() {
        const textUsed = LANGUAGE_INFO.TEXT_MAP[this.languageUsed];
        this.setState({
            checked: document.getElementById("cif-mode").value === '1',
            hasStorage: true,
            text: {
                label: {
                    languageUsed: textUsed.label.languageUsed,
                    filenameModifier: textUsed.label.filenameModifier
                },
                button: textUsed.button,
                switch: textUsed.switch
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
        const storageJSONInitial = JSON.stringify(storage);
        let i, val, storageJSONFinal,
            textUsed = LANGUAGE_INFO.TEXT_MAP[this.languageUsed];
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
        storageJSONFinal = JSON.stringify(localStorage);
        textUsed = LANGUAGE_INFO.TEXT_MAP[this.languageUsed];
        this.setState({
            storageEvent: (storageJSONInitial !== storageJSONFinal) ? {
                text: textUsed.storageEvent.success,
                cl: ' success'
            } : {
                text: textUsed.storageEvent.fail,
                cl: ' fail'
            }
        });
        setTimeout(() => {
            this.setState({
                storageEvent: (storageJSONInitial !== storageJSONFinal) ? {
                    text: '',
                    cl: ' DN'
                } : {
                    text: '',
                    cl: ' DN'
                }
            });
        }, 5000);
    }

    languageOptions() {
        const src = LANGUAGE_INFO.LANGUAGES[this.languageUsed];
        const len = src.length;
        let options = [],
            i = 0;
        for(; i < len; i++) {
            options.push(<option key={'l' + i} value={src[i].value}>{src[i].label}</option>);
        }
        return options;
    }

    handleChange(checked) {
        this.setState({checked: checked});
        document.getElementById("cif-mode").value = Number(checked).toString();
    }

    render() {
        return ( 
            <main id="settings">
                <section className="main-wrapper">
                    <p className={"dialog " + this.state.storageEvent.cl} data-identifier="info">{this.state.storageEvent.text}</p>
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
                            <LabelElement labelFor={'filename-modifier'} text={this.state.text.label.filenameModifier} language={this.languageUsed} tooltip={'filenameModifier'} />
                        </div>
                        <div className="flex-field MT32">
                            <label>
                                <span>{this.state.text.switch}</span>
                                <input id="cif-mode" type="hidden" className="field" />
                                <Switch onChange={this.handleChange} checked={this.state.checked} className="react-switch" />
                            </label>
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
