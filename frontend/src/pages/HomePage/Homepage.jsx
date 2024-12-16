import Navbar from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-page flex flex-col justify-between w-full bg-gray-100 no-scrollbar">
      <Navbar />
      <div className="flex flex-row justify-between min-h-[70vh] my-4 px-3">
        <div className="flex flex-col align-middle justify-center w-1/3 text-center space-y-4">
          <h1 className="text-3xl font-bold text-[#702DFF]">
            Track Your Expenses Easily
          </h1>
          <p className="text-lg text-gray-700">
            Keep a close eye on your finances and stay on top of your budget
            with our simple expense tracker.
          </p>
          <div className="btn-grp flex justify-center space-x-4">
            <button className="text-white bg-[#702DFF] rounded-3xl px-6 py-2">
              Get Started
            </button>
            <button className="text-[#702DFF] border-2 border-[#702DFF] rounded-3xl px-6 py-2">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-2/3 flex justify-center">
          <img
            src="/expenses.webp"
            alt="Expense Tracker"
            className="rounded-[1000px] h-[450px] w-[580px]"
          />
        </div>
      </div>

      {/* How to Use Section */}
      <div className="how-to-use bg-[#702DFF] text-white py-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            How to Use the Expense Tracker
          </h2>
          <p className="mt-4 text-lg">Track your daily expenses with ease!</p>
        </div>
        <div className="flex justify-center mt-8 space-x-10">
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">1</div>
            <p>Add Expenses</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">2</div>
            <p>Set Categories</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">3</div>
            <p>Review Reports</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials py-10 bg-[#f9f9f9]">
        <h2 className="text-center text-2xl font-semibold">
          What Our Users Say
        </h2>
        <div className="flex justify-center mt-8 space-x-10">
          <div className="testimonial-card p-6 bg-white rounded-xl shadow-lg w-64">
            <p className="text-gray-700 mb-4">
              &quot;This app made tracking my expenses so easy and efficient. Highly
              recommend!&quot;
            </p>
            <div className="font-semibold">John Doe</div>
            <div className="text-sm text-gray-500">Freelancer</div>
          </div>
          <div className="testimonial-card p-6 bg-white rounded-xl shadow-lg w-64">
            <p className="text-gray-700 mb-4">
              &quot;I love the simplicity and design. It’s a game-changer for
              managing my budget.&quot;
            </p>
            <div className="font-semibold">Jane Smith</div>
            <div className="text-sm text-gray-500">Small Business Owner</div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer bg-[#702DFF] text-white py-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            Stay on Top of Your Finances
          </h3>
          <p className="mt-4">
            Track your spending, set budgets, and improve your financial health
            with our easy-to-use expense tracker.
          </p>
          <div className="mt-4">
            <button className="text-[#702DFF] bg-[white] rounded-3xl px-6 py-2">
              Contact Us
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="social-icons mt-6 flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
