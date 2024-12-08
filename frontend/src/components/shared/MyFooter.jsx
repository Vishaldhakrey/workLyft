import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsPhone } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const MyFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#6A38C2]">WorkLyft</h3>
            <p className="text-gray-400 text-sm">
              Helping students and recruiters find their perfect match. Get started with the best job platform today!
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com" target="_blank" className="text-xl hover:text-[#6A38C2]">
                <FaGithub />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-xl hover:text-[#6A38C2]">
                <FaLinkedin />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-xl hover:text-[#6A38C2]">
                <FaTwitter />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="text-xl hover:text-[#6A38C2]">
                <FaFacebook />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/about" className="hover:text-[#6A38C2]">About Us</a></li>
              <li><a href="/careers" className="hover:text-[#6A38C2]">Careers</a></li>
              <li><a href="/blog" className="hover:text-[#6A38C2]">Blog</a></li>
              <li><a href="/contact" className="hover:text-[#6A38C2]">Contact Us</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <div className="flex items-center space-x-3 text-gray-400">
              <BsPhone className="text-xl" />
              <p>(+91) 931546212</p>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <MdEmail className="text-xl" />
              <p>WorkLyft@gmail.com</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 text-sm">
              Stay up to date with the latest job listings, news, and updates.
            </p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="p-2 rounded-l-md w-2/3 text-gray-800" />
              <button type="submit" className="bg-[#6A38C2] text-white p-2 rounded-r-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-500 text-sm">
          <p>© 2024 WorkLyft. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
