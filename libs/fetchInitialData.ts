export async function fetchInitialData() {
  try {
   const [customersRes, productsRes] = await Promise.all([
      fetch(`${process.env.BASE_API_URL}/customers`, { cache: "no-store" }),
      fetch(`${process.env.BASE_API_URL}/products`, { cache: "no-store" }),
    ]);

    const [customers, products] = await Promise.all([
      customersRes.json(),
      productsRes.json(),
    ]);

    return { customers, products };
  } catch (err) {
    console.error("Failed to fetch initial data:", err);
    return { customers: [], products: [] };
  }
}
