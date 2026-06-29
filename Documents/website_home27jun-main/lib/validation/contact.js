const { z } = require("zod");

const contactInterestOptions = [
  "general",
  "enterprise",
  "product",
  "partnership",
  "developer",
  "media",
  "career",
  "support",
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address").max(254),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  country: z.string().trim().min(2, "Country is required").max(80),
  useCase: z.string().trim().min(10, "Describe your use case in at least 10 characters").max(2000),
  interest: z.enum(contactInterestOptions),
  website: z.string().max(0, "Invalid submission").optional().or(z.literal("")),
});

const contactApiSchema = contactSchema.extend({
  website: z.string().max(0).optional(),
});

module.exports = { contactInterestOptions, contactSchema, contactApiSchema };
