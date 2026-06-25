"use client";

import api from "../services/useApiClient";

export default function HomePage() {
    const getMe = async () => {
        try {
            const res = await api.get("/auth/me");

            console.log("ME:", res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-10">
            <button
                onClick={getMe}
                className="rounded bg-blue-500 px-4 py-2 text-white"
            >
                Get Me
            </button>
        </div>
    );
}