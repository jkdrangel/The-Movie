import { API_KEY } from '../keys'

const BASE_URL = 'https://api.themoviedb.org/3'

const searchMovie = (query = 'vingadores', page = 1) => {
  return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${page}&include_adult=false`).then(res => res.json())
}

const getMovie = (id) => {
  return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR&include_adult=false`).then(res => res.json())
}

const getVideos = (id) => {
  return fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`).then(res => res.json())
}

export {
  searchMovie,
  getMovie,
  getVideos
}
