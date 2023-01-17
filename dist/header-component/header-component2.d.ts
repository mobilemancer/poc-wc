declare class HeaderComponent2 extends HTMLElement {
    private header;
    private _text;
    get text(): string;
    set text(value: string);
    private _color;
    get color(): string;
    set color(val: string);
    constructor();
}
export default HeaderComponent2;
