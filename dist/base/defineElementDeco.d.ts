export declare function defineElementDeco(): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        newProperty: string;
        hello: string;
    };
} & T;
