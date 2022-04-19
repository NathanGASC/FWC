import { Component, IComponent } from "../component";
import template from "./../views/loading.html";
import css from "./../css/loading.css";

type obs = typeof Loading.observedAttributes[number];

export class Loading extends Component<obs> implements IComponent<obs>{
    template: string = template;
    css: string = css;

    static observedAttributes = [
        "ms"
    ] as const;

    constructor() {
        super();
    }

    static id = "loading";

    onDOMReady(): void | Promise<void> {
        let ms = this.getAttribute("ms");
        if (ms) {
            this.ms = parseInt(ms);
        }
    }

    onDataUpdate(name: typeof Loading.observedAttributes[number], oldValue: string, newValue: string): void | Promise<void> {
        switch (name) {
            case "ms":
                this.ms = parseInt(newValue);
                break;
            default:
                break;
        }
    }

    onMoved(): void | Promise<void> {
    }

    onRemove(): void | Promise<void> {
    }

    remove(): void {

    }

    afterRemove(): void | Promise<void> {

    }

    reset() {
        this.progressBar.style.transition = 0 + "ms";
        this.progress = 0;
    }

    public set ms(v: number) {
        this.reset();
        this.progressBar.offsetHeight;
        this.progressBar.style.transition = v + "ms";
        this.progress = 100;
    }

    public get progressBar(): HTMLElement {
        return this.root.querySelector("#progress")!;
    }

    public get progress(): number {
        let progress: string | number = window.getComputedStyle(this.progressBar).width;
        progress = parseInt(progress.replace("%", ""));
        return progress;
    }

    public set progress(v: number) {
        this.progressBar.style.width = v + "%";
    }
}