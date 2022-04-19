import { Popup } from "./controllers/popup";
import { Button } from "./controllers/button";
import { Loading } from "./controllers/loading";
import { Switch } from "./controllers/switch";

Popup.init();
Button.init();
Loading.init();
Switch.init();

const exported = {
    HTMLPopupElement: Popup,
    HTMLButtonElement: Button,
    HTMLLoadingElement: Loading,
    HTMLSwitchElement: Switch
}

export default exported;