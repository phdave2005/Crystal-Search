import './additional-form.css'
import '../form.css'
import LabelElement from '../../elements/label/label-element.js'
import TEXT_MAP from './translation-map.js'

function AdditionalForm(props) {
  const textUsed = TEXT_MAP[props.language];
  return (
    <section id="additional-section" className={props.class} data-testid="additional">
      <div className="flex-field-half-wrapper MT32">
        <div className="flex-field half">
          <input id="has_fobs" className="field" type="checkbox" data-search-category="payload" />
          <LabelElement labelFor={'has_fobs'} text={textUsed.labels.fobs} tooltip={false} />
        </div>
        <div className="flex-field half">
          <input id="include_duplicates" className="field" type="checkbox" data-search-category="payload" />
          <LabelElement labelFor={'include_duplicates'} text={textUsed.labels.duplicates} tooltip={false} />
        </div>
      </div>
      <div className="flex-field-half-wrapper">
        <div className="flex-field half">
          <input id="include_errors" className="field" type="checkbox" data-search-category="payload" />
          <LabelElement labelFor={'include_errors'} text={textUsed.labels.errors} tooltip={false} />
        </div>
        <div className="flex-field half">
          <input id="include_theoretical" className="field" type="checkbox" data-search-category="payload" />
          <LabelElement labelFor={'include_theoretical'} text={textUsed.labels.theoretical} tooltip={false} />
        </div>
      </div>
      <div className="flex-field">
        <input id="metadata" className="field" type="text" data-search-category="payload" />
        <LabelElement labelFor={'metadata'} text={textUsed.labels.metadata} tooltip={false} />
      </div>
    </section>
  );
}

export default AdditionalForm;