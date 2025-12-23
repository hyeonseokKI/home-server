import Link from "next/link";

export default function Nav() {
  return (
    <header className="h-14 border-b border-gray-700">
      <div className="w-full h-full px-8 flex items-center justify-between">
        {/* Left */}
        <Link href="/" className="font-bold text-lg">
          KHS&apos;s Home
        </Link>

        {/* Right */}
        <nav className="flex items-center gap-6">
            <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-400">
            About
          </Link>
          <Link href="/project" className="hover:text-blue-400">
            Project
          </Link>
          <Link href="/board" className="hover:text-blue-400">
            Board
          </Link>
        </nav>
      </div>
    </header>
  );
}
