"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { tokenStore } from "../lib/auth/tokenStore";
import { API_BASE_PATH } from "../entities/baseUrl";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

type AuthProviderProps = {
    children: React.ReactNode;
};

export default function AuthProvider({
    children,
}: AuthProviderProps) {
    const pathname = usePathname();

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    const [loading, setLoading] = useState(!isPublicRoute);

    useEffect(() => {
        if (isPublicRoute) return;

        let isMounted = true;

        const bootstrap = async () => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}${API_BASE_PATH}/auth/refresh`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                if (isMounted) {
                    tokenStore.set(response.data.accessToken);
                }
            } catch {
                if (isMounted) {
                    tokenStore.clear();
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        bootstrap();

        return () => {
            isMounted = false;
        };
    }, [isPublicRoute]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}