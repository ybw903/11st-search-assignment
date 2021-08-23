import Router from "./router";
import cem from "./custom-event";
import Model from "./model";

new Router();
new Model();
cem.fire(
    'statechange',
    history.state ?? {
        path: '/',
        isReplace: true
    }
)
