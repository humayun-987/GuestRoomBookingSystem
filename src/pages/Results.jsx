import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ResultTable from "../components/DisplayResult/DisplayResult";
export default function Result() {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/images/login/background-white.jpeg')" }}
    >
      <ResultTable/>
    </div>
  );
}
