import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import store from "../src/store/index"
import { addReview } from "../src/actions/index"

window.store = store;
window.addArticle = addReview;


ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>
    ,document.getElementById('root')
    );
