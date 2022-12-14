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
            document.querySelector('.authorization').style.display = 'block'
        }

        if (e.target.closest('.question__no')) {
            console.log('2');
        }

        if (e.target.closest('.authorization__button--2')) {

            document.querySelector('.content').style.display = 'block'
            console.log('3');
        }

        if (e.target.closest('.form-content__button')) {
            document.querySelectorAll('.content__block--second').forEach(item => {
                item.style.display = 'flex'
            })
            console.log('4');
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

    /*const checkbox = document.querySelector('.authorization__registration>input')*/

    // 'https://jsonplaceholder.typicode.com/posts'

    //http://127.0.0.1:5000/el-doorado/user/file

    const sendData = (data) => {
        return fetch('http://127.0.0.1:5000/el-doorado/user/file', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "aplication/json",
                "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfaWQiOiJiZmVhOWE5MC05YmIwLTQ4ZDctYmQ1Yi02NzYwYzJjMjYyZjkiLCJleHAiOjE2NTk4MDA1MzB9.o5kMZ9MTiKY2nZ_q81SkTo26vS3UoHJjrD_TCkyHtNk"
            }
        }).then(res => res.json())
            .then(
                res => {
                    console.log(res);
                }
            )
    }

    const submitData = () => {
        const formElements = form.querySelectorAll('input')
        const formData = new FormData(form)
        const formBody = {}


        formData.forEach((val, key) => {
            formBody[key] = val;
        })

        sendData(formBody)
            .then(data => {

                formElements.forEach(input => {
                    input.value = ''
                })
                console.log('отправлено');
            })
            .catch(error => {
                console.log(error);

            })

    }

    //submit авторизации не заработает. нужно вернуть в тип кнопки сабмит и форме тэг форм
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        /*  if (!checkbox.checked) {
              url = 'http://127.0.0.1:5000/el-doorado/user/login'
          } else { url = 'http://127.0.0.1:5000/el-doorado/user/register' }*/

        submitData()

    })

}

document.querySelector('.authorization').style.display = 'none'
document.querySelector('.content').style.display = 'none'
document.querySelectorAll('.content__block--second').forEach(item => {
    item.style.display = 'none'
})



button()
sendForm('.content__form')
