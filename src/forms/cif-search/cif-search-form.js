import './cif-search-form.css'
import '../form.css'
import LabelElement from '../../elements/label/label-element.js'
import TEXT_MAP from './translation-map.js'

function CifSearchForm(props) {
    const textUsed = TEXT_MAP[props.language];
    return (
        <section id="cif-search-section" className={props.class}>
            <div className="flex-field">
                <input id="cif" className="field" type="text" data-validations="cif" data-search-category="payload" />
                <LabelElement labelFor={'cif'} text={textUsed.labels.cifSearch} tooltip={false} />
            </div>
        </section>
    );
}

export default CifSearchForm;
