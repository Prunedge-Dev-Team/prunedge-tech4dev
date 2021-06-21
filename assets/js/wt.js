const form = document.querySelector('form')
const button = document.querySelector('.form_submit')
const inputs = [...form.querySelectorAll('.form__input-text')]

form.addEventListener('submit', e => {
    e.preventDefault()

    const values = {}

    let hasEmpty = false;

    inputs.forEach(input => {
        if(!input.value){
            if(input.dataset.hasother){
                const otherValue = document.getElementById(input.dataset.hasother).value
                if(otherValue){
                    values[input.id] = otherValue
                }else{
                    hasEmpty = true
                }
            }else{
                hasEmpty = true
            }
        }else{
            if(['true', 'false'].includes(input.value)){
                values[input.id] = input.value === 'true'
            }else{
                values[input.id] = input.value
            }

            if(input.dataset.hasprefix){
                values[input.id] = document.getElementById(input.dataset.hasprefix).value + values[input.id]
            }
        }
    })


    if(hasEmpty){
        window.setStatus('error', true, 'Kindly fill all inputs')
    }else{
        button.classList.add('is-loading')
        button.disabled = true
        axios.post(`https://staging-api-tech4dev-waitinglist.azurewebsites.net/api/v1/candidates`, values)
            .then(res => {
                window.setStatus('success', true, 'Form successfully submitted')
            })
            .catch(e => {
                if(e.response){
                    window.setStatus('error', true, 'Something went wrong. Kindly fill all fields and try again')
                }else{
                    window.setStatus('error', true, 'Something went wrong. Kindly check your network and try again')
                }
            })
            .finally(() => {
                button.classList.remove('is-loading')
                button.disabled = false
            })
    }

})