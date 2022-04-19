import { Component, IComponent } from "../component";
import template from "./../views/popup.html";
import css from "./../css/popup.css";
import { Loading } from "./loading";

type obs = typeof Popup.observedAttributes[number];

export class Popup extends Component<obs> implements IComponent<obs>{
    template: string = template;
    css: string = css;

    static observedAttributes = [
        "ms",
        "is-time-displayed",
        "with-loading"
    ] as const;

    private timeoutID?: NodeJS.Timeout;
    private intervalID?: NodeJS.Timer;

    private _ms!: number;

    static id = "popup";

    constructor() {
        super();
        Loading.init();
    }

    async onDOMReady() {
        const ms = this.getAttribute("ms") || "0";
        this.ms = parseInt(ms);

        this.style.transform = "translateY(100%)";
        this.style.opacity = "1";

        this.addEventListener("click", () => {
            this.remove();
        })

        this.hook.beforeRemove = () => {
            this.style.transform = "translateY(0%)";
            this.style.opacity = "0";
        }
    }

    onDataUpdate(name: typeof Popup.observedAttributes[number], oldValue: string, newValue: string): void | Promise<void> {
        switch (name) {
            case "ms":
                this.ms = parseInt(newValue);
                break;
            case "is-time-displayed":
                this.isTimeDisplayed = newValue == "true" ? true : false;
                break;
            case "with-loading":

                break
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

    /**
     * Change the popup duration
     */
    set ms(ms: number) {
        if (isNaN(ms)) throw new Error("the given ms attribute isn't a number");

        this._ms = ms;
        if (this.timeoutID) clearTimeout(this.timeoutID);
        const id = setTimeout(() => {
            this.remove();
        }, ms);
        this.timeoutID = id;

        //Update timer
        if (this.intervalID) clearInterval(this.intervalID);
        let isTimeDisplayed = this.getAttribute("is-time-displayed") || "true"
        this.isTimeDisplayed = isTimeDisplayed == "true" ? true : false;

        //Update loading
        this.loading?.then((loading) => {
            loading.ms = ms;
        })
    }

    /**
     * Change the fact that the timer is displayed in the popup
     */
    set isTimeDisplayed(bool: boolean) {
        const timeElement = this.root.querySelector(".time") as HTMLElement;
        if (!timeElement) return
        if (bool) {
            if (!this.intervalID) {
                let i = 1;
                timeElement.textContent = (((this._ms - i * 1000) / 1000) + 1) + "s"
                this.intervalID = setInterval(() => {
                    timeElement.textContent = ((this._ms - i * 1000) / 1000) + "s"
                    i++;
                }, 1000)
            } else {
                timeElement.style.display = "block"
            }
        } else {
            timeElement.style.display = "none"
        }
    }


    public get loading(): Promise<Loading> | undefined {
        const withLoading = this.getAttribute("with-loading") || "true";
        if (!withLoading) return undefined;
        return new Promise(async (resolve) => {
            const loading = this.root.querySelector("fwc-loading") as Loading;
            if (loading) loading.hook.afterOnDOMReady = async () => {
                resolve(loading);
            };
        })
    }
}