import { Alarm } from '@/types';
import cem from '../../custom-event';
import './style.css';
export default class AlarmView {

    alarms: Alarm[] = [];

    constructor() {
        cem.subscribe('storeupdated',((e: CustomEvent) => {
            if(e.detail.path !== '/alarm') return;
            this.setAttributes(e.detail.store.alarms);
            this.render();

            const alarm = document.querySelector('.alarm') as HTMLElement;
            alarm.addEventListener('click', (this.clickEventHandler.bind(this)) as EventListenerOrEventListenerObject);
        })as EventListenerOrEventListenerObject)
    }

    setAttributes(alarms:Alarm[]) {
        this.alarms = alarms;
    }

    createAlarmCard(alarm:Alarm,idx:number) {
        return `
            <div class = 'alarm-card' data-alarm-id='${idx}'>
                <span>${alarm.meridiem} ${alarm.hour}시 ${alarm.minute}분 </span>
                <button class = 'delete-button'>삭제</button>
            </div>
        `
    }

    clickEventHandler(e:MouseEvent) {
        e.preventDefault();

        const {target} = e;
        if(!(target instanceof HTMLElement)) return;
        this.deleteButtonClickHandler(e,target);
    }

    deleteButtonClickHandler(e:MouseEvent,target:HTMLElement) {
        const alarmCard = target.closest('.delete-button');
        if(!alarmCard) return;
        e.stopImmediatePropagation();

        const itemIdx = (alarmCard as HTMLElement).dataset.alarmId;
        cem.fire('itemdelete',{
            itemIdx,
            path: history.state.path
        })
    }

    render() {
        const content = document.querySelector('.content') as HTMLElement;
        content.innerHTML = `
            <div class = 'alarm'>
                ${this.alarms.reduce(
                    (a,b,i) => a+ this.createAlarmCard(b,i),
                    ''
                )}
            </div>
        `
    }
}