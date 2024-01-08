import './filters-form.css'
import '../form.css'
import LabelElement from '../../elements/label/label-element.js'
import NAMED_COLORS from '../../constants/named-colors.js'
import RADIATION_TYPES from '../../constants/radiation-types.js'
import TEXT_MAP from './translation-map.js'

function createOptions(src, prepend) {
    const len = src.length;
    let options = [],
        i = 0;
    for(; i < len; i++) {
        options.push(<option key={prepend + i} value={src[i].value}>{src[i].label}</option>);
	}
	return options;
}

function handleNumberChange(evt) {
	if (!evt.target.value) {
		evt.preventDefault();
		evt.target.value = '';
	}
}

function FiltersForm(props) {
	const textUsed = TEXT_MAP[props.language];
	return (
		<section id="filters-section" className={props.class} data-testid="filters">
		<fieldset>
			<legend>{textUsed.legend.simple}</legend>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="is-disordered" className="field" type="checkbox" data-search-category="filters" data-filter="disordered" />
					<LabelElement labelFor={'is-disordered'} text={textUsed.fieldset.simple.disordered} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="is-mineral" className="field" type="checkbox" data-search-category="filters" data-filter="mineral" />
					<LabelElement labelFor={'is-mineral'} text={textUsed.fieldset.simple.mineral} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper">
				<div className="flex-field half">
					<input id="is-powder-diffraction" className="field" type="checkbox" data-search-category="filters" data-filter="method" />
					<LabelElement labelFor={'is-powder-diffraction'} text={textUsed.fieldset.simple.powderDiffraction} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="uses-pressure" className="field" type="checkbox" data-search-category="filters" data-filter="diffrpressure" />
					<LabelElement labelFor={'uses-pressure'} text={textUsed.fieldset.simple.pressure} tooltip={false} />
				</div>
			</div>
			<div className="flex-field">
				<input id="title-keyword" className="field" type="text" data-search-category="filters" data-filter="title" />
				<LabelElement labelFor={'title-keyword'} text={textUsed.fieldset.simple.title} tooltip={false} />
			</div>
			<div className="flex-field">
				<input id="commonname-keyword" className="field" type="text" data-search-category="filters" data-filter="commonname" />
				<LabelElement labelFor={'commonname-keyword'} text={textUsed.fieldset.simple.commonName} tooltip={false} />
			</div>
			<div className="flex-field">
				<input id="chemicalname-keyword" className="field" type="text" data-search-category="filters" data-filter="chemname" />
				<LabelElement labelFor={'chemicalname-keyword'} text={textUsed.fieldset.simple.chemicalName} tooltip={false} />
			</div>
			<div className="flex-field">
			    <select id="radtype-keyword" className="field" data-search-category="filters" data-filter="radtype">
				    <option value="">{textUsed.selectDefault}</option>
				    {createOptions(RADIATION_TYPES[props.language], 'rt')}
			    </select>
			    <LabelElement labelFor={'radtype-keyword'} text={textUsed.fieldset.simple.radType} tooltip={false} />
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="max-search-results" placeholder={textUsed.fieldset.simple.maxSearchResults.placeholder} className="field" type="number" data-validations="positiveInteger" data-search-category="filters" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'max-search-results'} text={textUsed.fieldset.simple.maxSearchResults.label} tooltip={false} />
				</div>
				<div></div>
			</div>
		</fieldset>
		<fieldset className="MT32">
			<legend>{textUsed.legend.advanced}</legend>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="min-date" className="field" type="date" data-validations="dateCannotExceedToday,minDateCannotExceedMaxDate" data-search-category="filters" data-filter="mindate" />
					<LabelElement labelFor={'min-date'} text={textUsed.fieldset.advanced.minDate} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="max-date" className="field" type="date" data-validations="dateCannotExceedToday" data-search-category="filters" data-filter="maxdate" />
					<LabelElement labelFor={'max-date'} text={textUsed.fieldset.advanced.maxDate} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="min-density" className="field" type="number" min="0" step="any" data-validations="positiveNumber,minCannotExceedMax" data-search-category="filters" data-filter="mindensity" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'min-density'} text={textUsed.fieldset.advanced.minDensity} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="max-density" className="field" type="number" min="0" step="any" data-validations="positiveNumber" data-search-category="filters" data-filter="maxdensity" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'max-density'} text={textUsed.fieldset.advanced.maxDensity} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
			<div className="flex-field half">
				<input id="min-molecular-weight" className="field" type="number" min="0" step="any" data-validations="positiveNumber,minCannotExceedMax" data-search-category="filters" data-filter="minmolwt" onKeyUp={handleNumberChange} />
				<LabelElement labelFor={'min-molecular-weight'} text={textUsed.fieldset.advanced.minWeight} tooltip={false} />
			</div>
			<div className="flex-field half">
				<input id="max-molecular-weight" className="field" type="number" min="0" step="any" data-validations="positiveNumber" data-search-category="filters" data-filter="maxmolwt" onKeyUp={handleNumberChange} />
				<LabelElement labelFor={'max-molecular-weight'} text={textUsed.fieldset.advanced.maxWeight} tooltip={false} />
			</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="min-rfactor" className="field" type="number" min="0" step="any" data-validations="positiveNumber,minCannotExceedMax" data-search-category="filters" data-filter="minrfactor" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'min-rfactor'} text={textUsed.fieldset.advanced.minR} />
				</div>
				<div className="flex-field half">
					<input id="max-rfactor" className="field" type="number" min="0" step="any" data-validations="positiveNumber" data-search-category="filters" data-filter="maxrfactor" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'max-rfactor'} text={textUsed.fieldset.advanced.maxR} tooltip={false} />
				</div>
			</div>
			<div className="flex-field MT32">
			<select id="crystal-color" className="field" data-search-category="filters" data-filter="crystalcolor">
				<option value="">{textUsed.selectDefault}</option>
				{createOptions(NAMED_COLORS[props.language], 'nc')}
			</select>
			<LabelElement labelFor={'crystal-color'} text={textUsed.fieldset.advanced.crystalColor} tooltip={false} />
			</div>
		</fieldset>
		</section>
	);
}

export default FiltersForm;
