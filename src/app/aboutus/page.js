// pages/about.js
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 mt-80 px-15">
        <h1 className="text-6xl font-bold mb-4 text-center">What it does</h1>
        <p className="text-lg mb-2 text-center">
        Lingo AI is a web application that helps users experience real-life conversations. By conversing with our AI, users receive instant feedback on their speech, improving their pronunciation, grammar, and fluency.
        </p>

        <h2 className="text-6xl font-bold mb-4 mt-96 text-start">Inspiration</h2>
        <img className="h-48 mt-0 float-left rounded-full float-image-left" src="/earth.png"></img>
        <p className="text-lg mb-4">How can we make learning English accessible, engaging, and effective for everyone? We saw the struggles non-native speakers face, from pronunciation challenges to mastering grammar. This inspired us to harness the potential of artificial intelligence to create a personalized learning experience that adapts to each user's unique needs.</p>
        <p className="text-lg mb-4">We are driven by the vision of breaking down language barriers and opening up new opportunities for people around the world. Our goal is to empower learners with the confidence and skills to communicate fluently in English, unlocking their full potential in personal, academic, and professional spheres.</p>
        <p className="text-lg mb-8">By providing real-time feedback and tailored learning paths, Lingo AI offers an innovative solution that caters to the diverse needs of English learners. We believe that technology can bridge the gap between learners and language mastery, making education more inclusive and effective. Our commitment is to continually enhance the learning experience, ensuring that every user feels supported and motivated throughout their journey.</p>

        <h2 className="text-6xl font-bold mb-4 mt-96 text-end">What's next...</h2>
        <img className="h-48 mt-0 mr-0 float-right rounded-full float-image-right" src="/break_w_trans.png"></img>
        <ul className="list-disc ml-2 mb-72">
          <li className="text-lg mb-4">Enhanced Features: Integrate more advanced AI capabilities to provide even more accurate feedback on pronunciation, grammar, and fluency.</li>
          <li className="text-lg mb-4">Expanded Language Support: Add support for additional languages to help a wider range of users improve their English.</li>
          <li className="text-lg mb-4">Implement AI-driven personalized learning paths tailored to each user’s specific needs and progress.</li>
        </ul>
        
        


      </div>
    </div>
  );
}
