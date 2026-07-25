export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto grid gap-10 px-8 md:grid-cols-3">
        <div>
          <h2 className="text-3xl font-bold text-orange-500 mb-4">
            🍽️ TableReserve
          </h2>
          <p className="text-gray-300 leading-7">
            Discover and reserve tables at the best restaurants in your city.
            Enjoy hassle-free dining with instant reservations.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Connect With Us</h3>
          <p className="text-gray-300 leading-7">
            Need help with a reservation or facing a problem? Our support team
            is here to help you.
          </p>
          <a
            href="tel:+919328894602"
            className="mt-4 inline-flex items-center rounded-lg bg-orange-600 px-5 py-3 font-semibold transition hover:bg-orange-700"
          >
            Call Support
          </a>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Contact & Support</h3>
          <address className="not-italic space-y-4 text-gray-300">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Awadhpuri%2C+Bhopal"
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 transition hover:text-orange-500"
            >
              <span aria-hidden="true">📍</span>
              <span>Awadhpuri, Bhopal, Madhya Pradesh</span>
            </a>
            <a
              href="tel:+919328894602"
              className="flex gap-3 transition hover:text-orange-500"
            >
              <span aria-hidden="true">📞</span>
              <span>+91 93288 94602</span>
            </a>
            <a
              href="mailto:nishantjha203@gmail.com?subject=TableReserve%20Support"
              className="flex gap-3 break-all transition hover:text-orange-500"
            >
              <span aria-hidden="true">✉️</span>
              <span>nishantjha203@gmail.com</span>
            </a>
          </address>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />
      <div className="text-center text-gray-400">
        © 2026 TableReserve. All Rights Reserved.
      </div>
    </footer>
  );
}
