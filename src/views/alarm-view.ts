import cem from '../custom-event';
export default class AlarmView {
    constructor() {
        cem.subscribe('storeupdated',((e: CustomEvent) => {
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