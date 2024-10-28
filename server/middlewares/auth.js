export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if trial has expired
    if (new Date() > user.trialEndDate && !user.isPaid) {
      return res
        .status(403)
        .json({ error: "Trial expired. Please make a payment." });
    }

    req.user = user; // Attach user to request object
    next();
  });
};
