// Deeeep.io has a debug trap that freezes the page when DevTools are open
// Because the debug trap is called 500+ times, it also causes the page to load slowly
export function removeDebugTrap() {
    const originalConstructor = (function () { }).prototype.constructor;
    Function.prototype.constructor = function (...args) {
        if (args[0] === "debugger") {
            return originalConstructor.apply(this, [""]);
        }
        if (args[0] === "while (true) {}") {
            return originalConstructor.apply(this, [""]);
        }
        return originalConstructor.apply(this, args);
    };
}