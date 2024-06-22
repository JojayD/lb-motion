// pages/index.js
import 'regenerator-runtime/runtime';
import Head from 'next/head';
import SpeechToText from '../app/components/speechtotext';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Language Trainer</title>
        <meta name="description" content="A language trainer to improve your English" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to the Language Trainer
        </h1>
        <SpeechToText />
      </main>

      <footer className="w-full h-24 flex justify-center items-center border-t">
        Powered by Hume AI and OpenAI
      </footer>
    </div>
  );
}
