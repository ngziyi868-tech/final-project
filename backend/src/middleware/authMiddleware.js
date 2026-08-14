import { getAuth } from "firebase-admin/auth";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await getAuth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
}