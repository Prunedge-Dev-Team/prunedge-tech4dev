[...document.querySelectorAll('.select-option')].forEach(e => {
    e.addEventListener('click', () => {
        const parent = e.parentElement;
        const target = parent.dataset.target;
        document.getElementById(target).value = e.innerText;
        parent.classList.remove('active')
    })
});

const inputDiv = document.querySelector('.input-div');

inputDiv.addEventListener('click', () => {
    const selectOptions = inputDiv.nextElementSibling;
    if(selectOptions.classList.contains('active')){
        selectOptions.classList.remove('active')
    }else{
        selectOptions.classList.add('active')
    }
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formInputs = [...form.querySelectorAll('input')];
    let params = formInputs.reduce((inputs, input) => {
        inputs[input.name.toLowerCase()] = input.value;
        return inputs
    }, {});
    params.amount = parseFloat(params.amount) * 100;
    //TODO Add error handling
    const handler = PaystackPop.setup({
        key: 'pk_live_539c915fe11387efe257778ec6432f9775cad912',
        ...params,
        metadata: {
            program: params.program
        },
        callback: function (response) {
            document.querySelector('.success-modal-container').classList.add('show')
        }
    });
    handler.openIframe();
});

const successContainer = document.querySelector('.success-modal-container');

document.querySelector('.success-modal__close-button').addEventListener('click',() => successContainer.classList.remove('show'));

successContainer.addEventListener('click', (e) => e.target === successContainer ?  successContainer.classList.remove('show') : null);
