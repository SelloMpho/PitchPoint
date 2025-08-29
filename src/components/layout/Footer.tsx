import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PitchPoint</h3>
            <p className="text-gray-300 text-sm">
              Empowering South African Entrepreneurs Through Investor Discovery
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Entrepreneurs</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/register?role=entrepreneur" className="hover:text-white">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/resources/entrepreneurs" className="hover:text-white">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Investors</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/register?role=investor" className="hover:text-white">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-white">
                  Browse Startups
                </Link>
              </li>
              <li>
                <Link href="/resources/investors" className="hover:text-white">
                  Investment Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} PitchPoint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;