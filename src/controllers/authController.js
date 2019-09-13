import bcrypt from "bcryptjs";
import { Auth, hashPassword } from "../helpers/helpers";
import { Blacklist, User } from "../db/models";
import { sendEmail } from "../helpers/sendMail"

const { generateToken, verifyToken } = Auth;

/**
 * @description Authentication Controller
 * @class AuthController
 */
class AuthController {
  /**
   *
   * @constructor
   * @description signup a user
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AuthController
   */
  static async createAccount(req, res) {
    try {
      const { fullName, email, password } = req.body;
      const hashedpassword = hashPassword(password);

      const values = { fullName, email, password: hashedpassword };
      const result = await User.create(values);
      const { id } = result;
      const token = await generateToken({ id, email });

      return res.status(201).json({
        status: 201,
        message: "Your account has been created, you may now login",
        token
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   *
   *@description logs in autheticated user
   * @static
   * @param {object} req the request body
   * @param {object} res the response body
   * @returns {object} res
   * @memberof AuthController
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await User.findOne({ where: { email } });
      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          const { id } = result;
          const token = await generateToken({ id, email });

          const user = {
            id: result.id,
            fullName: result.fullName,
            email: result.email,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
          };

          return res.status(200).json({
            status: 200,
            message: "User Login successful",
            token,
            data: [user]
          });
        }
        return res.status(401).json({
          status: 401,
          message: "Invalid email or password"
        });
      }
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password"
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   *
   *@description Logout a user
   * @param {object} req the request body
   * @param {object} res the response body
   * @returns {object} res
   * @memberof AuthController
   */
  static async logOut(req, res) {
    const { token } = req.headers || req.body || req.query;
    try {
      await Blacklist.create({
        token
      });
      return res.status(200).json({
        status: 200,
        message: "User successfully logged out"
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   *
   * @constructor
   * @description reset password
   * @static
   * @param {object} req
   * @param 'string' res
   * @memberof AuthController
   */
  static async resetLink(req, res) {
    try {
      const { email } = req.body;
      ;
      const result = await User.findOne({ where: { email } });

      if(!result){
        return res.status(400).json({
          status: 400,
          message: "No user with the provided email, please check email or signup",

        });
      }

      const { id }  = result;
      const token  = await generateToken({id});


      const { dataValues } = result;

      let user = dataValues;

      await sendEmail(user, token);


    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  static async resetPassword(req, res){
      try {
          const { password } = req.body
          // const { id } = req.params.id
          // console.log(req.params)
          const verify = await verifyToken(req.params.token)
          const {id} = verify
          console.log(id)
          const hashedpassword = hashPassword(password);
          await User.update({ password: hashedpassword }, { where: { id } });
          return res.status(200).json({
              message: 'You have reset your password Successfully!'
          });



      }catch (error) {
          return res.status(500).json({
              status: 500,
              message: error.message
          });
      }
  }
}

export default AuthController;
