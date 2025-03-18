import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram, FaYoutube } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="max-w-md  bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Address:</h3>
        <p className="text-gray-600">
        Churchgate Tower, CBD, Abuja
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Information:</h3>
        <p className="text-gray-600">
        +2348099222223 <br />
        hello@rheelestate.com
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Opentime:</h3>
        <p className="text-gray-600">
          Monday - Friday: 09:00 - 17:00<br />
          Saturday - Sunday: Closed
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Follow Us:</h3>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/rheelestateabuja" className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
            <FaFacebookF className="text-gray-700" />
          </a>
          <a href="https://www.instagram.com/rheel_estate" className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
            <FaInstagram className="text-gray-700" />
          </a>
          <a href="https://www.youtube.com/@rheelestate" className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
            <FaYoutube className="text-gray-700" />
          </a>
          <a href="https://www.twitter.com/rheel_estate" className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
            <FaTwitter className="text-gray-700" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;