import { redirect } from "react-router-dom";
import { store } from "../app/store";

export const requireAuth = () => {
  const { user } = store.getState().auth;
  if (!user) throw redirect("/login");
  return null;
};

export const redirectIfLoggedIn = () => {
  const { user } = store.getState().auth;

  if (user) {
    throw redirect("/");
  }

  return null;
};
