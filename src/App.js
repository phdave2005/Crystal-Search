import React, { useState } from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Home from './home/home.js'
import Help from './help/help.js'
import About from './about/about.js'
import NotFound from './not-found/not-found.js'
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
            aboutCod: 'Acerca de COD'
        },
        fr: {
            about: 'À propos DVP',
            aboutCod: 'À propos COD'
        },
        it: {
            about: 'Di DVP',
            aboutCod: 'Di COD'
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
                    <Route path="/crystal-search" element={<Home />} />
                    <Route path="/crystal-search/help" element={<Help />} />
                    <Route path="/crystal-search/settings" element={<Settings />} />
                    <Route path="/crystal-search/about" element={<About />} />
                    <Route path="/crystal-search/*" element={<NotFound />} />
                </Routes>
                <footer className="flex-align-center">
                    <span className="ML4">
                        <a href="https://twitter.com/phdave2005?ref_src=twsrc%5Etfw" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a>
                    </span>
                    <span>&copy;{new Date().getFullYear()} <a href="https://phdave.com" target="_blank" rel="noreferrer">PhDave LLC</a></span>
                    <span>
                        <a id="about-cod" href="https://www.crystallography.net/cod/" target="_blank" rel="noreferrer">{state.aboutCod}</a>
                    </span>
                    <span className="MR4">
                        <Link id="about" to="/crystal-search/about">{state.about}</Link>
                    </span>
                </footer>
            </div>
        </BrowserRouter>
    );
};

export default App;
