import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HashtagPicker } from "./hashtag-picker.js";

const options = [
  { value: "TECH", label: "Tecnologia" },
  { value: "CAREER", label: "Carreira e mercado" },
];

describe("HashtagPicker", () => {
  it("shows the chosen option as a hashtag", () => {
    const html = renderToStaticMarkup(
      <HashtagPicker
        options={options}
        value="CAREER"
        onChange={() => {}}
        placeholder="tópico"
        label="Tópico"
      />,
    );

    expect(html).toContain("#CarreiraEMercado");
    expect(html).toContain('aria-label="Tópico"');
  });

  it("asks for a choice with the placeholder tag while empty and required", () => {
    const html = renderToStaticMarkup(
      <HashtagPicker
        options={options}
        value={null}
        onChange={() => {}}
        placeholder="tópico"
        label="Tópico"
        required
      />,
    );

    expect(html).toContain("#tópico");
    expect(html).toContain("decoration-dashed");
  });
});
