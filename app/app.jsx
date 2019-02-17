import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import router from 'router';

const store = require("configureStore").configure();

//App css
require("style-loader!css-loader!sass-loader!applicationStyles");

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById("app")
);
