import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

import {notifyUser} from '../../actions/notifyAction';
import Alert from '../layout/Alert';

class Register extends Component {
	state = {
		password: '',
		email: '',
	};
	
	componentWillMount() {
		const {settings: {allowRegistration}} = this.props;
		
		if(!allowRegistration) {
			this.props.history.push('/')
		}
	};
	
	
	onSubmit = e => {
		e.preventDefault();
		
		const {firebase, notifyUser} = this.props;
		const {email, password} = this.state;
		
		firebase.createUser({email, password}).catch(err => notifyUser('That User Already Exists', 'error'))
	};
	
	onChange = e => this.setState({[e.target.name]: e.target.value});
	
	render() {
		const {email, password} = this.state;
		const {notify: {message, messageType}} = this.props;
		
		return (
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card">
						<div className="card-body">
							{message ? (<Alert message={message} messageType={messageType}/>) : null}
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary">
									<i className="fas fa-lock"/> {' '}
									Register
								</span>
							</h1>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input type="text"
									       className="form-control"
									       name="email"
									       required
									       value={email}
									       onChange={this.onChange}/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input type="password"
									       className="form-control"
									       name="password"
									       required
									       value={password}
									       onChange={this.onChange}/>
								</div>
								<input type="submit" className="btn btn-primary btn-block" value="Register"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	firebase: PropTypes.object.isRequired,
	notify: PropTypes.object.isRequired,
	notifyUser: PropTypes.func.isRequired,
};

export default compose(
	firestoreConnect(),
	connect((state, props) => ({
		notify: state.notify,
		settings: state.settings,
	}), {notifyUser})
)(Register);