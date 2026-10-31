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

// export default LoginForm;
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
type LoginFormData = {
    email:string;
    password: string;
};
