import Alarm from './components/alarm';
import CreateItem from './components/create-item';
import Header from './components/header';
import Home from './components/home';
import Memo from './components/memo';
import Photo from './components/photo';
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