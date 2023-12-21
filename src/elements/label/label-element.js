import { Tooltip } from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './label-element.css'
import TEXT_MAP from './translation-map.js'

function LabelElement(props) {
	const tooltipMap = {
		chemicalFormula: TEXT_MAP[props.language || 'en'].tooltipContent,
		'no-tooltip': ''
	};
	const tooltipId = props.tooltip || 'no-tooltip';
	return (
		<label htmlFor={props.labelFor} data-testid="label"><span className="default-label"><span dangerouslySetInnerHTML={{__html: props.text}}></span><span className={!!props.tooltip ? '' : 'DN'}><FontAwesomeIcon data-tooltip-id={tooltipId} data-tooltip-html={tooltipMap[tooltipId]} data-tooltip-delay-hide="5000" className="ML4" icon={faCircleQuestion} /></span></span><span className="error-label DN"><FontAwesomeIcon icon={faTimes} /><span className="error-label-text ML4"></span></span><Tooltip id={tooltipId} /></label>
	);
}

export default LabelElement;