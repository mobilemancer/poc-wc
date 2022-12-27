import style from "./style.css";

export class ReactiveBase extends HTMLElement {
  public state: any;
  constructor() {
    super();
    this.state = {};
    console.log(style);
  }

  setState(newState: Object) {
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] =
        this.isObject(this.state[key]) && this.isObject(value)
          ? { ...this.state[key], ...value }
          : value;
    });
  }
  isObject(value: any) {
    return true;
  }
}
