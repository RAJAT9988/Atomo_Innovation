import { describe, it, expect } from "vitest";
import { contactSchema } from "../lib/validation/contact.js";

describe("contactSchema", () => {
  const validPayload = {
    name: "Jane Doe",
    company: "Acme Corp",
    email: "jane@example.com",
    phone: "+1 555 0100",
    city: "Gandhinagar",
    country: "India",
    useCase: "Deploying edge AI for manufacturing quality inspection across three sites.",
    interest: "enterprise",
    website: "",
  };

  it("accepts valid contact submissions", () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects honeypot submissions", () => {
    const result = contactSchema.safeParse({ ...validPayload, website: "spam-bot" });
    expect(result.success).toBe(false);
  });

  it("requires name, email, country and use case", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      name: "A",
      email: "not-an-email",
      country: "",
      useCase: "short",
    });
    expect(result.success).toBe(false);
  });
});
