// import ProductList from "@/components/ProductList";
// import React from "react";
// import { Input } from "@/components/ui/input";
// import Select from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { allProducts } from "@/lib/product";

// function getStr(value) {
//   if (Array.isArray(value)) return String(value[0] ?? "");

//   return String(value ?? "");
// }

// function applyFilters(products, searchParams) {
//   const q = getStr(searchParams.q).trim().toLowerCase();
//   const cat = getStr(searchParams.category).trim().toLowerCase();
//   return products.filter((product) => {
//     // Search in both title and description
//     if (q && !product.title.toLowerCase().includes(q) && 
//         !product.description.toLowerCase().includes(q)) {
//       return false;
//     }
//     // Filter by category if selected
//     if (cat && product.category.toLowerCase() !== cat) {
//       return false;
//     }
    
//     return true;
//   });
// }

// const ProductsPage = async ({ searchParams }) => {

//     const prods = await allProducts();
//     console.log("Total products loaded:", prods?.length);
    
//     const filtered = applyFilters(prods, searchParams ?? {});
//   const categories = Array.from(
//     new Set(prods.map((prod) => prod.category))
//   ).sort();
//   return (
//     <div className="space-y-6">
//       <div className="flex gap-2.5">
//         <h1 className="text-2xl font-semibold ">Products</h1>
//         <form className="flex ml-3">
//           <Input 
//             name="q" 
//             type="text" 
//             placeholder="Search" 
//             defaultValue={(searchParams && searchParams.q) ||''} 
//           />

//           <Select name="category" 
//           defaultValue={(searchParams && (searchParams.category ?? "")) || ""}>
          
//               <option value="">All Categories</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat.toLowerCase()}>
//                   {cat}
//                 </option>
//               ))}
           
//           </Select>
//           <Button type="submit">Search</Button>
//         </form>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filtered.map((product) => (
//           <div key={product.id}>
//             <ProductList product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }       

// export default ProductsPage



import Select from "@/components/ui/select";
import ProductList from "@/components/ProductList";
import { allProducts } from "@/lib/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";




async function applyFilters(products, searchParams = {}) {
    // Ensure we're working with strings and handle null/undefined
    const q = (searchParams?.q ?? "").toString().trim().toLowerCase();
    const cat = (searchParams?.category ?? "").toString().trim().toLowerCase();
    
    console.log('Applying filters with params:', {
        searchTerm: q,
        category: cat,
        totalProducts: products.length,
        rawSearchParams: searchParams
    });
    
    let matchCount = 0;
    const filtered = products.filter((product) => {
        let matchesSearch = true;
        let matchesCategory = true;

        // Search filter
        if (q) {
            const productTitle = (product.title || '').toLowerCase();
            const productDesc = (product.description || '').toLowerCase();
            matchesSearch = productTitle.includes(q) || productDesc.includes(q);
            console.log(`Search "${q}" checking "${productTitle}": ${matchesSearch}`);
        }

        // Category filter
        if (cat) {
            const productCategory = (product.category || '').toLowerCase();
            matchesCategory = productCategory === cat;
            console.log(`Category "${cat}" checking "${productCategory}": ${matchesCategory}`);
        }

        const matches = matchesSearch && matchesCategory;
        if (matches) matchCount++;
        return matches;
    });
    
    console.log('Filter results:', {
        originalCount: products.length,
        filteredCount: filtered.length,
        searchTerm: q || 'none',
        searchApplied: !!q,
        category: cat || 'none',
        categoryApplied: !!cat,
        matchCount: matchCount
    });
    
    return filtered;
}

const ProductsPage = async ({ searchParams }) => {
    // Use Promise.resolve to handle both Promise and regular objects
    const resolvedParams = await Promise.resolve(searchParams);
    console.log("Received raw searchParams:", resolvedParams);
    
    const prods = await allProducts();
    console.log("Total products loaded:", prods?.length);

    // Ensure searchParams is properly structured
    const searchParamsObj = {
        q: resolvedParams?.q ?? '',
        category: resolvedParams?.category ?? ''
    };
    
    console.log("Processing with searchParams:", searchParamsObj); // Debug processed parameters
    
    const filtered = await applyFilters(prods, searchParamsObj);
    const categories = Array.from(
        new Set(prods.map((prod) => prod.category))
    ).sort();
    return (
        <div className="space-y-6">
            <div className="flex gap-2.5">
                <h1 className="text-2xl font-semibold ">Products</h1>
                <form className="flex gap-2 ml-3" action="/products" method="get">
                    <Input
                        name="q"
                        type="text"
                        placeholder="Search"
                        defaultValue={(searchParams && searchParams.q) || ""}
                    />

                    <Select
                        name="category"
                        defaultValue={(searchParams && (searchParams.category ?? "")) || "" } className="md:w-[150px]"
                    >
                        <option value="" >All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat.toLowerCase()}>
                                {cat}
                            </option>
                        ))}
                    </Select>

                    <Button type="submit">Search</Button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((product) => (
                    <div key={product.id}>
                        <ProductList product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage