import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userShema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    profession: {
      type: String,
      required: [true, "Profession is required"],
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
      minlength: [6, "password must be at least 6 caracters long"],
    },
    isBanned: {
      type: Boolean,
    },
    avatar: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    },
    blocklist: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    trialStartDate: { type: Date, default: Date.now }, // Track when the trial starts
    trialEndDate: { type: Date }, // Store end date directly
    role: {
      type: String,
      enum: ["admin", "moderator", "lab", "store", "dentist"],
      // default: 'customer'
    },
    isPaid: { type: Boolean, default: false }, // Track payment status
    refreshToken: { type: String }, // Store refresh tokens
  },
  {
    timestamps: true, // this put the created at and the updated at to the user object
  }
);

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Calculate trial end date (7 days from trialStartDate)
    this.trialEndDate = new Date(this.trialStartDate);
    this.trialEndDate.setDate(this.trialEndDate.getDate() + 7);
    next();

    next();
  } catch (error) {
    next(error);
  }
});

userShema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userShema);

export default User;
