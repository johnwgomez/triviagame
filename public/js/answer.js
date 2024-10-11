const triviaHandler = async (e) => {
    e.preventDefault();
  
    const selectedAnswer = document.querySelector('input[name="answer"]:checked')?.value;
    const difficulty = document.getElementById('difficulty').textContent;
    const correctAnswer = document.querySelector('input[name="correctAnswer"]').value;
    console.log(correctAnswer)
  
    if (selectedAnswer) {
      try {
        const response = await fetch('/api/play/game', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: selectedAnswer, difficulty: difficulty, correct: correctAnswer })
        });
  
        const result = await response.json();
        if (result.correct) {
          alert(`Correct Answer! Your updated score is: ${result.score}`);
        } else {
          alert('Incorrect Answer.');
        }
      } catch (err) {
        console.error('Error submitting answer:', err);
      }
    } else {
      console.log('No answer selected');
    }
  };
  
  document.getElementById('trivia-form').addEventListener('submit', triviaHandler);