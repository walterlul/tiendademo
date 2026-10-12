import type { Product } from "./types";

export function buildWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}


export function buildProductInquiry(product: Product): string {
  return `Hola! Me interesa "${product.name}". ¿Está disponible?`;
}