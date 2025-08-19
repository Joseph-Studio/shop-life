import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm mb-4 sm:mb-0">Get connected with us on social networks:</p>
        <div className="flex items-center gap-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:opacity-80" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:opacity-80" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:opacity-80" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:opacity-80" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:opacity-80" aria-label="GitHub">
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="bg-gray-200">
        <div className="container mx-auto px-6 py-4 text-center text-sm">
          © 2025 YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
}