ID = "79d3fbc6";
API = "f128eb93eb531f9631c3d5864dee84a0";
query = '';
str = '';
from = 0;
to = 12;

queryString = window.location.search;
urlParams = new URLSearchParams(queryString);
query = urlParams.get('search')
url = `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${API}&from=${from}&to=${to}`;
get(url);

searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', function () {
    str='';
    from=0;
    to=12;
    inputVal = document.getElementById('inputVal');
    query = inputVal.value;
    url = `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${API}&from=${from}&to=${to}`;
    get(url);
})

loadMore=document.querySelector('.loadMore');
loadMore.addEventListener('click',()=>{
    from = from + 12;
    to = to + 12;
    url = `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${API}&from=${from}&to=${to}`;
    document.querySelector('.loadm').style.display='block';
    get(url);
});

async function get(url) {
    response = await fetch(url);
    data = await response.json();
document.title=`${query}`;
    loadMore = document.querySelector('.loadMore');
    loadMore.style.display = 'block';
    spinner = document.querySelector('.spinner');
    spinner.style.display = 'none';
    recipe = document.querySelector('.recipe');
    k=0;
    if (data.hits.length != 0) {
        for (i of data.hits) {
            str += `<div class="box">
                        <div class="image">
                            <img src="${i.recipe.image}" alt="${i.recipe.image}">
                        </div>
                        <div class="part1">
                            <p class="recipeName">${i.recipe.label}</p>
                            <button class="btnRecipe"><a href="index3.html?q=${query}&fr=${from}&t=${to}&index=${k}">View Recipe</a></button>
                        </div>
                        <hr>
                        <div class="infos">
                            <p class="info1 info">Calories : ${i.recipe.calories.toFixed(2)}</p>
                            <p class="info2 info">Diet label :  ${i.recipe.dietLabels[0]}</p>
                            <p class="info3 info">Health Label :  ${i.recipe.healthLabels[3]} , ${i.recipe.healthLabels[4]}...</p>
                        </div>
                    </div>`;
                    k++;
        }
        recipe.innerHTML = str;
    }

    else {
        document.querySelector('.main-sec1').classList.add('error-main');
        recipe.innerHTML = 
      `<div class="error">
       <img src="oopsImg.png" id="oopsImg">
        <b class="errorTxt">Nothing to show ! Please try more accurate search.</b>
        </div>
        `;
        loadMore.style.display = 'none';
    }

    document.querySelector('.loadm').style.display='none';
}