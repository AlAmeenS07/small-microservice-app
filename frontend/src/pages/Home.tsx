
import ProductPage from "./ProductPage"

const Home = () => {


  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Microservice App 
        </h1>

        <ProductPage />

      </div>

    </div>
  )
}

export default Home