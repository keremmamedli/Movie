import { BASE_URL } from "../constant.js";

//getAll
export async function getAllMovies(endpoint){
    let obj={
        movies:null,
        error:null
    }
    await axios.get(BASE_URL+endpoint)
    .then((res)=>{
        obj.movies=res.data;
    }).catch((err)=>{
        obj.error=err;
    })
    return obj;
}

//getOne
export async function getOneMovie(endpoint,id){
    let obj = {
        movies: null,
        error: null
    };
    await axios.get(BASE_URL+endpoint+`/${id}`)
    .then((res)=>{
        obj.movies = res.data;
    }).catch((err)=>{
        obj.movies = err;
    });

    return obj;
}

//post
export async function postMovies(endpoint,payload){
    const response=await axios.post(BASE_URL+endpoint, payload);
    return response;
}
//delete
export async function deleteMoviesByID(endpoint,id){
    let response=null;
    await axios.delete(BASE_URL +endpoint+`/${id}`)
     .then((res)=>{
     response=res;
    }).catch((err)=>{
     response=err;
    })
     return response;
}

//put
export async function update(endpoint,id,payload){
    const response=await axios.put(BASE_URL+endpoint+`/${id}`,payload);
    return response;
}
