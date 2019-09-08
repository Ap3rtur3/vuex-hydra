
declare function $hydrate(config?: HydrateInterface): void;

export interface StoreState {
    [key: string]: any;
}

export interface HydrateData {
    root?: StoreState;
    [moduleName: string]: StoreState;
}
export interface HydrateInterface {
    data?: HydrateData;
    id?: string;
    name?: string;
    ignoreUndefined?: boolean;
    silent?: boolean;
}

export default $hydrate;
