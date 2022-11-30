import axios from "axios";

const API_URL =
  Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

export const userSignIn = (email, password) => {
  // recipesInstructionById
  return axios({
    method: 'post',
    url: `${API_URL}/userSignIn`,
    data: {
      email: email,
      password: password
    }
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
