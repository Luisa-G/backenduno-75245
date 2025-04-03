const mongoose = require ("mongoose")

const cartsSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Types.ObjectId,
            ref: "products",
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            default: 1
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
)

const cartModel = mongoose.model(
  "carts",
  cartsSchema
)

module.exports = cartsModel