import type { Product } from "./types";

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))];
}

export function filterByCategory(products: Product[], category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}