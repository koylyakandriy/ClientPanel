import {createStore, combineReducers, compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
	apiKey: "AIzaSyBGm1GLoyWnvJmKsde-Sp5r_PsGktn5cu4",
	authDomain: "client-panel-eeda7.firebaseapp.com",
	databaseURL: "https://client-panel-eeda7.firebaseio.com",
	projectId: "client-panel-eeda7",
	storageBucket: "client-panel-eeda7.appspot.com",
	messagingSenderId: "665971735754",
	appId: "1:665971735754:web:fc661fd8d3a8f542"
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	notify: notifyReducer,
	settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
	// Default settings
	const defaultSettings = {
		disableBalanceOnAdd: true,
		disableBalanceOnEdit: false,
		allowRegistration: false,
	};
	
	// Set to localStorage
	localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

// Create store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
