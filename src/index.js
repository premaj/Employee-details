import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import "./index.css";
import reducer from "./reducers";
import EmployeesIndex from "./components/events_index";
import EmployeesNew from "./components/events_new";
import EmployeesShow from "./components/events_show";
import registerServiceWorker from "./registerServiceWorker";

const enhancer =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/employees/new" component={EmployeesNew} />
          <Route path="/employees/:id" component={EmployeesShow} />
          <Route exact path="/" component={EmployeesIndex} />
          <Route exact path="/employees" component={EmployeesIndex} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
