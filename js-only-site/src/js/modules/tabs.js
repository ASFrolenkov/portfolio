const tabs = (headerSelector, tabSelector, contentSelector, activeClass , display = 'block')  => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    const hideTabContent = () => {
        content.forEach(elem => {
            elem.style.display = 'none';
        })

        tab.forEach(elem => {
            elem.classList.remove(activeClass)
        })
    };

    const showTabContent = (i = 0) => {
        content[i].style.display = display;
        tab[i].classList.add(activeClass)
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', event => {
        const target = event.target;
        if (target && (target.classList.contains(tabSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
            tab.forEach((elem, i) => {
                if (target === elem || target.parentNode === elem) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }   
    })
}

export default tabs;