import Alarm from './views/alarm-view';
import CreateItem from './componets/create-item';
import Header from './views/header';
import Home from './views/home-view';
import Memo from './views/memo-view';
import Photo from './views/photo-view';
import cem from './custom-event';
export default class Router {
    constructor() {
        new Header();
        new Home();
        new Alarm();
        new Photo();
        new Memo();
        new CreateItem();

        window.addEventListener('popstate', (event) => {
            if(event.state === null)
                return;
            cem.fire('statechange', event.state);
        });
        
        cem.subscribe('statechange', ((event: CustomEvent) =>
            this.stateChangeHandler({state: event.detail})) as EventListenerOrEventListenerObject
        )
    }

    stateChangeHandler(event?: Record<'state', Record<string, string|number>>) {
        if(!event)
            return;
        if(event.state.isReplace) {
            delete event.state.isReplace;
            history.replaceState(event.state, '', event.state.path as string);
        } else {
            history.pushState(event.state, '', event.state.path as string);
        }
    }

}