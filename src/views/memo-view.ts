import { Memo } from '@/types';
import cem from '../custom-event';
export default class MemoView {

    memos: Memo[] = [];
    
    constructor() {
        cem.subscribe('storeupdated',((e: CustomEvent) => {
            if(e.detail.path !== '/memo') return;
            this.setAttributes(e.detail.store.memos);
            this.render();
        })as EventListenerOrEventListenerObject)
    }

    setAttributes(memos: Memo[]) {
        this.memos = memos;
    }

    clickEventHandler(e:MouseEvent) {
        e.preventDefault();
        const {target} = e;
        if(!(target instanceof HTMLElement)) return;
        this.cardOpenHandler(target)
    }

    cardOpenHandler(target:HTMLElement) {
        if(target.className!=='memo-card') return;

        const memoContainer = target.closest('.memo');
        if(!memoContainer) return;

        const memos = [...memoContainer.children];
        const opendMemo = memos.filter((memo)=>{return memo.classList.contains('open')} )[0];
        if(opendMemo) {
            opendMemo.classList.toggle('open');
        }
        target.classList.add('open');
    }

    createMemoCard(memo:Memo,i:number) {
        return `
            <div class='memo-card' data-memo-idx=${i}>
                ${memo.content}
            </div>
        `
    }

    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `
            <div class='memo'>
                ${this.memos.reduce(
                    (a,b,i) => a+ this.createMemoCard(b,i),
                    ''
                )}
            </div>
        `
    }
}