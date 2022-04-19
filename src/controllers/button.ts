import { Component, IComponent } from "../component";
import template from "./../views/button.html";
import css from "./../css/button.css";

type obs = typeof Button.observedAttributes[number];
export class Button extends Component<obs> implements IComponent<obs>{
    template: string = template;
    css: string = css;

    static observedAttributes = [
        "disabled"
    ] as const;

    eventListener?: () => void;

    constructor() {
        super();
    }

    static id = "button";

    onDOMReady(): void | Promise<void> {
        const disabled = this.getAttribute("disabled");
        this.disabled = disabled != null ? true : false;
    }

    onDataUpdate(name: obs, oldValue: string, newValue: string): void | Promise<void> {
        switch (name) {
            case "disabled":
                this.disabled = newValue != null ? true : false;
                break;
            default:

                break;
        }
    }

    onMoved(): void | Promise<void> {
    }

    onRemove(): void | Promise<void> {
    }

    afterRemove(): void | Promise<void> {
    }

    public set onClick(v: (() => void) | undefined) {
        if (this.eventListener) this.removeEventListener("click", this.eventListener)
        if (!v) return;
        v = v.bind(this);
        const onClick = () => {
            if (this.disabled) return;
            (v as () => void)();
        }
        this.addEventListener("click", onClick);
        this.eventListener = onClick;
    }

    public get onClick(): (() => void) | undefined {
        return this.eventListener;
    }


    public set disabled(v: boolean) {
        const btn = this.root.querySelector("button");
        btn!.disabled = v;
    }

    public get disabled(): boolean {
        const btn = this.root.querySelector("button");
        return btn!.disabled;
    }
}