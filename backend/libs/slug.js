import slugify from "slugify";
export function generateSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
    replacement: "-",
    locale: "vi",
  });
}
