import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Auth = () => {
    const router = useRouter();

    useEffect(() => {
        // Handle Android app link
        const handleDeepLink = (event: any) => {
            const { path } = event; // Extract path from the event
            if (path) {
                router.push(path); // Navigate to the specified path
            }
        };

        // Add event listener for deep links
        window.addEventListener('deepLink', handleDeepLink);

        return () => {
            // Clean up the event listener
            window.removeEventListener('deepLink', handleDeepLink);
        };
    }, [router]);

    return (
        <div>
            {/* ... existing code ... */}
        </div>
    );
};

export default Auth;
