import React from 'react'
import Link from 'next/link';
import { ArrowRight } from "lucide-react";

const portals = [
  { href: '/login/admin', label: 'Admin Portal' },
  { href: '/login/employee', label: 'Employee Portal' },
];
const LoginPage = () => (
  <>
    <h2 className="text-4xl font-semibold text-slate-900">Welcome Back</h2>
    <p className="mt-3 mb-8 text-slate-500">
      Select your portal to securely access the system.
    </p>

    <nav className="grid gap-4">
      {portals.map((portal) => (
        <Link
          key={portal.href}
          href={portal.href}
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-7 py-8 text-lg text-slate-800 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <span>{portal.label}</span>
          <ArrowRight size={18} aria-hidden />
        </Link>
      ))}
    </nav>

    <footer className="mt-10 text-sm text-slate-400">
      © 2026 GreatStack. All rights reserved.
    </footer>
  </>
);

export default LoginPage;

