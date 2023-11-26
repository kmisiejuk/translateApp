const translateApp = () => {
  const apiKey = 'b507308dfemshec72d93af6c763ap196a45jsn2c66a6ffb28f'
  const apiUrl =
    'https://translated-mymemory---translation-memory.p.rapidapi.com/get'

  const btn = document.querySelector('.btn')
  const languageOneSelect = document.getElementById('languageOne')
  const languageTwoSelect = document.getElementById('languageTwo')
  const wordInput = document.getElementById('word')
  const translatedWord = document.querySelector('.result')

  const clearTranslatedText = () => {
    translatedWord.innerHTML = ''
  }
  const displayInfo = (info) => {
    translatedWord.textContent = info;
  };

  const translate = async e => {
    e.preventDefault()
    const langOne = languageOneSelect.value
    const langTwo = languageTwoSelect.value
    const word = wordInput.value

    if (word === '') {
      displayInfo('You have to enter a text!');
      return; 
    }
    const url = `${apiUrl}?langpair=${langOne}%7C${langTwo}&q=${word}!&mt=1&onlyprivate=0&de=a%40b.c`

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host':
          'translated-mymemory---translation-memory.p.rapidapi.com',
      },
    }

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      translatedWord.innerHTML = ''

      for (let i = 0; i < result.matches.length; i++) {
        const newWord = document.createElement('p')
        newWord.textContent = result.matches[i].translation
        translatedWord.appendChild(newWord)
      }
    } catch (error) {
      console.error(error)
    }
  }

  languageOneSelect.addEventListener('change', clearTranslatedText)
  languageTwoSelect.addEventListener('change', clearTranslatedText)
  wordInput.addEventListener('input', clearTranslatedText)
  btn.addEventListener('click', translate)
}

translateApp()
