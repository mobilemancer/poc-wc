class ReactiveBase extends HTMLElement {
    constructor() {
        super();
        this.state = {};
    }

    setState(newState) {
        Object.entries(newState)
            .forEach(([key, value]) => {
                this.state[key] = this.isObject(this.state[key]) &&
                    this.isObject(value) ? { ...this.state[key], ...value } : value;
            });
    }

}