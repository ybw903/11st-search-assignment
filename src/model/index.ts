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
        const modelName = path.substring(1)||'apps';
        const model = localStorage.getModel(modelName);
        cem.fire('storeupdated', {store: model, path: path});
    }

    createItem(e:CustomEvent) {
        const {itemData, path} = e.detail;
        const modelName = path.substring(1);
        if(path === '/alarm' &&this.store.alarms) {
            this.store.alarms.push(itemData);
            localStorage.saveModel(modelName, this.store.alarms);
        } 
        else if(path === '/moemos' &&this.store.memos){
            this.store.memos.push(itemData);
            localStorage.saveModel(modelName, this.store.memos);
        }
    }
}