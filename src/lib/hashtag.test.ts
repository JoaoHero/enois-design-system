import { describe, expect, it } from "vitest";

import { toHashtag } from "./hashtag.js";

describe("toHashtag", () => {
  it("keeps a single word as it is", () => {
    expect(toHashtag("Tecnologia")).toBe("#Tecnologia");
  });

  it("glues the words and capitalizes each one", () => {
    expect(toHashtag("Carreira e mercado")).toBe("#CarreiraEMercado");
  });

  it("keeps accents and drops punctuation", () => {
    expect(toHashtag("Dúvidas / ajuda!")).toBe("#DúvidasAjuda");
  });

  it("gives the same tag whatever the case of the label", () => {
    expect(toHashtag("CONTRASTE")).toBe("#Contraste");
    expect(toHashtag("contraste")).toBe("#Contraste");
  });

  it("is stable when the result goes through it again", () => {
    const tag = toHashtag("Carreira e mercado");

    expect(toHashtag(tag)).toBe(tag);
  });

  it("returns nothing for a blank label", () => {
    expect(toHashtag("   ")).toBe("");
  });
});
