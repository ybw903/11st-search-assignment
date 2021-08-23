import cem from '../custom-event';

export default class Header {

    path:string | undefined;

    constructor() {
        this.render();
        cem.subscribe('statechange',((e: CustomEvent) => {
            this.setAttributes(e.detail.path);
            this.backButtonToggle();
            this.newButtonToggle();
        })as EventListenerOrEventListenerObject)
        this.clock();
    }

    setAttributes(path: string) {
        this.path = path;
    }

    clock() {
        this.timer();
        setInterval(this.timer,1000);
    }

    timer() {
        const nowDate = new Date();
        const date = document.querySelector('.date') as HTMLElement;
        date.innerHTML = `
            ${nowDate.getFullYear()}년
            ${nowDate.getMonth()}월 
            ${nowDate.getDate()}일 
            ${nowDate.getHours()}시 
            ${nowDate.getMinutes()}분
            ${nowDate.getSeconds()}초
        `
    }

    backButtonToggle() {
        const backArea = document.querySelector('.back') as HTMLElement;
        backArea.innerHTML = this.path !=='/' 
        ?`
            <button class="back-button">
                BACK
            </button>
        `
        : '';

    }

    newButtonToggle() {
        const newArea = document.querySelector('.new') as HTMLElement;
        newArea.innerHTML = 
            (this.path === '/memo' || this.path ==='/alarm')
            ?`
            <button class="new-button">
                NEW
            </button>
            `
            :'';
    }

    render() {
        const header = document.querySelector('header') as HTMLElement;
        header.innerHTML = `
            <div class = "back"></div>
            <div class='date'></div>
            <div class = "new"></div>
        `
    }
}