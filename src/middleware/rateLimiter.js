import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");
    console.log(success);

    if (!success) {
      return res.status(429).json({
        message: "Too Many Requests",
      });
    }
    next();
  } catch (error) {
    console.log("Rate Limit Error: ", error);
    next(error);
  }
};

export default rateLimiter;
