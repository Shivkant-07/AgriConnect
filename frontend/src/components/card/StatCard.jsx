function StatCard({ icon, number, title }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">

      <div className="text-5xl">
        {icon}
      </div>

      <h2 className="text-3xl font-bold text-green-700 mt-4">
        {number}
      </h2>

      <p className="text-gray-600 mt-2">
        {title}
      </p>

    </div>
  );
}

export default StatCard;