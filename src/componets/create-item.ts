import cem from '../custom-event';
export default class CreateItem {

    constructor() {
        cem.subscribe('iteminputcreate',((e:CustomEvent) => {
            if(!document.querySelector('.input')) {
                this.render();
            }
        }) as EventListenerOrEventListenerObject)
    }

    render() {
        const content = document.querySelector('.content') as HTMLElement;
        const input = document.createElement('div');
        input.classList.add('input');
        input.innerHTML = 'test';
        content.insertBefore(input, content.firstChild);
    }
}