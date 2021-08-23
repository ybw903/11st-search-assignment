import cem from '../custom-event';
export default class Photo {
    constructor() {
        cem.subscribe('storeupdated',((e: CustomEvent) => {
            if(e.detail.path !== '/photo') return;
            this.render();
        })as EventListenerOrEventListenerObject)
    }
    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `
            <div>
                Photo
            </div>
        `
    }
}