import './journal-form.css'
import '../form.css'
import LabelElement from '../../elements/label/label-element.js'
import TEXT_MAP from './translation-map.js'

function createOptions() {
    const year = new Date().getFullYear();
    let options = [],
        i = 1900;
    for(; i <= year; i++) {
        options.push(<option key={'y' + i} value={i}>{i}</option>);
	}
	return options;
}

function JournalForm(props) {
	const textUsed = TEXT_MAP[props.language];
	return (
		<section id="journal-section" className={props.class} data-testid="journal">
		<div className="flex-field">
			<input id="journal" className="field" type="text" data-search-category="payload" />
			<LabelElement labelFor={'journal'} text={textUsed.labels.journal} tooltip={false} />
		</div>
		<div className="flex-field">
			<select id="year" className="field" data-search-category="payload">
				<option value="">{textUsed.selectDefault}</option>
				{createOptions()}
			</select>
			<LabelElement labelFor={'year'} text={textUsed.labels.year} tooltip={false} />
		</div>
		<div className="flex-field-half-wrapper">
			<div className="flex-field half">
				<input id="volume" className="field" type="number" min="0" step="any" data-search-category="payload" />
				<LabelElement labelFor={'volume'} text={textUsed.labels.volume} tooltip={false} />
			</div>
			<div className="flex-field half">
				<input id="issue" className="field" type="number" min="0" step="any" data-search-category="payload" />
				<LabelElement labelFor={'issue'} text={textUsed.labels.issue} tooltip={false} />
			</div>
		</div>
		<div className="flex-field">
			<input id="doi" className="field" type="text" data-validations="doi" data-search-category="payload" />
			<LabelElement labelFor={'doi'} text={textUsed.labels.doi} tooltip={false} />
		</div>
		</section>
	);
}

export default JournalForm;
