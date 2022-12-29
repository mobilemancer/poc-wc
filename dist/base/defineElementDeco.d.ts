export declare function defineElementDeco(target: any): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        newProperty: string;
        hello: string;
    };
} & T;
