import catsData from '/data.js'

const emotionsElement = document.getElementById('emotions')
const button = document.getElementById('submit')
const gifCheckBox = document.getElementById('gif')
const modal = document.getElementById('modal')
const modalInner = document.getElementById('modal-inner')
const closeBtn = document.getElementById('close-button')


button.addEventListener('click', renderCat)
closeBtn.addEventListener('click', close)

function close() {
    modal.style.display = 'none'
}

function renderCat(e){
    e.preventDefault()
    modal.style.display = "flex"
    const cat = singleCat()

    modalInner.innerHTML = 
    `
        <img class="image" src="/images/${cat.image}" alt="${cat.alt}">
    `
}

function singleCat(){
    const cats = getImage()
    if(cats.length === 1){
        return cats[0]
    }else {
        const randomNum = Math.floor(Math.random() * cats.length)
        return cats[randomNum]
    }
}

function getImage () {
    const selectedRadio = document.querySelector('input[type="radio"]:checked')
    let matchedCats = catsData.filter(cat => cat.emotionTags.includes(selectedRadio.id))
    const isGif = gifCheckBox.checked
    if(isGif){
        matchedCats = matchedCats.filter(cat => cat.isGif)
    }
    return matchedCats
}



emotionsElement.addEventListener('change', (e) => {
    e.preventDefault()
    const id = e.target.id
    const radios = document.getElementsByClassName('radio')
    for(let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(id).parentElement.classList.add('highlight')
})

const emotions = []

for(let cat of catsData){
    for(let emotion of cat.emotionTags){
        if(!emotions.includes(emotion)){
            emotions.push(emotion)
        }
    }
}


for(let emotion of emotions){
    emotionsElement.innerHTML += 
    `
        <div class="radio">
			<label for="${emotion}">${emotion}</label>
			<input type="radio" id="${emotion}" name="radio">
		</div>
    `
}
