import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import star from "../../assets/images/stars.svg";
import { Link } from "react-router-dom";

const HomeSection = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-100 leading-snug tracking-wide">
          Take Notes Like Never Before
        </h1>
        <p className="mt-4 text-gray-400 text-lg md:text-xl max-w-2xl">
          Transform your ideas into reality with our sleek, modern, and
          intuitive notes app. Stay organized, stay productive.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/notes">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg text-lg font-semibold transition duration-300">
            Get Started
          </button>
          </Link>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <img
          className="absolute top-[15%] left-[15%] w-[50px] md:w-[80px] animate-spin-slow"
          src={star}
          alt="Star"
        />
        <img
          className="absolute bottom-[15%] right-[15%] w-[50px] md:w-[80px] animate-spin-slow"
          src={star}
          alt="Star"
        />
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-100">
          Why You'll Love Our Notes App
        </h2>
        <p className="mt-4 text-center text-gray-400 text-lg max-w-3xl mx-auto">
          Packed with features to make your life easier, our app is designed to
          help you stay on top of your tasks and ideas.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <FiCheckCircle />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-100">
              Intuitive Design
            </h3>
            <p className="mt-2 text-gray-400">
              A sleek and modern interface that makes note-taking effortless and
              enjoyable.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <FiCheckCircle />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-100">
              Cloud Sync
            </h3>
            <p className="mt-2 text-gray-400">
              Access your notes from any device with seamless cloud
              synchronization.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              <FiCheckCircle />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-100">
              Secure & Private
            </h3>
            <p className="mt-2 text-gray-400">
              Your notes are encrypted and stored securely, ensuring your
              privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-gray-800 to-gray-900">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-100">
          What Our Users Say
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-400">
              "This app has completely changed the way I organize my life. It's
              simple, fast, and reliable!"
            </p>
            <h4 className="mt-4 text-lg font-semibold text-gray-100">
              - Fuad Vario
            </h4>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-400">
              "I love the cloud sync feature. I can access my notes anywhere,
              anytime!"
            </p>
            <h4 className="mt-4 text-lg font-semibold text-gray-100">
              - Rusdi Barber
            </h4>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-400">
              "The best notes app I've ever used. Highly recommended!"
            </p>
            <h4 className="mt-4 text-lg font-semibold text-gray-100">
              - Amba Terompet
            </h4>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-900">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-100">
            Ready to Transform Your Productivity?
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl">
            Join thousands of users who are already organizing their lives with
            our notes app. It's free to start!
          </p>
          <Link to="/page/:pagename">
          <button className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg text-lg font-semibold transition duration-300">
            Sign Up for Free
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;