import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const composeEnchancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk];

export default (initialState) => {
  return createStore(rootReducer,
    initialState,
    composeEnchancers(
      applyMiddleware(...middlewares)
    )
  );
}
