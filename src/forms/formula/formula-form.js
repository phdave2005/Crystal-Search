import './formula-form.css'
import '../form.css'
import LabelElement from '../../elements/label/label-element.js'
import PERIODIC_TABLE_DATA from '../../constants/periodic-table.js'
import TEXT_MAP from './translation-map.js'

function createElementsDropdown() {
	let opts = [],
		i = 0,
		language = window?.localStorage?.getItem("language-used") || 'en',
		families = PERIODIC_TABLE_DATA.ELEMENT_FAMILIES[language],
		len = families.length,
		generateOptions = (familyIndex) => {
			const elements = PERIODIC_TABLE_DATA.ELEMENTS;
			const elementsLength = elements.length;
			let j = 0,
				options = [];
			for(; j < elementsLength; j++) {
				if (elements[j].family === familyIndex) {
					options.push(<option key={j} value={elements[j].symbol} dangerouslySetInnerHTML={{__html: elements[j].label}}></option>);
				}
			}
			return options;
		};
	for(; i < len; i++) {
		opts.push(<optgroup key={i} label={families[i]}>{generateOptions(i)}</optgroup>);
	}
  return opts;
}

function FormulaForm(props) {
	const textUsed = TEXT_MAP[props.language];
	return (
		<section id="formula-section" className={props.class} data-testid="formula">
		<div className="flex-field">
			<input id="formula" className="field" type="text" data-validations="chemicalFormula" data-search-category="payload" />
			<LabelElement labelFor={'formula'} text={textUsed.labels.chemicalFormula} />
		</div>
		<div className="flex-field">
			<select id="elements-present" className="field" multiple size="9" data-search-category="payload">
				<option value="">{textUsed.selectDefault}</option>
				{createElementsDropdown()}
			</select>
			<LabelElement labelFor={'elements-present'} text={textUsed.labels.elementsPresent} />
		</div>
		<div className="flex-field">
			<select id="elements-absent" className="field" multiple size="9" data-search-category="payload">
				<option value="">{textUsed.selectDefault}</option>
				{createElementsDropdown()}
			</select>
			<LabelElement labelFor={'elements-absent'} text={textUsed.labels.elementsAbsent} />
		</div>
		<div className="flex-field-half-wrapper MT32">
			<div className="flex-field half">
				<input id="strictmin" className="field" type="number" min="1" step="1" data-validations="positiveInteger,minCannotExceedMax" data-search-category="payload" />
				<LabelElement labelFor={'strictmin'} text={textUsed.labels.minimumDistinct} />
			</div>
			<div className="flex-field half">
				<input id="strictmax" className="field" type="number" min="1" step="1" data-validations="positiveInteger" data-search-category="payload" />
				<LabelElement labelFor={'strictmax'} text={textUsed.labels.maximumDistinct} />
			</div>
		</div>
		</section>
	);
}

export default FormulaForm;
