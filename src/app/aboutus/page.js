import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 mt-20 sm:mt-32 md:mt-40 lg:mt-48 xl:mt-56 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">What it does</h1>
        <p className="text-base sm:text-lg md:text-xl mb-4 text-center">
          Lingo AI is a web application that helps users experience real-life conversations. By conversing with our AI, users receive instant feedback on their speech, improving their pronunciation, grammar, and fluency.
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 mt-20 sm:mt-24 md:mt-32 lg:mt-40 text-left">Inspiration</h2>
        <img className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 mt-4 sm:mt-6 md:mt-8 lg:mt-10 float-left rounded-full mr-4 sm:mr-6 md:mr-8 lg:mr-10" src="/earth.png" alt="Earth" />
        <p className="text-base sm:text-lg md:text-xl mb-4">
          How can we make learning English accessible, engaging, and effective for everyone? We saw the struggles non-native speakers face, from pronunciation challenges to mastering grammar. This inspired us to harness the potential of artificial intelligence to create a personalized learning experience that adapts to each user's unique needs.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-4">
          We are driven by the vision of breaking down language barriers and opening up new opportunities for people around the world. Our goal is to empower learners with the confidence and skills to communicate fluently in English, unlocking their full potential in personal, academic, and professional spheres.
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-8">
          By providing real-time feedback and tailored learning paths, Lingo AI offers an innovative solution that caters to the diverse needs of English learners. We believe that technology can bridge the gap between learners and language mastery, making education more inclusive and effective. Our commitment is to continually enhance the learning experience, ensuring that every user feels supported and motivated throughout their journey.
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 mt-20 sm:mt-24 md:mt-32 lg:mt-40 text-right">What's next...</h2>
        <img className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 mt-4 sm:mt-6 md:mt-8 lg:mt-10 float-right rounded-full ml-4 sm:ml-6 md:ml-8 lg:ml-10" src="/break_w_trans.png" alt="Break with transparency" />
        <ul className="list-disc ml-6 sm:ml-8 md:ml-10 lg:ml-12 mb-20 sm:mb-24 md:mb-32 lg:mb-40">
          <li className="text-base sm:text-lg md:text-xl mb-4">Enhanced Features: Integrate more advanced AI capabilities to provide even more accurate feedback on pronunciation, grammar, and fluency.</li>
          <li className="text-base sm:text-lg md:text-xl mb-4">Expanded Language Support: Add support for additional languages to help a wider range of users improve their English.</li>
          <li className="text-base sm:text-lg md:text-xl mb-4">Implement AI-driven personalized learning paths tailored to each user’s specific needs and progress.</li>
        </ul>
      </div>
    </div>
  );
}
