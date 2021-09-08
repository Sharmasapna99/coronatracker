const countries = document.querySelector('datalist');
const search = document.querySelector('#search');
const date = document.querySelector('#date');
const nameCountry = document.querySelector('#name-counrty');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const recovered = document.querySelector('.recovered');
const chart = document.querySelector('.chart');

let dataChart = [];

const API_URL = "https://api.covid19api.com/summary";

async function covid(country){
    const res = await fetch(API_URL);
    // console.log(res)
    const data = await res.json();
    console.log(country)

    if(res.status === 4 || res.status === 200){
        date.textContent = new Date(data.Date).toDateString();

        if(country ==='' || country === 'world'){
        const{TotalConfirmed,TotalDeaths,TotalRecovered,NewConfirmed, NewDeaths,NewRecovered} =  dataGlobal;
        //total Confirmed
        confirmed.children[1].textContent = TotalConfirmed;
        confirmed.children[2].textContent = NewConfirmed;

        //total Deaths
        deaths.children[1].textContent = TotalDeaths;
        deaths.children[2].textContent = NewDeaths;

        //total recovered
        recovered.children[1].textContent = TotalRecovered;
        recovered.children[2].textContent = NewRecovered;

        nameCountry.textContent = 'The World';
        };
        //console.log(data.Global)
        
        data.Countries.forEach(item =>{
            const option = document.createElement('option');
            option.value = item.Country;
            //for scrolldown options of countries 
            // const sel = document.getElementById("countries");
            option.textContent = item.Country;
            countries.appendChild(option);

            if(country === item.Country){
                
        //total Confirmed
        confirmed.children[1].textContent = item.TotalConfirmed;
        confirmed.children[2].textContent = item.NewConfirmed;

        //total Deaths
        deaths.children[1].textContent = item.TotalDeaths;
        deaths.children[2].textContent = item.NewDeaths;

        //total recovered
        recovered.children[1].textContent = item.TotalRecovered;
        recovered.children[2].textContent = item.NewRecovered;

        nameCountry.textContent = item.Counrty;

            }
        })
        
    }else{
        chart.innerHTML = `<h2>Loading......</h2>`;
    }
}
covid(search.value);    

const btnSearch = document.querySelector('button');
btnSearch.addEventListener('click', (e)=>{
    e.preventDefault();
    covid(search.value);
    console.log(search.value)
    //search.value = '';
})