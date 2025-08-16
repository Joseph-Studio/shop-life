import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, default: 1, min: 1 }
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema]
}, { timestamps: true });


export default mongoose.models?.Cart || mongoose.model('Cart', cartSchema);