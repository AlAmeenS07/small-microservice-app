import Button from "./Button"

type Product = {
  id: string
  name: string
  price: number
}

type Props = {
  product: Product
  onBuy: (price: number) => void
}

function ProductCard({ product, onBuy }: Props) {
  return (
    <div className="bg-white p-16 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600 mb-3">₹{product.price}</p>

      <Button
        onClick={() => onBuy(product.price)}
      >
        Buy Now
      </Button>
    </div>
  )
}

export default ProductCard