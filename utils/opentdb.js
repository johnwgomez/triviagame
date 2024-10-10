async function triviaForm(category, difficulty) {
        console.log('trivia form call')
        const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`,{
            method: 'GET'
        })


            const data = await response.json()
            
            const results = data.results
            return results
       
}

module.exports = {triviaForm}



