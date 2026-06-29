import { describe, it, expect, beforeEach } from "vitest";
import { rateLimit, clearRateLimitStore } from "../lib/security/rate-limit.js";

describe("rateLimit", () => {
  beforeEach(() => {
    clearRateLimitStore();
  });

  it("allows requests within the limit", () => {
    const first = rateLimit({ key: "test-ip", limit: 2, windowMs: 60_000 });
    const second = rateLimit({ key: "test-ip", limit: 2, windowMs: 60_000 });
    expect(first.success).toBe(true);
    expect(second.success).toBe(true);
    expect(second.remaining).toBe(0);
  });

  it("blocks requests over the limit", () => {
    rateLimit({ key: "blocked-ip", limit: 1, windowMs: 60_000 });
    const blocked = rateLimit({ key: "blocked-ip", limit: 1, windowMs: 60_000 });
    expect(blocked.success).toBe(false);
  });
});
