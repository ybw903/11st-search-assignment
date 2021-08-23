import cem from '../custom-event';
export default class Memo {
    constructor() {
        cem.subscribe('storeupdated',((e: CustomEvent) => {
            if(e.detail.path !== '/memo') return;
            this.render();
        })as EventListenerOrEventListenerObject)
    }
    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `
            <div>
                Memo
            </div>
        `
    }
}