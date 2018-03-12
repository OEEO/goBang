export function bindEvent(selector, eventType, func) {
    let element = document.querySelector(selector);
    element.addEventListener(eventType, func);
}

export function removeEvent(selector, eventType, func) {
    let element = document.querySelector(selector);
    element.removeEventListener(eventType, func);
}