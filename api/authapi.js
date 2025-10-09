import RequestHandler from "../classes/request";
import * as SecureStore from "expo-secure-store";

const request = new RequestHandler("http://192.168.1.192:8000/api/v1");

const AuthApi = {
  // register method
  signUp: async ({
    first_name,
    second_name,
    email,
    password,
    password_confirmation,
  }) => {
    return await request.post({
      path: "signup",
      body: { first_name, second_name, email, password, password_confirmation },
    });
  },

  // login method
  signIn: async ({ email, password }) => {
    return await request.post({
      path: "signin",
      body: {
        email,
        password,
      },
    });
  },

  //   logout user
  signOut: async () => {
    return await request.post({
      path: "signout",
    });
  },

  // get user info
  userInfo: async () => {
    return await request.post({
      path: "user/info",
    });
  },

  // save user's token locally
  saveToken: async ({ token }) => {
    await SecureStore.setItemAsync("auth_token", token);
  },

  // get user's token locally
  getToken: async () => {
    return await SecureStore.getItemAsync("auth_token");
  },

  //   delete user token
  deleteToken: async () => {
    return await SecureStore.deleteItemAsync("auth_token");
  },

  //   check if user is logged im
  isLoggedIn: async () => {
    const token = await SecureStore.getItemAsync("auth_token");
    if (token) {
      return true;
    } else {
      return false;
    }
  },
};

export default AuthApi;
