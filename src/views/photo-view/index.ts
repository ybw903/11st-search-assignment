import cem from '../../custom-event';
import imgs from '../../images/index';
import './style.css';
export default class PhotoView {
    constructor() {
        cem.subscribe('storeupdated',((e:CustomEvent)=> {
            if(e.detail.path !== '/photo') return;
            this.render();
            const photo =  document.querySelector('.photo') as HTMLElement;
            photo.addEventListener('click', this.clickEventHandler.bind(this));
        }) as EventListenerOrEventListenerObject);
    }

    makeSlider() {
        return `
            <div class='slider'>
                ${imgs.reduce((a,b,i) => {  
                    
                    return a + `
                    <img class="slider-img ${i===0? 'selected':''}" src="${b}" alt="${b}">
                `},'')}
            </div>
        `
    }

    clickEventHandler(e:MouseEvent) {
        e.preventDefault();
        const {target} = e;
        if(!(target instanceof HTMLElement))
            return;
        this.imgSelectHandler(target)
    }

    imgSelectHandler (target: HTMLElement) {

            const sliderImg = target.closest('.slider-img');
            if(!sliderImg) return;

            const curSelectedImg = document.querySelector('.selected');

            const imgWrapper = document.querySelector('.img-wrapper') as HTMLElement;
            const img = imgWrapper.firstElementChild;

            curSelectedImg?.classList.remove('selected');

            sliderImg.classList.add('selected');
            img?.setAttribute('src', sliderImg.getAttribute('src')??''); 
    }


    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML =
        `
            <div class = 'photo'>
                ${this.makeSlider()}
                <div class='img-wrapper'>
                    <img  src="${imgs[0]}" alt="${imgs[0]}"/>
                </div>
            </div>
        `
    }
}