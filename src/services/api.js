import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const options = {
  headers: {
    Authorization: API_TOKEN,
    accept: 'application/json',
  },
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get('/trending/movie/day', options);
  return data;
};

export const searchMovies = async query => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data;
};

export const getMovieDetails = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}`, options);
  return data;
};

export const getMovieCredits = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`, options);
  return data;
};

export const getMovieReviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`, options);
  return data;
};