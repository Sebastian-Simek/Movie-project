import { client } from './client';

export async function signUp(email, password) {
  const { user } = await client.auth.signUp({ email, password });
  return user;
}

export async function signIn(email, password) {
  const { user } = await client.auth.signIn({ email, password });

  return user;
}
