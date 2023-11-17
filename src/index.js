import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'slim-select/dist/slimselect.css';

const selectPlaceholder = `<option class="js-selectOption js-placeholder-select" value="choose">Select the cat</option>`;
const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = ref;

selector.insertAdjacentHTML("afterbegin", selectPlaceholder);

selector.hidden = true;
loader.hidden = false;

function markupSelect(arr) {
    return arr.map(({name, id}) => {
     return `<option class="js-selectOption" value="${id}">${name}</option>`
    }).join("");
 }



fetchBreeds()
.then(data => {
 
    selector.insertAdjacentHTML("beforeend", markupSelect(data));
    selector.hidden = false;
    loader.hidden = true;

    })
.catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    error.hidden = true;
    loader.hidden = false;
    selector.hidden = false;
    divCatInfo.classList.add("cat-card");
    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        const { url, breeds } = data[0];
        divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        loader.hidden = true;
selector.hidden = false;
divCatInfo.classList.remove("cat-card");
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    selector.hidden = false;
    loader.hidden = true;
    divCatInfo.classList.add("cat-card");
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};