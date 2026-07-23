import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[90vh]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/55"></div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
          🌾 Smart Farming <br /> Starts Here
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-gray-200 max-w-3xl">
          Connecting Farmers, Buyers and Technology through one smart
          agriculture platform.
        </p>

        <div className="flex gap-5 mt-10 flex-wrap justify-center">

          <Link
            to="/marketplace"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Explore Marketplace
          </Link>

          <Link
            to="/add-crop"
            className="bg-white hover:bg-gray-100 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Sell Your Crop
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;