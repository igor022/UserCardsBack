const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const stuffSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [4, 'Minimum password length is 4 characters'],
  }
}, { timestamps: true });

stuffSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

stuffSchema.post('save', function (doc, next) {
  console.log('new stuff member was created', doc);
  next();
});

stuffSchema.statics.login = async function(email, password) {
  const stuff = await this.findOne({ email });
  if (stuff) {
    const auth = await bcrypt.compare(password, stuff.password);
    if (auth) {
      return stuff;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}

const Stuff = mongoose.model('Stuff', stuffSchema);

module.exports = Stuff;