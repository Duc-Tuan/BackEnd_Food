const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const PaySchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pay_data: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Pay = mongodb.model("pay", PaySchema);
module.exports = Pay;
