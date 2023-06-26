import getConfig from 'next/config';
import mongoose from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel()
};

function userModel() {
  const vendorSchema = new Schema({
    vendorId : {type: String, required: true},
    vendorName: { type: String, required: true },
    bankAccountNo: { type: Number, required: true },
    bankName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: Number, required: true }
  });

  const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image : { type: String, required: true },
    vendors: [vendorSchema]
  }, {
    timestamps: true 
  });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}