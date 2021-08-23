import { Alarm } from "@/types";
import * as localStorage from '../model/local-storage'; 
export default function alarmCheck() {

    const bookingAlarm:Alarm[]  = localStorage.getModel('alarm');

    function getNowTimeStamp() {
        const now = new Date();
        return now.getHours() *60 *60 + now.getMinutes() * 60 + now.getSeconds();
    }

    function isNowAlarm() {
        const alarmCheckIdx =  bookingAlarm.findIndex((alarm) => getTimeStamp(alarm) === getNowTimeStamp())
        if(alarmCheckIdx!==-1) {
            alert('알람시간이 됐습니다.');
            bookingAlarm.splice(alarmCheckIdx,1);
            localStorage.saveModel('alarm', bookingAlarm);
        }
    }

    function getTimeStamp(time: Alarm) {
        const afterNoonAddWeight = time.meridiem === '오후' ? 12 : 0;
        const hour = parseInt(time.hour);
        const minute = parseInt(time.minute);
        return (hour + afterNoonAddWeight) * 60 * 60 + minute * 60;
    }

    isNowAlarm();
}