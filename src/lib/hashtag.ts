/**
 * Turns a label into a hashtag: "Carreira e mercado" becomes "#CarreiraEMercado".
 *
 * Accents stay (a tag in Portuguese reads better with them); spaces and punctuation go away and
 * each word after the first starts in upper case, so the words are still readable glued together.
 */
export function toHashtag(label: string): string {
  const words = label
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}_]/gu, ""))
    .filter(Boolean);

  const [first = "", ...rest] = words;
  const tail = rest.map((word) => word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1));

  return `#${first}${tail.join("")}`;
}
