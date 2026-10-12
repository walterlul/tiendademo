import { describe, it, expect } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
  it("usa punto como separador de miles", () => {
    expect(formatPrice(8500)).toContain("8.500");
  });

  it("no muestra decimales", () => {
    expect(formatPrice(8500)).not.toContain(",");
  });
});