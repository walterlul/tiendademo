import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import products from "../data/products.json";
import business from "../data/business.json";
import type { Product } from "./types";

const list = products as Product[];

describe("products.json", () => {
  it("no repite ids", () => {
    const ids = list.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("todos los precios son números mayores a 0", () => {
    for (const p of list) {
      expect(typeof p.price, `precio de ${p.id}`).toBe("number");
      expect(p.price, `precio de ${p.id}`).toBeGreaterThan(0);
    }
  });

  it("todas las imágenes existen en /public", () => {
    for (const p of list) {
      const file = join(process.cwd(), "public", p.image);
      expect(existsSync(file), `falta la imagen de ${p.id}: ${p.image}`).toBe(true);
    }
  });
});

describe("business.json", () => {
  it("el whatsapp tiene solo dígitos y largo razonable", () => {
    expect(business.whatsapp).toMatch(/^\d{10,15}$/);
  });
});