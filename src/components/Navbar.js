import React from 'react';

const ThemeToggleButton = ({ theme, toggleTheme }) => (
    <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        aria-label="Toggle theme"
    >
        {theme === 'light' ? (
            // Moon Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        ) : (
            // Sun Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )}
    </button>
);


function Navbar({ user, onLogout, theme, toggleTheme }) {
    return (
        <nav className="bg-white shadow-md dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
                {/* Left Section: Brand */}
                <div className="flex-1">
                     <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        TaskMaster
                    </h1>
                </div>

                {/* Center Section: User's Full Name */}
                {user && (
                    <div className="flex-1 text-center">
                        <span className="text-xl font-semibold text-gray-700 dark:text-gray-200 hidden md:block">
                            {user.displayName}
                        </span>
                    </div>
                )}

                {/* Right Section: Email, Logout, and Theme Toggle */}
                <div className="flex-1 flex justify-end">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 dark:text-gray-300 hidden sm:block">{user.email}</span>
                            <button
                                onClick={onLogout}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Logout
                            </button>
                            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                        </div>
                    ) : (
                        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;