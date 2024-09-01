import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const donorSchema = new Schema({
  foodItem: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  pickupAddress: {
    type: String,
    required: true,
    trim: true
  },
  chooseState: {
    type: String,
    required: true,
    trim: true
  },
  chooseCity: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  contactPersonNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
}, { timestamps: true });

const Donor = model('Donor', donorSchema);

export default Donor;