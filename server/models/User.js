import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    region:{
      type:String,
      required:true,
    },
    avatar: {
      type: String,
      default: "http://localhost:5173/public/default-avatar.jpg",
    },
    background:{
      type:String,
      default: "https://assets.therealworld.ag/backgrounds/01J5N9WZ5FQA1YH4F1H4E2YA1P?max_side=256",
    },
    bio:{
      type:String,
      default: "",
    },
    coin:{
      type:Number,
      default: 0,
    },
    lastEnter:{
      type:Date,
      default: Date.now()
    },
    blocklist: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    trialStartDate: { type: Date, default: Date.now },
    trialEndDate: { type: Date },
    role: {
      type: String,
      enum: ["admin", "moderator", "lab", "store", "dentist"],
    },
    isPaid: { type: Boolean, default: false },
    refreshToken: { type: String },
    proofOfProfession: {
      type: String,
      required: function() {
        return !['admin', 'moderator'].includes(this.role);
      }
    },

    // Stripe Integration Fields
    stripeCustomerId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values without a unique constraint conflict
    },
    stripeSubscriptionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
      enum: ["monthly", "quarterly", "yearly","freeTrial"],
      default:"freeTrial"
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    // Friend functionality
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    journey:[
      {
        content:String,
        images: [{ type: String }],
        date:Date,
        chanTitle:String,
        chanId:{
          type: mongoose.Schema.Types.ObjectId,
        }
      }
    ],
    moreRole: [{
      name: { type: String }
    }]
  },
  {
    timestamps: true,
  }
);

// Hash password before saving user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Set trial end date (7 days from trialStartDate) if not already set
    if (!this.trialEndDate) {
      this.trialEndDate = new Date(this.trialStartDate);
      this.trialEndDate.setDate(this.trialEndDate.getDate() + 7);
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Compare provided password with stored hashed password
userSchema.methods.comparePassword = async function (password) {
  console.log("Comparing:", password, "with hash:", this.password);
  return await bcrypt.compare(password, this.password);
};

// Update subscription status method for handling Stripe events
userSchema.methods.updateSubscriptionStatus = function (status, startDate, endDate) {
  this.subscriptionStatus = status;
  this.subscriptionStartDate = startDate || this.subscriptionStartDate;
  this.subscriptionEndDate = endDate || this.subscriptionEndDate;
  return this.save();
};

// Payment plan update method
userSchema.methods.updateSubscriptionPlan = function (plan) {
  this.subscriptionPlan = plan;
  return this.save();
};
userSchema.pre("save", function(next) {
  console.log("Pre-save hook - subscriptionPlan:", this.subscriptionPlan);
  console.log("Is subscriptionPlan defined?", this.subscriptionPlan !== undefined);
  console.log("subscriptionPlan type:", typeof this.subscriptionPlan);
  next();
});
const User = mongoose.model("User", userSchema);

export default User;
