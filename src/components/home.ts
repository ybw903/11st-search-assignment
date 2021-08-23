import cem from '../custom-event';
export default class Home {
    constructor() {
        cem.subscribe('storeupdated',((e: CustomEvent) => {
            if(e.detail.path !== '/') return;
            this.render();
            const home = document.querySelector('.home') as HTMLElement;
            home?.addEventListener('click', this.clickEventHandler.bind(this));
            
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
        const a = target.closest('a');
        if(!a) 
            return;
        const path = this.getPathFromLink(a);
        cem.fire('statechange', Object.assign({},history.state, {path}));
    }

    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `
            <div class="home">
                Home
                <div>
                    <a href="/alarm">알람</a>
                    <a href="/memo">메모</a>
                    <a href="/photo">사진</a>
                </div>
            </div>
        `
    }
}