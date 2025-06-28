import { removeDebugTrap } from "./preload/debugTrap";
import { inject } from "./preload/injector";

if (!window.execPreload) {
    window.execPreload = true;
    removeDebugTrap();
    inject();
}