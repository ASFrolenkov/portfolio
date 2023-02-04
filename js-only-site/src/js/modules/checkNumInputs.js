const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(elem => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/\D/, '');
        })
    })
};

export default checkNumInputs