import type { Product } from "./types";
import { formatPrice } from "./format";

export interface CartItem {
  id: string;
  qty: number;
}

export interface CartLine {
  product: Product;
  qty: number;
  subtotal: number;
}
export type Cart = CartItem[];

export function addToCart(cart: Cart, id: string): Cart {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    return cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item,
    );
  }
  return [...cart, { id, qty: 1 }];
}

export function removeFromCart(cart: Cart, id: string): Cart {
  return cart
    .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
    .filter((item) => item.qty > 0);
}

export function cartCount(cart: Cart): number {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export function parseCart(raw: string | null): Cart {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (item): item is CartItem =>
        typeof item?.id === "string" &&
        Number.isInteger(item?.qty) &&
        item.qty > 0,
    );
  } catch {
    return [];
  }
}

export function pruneCart(cart: Cart, products: Product[]): Cart {
  return cart.filter((item) =>
    products.some((p) => p.id === item.id && p.inStock),
  );
}

export function cartLines(cart: Cart, products: Product[]): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of cart) {
    const product = products.find((p) => p.id === item.id);
    if (!product || !product.inStock) continue;
    lines.push({ product, qty: item.qty, subtotal: product.price * item.qty });
  }
  return lines;
}

export function cartTotal(cart: Cart, products: Product[]): number {
  return cartLines(cart, products).reduce(
    (sum, line) => sum + line.subtotal,
    0,
  );
}

export function buildOrderMessage(cart: Cart, products: Product[]): string {
  const lines = cartLines(cart, products).map(
    (l) => `• ${l.qty} x ${l.product.name} (${formatPrice(l.subtotal)})`,
  );
  return `Hola! Quisiera consultar por:\n${lines.join("\n")}\nTotal estimado: ${formatPrice(cartTotal(cart, products))}`;
}
