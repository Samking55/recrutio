// handle all type of request

class RequestHandler {
  __construct(baseUrl) {
    this.baseUrl = baseUrl;
  }

  //   handle get request with the path
  async get({ path }) {
    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        error: response.error,
        status_code: request.status,
      };
    }

    return response;
  }

  //   post method
  async post({ path, body }) {
    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        error: response.error,
        status_code: request.status,
      };
    }

    return response;
  }

  //   put method
  async put({ path, body }) {
    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: "PUT",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        error: response.error,
        status_code: request.status,
      };
    }

    return response;
  }

  //   pacth method
  async patch({ path, body }) {
    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: "PATCH",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        error: response.error,
        status_code: request.status,
      };
    }

    return response;
  }

  //   delete method
  async delete({ path }) {
    const request = await fetch(`${this.baseUrl}/${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      method: "DELETE",
    });
    const response = await request.json();
    if (!request.ok) {
      throw {
        error: response.error,
        status_code: request.status,
      };
    }

    return response;
  }
}
