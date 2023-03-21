import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

var textBlock = document.createElement('div');
textBlock.contentEditable = true;
textBlock.style.border = '1px solid black';
textBlock.style.padding = '10px';
textBlock.style.margin = '10px';
document.body.appendChild(textBlock);
/* ReactDOM.createRoot(document.getElementById('root')).render( */
var reactRoot = document.createElement('div');
reactRoot.id = 'root';
document.body.appendChild(reactRoot);
/* <React.StrictMode> */
var reactStrictMode = document.createElement('div');
reactStrictMode.innerHTML = '<React.StrictMode>';
reactRoot.appendChild(reactStrictMode);
/* <App /> */
var reactApp = document.createElement('div');
reactApp.innerHTML = '<App />';
reactStrictMode.appendChild(reactApp);
/* </React.StrictMode> */
var reactStrictModeEnd = document.createElement('div');
reactStrictModeEnd.innerHTML = '</React.StrictMode>';
reactRoot.appendChild(reactStrictModeEnd);
/* ) */
var reactRootEnd = document.createElement('div');
reactRootEnd.innerHTML = ')';
document.body.appendChild(reactRootEnd);
