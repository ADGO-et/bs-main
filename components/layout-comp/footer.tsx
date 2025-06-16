import Link from "next/link";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute bottom-0 right-0 opacity-20">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="100"
              stroke="#FFA500"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#FFA500"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              stroke="#FFA500"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              stroke="#FFA500"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold">Bole Starter</h2>
            </Link>
            <p className="text-sm text-gray-400">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.&quot;
            </p>
            <div className="flex space-x-4 pt-4">
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mission"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/vision"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/values"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Values
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Join Us</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/startup"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Start Up
                </Link>
              </li>
              <li>
                <Link
                  href="/hiwot"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Hiwot Fund
                </Link>
              </li>
              <li>
                <Link
                  href="/job"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Job Requests
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">info@bole-starter.com</li>
              <li className="text-sm text-gray-400">+251 91 111 1111</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-sm text-gray-400">
          <p>© Bole Starter, 2024 All rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
