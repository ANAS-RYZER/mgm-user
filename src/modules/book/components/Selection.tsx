interface SelectionProps {
    selectedProducts: string[];
    onToggleProduct: (id: string) => void;
  }
  
  const products = [
    { id: "earrings", label: "Earrings", icon: "💎" },
    { id: "necklace", label: "Necklace", icon: "👑" },
  ];
  
  export default function Selection({
    selectedProducts,
    onToggleProduct,
  }: SelectionProps) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Select Products (optional)</h2>
  
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => onToggleProduct(p.id)}
              className={`p-4 rounded-lg border ${
                selectedProducts.includes(p.id)
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
            >
              <div className="text-2xl">{p.icon}</div>
              <div className="text-sm">{p.label}</div>
            </button>
          ))}
        </div>
  
        {/* Browse Products */}
        <button className="w-full mt-4 border-2 border-dashed rounded-lg py-4 text-primary">
          Browse More Products
        </button>
      </div>
    );
  }
  