const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const HistoryBuySchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    HistoryBuy_data: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HistoryBuy = mongodb.model("HistoryBuy", HistoryBuySchema);
module.exports = HistoryBuy;
