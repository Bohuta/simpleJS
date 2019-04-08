'use strict';
window.onload = function () {
    let baseUrl = 'https://api.themoviedb.org/3';
    let apiKey = '951b73be4c735d88b9f7a1a3339d3326';
    let list_movie = document.getElementById('list-movies');
    let info_movie = document.getElementById('info-movie');
    let loading = document.getElementById('loading');
    let btnSearch = document.getElementById('btnSearch');

    btnSearch.onclick = search;
    //search();

    function search() {
        list_movie.innerHTML = "";
        progress_toggle();
        fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`)
            .then(function (response) {
                console.log('-------Content-Type---------', response.headers.get('Content-Type')); // application/json; charset=utf-8
                console.log('------status--------', response.status); // 200

                return response.json();
            })
            .then(function (data) {
                console.log('--------data by server---------', data);
                let list = data.results;
                
                for (let i = 0; i < list.length; i++) {
                    let li = document.createElement('li');
                    li.innerHTML = `<a href="#" data-id="${list[i].id}" class="moview_link">${list[i].title}</a>`;
                    list_movie.appendChild(li);
                    //console.log("list["+i+"]", list[i])
                }

                progress_toggle();
                show_list();

                var moview_links = document.querySelectorAll('.moview_link');
                for (var i = 0; i < moview_links.length; i++) {
                    moview_links[i].addEventListener('click', function (event) {
                        let id = this.getAttribute("data-id")
                        getMovie(id);

                    });
                }


            })
            .catch(alert);
    }
    //Показати фільм
    function getMovie(id) {
        progress_toggle();
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(function (response) {
                console.log('-------Content-Type---------', response.headers.get('Content-Type')); // application/json; charset=utf-8
                console.log('------status--------', response.status); // 200

                return response.json();
            })
            .then(function (movie) {
                progress_toggle();
                show_movie();
                console.log('--------movie------', movie);
                let html = 
                `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"  />
                    <h1>${movie.title}</h1>
                    <p>
                        ${movie.overview}
                    </p>
                    <h2>Recomendations</h2>
                    <ul>
                        <li>
                            Film
                        </li>
                        <li>
                            Film2
                        </li>
                    </ul>`
                info_movie.innerHTML = html;
                //alert(user.name); // iliakan
            })
            .catch(alert);
    }

    function progress_toggle() {
        if (loading.style.display === "none") {
            loading.style.display = "block";
        } else {
            loading.style.display = "none";
        }
    }

    function show_list() {
        if (list_movie.style.display === "none") {
            list_movie.style.display = "block";
        }
        if (info_movie.style.display === "block") {
            info_movie.style.display = "none";
        }
    }

    function show_movie() {
        if (list_movie.style.display === "block") {
            list_movie.style.display = "none";
        }
        if (info_movie.style.display === "none") {
            info_movie.style.display = "block";
        }
    }






    //// 1. Создаём новый объект XMLHttpRequest
    //var xhr = new XMLHttpRequest();

    //// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    //xhr.open('GET', 'https://api.themoviedb.org/3/movie/550?api_key=951b73be4c735d88b9f7a1a3339d3326', false);

    //// 3. Отсылаем запрос
    //xhr.send();
    
    //// 4. Если код ответа сервера не 200, то это ошибка
    //if (xhr.status != 200) {
        
    //    // обработать ошибку
    //    alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    //} else {
    //   // console.log("Hello", "Peter");
    //    var data = JSON.parse(xhr.responseText);
    //    let list = data.production_companies;
    //    //console.log("list movies", list);
    //    let ul = document.getElementById('list-movies');
    //    ul.innerHTML = "";
    //    for (let i = 0; i < list.length; i++) {
    //        let li = document.createElement('li');
    //        li.innerHTML = `<a href="#" data-id="${list[i].id}" class="moview_link">${list[i].name}</a>`;
    //        ul.appendChild(li);

           
    //        //console.log("list["+i+"]", list[i])
    //    }

    //    var moview_links = document.querySelectorAll('.moview_link');
    //    for (var i = 0; i < moview_links.length; i++) {
    //        moview_links[i].addEventListener('click', function (event) {
    //            console.log('-----event info------', this.getAttribute("data-id"));

    //            //if (!confirm("sure u want to delete " + this)) {
    //            //    event.preventDefault();
    //            //}
    //        });
    //    }
    //    console.log("------------", data);
    //    // вывести результат
    //    //alert(xhr.responseText); // responseText -- текст ответа.
    //}


    //document.getElementById("movies-container").innerHTML = data;
}
