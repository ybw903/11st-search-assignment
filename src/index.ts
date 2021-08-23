import Router from "./router";
import cem from "./custom-event";
import Model from "./model";
import './style.css';

new Router();
new Model();
cem.fire(
    'statechange',
    history.state ?? {
        path: '/',
        isReplace: true
    }
)
