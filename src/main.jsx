import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css";
import App from "./App.jsx";
import apiFacade from "./apiFacade.js";
import { BrowserRouter as Router } from "react-router-dom";

const root = document.getElementById('root');
const rootElement = (
    <React.StrictMode>
        <Router>
            <App apiFacade={apiFacade} />
        </Router>
    </React.StrictMode>
);

const rootElementRoot = ReactDOM.createRoot(root);
rootElementRoot.render(rootElement);
