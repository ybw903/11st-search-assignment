import cem from '../../custom-event';
import './style.css';
export default class HomeView {
    constructor() {
        cem.subscribe('storeupdated',((e: CustomEvent) => {
            if(e.detail.path !== '/') return;
            this.render();
            const home = document.querySelector('.home') as HTMLElement;
            home.addEventListener('click', this.clickEventHandler.bind(this));
            
        })as EventListenerOrEventListenerObject)
    }

    clickEventHandler(e : MouseEvent): void {
        e.preventDefault();
        const {target} = e;
        if(!(target instanceof HTMLElement))
            return;
        this.appClickHandler(target);
    }

    getPathFromLink(aTag: HTMLElement):string|null {
        const path = aTag.getAttribute('href');
        return path;
    }

    appClickHandler(target: HTMLElement): void {
        const app = target.closest('.app-button')
        if(!app)
            return;

        const a = target.closest('a')??app.firstElementChild as HTMLElement;
        console.log(a);
        const path = this.getPathFromLink(a);
        cem.fire('statechange', Object.assign({},history.state, {path}));
    }

    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `
            <div class="home">
                <div class='app-container'>
                    <div class = 'app-button'> 
                        <a href="/alarm">알람</a>
                    </div>
                    <div class = 'app-button'> 
                        <a href="/memo">메모</a>
                    </div>
                    <div class = 'app-button'> 
                        <a href="/photo">사진</a>
                    </div>
                </div>
            </div>
        `
    }
}