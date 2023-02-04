import checkNumInputs from "./checkNumInputs";

const forms = (state, resetState) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    const clearInputs = () => {
        inputs.forEach(elem => {
            elem.value = '';
        })
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    form.forEach(elem => {
        elem.addEventListener('submit', (event) => {
            event.preventDefault();
            const modal = elem.closest('[data-modal]');

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            elem.appendChild(statusMessage);

            const formData = new FormData(elem);
            if (elem.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key])
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                    setTimeout(() => {
                        if (modal) {
                            modal.style.display = 'none';
                        }
                        document.body.style.overflow = '';
                    },3000);
                    resetState(state);
                    document.querySelectorAll('.checkbox').forEach((box) => {
                        box.checked = false;
                    })
                })
        })
    })
};

export default forms;