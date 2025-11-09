import data from "@/product.json";

// Map the external data shape to our app's product shape
// Required: id, title, description, price, category, image, rating, inStock
// Legacy local mapping (kept for reference):
export function allProducts() {
  const list = data?.products ?? [];
  return list.map(mapProduct);
}
export function getProductById(id) {
  const pid = typeof id === "string" ? Number(id) : id;
  return allProducts().find((p) => p.id === pid) || null;
}

function mapProduct(p) {
    return {
        id: p.id,
        title: p.title,
        description: p.description,
        price: Number(p.price) || 0,
        category: p.category,
        image: p.thumbnail || (Array.isArray(p.images) ? p.images[0] : "") || "",
        rating: Number(p.rating) || 0,
        inStock:
            (p.availabilityStatus?.toLowerCase?.() ?? "") !== "out of stock" &&
            (p.stock ?? 0) > 0,
    };
}
