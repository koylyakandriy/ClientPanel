import React from 'react';
import spinner from './spinner.gif';

const spinnerStyle = {
	width: '200px',
	margin: 'auto',
	display: 'block'
};

const Spinner = () => (
	<div>
		<img src={spinner} alt="Loading..." style={spinnerStyle}/>
	</div>
);

export default Spinner;