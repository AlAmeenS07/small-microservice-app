
import ProductPage from "./ProductPage"

const Home = () => {


  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Microservice App 
        </h1>

        {/* <p className="text-gray-600 max-w-xl mb-6">
          A scalable microservices-based application with clean architecture,
          API Gateway, and modern frontend built using React & Tailwind.
        </p> */}

        <ProductPage />

      </div>

    </div>
  )
}

export default Home