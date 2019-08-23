import { auth } from '../firebase';

export const getCurrentUser = _ =>
  new Promise((resolve, reject) => auth.onAuthStateChanged(user => resolve(user), reject));

export const getAccessToken = async _ => {
  const user = await getCurrentUser();
  if (!user) return;
  const token = await user.getIdToken();
  return { token };
};
