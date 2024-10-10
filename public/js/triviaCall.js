
const triviaHandler = async(e)=> {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    
    if(category && difficulty){
         fetch(`/api/play/game`, {
            method: 'POST',
            body: JSON.stringify({category,difficulty}),
            headers: {'Content-Type': 'application/json'}
        })
        .then((response)=> {
            if(!response.ok){
                console.log("not getting the data")
            }
            return response.text()
        }).then((html)=> {
            document.body.innerHTML = html
        }).catch((err)=> {
            console.log(err)
        })
    }
}

document.getElementById('form-trivia').addEventListener('submit', triviaHandler)