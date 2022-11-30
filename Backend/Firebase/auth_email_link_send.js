const {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} = require("firebase/auth");
const { auth } = require("./Firebase");

const creatUser = async (email, password) => {
  const userCred = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  sendEmailVerification(userCred.user).then(() => {
    console.log(`sendEmailVerification to ${email}`);
  });
  return userCred;
};

const userSignIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

module.exports = {
  creatUser: creatUser,
  userSignIn: userSignIn
};
