import slugify from "slugify";
export function slug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: "vi",
    replacement: "-",
  });
}
