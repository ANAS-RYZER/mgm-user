"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const sampleProducts = [
  {
    id: 1,
    name: "Triangular Top Earrings with Red Gem & Chain Fringe",
    price: "71,758",
    purity: "Gold 22K",
    image: "/images/earrings-1.jpg",
  },
  {
    id: 2,
    name: "Triple Heart Teardrop Earrings in Yellow Gold",
    price: "43,683",
    purity: "Gold 22K",
    image: "/images/earrings-2.jpg",
  },
]

interface ProductSidebarProps {
  selectedProducts: number[]
  onToggleProduct: (id: number) => void
}

export function ProductSidebar({ selectedProducts, onToggleProduct }: ProductSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <h3 className="text-base font-semibold text-[#c9a84c]">Select Products (optional)</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {sampleProducts.map((product) => {
              const isSelected = selectedProducts.includes(product.id)
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => onToggleProduct(product.id)}
                  className={cn(
                    "relative flex flex-col rounded-lg border overflow-hidden transition-all text-left",
                    isSelected
                      ? "border-[#c9a84c] ring-1 ring-[#c9a84c]"
                      : "border-border hover:border-[#c9a84c]/50",
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10 w-5 h-5 bg-[#c9a84c] rounded-full flex items-center justify-center">
                      <X className="w-3 h-3 text-[#2a1a1a]" />
                    </div>
                  )}
                  <div className="relative w-full aspect-square bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">{product.purity}</p>
                    <p className="text-xs font-medium text-foreground mt-1 line-clamp-2">{product.name}</p>
                    <p className="text-sm font-bold text-foreground mt-1">
                      {"₹"}
                      {product.price}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="bg-muted rounded-lg p-5 text-center">
            <p className="text-[#c9a84c] font-semibold text-sm">Browse More Products</p>
            <p className="text-xs text-muted-foreground mt-1">
              You can add more Designs from our wide range of products.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
