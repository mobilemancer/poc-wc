export declare function defineElementDeco(): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        newProperty: string;
        hello: string;
    };
} & T;
export declare function defineClass(): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        newProperty: string;
        hello: string;
    };
} & T;
export declare const CustomElement: () => (cls: any) => void;