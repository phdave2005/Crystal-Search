import './filters-form.css'
import '../form.css'
import LabelElement from '../../elements/label/label-element.js'
import NAMED_COLORS from '../../constants/named-colors.js'
import RADIATION_TYPES from '../../constants/radiation-types.js'
import TEXT_MAP from './translation-map.js'

function createOptions(src, prepend) {
	let options = [],
		i = 0,
		len = src.length;
	for(; i < len; i++) {
		options.push(<option key={prepend + i} value={src[i]}>{src[i]}</option>);
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
					<LabelElement labelFor={'is-disordered'} text={textUsed.fieldset.simple.disordered} />
				</div>
				<div className="flex-field half">
					<input id="is-mineral" className="field" type="checkbox" data-search-category="filters" data-filter="mineral" />
					<LabelElement labelFor={'is-mineral'} text={textUsed.fieldset.simple.mineral} />
				</div>
			</div>
			<div className="flex-field-half-wrapper">
				<div className="flex-field half">
					<input id="is-powder-diffraction" className="field" type="checkbox" data-search-category="filters" data-filter="method" />
					<LabelElement labelFor={'is-powder-diffraction'} text={textUsed.fieldset.simple.powderDiffraction} />
				</div>
				<div className="flex-field half">
					<input id="uses-pressure" className="field" type="checkbox" data-search-category="filters" data-filter="diffrpressure" />
					<LabelElement labelFor={'uses-pressure'} text={textUsed.fieldset.simple.pressure} />
				</div>
			</div>
			<div className="flex-field">
				<input id="title-keyword" className="field" type="text" data-search-category="filters" data-filter="title" />
				<LabelElement labelFor={'title-keyword'} text={textUsed.fieldset.simple.title} />
			</div>
			<div className="flex-field">
				<input id="commonname-keyword" className="field" type="text" data-search-category="filters" data-filter="commonname" />
				<LabelElement labelFor={'commonname-keyword'} text={textUsed.fieldset.simple.commonName} />
			</div>
			<div className="flex-field">
				<input id="chemicalname-keyword" className="field" type="text" data-search-category="filters" data-filter="chemname" />
				<LabelElement labelFor={'chemicalname-keyword'} text={textUsed.fieldset.simple.chemicalName} />
			</div>
			<div className="flex-field">
			<select id="radtype-keyword" className="field" data-search-category="filters" data-filter="radtype">
				<option value="">{textUsed.selectDefault}</option>
				{createOptions(RADIATION_TYPES, 'rt')}
			</select>
			<LabelElement labelFor={'radtype-keyword'} text={textUsed.fieldset.simple.radType} />
			</div>
		</fieldset>
		<fieldset className="MT32">
			<legend>{textUsed.legend.advanced}</legend>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="min-date" className="field" type="date" data-validations="dateCannotExceedToday,minDateCannotExceedMaxDate" data-search-category="filters" data-filter="mindate" />
					<LabelElement labelFor={'min-date'} text={textUsed.fieldset.advanced.minDate} />
				</div>
				<div className="flex-field half">
					<input id="max-date" className="field" type="date" data-validations="dateCannotExceedToday" data-search-category="filters" data-filter="maxdate" />
					<LabelElement labelFor={'max-date'} text={textUsed.fieldset.advanced.maxDate} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="min-density" className="field" type="number" min="0" step="0.1" data-validations="positiveNumber,minCannotExceedMax" data-search-category="filters" data-filter="mindensity" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'min-density'} text={textUsed.fieldset.advanced.minDensity} />
				</div>
				<div className="flex-field half">
					<input id="max-density" className="field" type="number" min="0" step="0.1" data-validations="positiveNumber" data-search-category="filters" data-filter="maxdensity" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'max-density'} text={textUsed.fieldset.advanced.maxDensity} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
			<div className="flex-field half">
				<input id="min-molecular-weight" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="filters" data-filter="minmolwt" onKeyUp={handleNumberChange} />
				<LabelElement labelFor={'min-molecular-weight'} text={textUsed.fieldset.advanced.minWeight} />
			</div>
			<div className="flex-field half">
				<input id="max-molecular-weight" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="filters" data-filter="maxmolwt" onKeyUp={handleNumberChange} />
				<LabelElement labelFor={'max-molecular-weight'} text={textUsed.fieldset.advanced.maxWeight} />
			</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="min-rfactor" className="field" type="number" min="0" step="0.1" data-validations="positiveNumber,minCannotExceedMax" data-search-category="filters" data-filter="minrfactor" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'min-rfactor'} text={textUsed.fieldset.advanced.minR} />
				</div>
				<div className="flex-field half">
					<input id="max-rfactor" className="field" type="number" min="0" step="0.1" data-validations="positiveNumber" data-search-category="filters" data-filter="maxrfactor" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'max-rfactor'} text={textUsed.fieldset.advanced.maxR} />
				</div>
			</div>
			<div className="flex-field MT32">
			<select id="crystal-color" className="field" data-search-category="filters" data-filter="crystalcolor">
				<option value="">{textUsed.selectDefault}</option>
				{createOptions(NAMED_COLORS, 'nc')}
			</select>
			<LabelElement labelFor={'crystal-color'} text={textUsed.fieldset.advanced.crystalColor} />
			</div>
		</fieldset>
		</section>
	);
}

export default FiltersForm;
