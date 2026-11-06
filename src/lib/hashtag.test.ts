import { describe, expect, it } from "vitest";

import { toHashtag } from "./hashtag.js";

describe("toHashtag", () => {
  it("keeps a single word as it is", () => {
    expect(toHashtag("Tecnologia")).toBe("#Tecnologia");
  });

  it("glues the words and capitalizes each one after the first", () => {
    expect(toHashtag("Carreira e mercado")).toBe("#CarreiraEMercado");
  });

  it("keeps accents and drops punctuation", () => {
    expect(toHashtag("Dúvidas / ajuda!")).toBe("#DúvidasAjuda");
  });

  it("is just the sign for an empty label", () => {
    expect(toHashtag("   ")).toBe("#");
  });
});
