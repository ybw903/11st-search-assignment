import Router from "./router";
import cem from "./custom-event";
import Model from "./model";
import alarmCheck from './utils/alarm';
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

setInterval(alarmCheck, 1000);

