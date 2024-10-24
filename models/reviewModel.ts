import { Document, Model, model, models, ObjectId, Schema } from "mongoose";

interface ReviewDocument extends Document {
  _id: ObjectId;
  userId: ObjectId;
  product: ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const ReviewModel = models.Review || model("Review", reviewSchema);

export default ReviewModel as Model<ReviewDocument>;
