
//===================================================================

//----------------< Form Images - "Formulário Images" >

const formImage = document.querySelector('.form-image');
const inputImagesUrl = document.querySelector('.input-images-url');
const inputScale = document.querySelector('#scale');
const inputRotate = document.querySelector('#rotate');
const inputRotateGraus = document.querySelector('#input-rotate');
const infinite = document.querySelectorAll('.infinite');

const replaceImages = (url,scale,infinite2,rotate,infinite1,inputRotate) => {

    const images = document.querySelectorAll('img');
    images.forEach((image) => image.src = url);

    //======================================================

    //---------< CSS - "Criação e implementação do CSS" >

    var css = `.scale:hover {transition: 1s;transform: scale(1.5);}.rotate:hover {transition: 1s;transform: rotate(${inputRotate}deg);}@keyframes scale {from {transform: scale(1);}to {transform: scale(1.2);}}@keyframes rotate {from {transform: rotate(0deg);}to {transform: rotate(${inputRotate}deg);}}`;
    var style = document.createElement('style');
    
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    //======================================================

    //---------< Checkbox Rotate >

    if(rotate == true) {
        images.forEach((image) => {
            image.classList.add('rotate');
        });
    }

    if(rotate == false) {
        images.forEach((image) => {
            image.classList.remove('rotate');
        });
    }

    if((rotate == true)&&(infinite1 == true)) {
        images.forEach((image) => {
            image.style.animation = 'rotate 2s infinite';
        });
    }

    //======================================================

    //---------< Checkbox Scale >
    
    else {
        images.forEach((image) => {
            image.style.animation = 'none';
        });
    }
    
    if(scale == true) {
        images.forEach((image) => {
            image.classList.add('scale');
        });
    }

    if(scale == false) {
        images.forEach((image) => {
            image.classList.remove('scale');
        });
    }

    if((scale == true)&&(infinite2 == true)) {
        images.forEach((image) => {
            image.style.animation = 'scale 1s ease-in-out infinite';
        });
    }

}

formImage.addEventListener('submit', async (event) => {

    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: replaceImages,
        args: [inputImagesUrl.value,inputScale.checked,infinite[1].checked,inputRotate.checked,infinite[0].checked,inputRotateGraus.value]
    });

})

//===================================================================

//----------------< Form Background - "Formulário Background" >

const inputImagesBackground = document.querySelector('.input-images-background');
const inputColor = document.querySelector('#input-color');
const formBackground = document.querySelector('.form-background');

const replaceBackground = (image,color) => {

    if(color == '#000000') {
        document.body.style.background = `url(${image})`;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
    }
    else {
        document.body.style.backgroundColor = `${color}`;
    }

}

formBackground.addEventListener('submit', async (event) => {

    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: replaceBackground,
        args: [inputImagesBackground.value,inputColor.value]
    });

})

//===================================================================

//----------------< Form Text - "Formulário Text" >

const inputFontTamanho = document.querySelector('#input-tamanho');
const inputColorText = document.querySelector('#input-color-text');
const formText = document.querySelector('.form-text');

const replaceText = (fontTamanho, color,title, text) => {

    const tagP = document.querySelectorAll('p,font,span,a');
    const tagH1 = document.querySelectorAll('h1,h2,h3,h4');

    if(text == true) {
        tagP.forEach((text) => {
            console.log(text)
            text.style.fontSize = `${fontTamanho}px`;
            text.style.color = color;
        });
    }

    if(title == true) {
        tagH1.forEach((text) => {
            console.log(text)
            text.style.fontSize = `${fontTamanho}px`;
            text.style.color = color;
        });
    }
    
}

formText.addEventListener('submit', async (event) => {

    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: replaceText,
        args: [inputFontTamanho.value,inputColorText.value,checkboxTitle.checked,checkboxText.checked]
    });

})

//===================================================================

//----------------< Botões Checkbox >

const inputCheckboxRotate = document.querySelector('#rotate');
const inputCheckboxScale = document.querySelector('#scale');
const optionsInputCheckbox  = document.querySelectorAll('.options-input-checkbox ');

const loop = setInterval(() => {

    if(inputCheckboxRotate.checked) {
        optionsInputCheckbox[0].style.display = 'flex';
    }

    else {
        optionsInputCheckbox[0].style.display = 'none';
    }

    if(inputCheckboxScale.checked) {
        optionsInputCheckbox[1].style.display = 'flex';
    }

    else {
        optionsInputCheckbox[1].style.display = 'none';
    }

},100);

//===================================================================

//----------------< Botão Ocultar e Desocultar Forms >

const forms = document.querySelectorAll('.form');
const titles = document.querySelectorAll('.title');
const buttonClosed = document.querySelectorAll('.btn-closed');
const checkboxTitle = document.querySelector('#checkbox-title');
const checkboxText = document.querySelector('#checkbox-text');

let isActive = true;

titles[0].addEventListener('click', () => {
    if (isActive) {
      isActive = false;
      forms[0].style.display = 'block';
      buttonClosed[0].src = 'assets/img/btn_open.png';
      forms[1].style.display = 'none';
      buttonClosed[1].src = 'assets/img/btn_closed.png';
      forms[2].style.display = 'none';
      buttonClosed[2].src = 'assets/img/btn_closed.png';
    } else {
      isActive = true;
      forms[0].style.display = 'none';
      buttonClosed[0].src = 'assets/img/btn_closed.png';
    }
});


titles[1].addEventListener('click', () => {
    if (isActive) {
      isActive = false;
      forms[1].style.display = 'block';
      buttonClosed[1].src = 'assets/img/btn_open.png';
      forms[0].style.display = 'none';
      buttonClosed[0].src = 'assets/img/btn_closed.png';
      forms[2].style.display = 'none';
      buttonClosed[2].src = 'assets/img/btn_closed.png';
    } else {
      isActive = true;
      forms[1].style.display = 'none';
      buttonClosed[1].src = 'assets/img/btn_closed.png';
    }
});

titles[2].addEventListener('click', () => {
    if (isActive) {
      isActive = false;
      forms[2].style.display = 'block';
      buttonClosed[2].src = 'assets/img/btn_open.png';
      forms[0].style.display = 'none';
      buttonClosed[0].src = 'assets/img/btn_closed.png';
      forms[1].style.display = 'none';
      buttonClosed[1].src = 'assets/img/btn_closed.png';
    } else {
      isActive = true;
      forms[2].style.display = 'none';
      buttonClosed[2].src = 'assets/img/btn_closed.png';
    }
});