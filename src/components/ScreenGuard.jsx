import { useState, useEffect } from "react";

function ScreenGuard({ children }) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-center p-4">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">Crypto</h1>

          <img
            src="https://firebasestorage.googleapis.com/v0/b/code-up-31d9f.appspot.com/o/pro-projects-ressources%2Fcrypto%2Fcrypto-logo.png?alt=media"
            alt="Crypto logo"
            className="mx-auto mb-6 h-24"
          />

          <p className="text-4xl font-bold text-white mt-4 leading-snug">
            Only
            <br />
            Available view
            <br />
            for Desktop
          </p>

          <div className="border border-gray-300 rounded-3xl overflow-hidden mt-6 mx-auto w-80 h-80">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/code-up-31d9f.appspot.com/o/pro-projects-ressources%2Fcrypto%2Fdektop_icon.png?alt=media"
              alt="Only Desktop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default ScreenGuard;
