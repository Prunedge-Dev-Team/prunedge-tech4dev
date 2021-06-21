const textarea = document.querySelector('textarea');

const changeTextAreaHeight = () => {
    textarea.style.height = '0';
    textarea.style.height = `${textarea.scrollHeight}px`
};

textarea.addEventListener('input',changeTextAreaHeight);
textarea.addEventListener('cut',changeTextAreaHeight);
textarea.addEventListener('paste',changeTextAreaHeight);

const form = document.querySelector('.contact-form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formInputs = [...form.querySelectorAll('input'),textarea];
    let params = [...form.querySelectorAll('input'),textarea].reduce((params,input) => {
        params += `${encodeURI(input.name)}=${encodeURI(input.value.trim())}&`;
        return params
    },'').slice(0,-1);
    const submitButton = form.querySelector('button.submit');
    submitButton.classList.add('is-loading');
    submitButton.classList.remove('submitted');
    submitButton.disabled = true;
    fetch(`https://script.google.com/macros/s/AKfycbweHhV5WJC8ES7LldphS6CI3h8l3qPW_VfQ8pm4iU3riEJ6QBQb/exec?${params}`)
    //TODO Add error handling
        .then(res => res.json())
        .then(res => {
            if(res.result === 'success'){
                submitButton.classList.remove('is-loading');
                submitButton.classList.add('submitted');
                formInputs.filter(input => input.name !== 'sheetname').forEach(e => e.value = '');
                submitButton.disabled = false;
            }else{
                throw new Error()
            }
        })
        .catch(() => {
            submitButton.classList.add('error');
            submitButton.disabled = false;
        })
});