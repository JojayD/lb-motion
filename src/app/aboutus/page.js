// pages/about.js
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg">
          Language Trainer is a platform designed to help users improve their language skills through personalized training and real-time feedback.
        </p>
      </div>
    </div>
  );
}
