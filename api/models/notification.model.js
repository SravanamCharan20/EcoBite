import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const notificationSchema = new Schema({
  donorId: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const Notification = model('Notification', notificationSchema);

export default Notification;