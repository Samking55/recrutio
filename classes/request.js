// handle all type of request

// import SecureStore from "expo-secure-store";
import * as SecureStore from "expo-secure-store";

class RequestHandler {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // load token
  async loadToken() {
    const token = await SecureStore.getItemAsync("auth_token");
    return token;
  }

  //   handle get request with the path
  async get({ path }) {
    const token = await this.loadToken();

    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        message: response.error || response.message,
        status_code: request.status,
      };
    }

    return response;
  }

  //   post method
  async post({ path, body }) {
    // load token
    const token = await this.loadToken();

    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      method: "POST",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        message: response.error || response.message,
        status_code: request.status,
      };
    }

    return response;
  }

  //   put method
  async put({ path, body }) {
    // load token
    const token = await this.loadToken();

    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      method: "PUT",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        message: response.error || response.message,
        status_code: request.status,
      };
    }

    return response;
  }

  //   pacth method
  async patch({ path, body }) {
    // load token
    const token = await this.loadToken();

    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      method: "PATCH",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        message: response.error || response.message,
        status_code: request.status,
      };
    }

    return response;
  }

  //   delete method
  async delete({ path }) {
    // load token
    const token = await this.loadToken();

    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      method: "DELETE",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        message: response.error || response.message,
        status_code: request.status,
      };
    }

    return response;
  }
}

export default RequestHandler;
