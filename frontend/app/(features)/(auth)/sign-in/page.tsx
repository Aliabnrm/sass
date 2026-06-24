
'use client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { tokenStore } from '@/app/lib/auth/tokenStore'
import { useLogin } from '@/app/services/auth/auth.hooks'
import { SigninDTO, SigninSchema } from '@/app/schema/auth.schema'

export default function SignInPage() {
    const login = useLogin()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninDTO>({
        resolver: zodResolver(SigninSchema),
        mode: "onTouched"
    })

    const onSubmit = async (data: SigninDTO) => {

        try {
            const response = await login.mutateAsync(data);

            tokenStore.set(response.accessToken);

            router.push("/");
        } catch (error: any) {
            alert(error?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 shadow rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your Account</h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-full flex-col gap-4 rounded-md">
                        <div>
                            <label className="sr-only">Email address</label>
                            <input
                                type="email"
                                {...register('email')}
                                required
                                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="sr-only">Password</label>
                            <input
                                type="password"
                                {...register('password')}
                                required
                                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={login.isPending}
                            className={`group relative flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${login.isPending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}          >
                            {login.isPending ? "در حال ورود ..." : "Sign in"}
                        </button>
                        <div className="flex w-full flex-row items-center justify-center gap-1 text-sm text-gray-600 mt-8">
                            <div className=""> If you do not have an Account?</div>
                            <Link
                                href="/sign-up"
                                className="font-medium text-blue-600 hover:underline hover:text-blue-800"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
