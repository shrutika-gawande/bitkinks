import React from 'react';

const Navbar = () => {
    return (
        <nav className="w-full px-6 py-4 bg-transparent flex items-center justify-between shadow-md">
            {/* Logo */}
            <div className="text-2xl font-bold text-white">
                <span className="text-blue-500">Bit</span>
                <span className="text-[#f8f1f5]">Links</span>
                <sup className="text-sm text-white">®</sup>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
                {/* <button type="button" className="flex items-center gap-1 text-white border border-white rounded-full px-4 py-2 dark:hover:bg-gray-700 dark:hover:border-gray-600 transition dark:focus:ring-gray-700">
                    <span>Login</span>
                    <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                    </svg>
                </button> */}
                <a
                    href="https://github.com/shrutika-gawande/bitlinks/tree/main/bitlinks"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm sm:text-[16px] px-5 py-2.5 text-center" >
                        Github
                    </button>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
