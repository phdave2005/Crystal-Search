import React, { useState } from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Home from './home/home.js'
import Help from './help/help.js'
import About from './about/about.js'
import HelpIcon from './elements/help-icon/help-icon.js'
import Settings from './settings/user-settings.js'
import SettingsToggle from './elements/settings/settings-toggle.js'
import logo from './logo.svg'
import svgA from './magnified-a.svg'

const App = () => {
    const textMap = {
        en: {
            about: 'About DVP',
            aboutCod: 'About COD'
        },
        es: {
            about: 'Acerca de DVP',
            about: 'Acerca de COD'
        },
        fr: {
            about: 'À propos DVP',
            about: 'À propos COD'
        },
        it: {
            about: 'Di DVP',
            about: 'Di COD'
        }
    };
    const language =  window?.localStorage?.getItem("language-used") || 'en';
    const [state, setState] = useState({
        about: textMap[language].about,
        aboutCod: textMap[language].aboutCod
    });
    
    return (
        <BrowserRouter>
            <div className="App">
                <header className="flex-align-top">
                    <div className="ML4">
                        <h1 className="M0 P0">
                            <span>Crysta<img src={logo} className="App-logo" alt="logo" /><span className="ML-10">Se<img src={svgA} className="svg-a" alt="logo" /><span className="ML-7">r</span>ch</span></span>
                        </h1>
                    </div>
                    <div className="action-container MR4">
                        <HelpIcon />
                        <SettingsToggle />
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <footer className="flex-align-center">
                    <span className="ML4">
                        <a href="https://twitter.com/phdave2005?ref_src=twsrc%5Etfw" target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a>
                    </span>
                    <span>&copy;{new Date().getFullYear()} <a href="https://phdave.com" target="_blank" rel="noreferrer">PhDave LLC</a></span>
                    <span>
                        <a href="https://www.crystallography.net/cod/" target="_blank">{state.aboutCod}</a>
                    </span>
                    <span className="MR4">
                        <Link id="about" to="/about">{state.about}</Link>
                    </span>
                </footer>
            </div>
        </BrowserRouter>
    );
};

export default App;
