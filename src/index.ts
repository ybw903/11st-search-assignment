import Router from "./router";
import cem from "./custom-event";

new Router();

cem.fire(
    'statechange',
    history.state ?? {
        path: '/',
        isReplace: true
    }
)
