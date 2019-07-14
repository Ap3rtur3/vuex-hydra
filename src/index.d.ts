
export function $hydrate(config?: HydrateInterface): void;

export interface HydrateInterface {
    data?: HydrateData;
    id?: string;
    name?: string;
    ignoreUndefined?: boolean;
    silent?: boolean;
}

export interface HydrateData {
    root?: StoreState;
    [moduleName: string]: StoreState;
}

export interface StoreState {
    [key: string]: any;
}
