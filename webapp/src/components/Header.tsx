import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <div className="left">
      <Link href="/" className=" text-lg">
        Test records repository (TRPC)
      </Link>
    </div>
  );

  return <nav className="flex p-8 justify-center">{left}</nav>;
};

export default Header;
