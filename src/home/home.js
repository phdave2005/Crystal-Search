import React, { Component } from 'react'
import axios from 'axios'
import './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdditionalForm from '../forms/additional/additional-form.js'
import FormulaForm from '../forms/formula/formula-form.js'
import LatticeForm from '../forms/lattice/lattice-form.js'
import JournalForm from '../forms/journal/journal-form.js'
import FiltersForm from '../forms/filters/filters-form.js'
import { faArrowsRotate, faAtom, faBook, faCube, faEllipsis, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import PERIODIC_TABLE_DATA from '../constants/periodic-table.js'
import processing from './processing.svg'
import TEXT_MAP from './translation-map.js'

class Home extends Component {
    constructor(props) {
        super(props);
        this.codPath = 'https://www.crystallography.net/cod';
        this.corsDomain = 'https://corsproxy.io';
        this.language = window?.localStorage?.getItem("language-used") || 'en';
        this.textUsed = TEXT_MAP[this.language];
        this.state = {
            download: {
                text: {
                    data: this.textUsed.download.data
                }
            },
            forms: {
                active: 'formula',
                sections: {
                    formula: {
                        show: true,
                        heading: this.textUsed.heading.formula
                    },
                    lattice: {
                        show: false,
                        heading: this.textUsed.heading.lattice
                    },
                    journal: {
                        show: false,
                        heading: this.textUsed.heading.journal,
                    },
                    additional: {
                        show: false,
                        heading: this.textUsed.heading.additional
                    },
                    filters: {
                        show: false,
                        heading: this.textUsed.heading.filters
                    }
                },
                validation: {
                    error: {
                        cl: 'DN invalid',
                        text: ''
                    },
                    processing: {
                        cl: 'DN',
                        text: null
                    }
                }
            }
        };
    }

    search = () => {
        if (!this.isProcessing() && !this.invalidateFormActiveSection()) {
            document.getElementById("parameters-form").getElementsByTagName("BUTTON")[0].click();
        }
    }

    isProcessing = () => {
        const el = document.getElementById("processing-container");
        return !!el && !el.classList.contains("DN");
    };

    processFormSubmission = (e) => {
        e.preventDefault();
        const elements = e.target.elements;
        let i,
            j,
            val,
            ID,
            seedId,
            type,
            category,
            multiselectedOptionsCounter,
            filterData,
            multiselectSeedIdMap = {
                "elements-absent": "nel",
                "elements-present": "el"
            },
            searchData = {
                payload: {},
                filters: {}
            };
        for(i in elements) {
            if (i.match(/^\d+$/) && !!elements[i] && elements[i].nodeName && !!elements[i]?.getAttribute("data-search-category")) {
                val = elements[i]?.value.trim();
                if (val) {
                    if (!!elements[i]?.type) {
                        ID = elements[i].id;
                        category = elements[i].getAttribute("data-search-category");
                        filterData = elements[i].getAttribute("data-filter") || null;
                        type = elements[i].type;
                        if (elements[i].type === 'checkbox') {
                            if (elements[i].checked === false) {
                                val = null;
                            }
                        } else if (elements[i].type === 'select-multiple') {
                            seedId = multiselectSeedIdMap[elements[i].id];
                            multiselectedOptionsCounter = 1;
                            for(j in elements[i].options) {
                                if (elements[i].options[j].selected && !!elements[i].options[j].value) {
                                    searchData[category][seedId + multiselectedOptionsCounter] = {
                                        filterData: filterData,
                                        nodeName: elements[i].nodeName,
                                        type: type,
                                        value: elements[i].options[j].value
                                    };
                                    multiselectedOptionsCounter++;
                                }
                            }
                            if (multiselectedOptionsCounter > 1) continue;
                        }
                        if (val) {
                            searchData[category][ID] = {
                                filter: filterData,
                                nodeName: elements[i].nodeName,
                                type: type,
                                value: val
                            };
                        }
                    }
                }
            }
        }
        if (Object.keys(searchData.payload).length) {
            this.setState(
                Object.assign(
                    this.state.forms,
                    {
                        validation: {
                            error: {
                                cl: 'DN invalid',
                                text: ''
                            },
                            processing: {
                                cl: '',
                                text: null
                            }
                        }
                    }
                )
            );
            this.fetchCIFs(searchData);
        } else{
            this.setState(
                Object.assign(
                    this.state.forms,
                    {
                        validation: {
                            error: {
                                cl: 'invalid',
                                text: this.textUsed.validation.error.oneParameter
                            },
                            processing: {
                                cl: 'DN',
                                text: null
                            }
                        }
                    }
                )
            );
        }
    }

    constructedQueryString(data) {
        const parameters = [];
        let i, parameter, value;
        for(i in data) {
            if (!!data[i]?.value) {
                if (data[i].nodeName.toUpperCase() === 'INPUT') {
                    value = (data[i].type !== 'checkbox') ? data[i].value.trim() : (data[i].value.toUpperCase() === 'ON' ? '1' : '0');
                } else {
                    value = data[i].value;
                }
                parameter = i + '=' + value;
                parameters.push(parameter);
            }
        }
        return parameters.join("&");
    };

    isLocalhost() {
        return document.URL.indexOf("localhost") !== -1;
    }

    fetchCIFs(searchData) {
        const payload = searchData.payload;
        const filters = searchData.filters;
        if (!window.navigator.onLine && this.isLocalhost()) {
            import(`../constants/mock-response.js`)
            .then((response) => {
                const mockResponseData = response.MOCK_RESPONSE_LARGE; // can also use MOCK_RESPONSE_SMALL for testing
                this.processResponse(mockResponseData, filters);
            });
        } else {
            const results = this.codPath + '/result?' + this.constructedQueryString(payload) + '&format=json';
            axios.get(this.corsDomain + '/?' + encodeURIComponent(results))
            .then((response) => {
                if (response?.data?.length) {
                    this.processResponse(response.data, filters);
                } else {
                    this.setState(
                        Object.assign(
                            this.state.forms,
                            {
                                validation: {
                                    error: {
                                        cl: 'invalid',
                                        text: this.textUsed.validation.error.noData
                                    },
                                    processing: {
                                        cl: 'DN',
                                        text: null
                                    }
                                }
                            }
                        )
                    );
                }
            })
            .catch((error) => {
                this.setState(
                    Object.assign(
                        this.state.forms,
                        {
                            validation: {
                                error: {
                                    cl: 'invalid',
                                    text: this.textUsed.validation.error.api
                                },
                                processing: {
                                    cl: 'DN',
                                    text: null
                                }
                            }
                        }
                    )
                );
            });
        }
    }

    processResponse(data, filters) {
        let i,
            j,
            advancedFilterMap = {}, // build this
            simpleFilteredData = [],
            simpleFilterMap = {
                chemname: (d, v) => {
                    return !!d.chemname && d.chemname.toLowerCase().indexOf(v.toLowerCase()) !== -1;
                },
                commonname: (d, v) => {
                    return !!d.commonname && d.commonname.toLowerCase().indexOf(v.toLowerCase()) !== -1;
                },
                diffrpressure: (d, v) => {
                    return !!d.diffrpressure;
                },
                disordered: (d, v) => {
                    return !!d.flags && d.flags.toLowerCase().indexOf("disordered") !== -1;
                },
                method: (d, v) => {
                    return !!d.method;
                },
                mineral: (d, v) => {
                    return !!d.mineral;
                },
                radtype: (d, v) => {
                    return !!d.radtype && d.radtype.toLowerCase().indexOf(v.toLowerCase()) !== -1;
                },
                title: (d, v) => {
                    return !!d.title && d.title.toLowerCase().indexOf(v.toLowerCase()) !== -1;
                }
            };
        // first the simple filters
        for(i in filters) {
            if (simpleFilterMap.hasOwnProperty(filters[i].filter)) {
                simpleFilteredData = [];
                for(j in data) {
                    if (simpleFilterMap[filters[i].filter](data[j], filters[i].value)) {
                        simpleFilteredData.push(data[j]);
                    }
                }
                data = simpleFilteredData;
            } else {// advanced
                advancedFilterMap[filters[i].filter] = filters[i].value;
            }
        }
        if (Object.keys(advancedFilterMap).length) {
            this.processAdvancedFilters(data, advancedFilterMap);
        } else {
            this.downloadData(data);
        }
    }

    async processAdvancedFilters(data, filters) {
        const getCifContents = async (cifId) => {
            const url = this.codPath + '/' + cifId + '.cif';
            return axios.get(this.corsDomain + '/?' + encodeURIComponent(url))
            .then((response) => {
                return this.filterCifContents(response.data, filters) || 'none';
            })
            .catch((error) => {
                return false;
            });
        };
        let i = 0,
            len = data.length,
            penultimate = len - 1,
            filteredData = [],
            cifContents;
        for(; i < len; i++) {
            if (!!data[i].file) {
                cifContents = await getCifContents(data[i].file);
                if (cifContents !== 'none') {
                    filteredData.push(data[i]);
                }
                if (i === penultimate) {
                    this.downloadData(filteredData);
                }
            }
        }
    }

    filterCifContents(cifContents, filters) {
        const filterMap = {
            crystalcolor: {
                allowedIndex: (ind) => {
                    return ind > 15;
                },
                validate: (v, r) => {
                    let valid = false, split;
                    if (!!r && r.match(/^_exptl_crystal_density_diffrn/i)) {
                        split = r.toLowerCase().replace(/'/g).split(" ");
                        valid = split.indexOf(v.toLowerCase()) !== -1;
                    }
                    return valid;
                }
            },
            mindate: {
                allowedIndex: (ind) => {
                    return ind === 1;
                },
                validate: (v, r) => {
                    let valid = false;
                    if (!!r && r.match(/^Date:/i)) {
                        valid = new Date() >= new Date(v);
                    }
                    return valid;
                }
            },
            maxdate: {
                allowedIndex: (ind) => {
                    return ind === 1;
                },
                validate: (v, r) => {
                    return false;
                }
            },
            mindensity: {
                allowedIndex: (ind) => {
                    return ind > 15;
                },
                validate: (v, r) => {
                    let valid = false, split;
                    if (!!r && r.match(/^_exptl_crystal_density_diffrn/i)) {
                        split = r.split(" ");
                        valid = Number(split[split.length - 1].trim()) >=  Number(v);
                    }
                    return valid;
                }
            },
            maxdensity: {
                allowedIndex: (ind) => {
                    return ind > 15;
                },
                validate: (v, r) => {
                    let valid = false, split;
                    if (!!r && r.match(/^_exptl_crystal_density_diffrn/i)) {
                        split = r.split(" ");
                        valid = Number(split[split.length - 1].trim()) <= Number(v);
                    }
                    return valid;
                }
            },
            minmolwt: {
                allowedIndex: (ind) => {
                    return ind > 15;
                },
                validate: (v, r) => {
                    let valid = false, split;
                    if (!!r && r.match(/^_chemical_formula_weight/i)) {
                        split = r.split(" ");
                        valid = Number(split[split.length - 1].trim()) >= Number(v);
                    }
                    return valid;
                }
            },
            maxmolwt: {
                allowedIndex: (ind) => {
                    return ind > 15;
                },
                validate: (v, r) => {
                    let valid = false, split;
                    if (!!r && r.match(/^_chemical_formula_weight/i)) {
                        split = r.split(" ");
                        valid = Number(split[split.length - 1].trim()) <= Number(v);
                    }
                    return valid;
                }
            },
            minrfactor: {
                allowedIndex: (ind) => {
                    return ind > 15;
                },
                validate: (v, r) => {
                    let valid = false, split;
                    if (!!r && r.match(/^_refine_ls_goodness_of_fit_all/i)) {
                        split = r.split(" ");
                        valid = Number(split[split.length - 1].trim()) >= Number(v);
                    }
                    return valid;
                }
            },
            maxrfactor: {
                allowedIndex: (ind) => {
                    return ind > 15;
                },
                validate: (v,r) => {
                    let valid = false, split;
                    if (!!r && r.match(/^_refine_ls_goodness_of_fit_all/i)) {
                        split = r.split(" ");
                        valid = Number(split[split.length - 1].trim()) <= Number(v);
                    }
                    return valid;
                }
            }
        };
        let i,
            j,
            cifContentsArray = cifContents.split("\n"),
            len = cifContentsArray.length,
            validated;
        for (i in filters) {
            validated = false;
            for (j = 0; j < len; j++) {
                if (filterMap[i].allowedIndex(j) && filterMap[i].validate(filters[i], cifContentsArray[j])) {
                    validated = true;
                    break;
                }
            }
            if (!validated) {
                cifContents = null;
                break;
            }
        }
        return cifContents;
    }

    downloadData(data) {
        const date = new Date();
        const str = JSON.stringify(data, undefined, 2);
        const blob = new Blob([str], {
            type: "application/json"
        });
        const downloadLink = document.getElementById("download");
        downloadLink.setAttribute("href", URL.createObjectURL(blob));
        downloadLink.setAttribute("download", this.state.download.text.data + "_" + (window?.localStorage?.getItem("filename-modifier") ? window.localStorage.getItem("filename-modifier") + '_' : '') + date.toISOString().split("T")[0] + "-" + date.getTime() + ".json");
        downloadLink.click();
        setTimeout(() => {
            this.setState(
                Object.assign(
                    this.state.forms,
                    {
                        validation: {
                            error: {
                                cl: 'valid',
                                text: this.textUsed.validation.success.downloaded
                            },
                            processing: {
                                cl: 'DN',
                                text: null
                            }
                        }
                    }
                )
            )
            setTimeout(() => {
                this.setState(
                    Object.assign(
                        this.state.forms,
                        {
                            validation: {
                                error: {
                                    cl: 'DN',
                                    text: ''
                                },
                                processing: {
                                    cl: 'DN',
                                    text: null
                                }
                            }
                        }
                    )
                )
            }, 6000);
        }, 1500);
    }

    isHillNotation(formula) {
        let isHill = true,
            elementMatches,
            p,
            extractedElementSymbol;
        const splitFormula = formula.split(" ");
        const periodicTableData = PERIODIC_TABLE_DATA.ELEMENTS;
        const filteredElementSymbols = [];
        splitFormula.forEach((fragment) => {
            if (!fragment.match(/^[A-Za-z]+(\d+)?$/i)) {
                isHill = false;
            } else {
                extractedElementSymbol = fragment.replace(/\d+$/, '');
                elementMatches = 0;
                for(p in periodicTableData) {
                    if (periodicTableData[p].symbol === extractedElementSymbol) {
                        elementMatches++;
                        break;
                    }
                }
                if (elementMatches === 0) {
                    isHill = false;
                }
                filteredElementSymbols.push(extractedElementSymbol);
            }
        });
        if (isHill && filteredElementSymbols.length) {
            const cIndex = filteredElementSymbols.indexOf("C");
            const hIndex = filteredElementSymbols.indexOf("H");
            const hasC = cIndex !== -1;
            const hasH = hIndex !== -1;
            const hasCH = hasC && hasH;
            const filteredElementSymbolsLength = filteredElementSymbols.length;
            if (hasCH) {
                isHill = (cIndex === 0) && (hIndex === 1);
            } else if (hasC) {
                isHill = cIndex === 0;
            } else {
                isHill = hasH && (hIndex === 0);
            }
            if (isHill && ((hasCH && filteredElementSymbolsLength > 2) || (hasC && filteredElementSymbolsLength > 1) || (hasH && filteredElementSymbolsLength > 1))) {
                if (hasC) filteredElementSymbols.shift();
                if (hasH) filteredElementSymbols.shift();
                const joinedA = filteredElementSymbols.join("");
                filteredElementSymbols.sort();
                const joinedB = filteredElementSymbols.join("");
                isHill = joinedA === joinedB;
            }
        }
        return isHill;
    }

    invalidateFormActiveSection = () => {
        const validate = (f) => {
            const errorLabels = [];
            if (!!f?.value) {
                const validations = f.getAttribute("data-validations");
                let invalid;
                validations.split(",").forEach((validation) => {
                    switch(validation) {
                        case 'chemicalFormula':
                            invalid = !this.isHillNotation(f.value);
                        break;
                        case 'dateCannotExceedToday':
                            invalid = new Date(f.value) > new Date();
                        break;
                        case 'doi':
                            invalid = !f.value.match(/\./) || !f.value.match(/\//) || !f.value.match(/\d/);
                        break;
                        case 'elementPresentAbsentContradiction':
                            const correspondingAbsentId = f.id.replace(/present$/i, 'absent');
                            const absentField = document.getElementById(correspondingAbsentId);console.log(f.value.length, f.options);console.log(absentField.value.length, absentField.options);
                            const multipleOptionIntersection = (optionsSetA, optionsSetB) => {
                                let i;
                                const selectedA = [],
                                    selectedB = [];
                                for(i in optionsSetA) {
                                    if (!!optionsSetA[i]?.selected) {
                                        selectedA.push(optionsSetA[i].value);
                                    }
                                }
                                for(i in optionsSetB) {
                                    if (!!optionsSetB[i]?.selected) {
                                        selectedB.push(optionsSetB[i].value);
                                    }
                                }
                                return selectedB.filter(el => selectedA.includes(el)).length;
                            };
                            invalid = !!absentField && absentField.value.trim() && multipleOptionIntersection(f.options, absentField.options);
                        break;
                        case 'minCannotExceedMax':
                            const correspondingMaximumId = f.id.replace(/min/i, 'max');
                            const maxField = document.getElementById(correspondingMaximumId);
                            invalid = !!maxField && maxField.value.trim() && (Number(maxField.value) < Number(f.value));
                        break;
                        case 'minDateCannotExceedMaxDate':
                            const correspondingMaximumDateId = 'max' + f.id.replace(/^min/i, '');
                            const maxDateField = document.getElementById(correspondingMaximumDateId);
                            invalid = !!maxDateField && maxDateField.value.trim() && (new Date(maxDateField.value) < new Date(f.value));
                        break;
                        case 'positiveInteger':
                            invalid = !f.value.match(/^\d+$/) || (Number(f.value) <= 0);
                        break;
                        default: // 'positiveNumber':
                            invalid = Number(f.value) <= 0;
                        break;
                    }
                    if (invalid) {
                        errorLabels.push(this.textUsed.validation.labels[validation]);
                    }
                });
            }
            return errorLabels;
        };

        let field,
            errorLabels,
            i,
            id,
            validationSection,
            hasError = false;
        const activeSection = document.getElementById("parameters-form").getElementsByClassName("active");
        if (activeSection?.length === 1) {
            validationSection = activeSection[0].querySelectorAll("[data-validations]");
            for(i in validationSection) {
                id = validationSection[i].id;
                field = document.getElementById(validationSection[i].id);
                if (!!field) {
                    errorLabels = validate(field);
                    if (errorLabels?.length) {
                        hasError = true;
                        this.markInvalidField({
                            elem: document.getElementById(id),
                            errorLabel: errorLabels[0]
                        });
                    } else {
                        this.clearInvalidField({
                            elem: document.getElementById(id),
                            errorLabel: ''
                        });
                    }
                }
            }
        }
        if (!hasError) document.getElementById("main-grid-view").scrollTop = 0;
        return hasError;
    }

    markInvalidField(data) {
        let field = data.elem,
            target,
            label;
        if (!!field) {
            target = field;
            while(!target.classList.contains("flex-field")) {
                target = field.parentElement;
            }
            target.classList.add("invalid");
            label = target.getElementsByTagName("LABEL");
            if (!!label) {
                label[0].getElementsByClassName("default-label")[0].classList.add("DN");
                label[0].getElementsByClassName("error-label")[0].classList.remove("DN");
                label[0].getElementsByClassName("error-label-text")[0].innerHTML = data.errorLabel;
            }
        }
    }

    clearInvalidField(data) {
        let field = data.elem,
            target,
            label;
        if (!!field) {
            target = field;
            while(!target.classList.contains("flex-field")) {
                target = field.parentElement;
            }
            target.classList.remove("invalid");
            label = target.getElementsByTagName("LABEL");
            if (!!label) {
                label[0].getElementsByClassName("default-label")[0].classList.remove("DN");
                label[0].getElementsByClassName("error-label")[0].classList.add("DN");
                label[0].getElementsByClassName("error-label-text")[0].innerHTML = data.errorLabel || '';
            }
        }
    }

    render() {
        const processMenuClick = (e) => {
            if (!this.isProcessing() && !this.invalidateFormActiveSection()) {
                e.preventDefault();
                let newFormState = this.state.forms.sections,
                    i;
                for(i in newFormState) {
                    newFormState[i].show = false;
                }
                newFormState[e.currentTarget.dataset.identifier].show = true;
                this.setState({
                    forms: {
                        active: e.currentTarget.dataset.identifier,
                        validation: {
                            error: {
                                cl: 'DN invalid',
                                text: ''
                            },
                            processing: {
                                cl: 'DN',
                                text: null
                            }
                        },
                        sections: newFormState
                    }
                });
            }
        };
        const resetForm = () => {
            if (!this.isProcessing()) {
                const form = document.getElementById("parameters-form");
                const activeSection = form.getElementsByClassName("active");
                if (activeSection?.length === 1) {
                    const fields = activeSection[0].getElementsByClassName("flex-field");
                    let i;
                    for(i in fields) {
                        if (fields[i]?.nodeName) {
                            fields[i].classList.remove("invalid");
                            fields[i].getElementsByClassName("default-label")[0].classList.remove("DN");
                            fields[i].getElementsByClassName("error-label")[0].classList.add("DN");
                            fields[i].getElementsByClassName("error-label-text")[0].innerHTML = '';
                        }
                    }
                }
                form.reset();
            }
        }
        const buttonParameters = [
            { id: 0, text: this.textUsed.menu.button.formula, icon: faAtom, class: 'form', identifier: 'formula', fn: processMenuClick },
            { id: 1, text: this.textUsed.menu.button.lattice, icon: faCube, class: 'form', identifier: 'lattice', fn: processMenuClick },
            { id: 2, text: this.textUsed.menu.button.journal, icon: faBook, class: 'form', identifier: 'journal', fn: processMenuClick },
            { id: 3, text: this.textUsed.menu.button.additional, icon: faEllipsis, class: 'form', identifier: 'additional', fn: processMenuClick },
            { id: 4, text: this.textUsed.menu.button.filters, icon: faFilter, class: 'form', identifier: 'filters', fn: processMenuClick },
            { id: 5, text: this.textUsed.menu.button.reset, icon: faArrowsRotate, class: 'MT40 warning', identifier: 'reset', fn: resetForm },
            { id: 6, text: this.textUsed.menu.button.search, icon: faMagnifyingGlass, class: 'MT40 primary', identifier: 'search', fn: this.search }
        ];
        return (
            <main>
                <div id="main-grid">
                    <div id="main-grid-menu">
                        <h3 className="TAC">{this.textUsed.menu.heading}</h3>
                        <ul>
                        {
                            buttonParameters.map(parameter => {
                                return (
                                    <li key={'navbutton' + parameter.id}>
                                        <button type="button" className={parameter.class} data-identifier={parameter.identifier} data-testid={parameter.identifier + '-button'} onClick={parameter.fn}>
                                            <FontAwesomeIcon icon={parameter.icon} />
                                            <span>{parameter.text}</span>
                                        </button>
                                    </li>
                                );
                            })
                        }
                        </ul>
                    </div>
                    <div id="main-grid-view">
                        <p className={"dialog " + this.state.forms.validation.error.cl} data-identifier="info">{this.state.forms.validation.error.text}</p>
                        <div id="processing-container" className={this.state.forms.validation.processing.cl}>
                            <div>
                                <img className="scale-2" src={processing} alt="processing" data-testid="processing" />
                            </div>
                            <p>{this.textUsed.processing.text}</p>
                        </div>
                        <form id="parameters-form" data-testid="form" onSubmit={this.processFormSubmission}>
                            <h2 className="form-heading">{this.state.forms.sections[this.state.forms.active].heading}</h2>
                            <FormulaForm class={this.state.forms.sections.formula.show ? 'active' : 'DN'} language={this.language} />
                            <LatticeForm class={this.state.forms.sections.lattice.show ? 'active' : 'DN'} language={this.language} />
                            <JournalForm class={this.state.forms.sections.journal.show ? 'active' : 'DN'} language={this.language} />
                            <AdditionalForm class={this.state.forms.sections.additional.show ? 'active' : 'DN'} language={this.language} />
                            <FiltersForm class={this.state.forms.sections.filters.show ? 'active' : 'DN'} language={this.language} />
                            <button type="submit" className="DN"></button>
                        </form>
                        <a href="/" id="download" className="DN">-</a>
                    </div>
                </div>
            </main>
        );
    }
}

export default Home;
