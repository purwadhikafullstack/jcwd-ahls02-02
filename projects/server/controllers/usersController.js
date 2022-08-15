const fs = require("fs");

module.exports = {
  register: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  login: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  keepLogin: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  verifyAccount: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // resend verification email
  resendVerification: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // send reset/forgot password  link
  forgotPassword: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // when user wants to reset password after click reset/forgot password link
  resendVerification: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // get user profile data
  userProfile: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // edit user general info
  editProfile: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  editProfilePicture: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // change password via profile page (needs to input old password for confirmation)
  changePassword: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // get user profile data
  addAddress: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // TBD apakah add & edit bisa jadi 1
  editAddress: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },

  getUserCart: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  addProductToCart: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  editProductInCart: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  deleteProductInCart: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  getOrderList: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // when users checkouts products OR
  addOrder: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // updates order status, send status_before and status_after
  updateOrder: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  uploadPaymentReceipt: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // get user prescription list
  getPrescriptionList: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  uploadPrescription: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
};
