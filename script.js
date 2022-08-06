const buttonYes = document.querySelector('.question__yes')
const buttonNo = document.querySelector('.question__no')
const checkbox = document.querySelector('.authorization__registration>input')

const toggleRegAuth = () => {
    if (checkbox.checked) {
        document.querySelector('.authorization__button').textContent = 'Зарегистрироваться'

    } else { document.querySelector('.authorization__button').textContent = 'Войти' }
}

const button = () => {





    document.addEventListener("click", (e) => {
        if (e.target.closest('.question__yes')) {
            console.log('1');
        }

        if (e.target.closest('.question__no')) {
            console.log('2');
        }
    })

    document.addEventListener('change', (e) => {
        if (e.target.closest('.authorization__registration')) {
            toggleRegAuth()
        }
    })



}

const sendForm = (formClass) => {

    const form = document.querySelector(formClass)

    const checkbox = document.querySelector('.authorization__registration>input')



    const sendData = (data) => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "aplication/json"
            }
        }).then(res => res.json())
    }

    const submitData = () => {
        const formElements = form.querySelectorAll('input')
        const formData = new FormData(form)
        const formBody = {}

        if (!checkbox.checked) {
            formBody.type = 'authorization'
        } else { formBody.type = 'registration' }

        formData.forEach((val, key) => {
            formBody[key] = val;
        })
        console.log(formBody);


        sendData(formBody)
            .then(data => {

                formElements.forEach(input => {
                    input.value = ''
                })
            })
            .catch(error => {
                console.log(error);

            })

    }


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitData()

    })


}

button()
sendForm('.authorization')
