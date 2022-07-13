import { client } from './client';

export async function signUp(email, password) {
  const { user } = await client.auth.signUp({ email, password });
  return user;
}

export async function signIn(email, password) {
  const { user } = await client.auth.signIn({ email, password });

  return user;
}


export async function searchMovies(query) {
  const response = await fetch(`https:/api.themoviedb.org/3/search/movie?api_key=f23e10c06f28a5e8fc2f2fc0bfa65aa6&page=1&query=${query}`);
  return response;
  }

export async function logOut() {
  await client.auth.signOut();
}

export function getUser() {
  return client.auth.user();

}