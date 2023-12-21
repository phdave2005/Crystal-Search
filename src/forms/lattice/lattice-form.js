import React, { useState } from 'react'
import './lattice-form.css'
import '../form.css'
import LabelElement from '../../elements/label/label-element.js'
import SPACE_GROUP_DATA from '../../constants/space-groups.js'
import TEXT_MAP from './translation-map.js'

function createSpaceGroupOptions() {
  	let opts = [],
    	i = 0,
    	lattices = SPACE_GROUP_DATA.BRAVAIS_LATTICES,
    	len = lattices.length,
    	generateOptions = (lattice) => {
      		const spaceGroups = SPACE_GROUP_DATA.SPACE_GROUPS;
      		const spaceGroupLength = spaceGroups.length;
      		let j = 0,
        	options = [];
      	for(; j < spaceGroupLength; j++) {
        	if (spaceGroups[j].lattice === lattice) {
          		options.push(<option key={spaceGroups[j].id} value={spaceGroups[j].spacegroup} dangerouslySetInnerHTML={{__html: spaceGroups[j].label}}></option>);
        	}
      	}
      	return options;
    };
  	for(; i < len; i++) {
    	opts.push(<optgroup key={'sgog' + i} label={lattices[i]}>{generateOptions(lattices[i])}</optgroup>);
  	}
  	return opts;
}

function createNumberOptions() {
  	let opts = [],
    	i = 1,
    	max = SPACE_GROUP_DATA.SPACE_GROUPS.slice(-1)[0].id.replace(/^sg/i, '');
  	for(; i <= max; i++) {
    	opts.push(<option key={'sgn' + i} label={i}>{i}</option>);
  	}
  	return opts;
}

function handleNumberChange(evt) {
	if (!evt.target.value) {
	  evt.preventDefault();
	  evt.target.value = '';
	}
  }

function LatticeForm(props) {
	const [ dropdownState, setDropdownState ] = useState({
		spacegroupClass: 'field',
		spaceGroupNumberClass: 'field'
	});
	const textUsed = TEXT_MAP[props.language];
  	return (
    	<section id="lattice-section" className={props.class} data-testid="lattice">
      		<div className="flex-field">
        		<select id="spacegroup" className={dropdownState.spacegroupClass} data-search-category="payload" onChange={(e) => setDropdownState({spacegroupClass: 'field', spaceGroupNumberClass: !!e.target.value.trim() ? 'field disabled' : 'field'})}>
          			<option value="">{textUsed.selectDefault}</option>
          			{createSpaceGroupOptions()}
        		</select>
        		<LabelElement labelFor={'spacegroup'} text={textUsed.labels.spaceGroup} tooltip={false} />
      		</div>
      		<div className="flex-field">
        		<select id="space-group-number" className={dropdownState.spaceGroupNumberClass} data-search-category="payload" onChange={(e) => setDropdownState({spacegroupClass: !!e.target.value.trim() ? 'field disabled' : 'field', spaceGroupNumberClass: 'field'})}>
          			<option value="">{textUsed.selectDefault}</option>
          			{createNumberOptions()}
        		</select>
        		<LabelElement labelFor={'space-group-number'} text={textUsed.labels.spaceGroupNumber} tooltip={false} />
      		</div>
      		<div className="flex-field-half-wrapper MT32">
        		<div className="flex-field half">
          			<input id="amin" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="payload" onKeyUp={handleNumberChange} />
          			<LabelElement labelFor={'amin'} text={textUsed.labels.minimumLattice + ' <i>a</i> (Å)'} tooltip={false} />
        		</div>
        		<div className="flex-field half">
          			<input id="amax" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="payload" onKeyUp={handleNumberChange} />
          			<LabelElement labelFor={'amax'} text={textUsed.labels.maximumLattice + ' <i>a</i> (Å)'} tooltip={false} />
        		</div>
      		</div>
      		<div className="flex-field-half-wrapper MT32">
        		<div className="flex-field half">
          			<input id="bmin" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="payload" onKeyUp={handleNumberChange} />
          			<LabelElement labelFor={'bmin'} text={textUsed.labels.minimumLattice + ' <i>b</i> (Å)'} tooltip={false} />
        		</div>
        		<div className="flex-field half">
          			<input id="bmax" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="payload" onKeyUp={handleNumberChange} />
          			<LabelElement labelFor={'bmax'} text={textUsed.labels.maximumLattice + ' <i>b</i> (Å)'} tooltip={false} />
        		</div>
      		</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="cmin" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'cmin'} text={textUsed.labels.minimumLattice + ' <i>c</i> (Å)'} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="cmax" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'cmax'} text={textUsed.labels.maximumLattice + ' <i>c</i> (Å)'} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="alpmin" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'alpmin'} text={textUsed.labels.minimumLattice + ' <i>&alpha;</i> (&deg;)'} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="alpmax" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'alpmax'} text={textUsed.labels.maximumLattice + ' <i>&alpha;</i> (&deg;)'} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="betmin" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'betmin'} text={textUsed.labels.minimumLattice + ' <i>&beta;</i> (&deg;)'} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="betmax" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'betmax'} text={textUsed.labels.maximumLattice + ' <i>&beta;</i> (&deg;)'} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="gamin" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'gamin'} text={textUsed.labels.minimumLattice + ' <i>&gamma;</i> (&deg;)'} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="gamax" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'gamax'} text={textUsed.labels.maximumLattice + ' <i>&gamma;</i> (&deg;)'} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="vmin" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'vmin'} text={textUsed.labels.minimumCellVolume + ' (Å<sup>3</sup>)'} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="vmax" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'vmax'} text={textUsed.labels.maximumCellVolume + ' (Å<sup>3</sup>)'} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="minZ" className="field" type="number" min="1" step="1" data-validations="positiveInteger,minCannotExceedMax" data-search-category="payload" />
					<LabelElement labelFor={'minZ'} text={textUsed.labels.minimumZ} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="maxZ" className="field" type="number" min="1" step="1" data-validations="positiveInteger" data-search-category="payload" />
					<LabelElement labelFor={'maxZ'} text={textUsed.labels.maximumZ} tooltip={false} />
				</div>
			</div>
			<div className="flex-field-half-wrapper MT32">
				<div className="flex-field half">
					<input id="minZprime" className="field" type="number" min="0" data-validations="positiveNumber,minCannotExceedMax" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'minZprime'} text={textUsed.labels.minimumZprime} tooltip={false} />
				</div>
				<div className="flex-field half">
					<input id="maxZprime" className="field" type="number" min="0" data-validations="positiveNumber" data-search-category="payload" onKeyUp={handleNumberChange} />
					<LabelElement labelFor={'maxZprime'} text={textUsed.labels.maximumZprime} tooltip={false} />
				</div>
			</div>
    	</section>
  );
}

export default LatticeForm;
