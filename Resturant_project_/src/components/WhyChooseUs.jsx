const features = [
  {
    id: 1,
    icon: "🍽️",
    title: "Easy Booking",
    description:
      "Reserve your favorite table in just a few clicks without any hassle.",
  },
  {
    id: 2,
    icon: "⚡",
    title: "Instant Confirmation",
    description:
      "Get immediate booking confirmation with real-time table availability.",
  },
  {
    id: 3,
    icon: "🛡️",
    title: "Secure Reservation",
    description:
      "Your reservation details are protected with secure booking management.",
  },
  {
    id: 4,
    icon: "🎧",
    title: "24/7 Support",
    description:
      "Our support team is available anytime to help with your reservations.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose Us
          </h2>

          <p className="text-gray-500 mt-3">
            Experience hassle-free restaurant reservations with our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;