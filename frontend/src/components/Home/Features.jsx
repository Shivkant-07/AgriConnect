function Features() {
  const features = [
    {
      icon: "🌦",
      title: "Live Weather",
      desc: "Check real-time weather updates before farming.",
    },
    {
      icon: "💰",
      title: "Mandi Prices",
      desc: "View today's latest mandi prices across India.",
    },
    {
      icon: "📰",
      title: "Agriculture News",
      desc: "Read live agriculture news and farming updates.",
    },
    {
      icon: "🏛",
      title: "Gov. Schemes",
      desc: "Explore latest government schemes for farmers.",
    },
    {
      icon: "🛒",
      title: "Marketplace",
      desc: "Sell crops directly to buyers without middlemen.",
    },
    {
      icon: "☁️",
      title: "Cloud Image Upload",
      desc: "Upload crop images securely using Cloudinary.",
    },
  ];

  return (
    <section className="bg-green-50 py-20">

      <h2 className="text-4xl font-bold text-center text-green-700 mb-14">
        ⭐ Our Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

        {features.map((feature) => (

          <div
            key={feature.title}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl duration-300"
          >

            <div className="text-5xl mb-4">
              {feature.icon}
            </div>

            <h2 className="text-2xl font-bold mb-3 text-green-700">
              {feature.title}
            </h2>

            <p className="text-gray-600">
              {feature.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;