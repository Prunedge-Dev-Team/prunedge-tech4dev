const selects = [...document.querySelectorAll('.select')];

selects.forEach(select => {
    const inputDiv = select.querySelector('.input-div');
    inputDiv.addEventListener('click', () => {
        const selectOptions = select.querySelector('.select-options');
        if(selectOptions.classList.contains('active')){
            selectOptions.classList.remove('active')
        }else{
            selectOptions.classList.add('active')
        }
    });
    [...select.querySelectorAll('.select-option')].forEach(options => {
        options.addEventListener('click', () => {
            const parent = options.parentElement;
            const target = parent.dataset.target;
            document.getElementById(target).value = options.innerText;
            parent.classList.remove('active')
        })
    });
});

const byStateOptions = {
    // lagos: ['Gbagada','Ebute metta','Oyewole ajiboro street','Alimosho','Adekunle'],
    // niger: ['Chanchaga','Maitumbi','Tudun Fulani Bosso','Diko Guarara'],
    // ekiti: ['Ode Ekiti','Ado Ekiti'],
    // ogun: ['Yewa North','Ota'],
    // abuja: ['Gwagwalada'],
    // akwaibom: ['Ndukpoise','Okoita'],
    // bauchi: ['Bulkachuwa'],
    bayelsa: ['Akpide Ayama'], //,'Sagbama','Ogbia'],
    // benue: ['Ogobia'],
    // borno: ['Damboa road'],
    // delta: ['Patani','Warri'],
    enugu: ['Ngwo'],
    // gombe: ['Dukku'],
    // imo: ['Naze','Orieagu'],
    // kaduna: ['Zaria','Barnawa'],
    // kano: ['Rimin gata'],
    katsina: ['Kofar Durbi','Mai Mani'],
    // kebbi: ['Argungu'],
    // kwara: ['Ilorin'],
    // nassarawa: ['Bukan Sidi','Laminga'],
    ondo: ['Igbokoda','Iju'],
    // osun: ['Iwo','Ifewara'],
    // oyo: ['Odo Ona','Ibadan'],
    // rivers: ['Etche'],
    // kogi: ['Lokoja']
};

const stateSelectOptions = document.querySelector('.select-options.state');
const townSelectOptions = document.querySelector('.select-options.town');
if(stateSelectOptions){
    [...stateSelectOptions.querySelectorAll('.select-option button')].forEach(option => {
        option.addEventListener('click',() => {
            const stateOptions = byStateOptions[option.innerText.split(' ').join('').toLowerCase()];
            townSelectOptions.innerHTML = '';
            stateOptions.forEach(option => {
                const li = document.createElement('li');
                li.innerHTML = `<button type="button">${option}</button>`;
                li.className = 'select-option';
                li.addEventListener('click', () => {
                    const parent = li.parentElement;
                    const target = parent.dataset.target;
                    document.getElementById(target).value = li.innerText;
                    parent.classList.remove('active')
                });
                townSelectOptions.appendChild(li);
            })
        })
    });
}

const textarea = document.querySelector('textarea');

if(textarea){
    const changeTextAreaHeight = () => {
        textarea.style.height = '0';
        textarea.style.height = `${textarea.scrollHeight}px`
    };
    textarea.addEventListener('input',changeTextAreaHeight);
    textarea.addEventListener('cut',changeTextAreaHeight);
    textarea.addEventListener('paste',changeTextAreaHeight);
}

const form = document.querySelector(':not(footer) form');

[...form.querySelectorAll('input')].forEach(input => {
    input.addEventListener('change',() => {
        if(input.value.trim()){
            input.classList.add('not-empty')
        }else{
            input.classList.remove('not-empty')
        }
    })
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const formInputs = [...form.querySelectorAll('input:not([type=radio])'),form.querySelector('input[type=hidden]'),...form.querySelectorAll('input:checked'),textarea].filter(input => input);
    let params = formInputs.reduce((params,input) => {
        params += `${encodeURI(input.name.toLowerCase())}=${encodeURI(input.value.trim())}&`;
        return params
    },'').slice(0,-1);
    const submitButton = form.querySelector('button.submit');
    submitButton.classList.add('is-loading');
    submitButton.classList.remove('submitted');
    submitButton.disabled = true; 
    // const url = "http://localhost:3000/apiv1/talent/apply"
    const url =  "https://tech4dev.azurewebsites.net/apiv1/partnership"
    const res = await axios.post(
      url,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log(res)

    // fetch(`https://script.google.com/macros/s/AKfycbweHhV5WJC8ES7LldphS6CI3h8l3qPW_VfQ8pm4iU3riEJ6QBQb/exec?${params}`)
        //TODO Add error handling
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res);
        //     if(res.result === 'success'){
        //         submitButton.classList.remove('is-loading');
        //         submitButton.classList.add('submitted');
        //         window.setStatus('success');
        //         setTimeout(() => {
        //             submitButton.classList.remove('submitted');
        //             submitButton.disabled = false;
        //         },5000);
        //         formInputs.filter(input => input.name !== 'sheetname' && input.name !== 'committed').forEach(input => {
        //             input.value = '';
        //             input.classList.remove('not-empty')
        //         })
        //     }else{
        //         throw new Error()
        //     }
        // })
        // .catch(() => {
        //     submitButton.classList.add('error');
        //     window.setStatus('error');
        // })

});