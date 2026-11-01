// کل صفحه login
// import { Children, ReactNode } from "react";
// import LoginHero from "@/app/components/LoginHero";
// const AuthLayout = ({Children} : {Children:ReactNode})=> (
//   <main className="grid min-h-screen md:grid-cols-2">
//     <LoginHero />
//     <section className="flex items-center justify-center px-8 py-12">
//       <div className="w-full max-w-md">{Children}</div>
//     </section>
//   </main>
// );

// export default AuthLayout;

import type { ReactNode } from 'react';
import LoginHero from '@/app/components/LoginHero';
const AuthLayout = ({ children }: { children: ReactNode }) => (
  <main className="grid min-h-screen md:grid-cols-2">
    <LoginHero />

    <section className="flex flex-col items-center justify-center bg-white px-8 py-12">
      <div className="w-full max-w-md">{children}</div>
    </section>
  </main>
);

export default AuthLayout;

