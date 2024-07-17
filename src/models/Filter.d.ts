export type Filter<T> = {
    [K in keyof T]: {
        field: K;
        value: T[K][];
    }
}[keyof T];