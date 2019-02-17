import * as redux from "redux";
import thunk from 'redux-thunk';

import MapReducer from 'MapReducer';

export const configure = (initialState = {}) => {
	const reducer = redux.combineReducers({
		MapReducer
	});

	const store = redux.createStore(
		reducer,
		initialState,
		redux.compose(
			redux.applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	return store;
};
