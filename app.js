const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
//User types in a city or state
//The typed input is checked letter by letter for matching string from the given endpoint
//whole matching output is displayed with matched section from input highlighted

/**************************Handy function to format numbers***************************/
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');  /***StackOverflow***/
}
/**************************Handy function to format numbers***************************/

//Step 1: get input from the form
let searchTerm = document.querySelector('.search');
//Step 2: fetch data from the endpoint
const cities = [];
  fetch(endpoint)
    .then(blob => blob.json())
      .then(data => cities.push(...data))
        .catch(err=>console.log(err));
//Step 3
let elToHoldMatchedPlaces = document.querySelector('.suggestions');
function displayMatchedPlaces(places, regexUsed, valueKeyedIn){
  let html = '';
  places.forEach((place, index)=>{
    let highlighted = place.city.replace(regexUsed, `<span class="hl">${valueKeyedIn}</span>`);
    html+=`<li><span class="name">${highlighted}</span> <span class="population">${numberWithCommas(place.population)}</span></li>`; /*Step3.2::Display*/
  });                                                                                                                                    /*  ^  */
  // Step 4: Display results inside suggestions list                                                                                         ^
  elToHoldMatchedPlaces.innerHTML = html;                                                                                                /*  |  */
}                                                                                                                                        /*  |  */
                                                                                                                                         /*  |  */
let matchingCitiesOrStates = [];                                                                                                         /*  |  */
function compareSearchTermWithCities(){                                                                                                  /*  |  */
  let regex = new RegExp(this.value, 'gi');
  matchingCitiesOrStates = cities.filter(place=>{                                                                            /*Step 3.1:: compareSearchTermWithCities*/
    return place.city.match(regex)||place.state.match(regex);
  });
  return displayMatchedPlaces(matchingCitiesOrStates, regex, this.value);
}
searchTerm.addEventListener('change', compareSearchTermWithCities);
searchTerm.addEventListener('keyup', compareSearchTermWithCities);
