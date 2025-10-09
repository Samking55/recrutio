import RequestHandler from "../classes/request";

const request = new RequestHandler("http://192.168.1.192:8000/api/v1/user");

const UserApi = {
  getUser: async () => {
    return request.post({ path: "info" });
  },

  updateUser: async (body) => {
    return request.patch({ path: "info/update", body });
  },
};

export default UserApi;
