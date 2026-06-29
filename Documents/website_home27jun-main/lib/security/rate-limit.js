const store = new Map();

function rateLimit({ key, limit = 5, windowMs = 60000 }) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, limit, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, limit, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(key, entry);
  return { success: true, limit, remaining: limit - entry.count, resetAt: entry.resetAt };
}

function clearRateLimitStore() {
  store.clear();
}

module.exports = { rateLimit, clearRateLimitStore };
