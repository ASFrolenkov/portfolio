import clacScroll from "./calcScroll";

const errorMsg = document.createElement('div');
      errorMsg.classList.add('status');
      errorMsg.textContent = 'Заполните все данные';

const modals = (state) => {
    const bindModal = (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) => {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = clacScroll();

        const currentModal = close.closest('div[data-modal]');
        const frontModal = trigger[0].closest('div');

        const showModalStyle = () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        };

        const hideModalStyle = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
        };
    
        const addEventModalBtn = (bool = true) => { 
            trigger.forEach(item => {
                item.addEventListener('click', (event) => {
                    if (event.target) {
                        event.preventDefault();
                    }
                    if (bool) {
                        windows.forEach(elem => {
                            elem.style.display = 'none';
                        })
                        showModalStyle();
                    } else {
                        frontModal.appendChild(errorMsg);
                    }
                });
            });
        };

        if (!currentModal.getAttribute('data-modal')) {
            addEventModalBtn();
        } else {
            switch(currentModal.getAttribute('data-modal')) {
                case 'profileModal':
                    if (state.width && state.height) {
                        addEventModalBtn();
                    } else {
                        addEventModalBtn(false);
                    }
                    break;
                case 'endModal':
                    if (state.profile) {
                        addEventModalBtn();
                    } else {
                        addEventModalBtn(false);
                    }
                    break;
                default: 
                    addEventModalBtn();
                    break;
            }
        }

        close.addEventListener('click', () => {
            windows.forEach(elem => {
                elem.style.display = 'none';
            })

            hideModalStyle();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(elem => {
                    elem.style.display = 'none';
                })

                hideModalStyle();
            }
        });
    };

    const showModalByTime =(selector, time) => {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time)
    }

    

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');

    bindModal('.phone_link', '.popup', '.popup .popup_close');

    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    //showModalByTime('.popup', 60000);
};

export default modals;