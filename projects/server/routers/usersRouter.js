const { usersController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require('../config/encription');

route.get("/userData", usersController.userData)
route.post("/register", usersController.register);
route.post("/login", usersController.login);
route.get("/login/keep", readToken, usersController.keepLogin);
route.get("/tokenData", readToken, usersController.tokenData);
route.patch("/verify", readToken, usersController.verifyAccount);
route.patch("/verify/send", readToken, usersController.resendVerification);
route.patch("/forgotPassword", usersController.forgotPassword);
route.patch("/resetPassword", readToken, usersController.resetPassword);

route.get("/profile", readToken, usersController.userProfile);
route.patch("/profile/:user_id", readToken, usersController.editProfile);
route.patch("/profile/profile-picture/:user_id", readToken, usersController.editProfilePicture);
route.patch("/profile/password/:user_id", readToken, usersController.changePassword);
route.post("/profile/address/:user_id", readToken, usersController.addAddress);
route.patch("/profile/address/:user_id", readToken, usersController.editAddress);
route.patch("/profile/default-address/:user_id", readToken, usersController.editDefaultAddress);
route.delete("/profile/address/:user_id", readToken, usersController.deleteAddress);

route.get("/cart/:user_id", readToken, usersController.getUserCart);
route.post("/cart/:user_id", readToken, usersController.addProductToCart);
route.patch("/cart/:user_id", readToken, usersController.editProductInCart);
route.delete("/cart/:user_id/:cart_id", readToken, usersController.deleteProductInCart);

route.get("/order/:user_id", readToken, usersController.getOrderList);
route.post("/order/:user_id", readToken, usersController.addOrder);
route.patch("/order/:user_id", readToken, usersController.updateOrder);
// route.delete("/order/:user_id", readToken, usersController.cancelOrder);
route.patch("/order/payment/:user_id", readToken, usersController.uploadPaymentReceipt);

route.get("/prescription/:user_id", usersController.getPrescriptionList);
route.post("/prescription/:user_id", readToken, usersController.uploadPrescription);

module.exports = route