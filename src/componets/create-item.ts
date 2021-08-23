import cem from '../custom-event';
export default class CreateItem {

    isClosing: boolean = false;
    path: string|undefined;

    constructor() {
        cem.subscribe('iteminputcreate',((e:CustomEvent) => {
            if(!document.querySelector('.input')) {
                this.setAttributes(e.detail.path)
                this.render();
                const input =  document.querySelector('.input');
                input?.addEventListener('click',(this.clickEventHandler.bind(this)) as EventListenerOrEventListenerObject);
                input?.addEventListener('keyup',(this.keyupEventHandler.bind(this)) as EventListenerOrEventListenerObject);
            }
        }) as EventListenerOrEventListenerObject)
    }

    setAttributes(path: string) {
        this.path = path;
    }

    getInputValue(selector: string) {
        const el = document.querySelector(selector) as HTMLInputElement
        return el.value;
    }

    createMemoInput() {
        const memoInput = document.createElement('div');
        memoInput.classList.add('input');
        memoInput.innerHTML = `
            <input class='memo-input' type='text' placeholder='메모를 입력하세요.' name='memo' value=''/>
        `
        return memoInput;
    }

    createAlarmInput() {
        const newAlarm = document.createElement('div');
        newAlarm.classList.add('input');
        newAlarm.innerHTML = `
                <select id="meridiem">
                    <option value="오전">오전</option>
                    <option value="오후">오후</option>
                </select>
                <select id="hour">
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                시
                <select id="minute">
                    <option value="00">00</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
                분
                <button class='save'>저장</button>
        `
        return newAlarm;
    }

    clickEventHandler(e:MouseEvent) {
        e.preventDefault();

        const {target} = e;
        if(!(target instanceof HTMLElement)) return;
        if(target.className !== 'save') return;
        
        const itemData = {
            meridiem: this.getInputValue('#meridiem'),
            hour: this.getInputValue('#hour'),
            minute: this.getInputValue('#minute')
        }
        this.closeInput();
        cem.fire('itemcreate',{
            itemData,
            path: this.path
        })
    }

    keyupEventHandler(e: KeyboardEvent) {
        const {target} = e;
        if(!(target instanceof HTMLElement)) return;
        if(target.className !== 'memo-input' || e.key !== 'Enter') return;

        const itemData = {
            content: this.getInputValue('.memo-input')
        }
        this.closeInput();
        cem.fire('itemcreate', {
            itemData,
            path: this.path
        })
            
    }

    closeInput() {
        if(this.isClosing) return;
        this.isClosing = true;
        const input = document.querySelector('.input') as HTMLLIElement;
        this.isClosing = false;
        input.remove();
    }

    render() {
        const content = document.querySelector('.content') as HTMLElement;
        const input = this.path === '/alarm'? this.createAlarmInput():this.createMemoInput();
        content.insertBefore(input,content.firstChild);
    }
}