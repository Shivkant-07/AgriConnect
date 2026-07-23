function Stats() {
  const stats = [
    {
      title: "Farmers",
      value: "500+",
      icon: "👨‍🌾",
    },
    {
      title: "Crops",
      value: "2500+",
      icon: "🌾",
    },
    {
      title: "Buyer Requests",
      value: "800+",
      icon: "🤝",
    },
    {
      title: "Gov Schemes",
      value: "20+",
      icon: "🏛",
    },
  ];

  return (
    <section className="py-20 bg-white">

      <h2 className="text-4xl font-bold text-center text-green-700 mb-14">
        📊 AgriConnect Statistics
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-green-50 shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl duration-300"
          >
            <div className="text-5xl mb-4">
              {item.icon}
            </div>

            <h2 className="text-4xl font-bold text-green-700">
              {item.value}
            </h2>

            <p className="text-lg text-gray-700 mt-2">
              {item.title}
            </p>
          </div>

        ))}

      </div>

    </section>
  );
}

export default Stats;