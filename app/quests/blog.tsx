import { CalendarIcon, TagIcon, LockIcon } from "lucide-react";

export default function BlogSection() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full bg-[#0a0e1a] text-white py-10 px-6 md:px-10 rounded-lg font-poppins">
      <article className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
            Join the Founders Survey: Contribute to Founder Insights While
            Keeping Your Data Private
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>{today}</span>
            </div>
            <div className="flex items-center">
              <LockIcon className="w-4 h-4 mr-2" />
              <span>Privacy-Focused</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Web3", "Privacy", "Founders"].map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/50 text-cyan-300"
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {category}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-lg prose-invert prose-cyan max-w-none">
          <p className="text-xl text-justify">Founders,</p>

          <p className="text-justify">
            OnlyFounders announces our Founders Survey initiative in
            collaboration with privacy-tech innovators{" "}
            <a
              href="https://verida.ai"
              target="_blank"
              className="text-cyan-400 hover:text-cyan-300 no-underline"
            >
              Verida
            </a>{" "}
            and{" "}
            <a
              href="https://nillion.com/"
              target="_blank"
              className="text-cyan-400 hover:text-cyan-300 no-underline"
            >
              Nillion
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
            What makes this survey different?
          </h2>
          <p className="text-justify">
            Unlike traditional surveys that collect your responses directly,
            this revolutionary approach allows you to contribute insights from
            your actual founder journey data while keeping that data 100%
            private.
          </p>

          <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
            How it works:
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-justify">
            <li>
              Connect your data sources (Google, Telegram, Discord, etc.)
              through Verida's secure vault
            </li>
            <li>Your data remains encrypted and under your control</li>
            <li>
              Nillion's privacy-preserving technology generates aggregate
              insights without exposing individual data
            </li>
            <li>
              Access the collective findings through our interactive dashboard
            </li>
          </ol>

          <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
            What you'll gain:
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-justify">
            <li>
              Exclusive access to insights about founder traits across regions
            </li>
            <li>Better understanding of how your journey compares to others</li>
            <li>
              Contribute to groundbreaking research on founder characteristics
            </li>
          </ul>

          <p className="mt-8 text-lg italic text-justify">
            This is more than a survey—it's a demonstration of how web3
            technology can create value while respecting privacy.
          </p>

          <p className="mt-8 font-semibold text-justify">OnlyFounders Team</p>

          <div className="mt-4 bg-gray-800/50 p-4 rounded-md inline-block">
            <a
              href="https://verida.ai"
              target="_blank"
              className="text-cyan-400 hover:text-cyan-300 no-underline font-mono"
            >
              verida.ai
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
