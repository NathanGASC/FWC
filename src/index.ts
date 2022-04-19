import { Popup } from "./controllers/popup";
import { Button } from "./controllers/button";
import { Loading } from "./controllers/loading";

Popup.init();
Button.init();
Loading.init();

const exported = {
    HTMLPopupElement: Popup,
    HTMLButtonElement: Button,
    HTMLLoadingElement: Loading
}

export default exported;