import { Store } from '@/types';
import cem from '../custom-event';
import * as localStorage from './local-storage'; 
export default class Model {
    store: Store = {};

    constructor() {
        cem.subscribe('itemcreate', (this.createItem.bind(this)) as EventListenerOrEventListenerObject);
        cem.subscribe('statechange',(this.getModel.bind(this)) as EventListenerOrEventListenerObject);
    }

    getModel(e: CustomEvent) {
        const {path} = e.detail;
        this.store.apps = localStorage.getModel('app');
        this.store.alarms = localStorage.getModel('alarm');
        this.store.memos = localStorage.getModel('memo');
        cem.fire('storeupdated', {store: this.store, path: path});
    }

    createItem(e:CustomEvent) {
        const {itemData, path} = e.detail;

        if(path === '/alarm' &&this.store.alarms) {
            this.store.alarms.push(itemData);
            localStorage.saveModel('alarm', this.store.alarms);
        } 
        else if(path === '/memo' &&this.store.memos){
            this.store.memos.push(itemData);
            localStorage.saveModel('memo', this.store.memos);
        }

        cem.fire('storeupdated',{store: this.store, path: path})
    }
}