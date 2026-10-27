// کل صفحه login
import { Children, ReactNode } from "react";
import LoginHero from "@/app/components/LoginHero";

const AuthLayout = ({Children} : {Children:ReactNode})=> (
  <main className="grid min-h-screen md:grid-cols-2">
    <LoginHero />
    <section className="flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md">{Children}</div>
    </section>
  </main>
);

export default AuthLayout;