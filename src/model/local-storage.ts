export function getModel(key:string) {
    if(!localStorage.getItem(key))
        return [];
    return JSON.parse(localStorage.getItem(key)??'');
}

export function saveModel(key:string, model:Array<any>) {
    localStorage.setItem(key, JSON.stringify(model));
}