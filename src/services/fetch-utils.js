import { client } from './client';

export async function signUp(email, password) {
  const { user } = await client.auth.signUp({ email, password });
  return user;
}

export async function signIn(email, password) {
  const { user } = await client.auth.signIn({ email, password });

  return user;
}

export async function logOut() {
  await client.auth.signOut();
}

export function getUser() {
  return client.auth.user();
}