import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-4">401 - Unauthorized</h1>

      <Link
        to="/login"
        className="text-gray-400 text-sm hover:text-white transition flex items-center gap-1"
      >
        Please login <span className="text-lg">→</span>
      </Link>

      <img
        src="https://firebasestorage.googleapis.com/v0/b/code-up-31d9f.appspot.com/o/pro-projects-ressources%2Fcrypto%2F401.png?alt=media"
        alt="401 Unauthorized"
        className="mt-8 max-w-xs sm:max-w-md rounded-3xl"
      />
    </div>
  );
}

export default Unauthorized;
