import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import TodoReducer from './reducer';

const logger = createLogger();

export default createStore(
    TodoReducer,
    applyMiddleware(thunk, logger)
);