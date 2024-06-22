"use strict";
const targetNode = document.body;
const config = { attributes: true, childList: true, subtree: true };
const cacheValue = (el) => {
    localStorage.setItem(el.id, el.value);
};
const applyValue = (el) => {
    const value = localStorage.getItem(el.id);
    if (value !== null)
        el.value = value;
};
const onInput = (e) => {
    if (e.type !== 'input')
        return;
    if (e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement) {
        cacheValue(e.target);
    }
};
const callback = (mutationList, observer) => {
    mutationList.forEach(mut => {
        switch (mut.type) {
            case 'childList':
                {
                    mut.addedNodes.forEach(node => {
                        if ((node instanceof HTMLTextAreaElement ||
                            node instanceof HTMLInputElement) &&
                            node.dataset.persist !== undefined) {
                            applyValue(node);
                            node.addEventListener('input', onInput);
                        }
                    });
                }
                break;
        }
    });
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
