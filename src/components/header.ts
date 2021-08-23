import cem from '../custom-event';

export default class Header {

    path:string | undefined;

    constructor() {
        const header = document.querySelector('header') as HTMLElement;
        header.addEventListener('click', this.clickEventHandler.bind(this));

        this.render();
        this.clock();

        cem.subscribe('storeupdated',((e: CustomEvent) => {
            this.setAttributes(e.detail.path);
            this.backButtonToggle();
            this.newButtonToggle();
        })as EventListenerOrEventListenerObject)

    }

    setAttributes(path: string) {
        this.path = path;
    }

    clickEventHandler(e:MouseEvent) {
        e.preventDefault();
        const {target} = e;
        if(!(target instanceof HTMLElement))
            return;
        this.backButtonClickHandler(target);
        this.newButtonClickHandler(e,target);
    }

    backButtonClickHandler(target: HTMLElement) {
        const backButton = target.closest('.back-button');
        if(!backButton)
            return;
        history.back();
    }

    newButtonClickHandler(e:MouseEvent, target: HTMLElement) {
        const newButton = target.closest('.new-button');
        if(!newButton)
        e.stopImmediatePropagation();
        cem.fire('iteminputcreate',{
            path: this.path
        });
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