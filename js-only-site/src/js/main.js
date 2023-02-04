import './slider'
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    let modalState = {
        form: 0,
        height: '',
        width: '',
        type: 'tree',
        profile: ''
    };
    let date = '2023-06-30';

    const resetState = (state) => {
        for (let key in state) {
            switch (key) {
                case 'form':
                    state[key] = 0;
                    break;
                case 'type':
                    state[key] = 'tree';
                    break;
                default:
                    state[key] = '';
                    break;
            }
        }
    };

    changeModalState(modalState);
    modals(modalState);
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
    forms(modalState, resetState);
    timer('#timer', date);
    images();
})
