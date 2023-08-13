// let {data}=require('./script')
var b = localStorage.getItem("myValue");
axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${b}`).then((res)=>{
    const details=document.querySelector('#details');
    const name=document.querySelector('#name');
    const img=document.querySelector('img');
    const instruction=document.querySelector('#instruction');
    name.innerText=res.data.meals[0].strMeal;
    img.setAttribute('src',res.data.meals[0].strMealThumb);
    instruction.innerHTML=`<h2>${instruction.innerHTML}</h2>`+res.data.meals[0].strInstructions;
    details.append(name,img);
    details.appendChild(instruction);

})
    
 