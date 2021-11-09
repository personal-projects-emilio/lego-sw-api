import { Schema, model } from 'mongoose';

const MinifigSchema = new Schema<Minifig>({
  _id: {
    type: String,
    required: [true, 'Please add an id'],
    match: [/^sw[0-9]{4}[abcds]?$/, 'Please add a valid id (ex: sw0001)'],
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  characterName: {
    type: String,
    required: [true, 'Please add a character name'],
    trim: true,
    maxlength: [100, 'Name can not be more than 100 characters']
  },
  possessed: {
    type: Boolean,
    required: true,
  },
  tags: {
    type: [String],
    default: undefined
  },
}, {
  // Remove the _id and __v field from the returned json and set id to the _id value
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (_, ret) => { delete ret._id }
  },
  toObject: {
    versionKey: false,
    virtuals: true,
    transform: (_, ret) => { delete ret._id }
  }
})

const MinifigModel = model<Minifig>('Minifig', MinifigSchema);

export default MinifigModel;