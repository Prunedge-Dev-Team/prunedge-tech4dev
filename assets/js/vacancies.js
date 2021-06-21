    window.addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('.vacancy')].forEach((vacancy,i) => {
        const vacancyContent = vacancy.querySelector('.vacancy-content');
        //First one is open by default
        // let open = i === 0;
        let open = false;
        const vacancyHeader = vacancy.querySelector('.vacancy-header');

        const applyBtn = vacancy.querySelector('.vacancy__apply-now');
        applyBtn.addEventListener('click', () => {
            document.getElementById('role').value = vacancyHeader.innerText;
            document.querySelector('label[for=role]').classList.add('vacancy-form__input-label--focus');
            document.querySelector('.vacancy-form').scrollIntoView({behavior: "smooth"})
        });

        vacancyHeader.addEventListener('click', () => {
            if (open) {
                vacancyContent.style.height = '0';
            } else {
                vacancyContent.style.height = `${vacancyContent.scrollHeight}px`;
            }
            open = !open;
        })
    });
});

const inputs = [];

[...document.querySelectorAll('.vacancy-form__input-wrapper')].forEach(formInput => {
    const label = formInput.querySelector('.vacancy-form__input-label');
    const input = formInput.querySelector('.vacancy-form__input');
    inputs.push(input);
    if(label){
        input.addEventListener('focus', () => label.classList.add('vacancy-form__input-label--focus'));
        input.addEventListener('input', () => {
            if (input.value) {
                label.classList.add('vacancy-form__input-label--focus')
            } else {
                label.classList.remove('vacancy-form__input-label--focus')
            }
        })
    }
});

const uploadInput = document.querySelector('.vacancy-form__upload-input');
const filesWrapper = document.querySelector('.vacancy-form__files');
let files = [];

const submitButton = document.querySelector('.vacancy-form__submit-btn');

uploadInput.addEventListener('input', (e) => {
    const newFile = uploadInput.files[uploadInput.files.length - 1];
    files.push(newFile);
    const fileDiv = document.createElement('span');
    fileDiv.classList.add('vacancy-form__file');
    fileDiv.innerHTML = newFile.name;

    const fileCancelButton = document.createElement('button');
    fileCancelButton.classList.add('vacancy-form__file-button');
    fileCancelButton.innerHTML = 'x';

    fileCancelButton.addEventListener('click', () => {
        files = files.filter(file => file !== newFile);
        fileDiv.remove();
    });

    fileDiv.appendChild(fileCancelButton);

    filesWrapper.appendChild(fileDiv);
});

submitButton.addEventListener('click', async () => {
    if (inputs.some(({value}) => !value.trim()) || files.length === 0) {
        window.setStatus('error', true, 'Kindly fill all the inputs.');
        return
    }
    const formData = new FormData();
    inputs.forEach(({value, name}) => {
        formData.append(name,value);
    });
    files.forEach(file => formData.append('cvFiles',file));
    submitButton.classList.add('is-loading');
    submitButton.disabled = true;
    try{
        await makeRequest('POST', 'https://formello.herokuapp.com/submit/5e6657f82056fd0017817f65', formData);
        submitButton.classList.remove('is-loading');
        window.setStatus('success');

        setTimeout(() => {
            inputs.forEach(input => input.value = '');
            [...document.querySelectorAll('.vacancy-form__file-button')].forEach(button => button.click());
        },3000)
    } catch(err){
        submitButton.classList.remove('is-loading');
        window.setStatus('error');
    }
});

const makeRequest = async (method,url, body = null) => new Promise((resolve,reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('load',() => resolve(request));
    request.addEventListener('error',() => reject(request));

    request.open(method,url);

    request.send(body);
});