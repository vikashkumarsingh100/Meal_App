var data;
const fav = [];
var count = 0;
let div = document.createElement('div');

const favourite = document.querySelector('#favourite');

function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}

function storage() {

    var item = JSON.parse(localStorage.getItem('item'));
    div.innerHTML = '';
    if (item) {
        for (let k of item) {

            div.innerHTML = `${div.innerHTML}<div><span>${k}</span><button>X</button><br></div>`;

            favourite.append(div);


        }
    }

}

function getResults(b) {

    let a = b[0];


    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${a}`).then((res) => {
        let ul = document.createElement('ul');
        const result = document.querySelector('#result');
        result.innerHTML = '';
        for (let i of res.data.meals) {


            const pattern = new RegExp("^" + b + ".*", 'i');

            if (pattern.test(i.strMeal)) {

                let li = document.createElement('li');

                li.innerHTML = `<span>${i.strMeal}</span><i class="fa-solid fa-bookmark"></i>`;
                const result = document.querySelector('#result');
                ul.appendChild(li);
                result.append(ul);
                const k = document.querySelectorAll('i');


                const details = document.querySelector('#details');




                li.addEventListener('click', (e) => {

                    e.stopPropagation();

                    if (e.target.tagName == 'I') {

                        fav.push(`${li.firstChild.textContent}`)
                        const fav1 = removeDuplicates(fav)

                        localStorage.setItem('item', JSON.stringify(fav1));
                        storage();


                    }




                })




                li.addEventListener('click', (e) => {

                    if (e.target.tagName == 'SPAN') {

                        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${li.innerText}`).then((res) => {

                            localStorage.setItem("myValue", res.data.meals[0].strMeal);
                            window.open('./details.html', "_blank")


                        })
                    }

                })

            }

        }

    })
}

let searchinput = document.querySelector('#searchinput');
searchinput.addEventListener('keydown', (e) => {
    let word = searchinput.value + e.key;
    if (word.length > 0)
        getResults(word);


})




storage();
const btn = document.querySelectorAll('button');


favourite.addEventListener('click', (e) => {

    if (e.target.nodeName == 'BUTTON') {
        e.target.parentNode.remove();
        var removeitem = JSON.parse(localStorage.getItem('item'));



        const p = e.target.parentNode.innerText.substring(0, e.target.parentNode.innerText.length - 1)


        var newitem = removeitem.filter((t1) => {
            if (p !== t1) {
                return true;
            }
        })
        localStorage.setItem('item', JSON.stringify(newitem));

    }
    if (e.target.nodeName == 'SPAN') {
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.innerHTML}`).then((res) => {
            
            localStorage.setItem("myValue", res.data.meals[0].strMeal);
            window.open('./details.html', "_blank")

        })
    }

})