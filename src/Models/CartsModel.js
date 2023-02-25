const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const CartsSchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cart_data: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongodb.model("Cart", CartsSchema);
module.exports = Cart;
