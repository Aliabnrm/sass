"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const SignUpPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupSchemaType>({ resolver: zodResolver(SignupSchema), mode: "onTouched" });

    const onSubmit = async (data: SignupSchemaType) => {

        const res = await fetch("/api/auth/register", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            const error = await res.json();
            alert(error.error);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 shadow rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Create a new Account{" "}
                    </h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className=" flex w-full flex-col gap-4 rounded-md">
                        <div>
                            <label className="sr-only">Email address</label>
                            <input
                                type="email"
                                {...register("email")}
                                required
                                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="sr-only">Password</label>
                            <input
                                type="password"
                                {...register("password")}
                                required
                                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">

                                    {errors.password.message}{" "}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <LockClosedIcon className="h-5 w-5 text-blue-100 group-hover:text-white mr-1" />
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">

                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default SignUpPage;
