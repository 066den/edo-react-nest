import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import docReducer from "./docReducer";
import userReducer from "./userReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  user: userReducer,
  doc: docReducer,
  app: appReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
