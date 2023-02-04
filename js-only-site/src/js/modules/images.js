import clacScroll from "./calcScroll";

const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img'),
          scroll = clacScroll();

    imgPopup.classList.add('popup_img');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    bigImage.style.maxHeight = '100%';

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;

            const path = target.parentNode.getAttribute('href');

            bigImage.setAttribute('src', path);
        }

        if (target && target.matches('div.popup_img')) {
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
    })
}

export default images;