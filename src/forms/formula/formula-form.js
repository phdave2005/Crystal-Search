import './formula-form.css'
import '../form.css'
import LabelElement from '../../elements/label/label-element.js'
import PERIODIC_TABLE_DATA from '../../constants/periodic-table.js'
import TEXT_MAP from './translation-map.js'

function createElementsDropdown(language) {
    const families = PERIODIC_TABLE_DATA.ELEMENT_FAMILIES[language];
    const len = families.length
    let opts = [],
        i = 0,
        generateOptions = (familyIndex) => {
            const elements = PERIODIC_TABLE_DATA.ELEMENTS[language];
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
			<LabelElement labelFor={'formula'} language={props.language} text={textUsed.labels.chemicalFormula} tooltip={'chemicalFormula'} />
		</div>
		<div className="flex-field">
			<select id="elements-present" className="field" multiple size="9" data-search-category="payload" data-validations="elementPresentAbsentContradiction">
				<option value="">{textUsed.selectDefault}</option>
				{createElementsDropdown(props.language)}
			</select>
			<LabelElement labelFor={'elements-present'} language={props.language} text={textUsed.labels.elementsPresent} tooltip={'multiselectTips'} />
		</div>
		<div className="flex-field">
			<select id="elements-absent" className="field" multiple size="9" data-search-category="payload">
				<option value="">{textUsed.selectDefault}</option>
				{createElementsDropdown(props.language)}
			</select>
			<LabelElement labelFor={'elements-absent'} language={props.language} text={textUsed.labels.elementsAbsent} tooltip={'multiselectTips'} />
		</div>
		<div className="flex-field-half-wrapper MT32">
			<div className="flex-field half">
				<input id="strictmin" className="field" type="number" min="1" step="1" data-validations="positiveInteger,minCannotExceedMax" data-search-category="payload" />
				<LabelElement labelFor={'strictmin'} text={textUsed.labels.minimumDistinct} tooltip={false} />
			</div>
			<div className="flex-field half">
				<input id="strictmax" className="field" type="number" min="1" step="1" data-validations="positiveInteger" data-search-category="payload" />
				<LabelElement labelFor={'strictmax'} text={textUsed.labels.maximumDistinct} tooltip={false} />
			</div>
		</div>
		</section>
	);
}

export default FormulaForm;
