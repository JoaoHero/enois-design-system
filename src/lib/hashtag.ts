/**
 * Turns a label into a hashtag: "Carreira e mercado" becomes "#CarreiraEMercado".
 *
 * Accents stay (a tag in Portuguese reads better with them); spaces and punctuation go away and
 * every word starts in upper case. The rest goes to lower case first so "CONTRASTE" and
 * "contraste" are the same tag, and the result is stable when passed in again.
 */
export function toHashtag(label: string): string {
  const trimmed = label.trim();

  // Already a tag (our own output comes back in): keep its words, only drop stray punctuation.
  if (trimmed.startsWith("#")) {
    return `#${trimmed.slice(1).replace(/[^\p{L}\p{N}_]/gu, "")}`;
  }

  const words = trimmed
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}_]/gu, "").toLocaleLowerCase("pt-BR"))
    .filter(Boolean);

  const tag = words
    .map((word) => word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1))
    .join("");

  // Nothing left to tag (blank label): the caller falls back to its own placeholder.
  return tag ? `#${tag}` : "";
}
