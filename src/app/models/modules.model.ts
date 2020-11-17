
export interface ModuleType {
    type: string
}

export interface CPU {
    _id: string,
    moduleTypeId: string,
    name: string,
    description: any,
}

export interface Pin {
    no: string;
    name?: string;
    port?: string;
    types?: string[];
    mode?: string;
}

export interface PinValue {
    [value: string]: string
}