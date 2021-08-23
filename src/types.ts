export interface Store {
    apps?: App[]
    alarms?: Alarm[]
    memos?: Memo[]
}

export interface App {
    path: string
    name: string
}

export interface Alarm {
    meridiem: string
    hour : string
    minute : string
}

export interface Memo {
    content: string
}

