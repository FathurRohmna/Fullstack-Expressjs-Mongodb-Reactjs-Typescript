/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSageMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'

import createRootReducer from './root-reducer'
import rootSaga from './root-saga'

export const history = createBrowserHistory()
const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSageMiddleware()

const configureStore = () => {
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
      )
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore;