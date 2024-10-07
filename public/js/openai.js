const openaiForm = async(e)=> {
    e.preventDefault();

    const category = document.getElementById('category').value.trim();
    const difficulty= document.getElementById('difficulty').value;

    if(category && difficulty){
        const response = await fetch('/api/play/playGame', {
            method: 'POST',
            body: JSON.stringify({category, difficulty}),
            headers: {'Content-Type': 'application/json'}
        })

        const data = await response.json()
        if(data){
            document.location.reload()
        }else{
            alert(response.statusText)
        }
    }
}

document.getElementById('game-form').addEventListener('submit', openaiForm)
