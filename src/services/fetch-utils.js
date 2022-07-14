import { client } from './client';

export async function signUp(email, password) {
  const { user } = await client.auth.signUp({ email, password });
  return user;
}

export async function signIn(email, password) {
  const { user } = await client.auth.signIn({ email, password });

  return user;
}

export async function searchMovies(searchQuery) {
  const rawData = await fetch(`/.netlify/functions/movie?title=${searchQuery}`);
  const data = await rawData.json();
  return data;
}

export async function searchSingleMovie(id) {
  const rawData = await fetch(`/.netlify/functions/singleMovie?id=${id}`);
  const data = await rawData.json();
  return data;
}

export async function logOut() {
  await client.auth.signOut();
}

export function getUser() {
  return client.auth.user();
}

export async function createFavorites(favorites) {
  const data = await client.from('movie_project').insert(favorites);
  return data;
}

export async function getFavorites(id) {
  const { body } = await client.from('movie_project').select('*').match({ user_id: id });

  return body;
}