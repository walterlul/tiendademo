import { describe, it, expect } from "vitest";
import { buildWhatsAppLink } from "./whatsapp";
import { buildProductInquiry } from "./whatsapp";

describe("buildWhatsAppLink", () => {
  it("limpia caracteres no numéricos del teléfono", () => {
    const link = buildWhatsAppLink("+54 9 362 512-3456", "Hola");
    expect(link).toBe("https://wa.me/5493625123456?text=Hola");
  });

  it("codifica el mensaje", () => {
    const link = buildWhatsAppLink(
      "5493625123456",
      "Me interesa: Café & Leche",
    );
    expect(link).toContain("text=Me%20interesa%3A%20Caf%C3%A9%20%26%20Leche");
  });
  it("arma la consulta con el nombre del producto", () => {
    const msg = buildProductInquiry({
      id: "x",
      name: "Taza",
      description: "",
      price: 1,
      category: "A",
      image: "/x.svg",
      inStock: true,
    });
    expect(msg).toContain("Taza");
  });
});
