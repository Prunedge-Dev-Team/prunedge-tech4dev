const form = document.querySelector('.donate-form');
const labels = [...form.querySelectorAll('label')];

const formInputs = [...form.querySelectorAll('input')];
const formButton = form.querySelector('.donate-form__button');

formInputs.forEach((input, idx) => {
    input.addEventListener('focus', () => labels[idx].classList.add('is-hovering'));
});

formInputs.forEach((input, idx) => {
    input.addEventListener('blur', ({target}) => {
        if (!target.value) {
            labels[idx].classList.remove('is-hovering')
        }
    });
});

formInputs.forEach((input, idx) => {
    input.addEventListener('input', ({target}) => {
        if (target.value) {
            labels[idx].classList.add('is-hovering')
        }
        //If one of the inputs is empty then disable the button
        formButton.disabled = formInputs.some(({value}) => !value);
    });
});

formButton.addEventListener('click', () => {
    const values = formInputs.reduce((values,{name,value}) => ({
        ...values,
        [name]: value
    }), {});
    //Cause paystack assumes you're putting the amount in kobo for some reason
    values.amount *= 100;
    const handler = PaystackPop.setup({
        key: 'pk_live_539c915fe11387efe257778ec6432f9775cad912',
        ...values,
        callback: function (response) {
            window.setStatus('success', true, 'Thank you for your donation.')
        }
    });
    handler.openIframe();
});