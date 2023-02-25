const User = require("../Models/UsersModel");
const Carts = require("../Models/CartsModel");
const History = require("../Models/HistoryModel");
const Pays = require("../Models/PayUsersModel");
const { verify } = require("jsonwebtoken");

const { createTokens, validateToken } = require("../Jwt/jwt");

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      return res.status(200).json({
        data,
      });
    })
    .catch((err) => next(err));
};

const CreateUsers = async (req, res, next) => {
  const data = await User.find({ user_name: req.body.user_name });
  if (data.length === 0) {
    const newUsers = await new User(req.body);
    newUsers
      .save()
      .then(async (data) => {
        const id = {
          id_user: data._id,
        };
        const cart = await new Carts(id).save();
        const history = await new History(id).save();
        const pay = await new Pays(id).save();
        return {
          data,
          cart,
          history,
          pay,
        };
      })
      .then(async (data) => {
        const dataUSer = await User.findById(data.data._id);
        dataUSer.carts.push(data.cart._id);
        dataUSer.pays.push(data.pay._id);
        dataUSer.histories.push(data.history._id);
        dataUSer.save();
        return res.status(200).json({
          data: dataUSer,
        });
      })
      .catch((err) => next(err));
  } else {
    return res.status(200).json({
      mess: "đã tồn tsại",
    });
  }
};

const getUser = (req, res, next) => {
  User.find({ _id: req.params.ID })
    .then((data) => {
      return res.status(200).json({
        data,
      });
    })
    .catch((err) => next(err));
};

const patchUser = (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.ID }, req.body)
    .then(async () => {
      return await User.find({ _id: req.params.ID });
    })
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => next(err));
};

const deleteUser = async (req, res, next) => {
  const dataUser = await User.findById({ _id: req.params.ID });

  if (dataUser) {
    await Carts.findByIdAndDelete({ _id: dataUser.carts });
    await History.findByIdAndDelete({ _id: dataUser.histories });
    await Pays.findByIdAndDelete({ _id: dataUser.pays });
    User.findByIdAndDelete({ _id: req.params.ID })
      .then(() => {
        return res.status(200).json({ mess: "delete success!!!" });
      })
      .catch((err) => next(err));
  } else {
    return res.status(200).json({ mess: "delete error." });
  }
};

const loginUser = async (req, res, next) => {
  const { user_name, user_pass } = req.body;
  const user = await User.findOne({
    user_name,
    user_pass,
  });
  if (user) {
    const { user_pass, ...other } = user._doc;
    const accessToken = createTokens({ ...other });

    // res.cookie("accessToken", accessToken, {
    //   maxAge: 60 * 60 * 24 * 30 * 1000,
    //   httpOnly: true,
    // });

    res.setHeader("SetCookie", "cookieName=cookieValue; HttpOnly");

    const dataUser = validateToken(accessToken);
    const dataCarts = await Carts.findById({ _id: dataUser.carts });
    const dataHistoriess = await History.findById({ _id: dataUser.histories });
    const dataPays = await Pays.findById({ _id: dataUser.pays });
    const dataTotal = {
      dataCarts,
      dataHistoriess,
      dataPays,
    };
    return res.status(200).json({
      mess: "Đăng nhập thành công!!!",
      status: true,
      token: accessToken,
      dataTotal,
      data: dataUser,
    });
  } else {
    return res.status(200).json({
      mess: "Thông tin tài khoản hoặc mật khẩu không chính xác. Vui lòng đăng nhập lại.",
    });
  }
};

module.exports = {
  getAllUsers,
  CreateUsers,
  getUser,
  patchUser,
  deleteUser,
  loginUser,
};
