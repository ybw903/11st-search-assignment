import cem from '../custom-event';
export default class Home {
    constructor() {
        cem.subscribe('statechange',((e: CustomEvent) => {
            if(e.detail.path !== '/') return;
            this.render();
        })as EventListenerOrEventListenerObject)
    }
    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `
            <div>
                Home
            </div>
        `
    }
}