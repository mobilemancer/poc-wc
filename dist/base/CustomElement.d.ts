declare function CustomElement(template?: string, style?: string): <T extends new (...args: any[]) => {}>(customElement: T) => any;
export { CustomElement };
