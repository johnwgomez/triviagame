
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

