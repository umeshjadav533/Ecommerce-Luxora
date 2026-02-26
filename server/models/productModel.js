import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["men", "women", "kids", "unisex"],
      default: "unisex",
      index: true,
    },

    subCategory: {
      type: String,
      required: true,
      enum: ["clothing", "perfume", "shoes", "watch", "accessories"],
      index: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    sku: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },

    mrpPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    variants: [
      {
        color: {
          name: {
            type: String,
            required: true,
            trim: true,
          },
        },

        images: [
          {
            type: String,
            required: true,
          },
        ],

        stock: {
          type: Number,
          default: 0,
          min: 0,
        },

        sizes: [
          {
            size: {
              type: String,
              lowercase: true,
              trim: true,
            },
            stock: {
              type: Number,
              default: 0,
              min: 0,
            },
          },
        ],
      },
    ],

    tags: {
      type: [String],
      default: [],
    },

    onSale: {
      type: Boolean,
      default: false,
    },

    warrantyMonths: {
      type: Number,
      default: 0,
      min: 0,
    },

    returnDays: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

/* Total Stock Auto Handle (With or Without Size) */
productSchema.virtual("totalStock").get(function () {
  return this.variants.reduce((total, variant) => {
    // If sizes exist → calculate from sizes
    if (variant.sizes && variant.sizes.length > 0) {
      const sizeStock = variant.sizes.reduce(
        (sum, size) => sum + size.stock,
        0,
      );
      return total + sizeStock;
    }

    // If no sizes → use direct stock
    return total + variant.stock;
  }, 0);
});

const Product = mongoose.model("Product", productSchema);

export default Product;
