
interface HydrateInterface {
    data?: object;
    id?: string;
    name?: string;
    ignoreUndefined?: boolean;
    silent?: boolean;
}

export function $hydrate(config?: HydrateInterface): void;

