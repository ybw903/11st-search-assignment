import { Memo } from '@/types';
import cem from '../custom-event';
export default class MemoView {

    memos: Memo[] = [];
    
    constructor() {
        cem.subscribe('storeupdated',((e: CustomEvent) => {
            if(e.detail.path !== '/memo') return;
            this.setAttributes(e.detail.store);
            this.render();
        })as EventListenerOrEventListenerObject)
    }

    setAttributes(memos: Memo[]) {
        this.memos = memos;
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