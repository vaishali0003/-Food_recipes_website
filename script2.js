ID = "79d3fbc6";
API = "f128eb93eb531f9631c3d5864dee84a0";
queryString = window.location.search;
urlParams = new URLSearchParams(queryString);
query = urlParams.get('q');
from = urlParams.get('fr');
to = urlParams.get('t');
index = urlParams.get('index')
k = 0;
h = 1;
l = 1;

url = `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${API}&from=${from}&to=${to}`;
get(url);

async function get(url) {
    response = await fetch(url);
    data = await response.json();
   document.title=`${data.hits[index].recipe.label}`
    str1 = '';
    str1 = `<div class="img">
    <img src="${data.hits[index].recipe.image}" alt="img">
    </div>
    <p class=rName>${data.hits[index].recipe.label}</p>

    <div class="fullInfo">
        <p class="fullInfo1 fullInfo"><span style="color:#ff7a0f;">Calories</span> - ${(data.hits[index].recipe.calories.length!=0)?(data.hits[index].recipe.calories):('No data found')}</p>
        <hr>
        <p class="fullInfo2 fullInfo"><span style="color:#ff7a0f;">Diet Label</span> - ${(data.hits[index].recipe.dietLabels.length!=0)?(data.hits[index].recipe.dietLabels):('No data found')}</p>
        <hr>
        <p class="fullInfo3 fullInfo"><span style="color:#ff7a0f;">Health Label</span> - ${(data.hits[index].recipe.healthLabels.length!=0)?(data.hits[index].recipe.healthLabels):('No data found')}</p>
        <hr>
        <p class="fullInfo4 fullInfo"><span style="color:#ff7a0f;">Cautions</span> - ${(data.hits[index].recipe.cautions.length!=0)?(data.hits[index].recipe.cautions):('No data found')}</p>
        <hr>
    </div>`;

    box1 = document.querySelector('.box1');
    box1.innerHTML = str1;

fullRecipe=document.querySelector('.fullRecipe');

fullRecipe.innerHTML=`<p><a href="${data.hits[index].recipe.url}" class="a2">Click here to view full recipe</a></p>`;


    str2 = '';
    for (i = 0; i < data.hits[index].recipe.ingredients.length; i++) {
        str2 += `<tr>
                <th scope="row">${h}</th>
                <td>${data.hits[index].recipe.ingredients[i].text}</td>
            </tr>`;
        h++;
    }
    tBody1 = document.querySelector('.tBody1');
    tBody1.innerHTML = str2;

    str3 = '';
    for (i of Object.values(data.hits[index].recipe.totalNutrients)) {
        str3 += `<tr>
                    <th scope="row">${l}</th>
                    <td>${i.label}</td>
                    <td>${i.quantity.toFixed(2)}</td>
                    <td>${i.unit}</td>
                </tr>`;
        l++;
    }
    tBody2 = document.querySelector('.tBody2');
    tBody2.innerHTML = str3;
}
