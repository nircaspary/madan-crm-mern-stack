const mongoose = require('mongoose');
const faultSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'You must fill fault description'],
      // minlength: 10,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: [true, 'You must fill your ID'],
    },

    fileUpload: String,

    team: {
      type: String,
      default: 'help desk',
      enum: ['help desk', 'tech', 'lab', 'info'],
    },
    isDone: { type: Boolean, default: false },
    completed_at: { type: Date, default: '' },
    images: Array,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Virtual populate
faultSchema.virtual('logs', {
  ref: 'faultLog',
  foreignField: 'fault',
  localField: '_id',
});

faultSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user_id', select: '-__v -passwordResetToken -passwordChangedAt' });
  next();
});

const Fault = mongoose.model('fault', faultSchema);
module.exports = Fault;
