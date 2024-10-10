const signupForm = async(e)=> {
    e.preventDefault();
    
    const name = document.getElementById('name-signup').value.trim()
    const email = document.getElementById('email-signup').value.trim()
    const password = document.getElementById('password-signup').value.trim()

    if(name && email && password){
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok){
            document.location.replace('/game')
        }else{
            alert(response.statusText)
        }
    }
}

document.getElementById('signup-form').addEventListener('submit', signupForm)