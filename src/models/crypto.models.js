import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price_usd: {
      type: Number,
      required: true,
    },
    market_cap_usd: {
      type: Number,
      required: true,
    },
    change_24h: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Crypto = mongoose.model("Crypto", cryptoSchema);
