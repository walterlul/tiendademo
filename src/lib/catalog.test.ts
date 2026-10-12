import { describe, it, expect } from "vitest";
import { getCategories, filterByCategory } from "./catalog";
import type { Product } from "./types";

function make(id: string, category: string): Product {
  return { id, name: id, description: "", price: 1, category, image: "/x.svg", inStock: true };
}

const products = [make("a", "Tazas"), make("b", "Mates"), make("c", "Tazas")];

describe("catálogo", () => {
  it("lista las categorías sin repetir y en orden de aparición", () => {
    expect(getCategories(products)).toEqual(["Tazas", "Mates"]);
  });

  it("filtra por categoría", () => {
    expect(filterByCategory(products, "Tazas").map((p) => p.id)).toEqual(["a", "c"]);
  });

  it("con all devuelve todos los productos", () => {
    expect(filterByCategory(products, "all")).toHaveLength(3);
  });
});