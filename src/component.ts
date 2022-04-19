import { onDOMReady } from "./helpers/DOM";
import cssAll from "./css/all.css";

export interface IComponent<T> {
    template: string;
    css: string;

    /**
     * When DOM is fully loaded
     */
    onDOMReady(): void | Promise<void>;

    /**
     * When data are updated
     */
    onDataUpdate(name: T, oldValue: string, newValue: string): void | Promise<void>

    /**
     * When component is moved in the page
     */
    onMoved(): void | Promise<void>

    /**
     * Call at the same time has remove() function
     */
    onRemove(): void | Promise<void>
}

export class Component<T> extends HTMLElement {
    template?: string;
    css?: string;

    static log: boolean = true;

    static id = "component";

    _this: IComponent<T> = this as unknown as IComponent<T>;
    protected root: ShadowRoot = this.attachShadow({ mode: 'open' });

    removed = false;

    constructor() {
        super();
        if (!(this as any).onDOMReady) throw new Error("Component " + this.constructor.name + " don't implement IComponent");
        if (!(this as any).onDataUpdate) throw new Error("Component " + this.constructor.name + " don't implement IComponent");
        if (!(this as any).onMoved) throw new Error("Component " + this.constructor.name + " don't implement IComponent");
        if (!(this as any).onRemove) throw new Error("Component " + this.constructor.name + " don't implement IComponent");
    }

    static init(htmlLabel: string = "fwc-" + this.id) {
        if(!customElements.get(htmlLabel)){
            customElements.define(htmlLabel, this);
            console.log("[@nathangasc/fwc]:", htmlLabel, "ready to be used")
        }
    }

    hook = {
        beforeOnDOMReady: function () { },
        afterOnDOMReady: function () { },
        beforeRemove: function () { },
        afterRemove: function () { },
    }

    /**
     * Called when the component is displayed & ready
     */
    async connectedCallback(): Promise<void> {
        if (Component.log) console.log(this.constructor.name + " : component connected. Waiting for DOM");

        await onDOMReady()
        if (Component.log) console.log(this.constructor.name + " : global DOM is ready")

        if (Component.log) console.log(this.constructor.name + " : append style & template to the component", { css: this.css, template: this.template })
        this.root.innerHTML = "<style>" + (cssAll + "\n" + this.css || "") + "</style>" + (this.template || "");

        if (Component.log) console.log(this.constructor.name + " : call hook.beforeOnDOMReady")
        this.hook.beforeOnDOMReady();

        if (Component.log) console.log(this.constructor.name + " : call onDOMReady")
        this._this.onDOMReady()

        if (Component.log) console.log(this.constructor.name + " : call hook.afterOnDOMReady")
        this.hook.afterOnDOMReady();
    }

    /**
     * Called when the component is removed from the DOM
     */
    disconnectedCallback(): void | Promise<void> {
        if (Component.log) console.log(this.constructor.name + " : call hook.afterRemove")
        this.hook.afterRemove();
    }

    /**
     * Called when the component is moved in the DOM
     */
    adoptedCallback(): void | Promise<void> {
        if (Component.log) console.log(this.constructor.name + " : call onMoved")
        this._this.onMoved();
    }

    /**
     * Called when a watched attribute is changed
     * @param name of the watched attribute
     * @param oldValue of the watched attribute
     * @param newValue of the watched attribute
     */
    attributeChangedCallback(name: T, oldValue: string, newValue: string): void | Promise<void> {
        if (!this.isConnected) return;
        if (Component.log) console.log(this.constructor.name + " : call onDataUpdate(", name, ",", oldValue, ",", newValue+" )")
        this._this.onDataUpdate(name, oldValue, newValue)
    }

    remove(duration: number = 0) {
        if (this.removed) return;
        this.removed = true;
        if (Component.log) console.log(this.constructor.name + " : call hook.beforeRemove")
        this.hook.beforeRemove()
        const transition = window.getComputedStyle(this).transition;
        const regexS = /[0-9\.].*?s/
        const regexMS = /[0-9\.].*?ms/

        const resultS = regexS.exec(transition);
        const resultMS = regexMS.exec(transition);

        if (resultS) {
            duration = parseFloat(resultS?.at(0)?.replace("s", "")!) * 1000
        } else if (resultMS) {
            duration = parseFloat(resultMS?.at(0)?.replace("s", "")!) * 1000
        }

        setTimeout(() => {
            if (Component.log) console.log(this.constructor.name + " : call onRemove")
            this._this.onRemove();
            super.remove();
        }, duration)
    }
}