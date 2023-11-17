const url = 'https://api.thecatapi.com/v1';
const api_key = "live_eEiec8AzqJYouXLCOcuUjmR13DHQjhGPkxeoz9goiH7Zqz5nW9ReeCftf4V4REjA";

function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};

function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};

  export { fetchBreeds, fetchCatByBreed };