    import { deleteMoviesByID, getAllMovies, getOneMovie,update} from "../API/request/index.js";
    import { endpoints } from "../API/constant.js";
    console.log(getAllMovies(endpoints.movies));  

    const moviesWrapper=document.querySelector('.movies-wrapper');
    let editForm=document.getElementById('edit-form');
    let title=document.getElementById('title');
    let poster=document.getElementById('poster');
    let trailerUrl=document.getElementById('trailerURL');
    let genre=document.getElementById('genre');
    let age=document.getElementById('age');
    let director=document.getElementById('director');
    let country=document.getElementById('country');
    let descript=document.getElementById('description')

    window.addEventListener('load', () => {
        getAllMovies(endpoints.movies).then((res) => {
            if (res.movies) {
                renderMovies(res.movies);
            } else {
                console.error("Failed to load movies: No movies returned.");
            }
        }).catch(err => {
            console.error("Failed to load movies:", err);
        });
    });
    
    function renderMovies(movies) {
        moviesWrapper.innerHTML = ''; 
        movies.forEach(movie => {
            moviesWrapper.innerHTML += `
                <div class="col-lg-3 col-md-6 col-sm-12" data-id="${movie.id}" data-editing="false">
                    <div class="card">
                        <div class="card-img">
                            <img class="card-img-top" src="${movie.poster}" alt="Card image cap">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${movie.title}</h3>
                            <div class="d-flex justify-content-between align-items-center">
                                <button class="btn btn-outline-secondary mb-0">Click for trailer</button>
                                <div class="age-rest"><span>${movie.ageRestriction}</span></div>
                            </div>
                            <hr>
                            <button class="btn btn-outline-primary edit-btn " data-bs-toggle="modal" data-bs-target="#editModal">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <a href="detail.html?id=${movie.id}" class="btn btn-outline-info info-btn">
                                <i class="fa-solid fa-circle-info"></i>
                            </a>
                            <button class="btn btn-outline-danger delete-btn">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
         // Delete button
        let deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                let id = this.closest("div[data-id]").getAttribute("data-id");
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteMoviesByID(id);
                        this.closest("div[data-id]").remove();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    }
                });
            });
        });

        //edit button
        let editBtn=document.querySelectorAll(".edit-btn");
        editBtn.forEach((btn)=>{
            btn.addEventListener('click',async function(){
                let id=this.closest('.col-lg-3').getAttribute('data-id');
            const response=await getOneMovie(endpoints.movies,id);
            const movie=response.movies;
            title.value=movie.title;
            poster.value=movie.poster;
            trailerUrl.value=movie.trailerURL;
            age.value=movie.ageRestriction;
            country.value=movie.country;
            director.value=movie.director;
            genre.value=movie.genre;
            descript.value=movie.description;

            const card = this.closest('.col-lg-3');
            card.setAttribute('data-editing', 'true');


            })
        })
        });
        
    }
    
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let editingCard = document.querySelector(".col-lg-3[data-editing='true']");
        if (editingCard) {
            let id = editingCard.getAttribute('data-id');
            console.log(id);
            const updateMovie = {
                title: title.value,
                genre: genre.value,
                country: country.value,
                director: director.value,
                ageRestriction: age.value,
                poster: poster.value,
                trailerURL: trailerUrl.value,
                description: descript.value
            };

            console.log("Updating movie with ID:", id); 
            console.log("Data to be sent:", updateMovie); 

            update(endpoints.movies, id, updateMovie).then(() => {
                editingCard.querySelector('.card-img-top').src = poster.value;
                editingCard.querySelector('.card-title').textContent = title.value;
                Swal.fire({
                    title: "Movie Updated Successfully!",
                    icon: "success"
                });
            }).catch(error => {
                console.error('Failed to update movie:', error);
            });

            editingCard.removeAttribute('data-editing');
        } else {
            console.error('No editing card found or ID is missing');
        }
    });


    //sort select

    let sortByName = document.querySelector(".sort-by-name-select");
    sortByName.addEventListener('change', async (e) => {
        let sortBy = e.target.value;
        const response = await getAllMovies(endpoints.movies);
        let sortedMovies;
    
        if (sortBy === "az") {
            sortedMovies = [...response.movies].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "za") {
            sortedMovies = [...response.movies].sort((a, b) => b.title.localeCompare(a.title));
        }
    
        if (sortedMovies) {
            renderMovies(sortedMovies);
        }
    });
    