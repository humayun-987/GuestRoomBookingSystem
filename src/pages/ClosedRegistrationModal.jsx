import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ClosedRegistrationModal() {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/images/login/background-white.jpeg')" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center max-w-md w-full"
      >
        {/* Icon / Emoji */}
        <div className="text-6xl mb-4">🚫</div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold mb-4 text-gray-800">
          Registrations Closed
        </h2>

        {/* Message */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          Registrations for <span className="font-semibold">Unosq 2025</span>{" "}
          are now closed.  
          <br />
          Thank you for your enthusiasm and support!
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg shadow-md hover:bg-black hover:scale-105 transform transition-all duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
