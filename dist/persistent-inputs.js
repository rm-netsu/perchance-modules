export const targetNode = document.body;
export const config = { attributes: true, childList: true, subtree: true };
export const cacheValue = (el) => {
    localStorage.setItem(el.id, el.value);
};
export const applyValue = (el) => {
    const value = localStorage.getItem(el.id);
    if (value !== null)
        el.value = value;
};
export const onInput = (e) => {
    if (e.type !== 'input')
        return;
    if (e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement) {
        cacheValue(e.target);
    }
};
export const callback = (mutationList, observer) => {
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
export const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
