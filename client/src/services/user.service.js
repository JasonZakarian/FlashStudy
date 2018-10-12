import axios from "axios";

const baseUrl = "/api/users";

export function user_Create(payload) {
  axios.post(baseUrl, payload);
}

export function user_Login() {
  axios.post(`${baseUrl}/login`);
}
