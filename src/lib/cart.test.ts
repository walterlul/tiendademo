import { describe, it, expect } from "vitest";
import { addToCart, removeFromCart, cartCount, buildOrderMessage, parseCart, pruneCart, cartTotal, cartLines } from "./cart";
import { formatPrice } from "./format";
import type { Product } from "./types";

const products: Product[] = [
  { id: "a", name: "Taza", description: "", price: 1000, category: "X", image: "/x.svg", inStock: true },
  { id: "b", name: "Mate", description: "", price: 2500, category: "X", image: "/x.svg", inStock: true },
  { id: "c", name: "Agotado", description: "", price: 500, category: "X", image: "/x.svg", inStock: false },
];

describe("carrito", () => {
  it("agrega un producto nuevo con cantidad 1", () => {
    expect(addToCart([], "a")).toEqual([{ id: "a", qty: 1 }]);
  });

  it("suma cantidad si el producto ya estaba", () => {
    const cart = addToCart(addToCart([], "a"), "a");
    expect(cart).toEqual([{ id: "a", qty: 2 }]);
  });

  it("no modifica el carrito original", () => {
    const original = [{ id: "a", qty: 1 }];
    addToCart(original, "a");
    expect(original).toEqual([{ id: "a", qty: 1 }]);
  });

  it("quitar baja la cantidad y elimina el producto al llegar a 0", () => {
    const cart = [{ id: "a", qty: 2 }];
    const menos = removeFromCart(cart, "a");
    expect(menos).toEqual([{ id: "a", qty: 1 }]);
    expect(removeFromCart(menos, "a")).toEqual([]);
  });

  it("cuenta el total de unidades", () => {
    expect(cartCount([{ id: "a", qty: 2 }, { id: "b", qty: 3 }])).toBe(5);
  });

  it("arma el mensaje con items y total", () => {
    const cart = [{ id: "a", qty: 2 }, { id: "b", qty: 1 }];
    const msg = buildOrderMessage(cart, products);
    expect(msg).toContain("• 2 x Taza");
    expect(msg).toContain("• 1 x Mate");
    expect(msg).toContain(formatPrice(4500));
  });

  it("ignora productos sin stock", () => {
    const msg = buildOrderMessage([{ id: "c", qty: 1 }], products);
    expect(msg).not.toContain("Agotado");
  });
});

describe("parseCart", () => {
  it("devuelve carrito vacío si no hay datos o el JSON es inválido", () => {
    expect(parseCart(null)).toEqual([]);
    expect(parseCart("esto no es json")).toEqual([]);
    expect(parseCart('{"id":"a"}')).toEqual([]);
  });

  it("descarta items con forma inválida", () => {
    const raw = JSON.stringify([
      { id: "a", qty: 2 },
      { id: 5, qty: 1 },
      { id: "b", qty: -1 },
      { id: "c" },
      null,
    ]);
    expect(parseCart(raw)).toEqual([{ id: "a", qty: 2 }]);
  });

  it("lee un carrito válido", () => {
    const cart = [{ id: "a", qty: 2 }];
    expect(parseCart(JSON.stringify(cart))).toEqual(cart);
  });
});

describe("pruneCart", () => {
  it("quita productos inexistentes o sin stock", () => {
    const cart = [
      { id: "a", qty: 1 },
      { id: "c", qty: 1 },
      { id: "zzz", qty: 1 },
    ];
    expect(pruneCart(cart, products)).toEqual([{ id: "a", qty: 1 }]);
  });
});

describe("cartLines y cartTotal", () => {
  it("calcula el subtotal de cada línea", () => {
    const lines = cartLines([{ id: "a", qty: 3 }], products);
    expect(lines).toHaveLength(1);
    expect(lines[0].subtotal).toBe(3000);
    expect(lines[0].product.name).toBe("Taza");
  });

  it("suma el total", () => {
    const cart = [{ id: "a", qty: 2 }, { id: "b", qty: 1 }];
    expect(cartTotal(cart, products)).toBe(4500);
  });

  it("ignora productos sin stock o inexistentes", () => {
    const cart = [{ id: "c", qty: 5 }, { id: "zzz", qty: 1 }];
    expect(cartLines(cart, products)).toEqual([]);
    expect(cartTotal(cart, products)).toBe(0);
  });
});