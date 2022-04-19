import { Component, IComponent } from "../component";
import template from "./../views/switch.html";
import css from "./../css/switch.css";

type obs = typeof Switch.observedAttributes[number];
export class Switch extends Component<obs> implements IComponent<obs>{
    template: string = template;
    css: string = css;

    static observedAttributes = [
        "disabled",
        "status"
    ] as const;

    constructor() {
        super();
    }

    static id = "switch";

    onDOMReady(): void | Promise<void> {
        const disabled = this.getAttribute("disabled");
        this.disabled = disabled != null ?true:false;

        const status = this.getAttribute("status");
        this.status = status == "on";
        
        const input = this.root.querySelector("input");
        input?.addEventListener("change", ()=>{
            const status = this.getAttribute("status");
            if(this.disabled) input.checked = status == "on";
        })
    }

    onDataUpdate(name: obs, oldValue: string, newValue: string): void | Promise<void> {
        switch (name) {
            case "disabled":
                this.disabled = newValue != null ?true:false;
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

    public set disabled(v: boolean) {
    }

    public get disabled(): boolean {
        const disabled = this.getAttribute("disabled");
        return disabled != null ?true:false;
    }

    public set status(v: boolean) {
    }

    public get status(): boolean {
        const status = this.getAttribute("status");
        return status == "on";
    }
}