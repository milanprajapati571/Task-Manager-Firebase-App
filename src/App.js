import React from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import TaskManager from './components/TaskManager';
import Footer from './components/Footer';

function App() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [theme, setTheme] = React.useState('dark');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-xl font-semibold dark:text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className={theme}>
            <div className="min-h-screen flex flex-col bg-gray-50 font-sans dark:bg-gray-900">
                {/* Pass theme props to Navbar */}
                <Navbar user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
                <main className="flex-grow container mx-auto p-4 md:p-6">
                    {user ? (
                        <TaskManager user={user} />
                    ) : (
                        <AuthPage />
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;