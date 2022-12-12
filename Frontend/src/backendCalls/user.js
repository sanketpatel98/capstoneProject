import axios from "axios";

// const API_URL =
//   Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

  const API_URL = "http://3.15.46.15:3000"

// const API_URL = 'https://capstoneprojectlevelthree.herokuapp.com'

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

export const userSignUp = (email, password) => {
    // recipesInstructionById
    return axios({
      method: 'post',
      url: `${API_URL}/createUser`,
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