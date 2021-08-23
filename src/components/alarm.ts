import cem from '../custom-event';
export default class Alarm {
    constructor() {
        cem.subscribe('statechange',((e: CustomEvent) => {
            if(e.detail.path !== '/alarm') return;
            this.render();
        })as EventListenerOrEventListenerObject)
    }

    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `
            <div>
                Alarm
            </div>
        `
    }
}