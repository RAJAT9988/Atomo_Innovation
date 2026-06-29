const express = require("express");
const { contactApiSchema } = require("../lib/validation/contact");
const { rateLimit } = require("../lib/security/rate-limit");

const router = express.Router();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return String(forwarded).split(",")[0].trim();
  return req.headers["x-real-ip"] || req.ip || "unknown";
}

router.post("/contact", (req, res) => {
  const ip = getClientIp(req);
  const limit = rateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 15 * 60 * 1000 });

  if (!limit.success) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
      retryAfter: Math.ceil((limit.resetAt - Date.now()) / 1000),
    });
  }

  const parsed = contactApiSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed.",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const { website, ...submission } = parsed.data;
  if (website && website.length > 0) {
    return res.json({ ok: true });
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[contact]", submission);
  }

  return res.json({ ok: true });
});

module.exports = router;
