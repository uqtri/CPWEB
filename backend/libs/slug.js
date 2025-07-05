import slugify from "slugify";
export function slug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
    replacement: "-",
    locale: "vi",
  });
}
