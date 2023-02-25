const express = require("express");
const UsersRouter = express.Router();

const UserController = require("../Controllers/UsersControllers");

UsersRouter.route("/")
  .get(UserController.getAllUsers)
  .post(UserController.CreateUsers);

UsersRouter.route("/login")
  .post(UserController.loginUser);

UsersRouter.route("/:ID")
  .get(UserController.getUser)
  .patch(UserController.patchUser)
  .delete(UserController.deleteUser);

module.exports = UsersRouter;
