import { describe, expect, it } from "vitest";

import { buildCsv } from "../src/admin";

describe("admin CSV export", () => {
  it("creates an Excel-compatible semicolon separated file", () => {
    const csv = buildCsv(
      ["Nome", "Newsletter"],
      [["Luca", "Sì"]],
    );
    expect(csv).toBe('\uFEFF"Nome";"Newsletter"\r\n"Luca";"Sì"\r\n');
  });

  it("neutralises spreadsheet formulas", () => {
    const csv = buildCsv(["Nome"], [["=HYPERLINK(\"https://example.com\")"]]);
    expect(csv).toContain("'=HYPERLINK");
  });
});
