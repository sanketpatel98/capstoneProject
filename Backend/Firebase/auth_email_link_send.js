const {
  createUserWithEmailAndPassword,
  sendEmailVerification,
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

module.exports = {
  creatUser: creatUser,
};
