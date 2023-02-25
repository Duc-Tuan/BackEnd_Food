const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const UserSchema = new Schema(
  {
    user_name: {
      type: String,
      require: true,
    },
    user_pass: {
      type: String,
      require: true,
    },
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        default: null,
      },
    ],

    histories: [
      {
        type: Schema.Types.ObjectId,
        ref: "HistoryBuy",
        default: null,
      },
    ],
    pays: [
      {
        type: Schema.Types.ObjectId,
        ref: "pay",
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongodb.model("User", UserSchema);
module.exports = User;
