/**
 * Converts a string into a slug.
 * @param str - The string to be converted.
 * @returns The slugified string.
 */
export const stringToSlug = (str: string): string => {
  return str
    ?.trim()
    ?.replace(/[\s]+/g, "-") // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

/**
 * Converts a slug back into a string.
 * @param slug - The slug to be converted.
 * @returns The original string.
 */
export const slugToString = (slug: string): string => {
  return slug.replace(/-/g, " "); // Replace hyphens with spaces
};
