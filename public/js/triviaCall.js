
/*const triviaHandler = async (e)=> {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    
    if(category && difficulty){
         const response = await fetch(`/api/play/game`, {
            method: 'POST',
            body: JSON.stringify({category,difficulty}),
            headers: {'Content-Type': 'application/json'}
        })

        document.location.replace('/game')
       
    }
}*/

const triviaHandler = async (e) => {
    e.preventDefault();
  
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
  
    if (category && difficulty) {
     
        window.location.href =`/api/play/game?category=${category}&difficulty=${difficulty}`;

      
    } else {
      console.log('Category or difficulty is missing');
    }
  };

document.getElementById('form-trivia').addEventListener('submit', triviaHandler)

/* .then((response)=> { /*
    if(!response.ok){
        console.log("not getting the data")
    }
    return response.text()
}).then((html)=> {
    document.body.innerHTML = html
}).catch((err)=> {
    console.log(err)
})*/