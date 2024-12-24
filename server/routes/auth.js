import express from "express";
import { signup, login, refresh, logout, userData,
  updateUserName,updateUserEmail,updateUserPassword,
  updateUserDescription,uploadUserAvatar,getAllUsers
  ,uploadBackground,deleteUser
} from "../controllers/auth.js";
import { authenticateToken } from "../middlewares/auth.js";
import multer from "multer";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getUserData",userData);
router.post("/refresh", refresh);
router.post("/logout", authenticateToken, logout);
router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});
router.get("/getAll/users",getAllUsers);
router.put("/update/username", updateUserName);
router.put("/update/email", updateUserEmail);
router.put("/update/password", updateUserPassword);
router.put("/update/description",updateUserDescription)
router.delete("/delete/user", deleteUser);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique name for the file
}
});
const upload = multer({ storage }); // Use 'storage' instead of 'dest'

router.post("/upload/avatar", upload.single("image") ,uploadUserAvatar)
router.post("/upload/background", upload.single("image") ,uploadBackground)

export default router;
