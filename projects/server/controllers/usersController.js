const fs = require("fs");
const { dbConf, dbQuery } = require("../config/database");
const { hashPassword, createToken } = require("../config/encription");
const { transporter } = require("../config/nodemailer");
const { uploader } = require("../config/uploader");

module.exports = {
  userData: async (req, res, next) => {
    try {
      // let allUserData = await dbQuery(`Select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users;`)
      let allUserData = await dbQuery(`Select email from users;`);
      return res.status(200).send(allUserData);
    } catch (error) {
      return next(error);
    }
  },
  tokenData: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        let result = await dbQuery(
          `Select name, token_verification, token_reset from users where id = '${req.dataUser.id}';`
        );

        // let { id, role, name, email, phone_number } = result[0]
        // let token = createToken({ id, role, name, email, phone_number })
        return res.status(200).send(result[0]);
      } else {
        return res.status(401).send({
          success: false,
          message: "Token expired",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, email, phone_number, password } = req.body;

      let insertData = await dbQuery(
        `Insert into users (name, email, phone_number, password) values ('${name}', '${email}', '${phone_number}', '${hashPassword(
          password
        )}');`
      );

      if (insertData.insertId) {
        let result = await dbQuery(
          `Select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where id='${insertData.insertId}';`
        );

        let { id, role, name, email, phone_number } = result[0];

        let token = createToken({ id, role, name, email, phone_number });

        await dbQuery(
          `Update users set token_verification = '${token}' WHERE id=${insertData.insertId};`
        );

        let verificationEmail = fs
          .readFileSync("./mail/verification.html")
          .toString();

        verificationEmail = verificationEmail.replace("#name", name);
        verificationEmail = verificationEmail.replace(
          "#token",
          `${process.env.FE_URL}/auth/verification/${token}`
        );

        await transporter.sendMail({
          from: "LifeServe Admin",
          to: email,
          subject: "Email Verification",
          html: `${verificationEmail}`,
        });

        return res.status(200).send({ ...result[0], token });
      } else {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let result = await dbQuery(
        `Select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where email='${email}' and password='${hashPassword(
          password
        )}';`
      );
      if (result.length == 1) {
        let { id, role, name, email, phone_number } = result[0];
        let token = createToken({ id, role, name, email, phone_number });
        return res.status(200).send({ ...result[0], token });
      } else {
        let checkEmail = await dbQuery(
          `Select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where email='${email}';`
        );
        if (checkEmail.length == 1) {
          return res.status(404).send({
            success: false,
            message: "Password Incorrect",
          });
        } else {
          return res.status(404).send({
            success: false,
            message: "User not found",
          });
        }
      }
    } catch (error) {
      return next(error);
    }
  },
  keepLogin: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        let result = await dbQuery(
          `Select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where id = '${req.dataUser.id}';`
        );

        let { id, role, name, email, phone_number } = result[0];
        let token = createToken({ id, role, name, email, phone_number });
        return res.status(200).send({ ...result[0], token });
      } else {
        return res.status(401).send({
          success: false,
          message: "Token expired",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  verifyAccount: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        let token = await dbQuery(
          `select token_verification from users WHERE id = ${req.dataUser.id}`
        );

        if (req.token == token[0].token_verification) {
          await dbQuery(
            `UPDATE users SET verified_status = 'verified' WHERE id = ${req.dataUser.id}`
          );
          let result = await dbQuery(
            `Select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where id = '${req.dataUser.id}';`
          );

          let { id, role, name, email, phone_number } = result[0];

          let finalToken = createToken({ id, role, name, email, phone_number });

          await dbQuery(
            `Update users set token_verification = '${finalToken}' WHERE id=${req.dataUser.id};`
          );

          return res.status(200).send({ ...result[0], finalToken });
        } else {
          return res.status(404).send({
            success: false,
            message: "Token expired",
          });
        }
      } else {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  // resend verification email
  resendVerification: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        let result = await dbQuery(
          `Select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where id='${req.dataUser.id}';`
        );
        console.log(result);
        let { id, role, name, email, phone_number } = result[0];

        let token = createToken({ id, role, name, email, phone_number });

        await dbQuery(
          `Update users set token_verification = '${token}' WHERE id=${req.dataUser.id};`
        );

        let verificationEmail = fs
          .readFileSync("./mail/verification.html")
          .toString();

        verificationEmail = verificationEmail.replace("#name", name);
        verificationEmail = verificationEmail.replace(
          "#token",
          `${process.env.FE_URL}/auth/verification/${token}`
        );

        await transporter.sendMail({
          from: "LifeServe Admin",
          to: email,
          subject: "Email Verification",
          html: `${verificationEmail}`,
        });

        return res.status(200).send({ ...result[0], token });
      } else {
        return res.status(401).send({
          success: false,
          message: "Token expired",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  // send reset/forgot password  link
  forgotPassword: async (req, res, next) => {
    try {
      let data = await dbQuery(
        `Select id, role, name, phone_number, email from users where email='${req.body.email}';`
      );

      let { id, role, name, email, phone_number } = data[0];
      let token = createToken({ id, role, name, email, phone_number });

      await dbQuery(
        `Update users set token_reset = '${token}' WHERE email='${req.body.email}';`
      );
      let finalResult = dbQuery(
        `Select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where email='${req.body.email}';`
      );

      let resetPassword = fs
        .readFileSync("./mail/resetPassword.html")
        .toString();

      resetPassword = resetPassword.replace("#fullname", name);
      resetPassword = resetPassword.replace(
        "#token",
        `${process.env.FE_URL}/auth/reset/${token}`
      );

      await transporter.sendMail({
        from: "Lifeserve Admin",
        to: email,
        subject: "Reset Password",
        html: `${resetPassword}`,
      });
      return res.status(200).send({ ...finalResult[0], token });
    } catch (error) {
      return next(error);
    }
  },
  // when user wants to reset password after click reset/forgot password link
  resetPassword: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        await dbQuery(
          `Update users set password='${hashPassword(
            req.body.password
          )}', token_reset = '' WHERE id=${req.dataUser.id}`
        );

        return res.status(200).send({
          success: true,
          message: "Password reset success",
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "Token expired",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  // get user profile data
  userProfile: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        const resUser = await dbQuery(
          `select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where id=${req.dataUser.id}`
        );
        return res.status(200).send({
          success: true,
          message: "User data fetched successfully",
          data: resUser[0],
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  // edit user general info
  editProfile: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        const userData = await dbQuery(
          `select * from users where id = ${req.dataUser.id}`
        );

        let editScript = "";
        for (userProp in userData[0]) {
          for (dataProp in req.body) {
            if (userProp == dataProp) {
              editScript += `${userProp} = ${dbConf.escape(
                req.body[dataProp]
              )}, `;
            }
          }
        }
        editScript = editScript.substring(0, editScript.length - 2);
        console.log("editScript", editScript);

        await dbQuery(
          `update users set ${editScript} where id = ${req.dataUser.id};`
        );

        const newUserData = await dbQuery(
          `select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where id = ${req.dataUser.id}`
        );

        const {
          id,
          role,
          verified_status,
          name,
          email,
          phone_number,
          profile_picture,
          birthdate,
          gender,
        } = newUserData[0];

        const newToken = createToken({
          id,
          role,
          name,
          email,
          phone_number,
        });

        return res.status(200).send({
          success: true,
          message: "User data updated successfully",
          data: newUserData[0],
          token: newToken,
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  editProfilePicture: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        const uploadFile = uploader("/imgUsers", "IMGUSERS").array("image", 1);
        uploadFile(req, res, async (error) => {
          try {
            //remove from directory if user have profile_picture
            try {
              const currentPicture = await dbQuery(
                `select profile_picture from users where id=${req.dataUser.id}`
              );
              if (currentPicture[0].profile_picture) {
                fs.unlinkSync(`./public/${currentPicture[0].profile_picture}`);
              }
            } catch (error) {
              return next(error);
            }

            const newFileName = req.files[0]
              ? `'/imgUsers/${req.files[0].filename}'`
              : null;

            const changePicture = await dbQuery(
              `update users set profile_picture=${newFileName} where id=${req.dataUser.id};`
            );

            if (changePicture) {
              const newUserData = await dbQuery(
                `select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where id = ${req.dataUser.id}`
              );

              const {
                id,
                role,
                verified_status,
                name,
                email,
                phone_number,
                profile_picture,
                birthdate,
                gender,
              } = newUserData[0];

              const newToken = createToken({
                id,
                role,
                name,
                email,
                phone_number,
              });

              return res.status(200).send({
                success: true,
                message: "Profile picture successfully updated!",
                data: newUserData[0],
                token: newToken,
              });
            }
          } catch (error) {
            return next(error);
          }
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  // change password via profile page (needs to input old password for confirmation)
  changePassword: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        let password = hashPassword(req.body.data.password);
        let newPassword = hashPassword(req.body.data.newPassword);

        const userData = await dbQuery(
          `select password from users where id=${req.dataUser.id}`
        );

        if (userData[0].password !== password) {
          return res.status(200).send({
            success: false,
            message: "Your old password does not match",
          });
        } else {
          await dbQuery(
            `Update users set password='${newPassword}' where id = ${req.dataUser.id};`
          );
          return res.status(200).send({
            success: true,
            message: "Password updated successfully",
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          message: "Please login to continue",
        });
      }
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
