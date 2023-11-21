import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    sender: {
      type: Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    recipient: {
      type: Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    content: {
      type: String,
      required: true
    },
    seen: {
      type: Boolean,
      default: false
    },
    delivered: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  const Message = mongoose.model('Message', messageSchema);
  export default Message; 
  