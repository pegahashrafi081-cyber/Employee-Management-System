// 'use client';

// import { useState, type SubmitEvent } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

// type LoginFormProps = {
//   title: string;
//   redirectTo: string;
// };

// const inputClass =
//   'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100';

// const LoginForm = ({ title, redirectTo }: LoginFormProps) => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const email = formData.get('email');
//     const password = formData.get('password');

//     // TODO: اینجا API لاگین را صدا بزن و فقط در صورت موفقیت ادامه بده
//     console.log({ email, password });

//     router.replace(redirectTo);
//   };

//   return (
//     <>
//       <Link
//         href="/login"
//         className="mb-6 inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-indigo-600"
//       >
//         <ArrowLeft size={14} />
//         Back to portals
//       </Link>

//       <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
//       <p className="mt-2 mb-8 text-sm text-slate-500">
//         Sign in to access your account
//       </p>

//       <form onSubmit={handleSubmit} className="grid gap-5">
//         <div className="grid gap-1.5">
//           <label htmlFor="email" className="text-xs font-medium text-slate-700">
//             Email address
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="john@example.com"
//             required
//             className={inputClass}
//           />
//         </div>

//         <div className="grid gap-1.5">
//           <label
//             htmlFor="password"
//             className="text-xs font-medium text-slate-700"
//           >
//             Password
//           </label>
//           <div className="relative">
//             <input
//               id="password"
//               name="password"
//               type={showPassword ? 'text' : 'password'}
//               placeholder="••••••••"
//               required
//               className={`${inputClass} pr-10`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               aria-label={showPassword ? 'Hide password' : 'Show password'}
//               className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
//             >
//               {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//             </button>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/30 transition hover:opacity-90"
//         >
//           Sign in
//         </button>
//       </form>
//     </>
//   );
// };
'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, Message } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import Link from 'next/link';


interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  message?:string;
  user?:any;
}
interface LoginFormProps {
  title: string;
  redirectTo: string;
}
export default function LoginForm({
  title,
  redirectTo,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

// ۲. تعریف Mutation برای لاگین با TanStack Query
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('ورود با موفقیت انجام شد:', data);
      router.push(redirectTo);
  },
   onError: (error: any) => {
      console.error('خطای ورود:', error);
    },
  });

 const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  }; 
const serverErrorMessage =
    (loginMutation.error as any)?.response?.data?.message ||
    (loginMutation.error as any)?.message;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* دکمه بازگشت به صفحه پورتال‌ها */}
      <Link
        href="/login" 
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to portals
      </Link>

      {/* عنوان و توضیحات مطابق فیگما */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
        <p className="text-sm text-gray-500">Sign in to manage the organization</p>
      </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      {/* فیلد ایمیل */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          placeholder="admin@example.com"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...register('email', { 
            required: 'وارد کردن ایمیل الزامی است',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'فرمت ایمیل نامعتبر است'
            }
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* فیلد پسورد */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...register('password', { 
              required: 'وارد کردن رمز عبور الزامی است',
              minLength: {
                value: 6,
                message: 'رمز عبور باید حداقل ۶ کاراکتر باشد'
              }
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* دکمه سابمیت */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        {isSubmitting ? 'در حال ورود...' : 'Sign in'}
      </button>
    </form>
 </div>
  );
}
