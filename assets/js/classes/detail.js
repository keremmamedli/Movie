
import { endpoints } from "../API/constant.js";
import { getOneMovie } from "../API/request/index.js"


const url = new URLSearchParams(window.location.search);
console.log('url : ' +url)
const id = url.get("id"); 

const wrapper=document.querySelector('.wrapper');
window.addEventListener('load', async () => {
    try {
        const movieData = await getOneMovie(endpoints.movies, id); 
        if (movieData && movieData.movies) {
            drawDetailPage(movieData.movies);
        } else {
            console.error('Movie data is empty or undefined:', movieData.error);
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
});

function drawDetailPage(movie) {
    wrapper.innerHTML = ''; 
    wrapper.innerHTML = `
    <div class="col-8">
    <div class="card">
        <div class="card-img">
            <img class="card-img-top" src="${movie.poster}"
                alt="">
        </div>

        <div class="card-body">
            <h3 class="card-title text-center">${movie.title}</h3>
                <p class="lead movie-desc">${movie.description}</b></p>
                <p class="country">Country: <b id="country">${movie.country} </b> <span>|Directed by <span id="director">${movie.director}</span></span></p>
            <div class="d-flex justify-content-between align-items-center">

                <div class="age-rest">
                    <span id="age">${movie.ageRestriction}</span>
                </div>
             
            </div>
            <hr>
            <button class="btn btn-outline-danger go-back-btn">Go Back</button>
           


        </div>
    </div>
</div>
    `;
    document.querySelector('.go-back-btn').addEventListener('click', function() {
        window.history.back();
    });
}

