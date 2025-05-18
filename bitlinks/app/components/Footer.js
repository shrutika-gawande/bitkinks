import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-md bg-[#0f111a]/60 text-gray-400 py-5 mt-10 border-t border-white/10">
  <div className="max-w-6xl mx-auto px-4 flex flex-col justify-center items-center">
    <p className="text-sm text-center md:text-left">
      © {new Date().getFullYear()} <span className="text-white font-semibold">BitLinks</span>. All rights reserved.
    </p>
  </div>
</footer>

  );
};

export default Footer;
