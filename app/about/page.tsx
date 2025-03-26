"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  X,
  Check,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-of-gradient text-white">
      {/* Hero Section */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#4361EE]/10 to-[#7B61FF]/10 blur-3xl opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#4361EE]/10 to-[#7B61FF]/10 blur-3xl opacity-70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-16 reveal-animation">
            <div className="inline-block bg-gradient-to-r from-[#4361EE] to-[#7B61FF] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              The Future of Web3 Fundraising
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
              Where{" "}
              <span className="bg-gradient-to-r from-[#4361EE] to-[#7B61FF] bg-clip-text text-transparent">
                Founders
              </span>
              <br />
              Meet{" "}
              <span className="bg-gradient-to-r from-[#4361EE] to-[#7B61FF] bg-clip-text text-transparent">
                Money
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              The only permissionless web3 fundraising platform that doesn't
              suck. Connect with investors, raise funds, and build your startup.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal-animation">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                About OnlyFounders
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                OnlyFounders is a decentralized platform that transforms how
                founders and investors connect. We combine AI technology with
                innovative funding mechanisms to create a more fair and
                efficient fundraising process.
              </p>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                Our platform puts founders back in control while giving
                investors better opportunities with reduced risk. By making both
                capital and knowledge more accessible, we're building an
                ecosystem where great ideas can thrive regardless of who you
                know or where you're from.
              </p>
            </div>

            <div className="relative reveal-animation">
              <div className="relative rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="/about.png"
                  alt="OnlyFounders Platform"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 md:py-24 bg-[#0c0f24]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Vision</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming the future of fundraising.
            </p>
          </div>

          <div className="reveal-animation max-w-7xl mx-auto">
            <div className="bg-[#1a1e42] p-10 md:p-12 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
              <p className="text-gray-300 leading-relaxed text-lg mb-10">
                OnlyFounders aims to transform the $300B+ annual venture capital
                market by creating an infrastructure layer where founders
                maintain control of their vision while accessing flexible
                capital structured on their terms. We envision a funding
                ecosystem where:
              </p>

              <ul className="space-y-6">
                {[
                  "Innovative ideas receive funding based on objective metrics rather than subjective pattern-matching.",
                  "Founders retain decision-making authority throughout their company's lifecycle.",
                  "Capital deployment aligns with actual business needs rather than arbitrary fundraising cycles.",
                  "Investment opportunities become accessible to a broader pool of investors.",
                  "Education and knowledge-sharing enhance outcomes for all participants.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4361EE] flex items-center justify-center mr-3 mt-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              OnlyFounders is built on five foundational principles.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 reveal-animation">
            {/* Row 1 - 3 cards */}
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {[
                {
                  title: "Founder Autonomy",
                  description:
                    "Creators maintain control over their vision, terms, and equity throughout their journey.",
                },
                {
                  title: "Intelligent Capital",
                  description:
                    'AI-driven evaluation replaces subjective "pattern matching" with objective assessment of potential.',
                },
                {
                  title: "Dynamic Allocation",
                  description:
                    "Capital deployed incrementally based on actual needs and milestone achievements for optimal growth.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-[#1a1e42] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full max-w-md"
                >
                  <div className="w-12 h-12 bg-[#4361EE] rounded-lg flex items-center justify-center mb-6">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2 - 2 cards */}
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {[
                {
                  title: "Educational Empowerment",
                  description:
                    "Knowledge-sharing and learning resources level the playing field for all founders regardless of background.",
                },
                {
                  title: "Decentralized Finance",
                  description:
                    "DeFi principles create transparency and accessibility for all participants in the ecosystem.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-[#1a1e42] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full max-w-md"
                >
                  <div className="w-12 h-12 bg-[#4361EE] rounded-lg flex items-center justify-center mb-6">
                    <span className="text-white font-bold">{index + 4}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 md:py-24 bg-[#0c0f24]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're a team of Web3 natives, builders, and fundraising experts on
              a mission to transform how startups raise capital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 items-center justify-center lg:grid-cols-4 gap-8 reveal-animation">
            {[
              {
                name: "Moe",
                role: "CEO/Founder",
                image: "/team/moe.jpg",
                bio: "Ex-TradFi, 2x Exits, Advisor & Mentor, 20+ yrs in Sports, Finance, Health, Tech, and Investments, Health & Wellness, Art Gallery.",
                id: "01",
              },
              {
                name: "Rasesh",
                role: "CTO",
                image: "/team/rasesh.jpg",
                bio: "Co-Founded 20,000+ Dev EduFi Startup, Blockchain Protocol Engineer, AI Research Lead.",
                id: "03",
              },
              {
                name: "Raj",
                role: "CPO",
                image: "/team/raj.jpg",
                bio: "Co-Founder - DcodeBlock, UX Designer, Growth Strategist.",
                id: "02",
              },
              {
                name: "V0 & Vercel",
                role: "Product Owner",
                image: "/team/v0.jpg",
                bio: "Full-stack Developer, DevOps specialist, Web3 Architect.",
                id: "04",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 bg-[#1a1e42] relative w-full max-w-[280px] h-[500px] flex flex-col"
              >
                {/* ID Number */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                  {member.id}
                </div>

                {/* Member Image */}
                <div className="h-[280px] w-full overflow-hidden flex items-center justify-center">
                  <div className="relative h-full w-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="ml-[1px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center flex-grow flex flex-col justify-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-purple-400 text-sm mb-4">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm text-white/80">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center reveal-animation">
            <h3 className="text-2xl font-bold mb-10">Advisors & Experts</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  name: "Brian D Evans",
                  role: "BDE Ventures",
                  image: "/team/brian.jpg",
                  id: "A1",
                },
                {
                  name: "Ravi Aggarwal",
                  role: "Polygon x Privado ID",
                  image: "/team/ravi.jpg",
                  id: "A2",
                },
                {
                  name: "Vijay Parvin",
                  role: "bitsCrunch",
                  image: "/team/vijay.jpg",
                  id: "A3",
                },
              ].map((advisor, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 bg-[#1a1e42] relative w-full max-w-[280px] h-[380px] flex flex-col"
                >
                  {/* ID Number */}
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                    {advisor.id}
                  </div>

                  {/* Advisor Image */}
                  <div className="h-[250px] w-full overflow-hidden flex items-center justify-center">
                    <div className="relative h-full w-full">
                      <Image
                        src={advisor.image || "/placeholder.svg"}
                        alt={advisor.name}
                        fill
                        className="ml-[1px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 text-center flex-grow flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-1">{advisor.name}</h3>
                    <p className="text-purple-400 text-sm">{advisor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our Partners
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We collaborate with industry leaders to provide the best
              fundraising experience for Web3 founders and investors.
            </p>
          </div>

          <div className="reveal-animation flex items-center overflow-hidden relative w-full">
            <div className="flex animate-scroll whitespace-nowrap">
              {[
                { name: "#", img: "/partner_logo/1.png" },
                { name: "#", img: "/partner_logo/2.png" },
                { name: "#", img: "/partner_logo/3.png" },
                { name: "#", img: "/partner_logo/4.png" },
                { name: "#", img: "/partner_logo/5.png" },
                { name: "#", img: "/partner_logo/6.png" },
                { name: "#", img: "/partner_logo/7.png" },
                { name: "#", img: "/partner_logo/8.png" },
                { name: "#", img: "/partner_logo/9.png" },
                { name: "#", img: "/partner_logo/10.png" },
                { name: "#", img: "/partner_logo/11.png" },
                { name: "#", img: "/partner_logo/12.png" },
                { name: "#", img: "/partner_logo/13.png" },
                { name: "#", img: "/partner_logo/14.png" },
                { name: "#", img: "/partner_logo/15.png" },
                { name: "#", img: "/partner_logo/16.png" },
                { name: "#", img: "/partner_logo/17.png" },
                { name: "#", img: "/partner_logo/18.png" },
                { name: "#", img: "/partner_logo/19.png" },
                { name: "#", img: "/partner_logo/20.png" },
                { name: "#", img: "/partner_logo/21.png" },
                { name: "#", img: "/partner_logo/22.png" },
                { name: "#", img: "/partner_logo/23.png" },
                { name: "#", img: "/partner_logo/24.png" },
              ].flatMap((partner, i) => [
                <div
                  key={`partner-${i}`}
                  className="mx-4 flex-shrink-0 w-[180px] h-20 bg-[#1a1e42] rounded-xl flex items-center justify-center hover:bg-[#252A47] transition-colors"
                >
                  <div className="relative h-12 w-full">
                    <Image
                      src={partner.img}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>,
              ])}
            </div>

            {/* Duplicate for seamless infinite scroll */}
            <div
              className="flex animate-scroll whitespace-nowrap"
              aria-hidden="true"
            >
              {[
                { name: "#", img: "/partner_logo/1.png" },
                { name: "#", img: "/partner_logo/2.png" },
                { name: "#", img: "/partner_logo/3.png" },
                { name: "#", img: "/partner_logo/4.png" },
                { name: "#", img: "/partner_logo/5.png" },
                { name: "#", img: "/partner_logo/6.png" },
                { name: "#", img: "/partner_logo/7.png" },
                { name: "#", img: "/partner_logo/8.png" },
                { name: "#", img: "/partner_logo/9.png" },
                { name: "#", img: "/partner_logo/10.png" },
                { name: "#", img: "/partner_logo/11.png" },
                { name: "#", img: "/partner_logo/12.png" },
                { name: "#", img: "/partner_logo/13.png" },
                { name: "#", img: "/partner_logo/14.png" },
                { name: "#", img: "/partner_logo/15.png" },
                { name: "#", img: "/partner_logo/16.png" },
                { name: "#", img: "/partner_logo/17.png" },
                { name: "#", img: "/partner_logo/18.png" },
                { name: "#", img: "/partner_logo/19.png" },
                { name: "#", img: "/partner_logo/20.png" },
                { name: "#", img: "/partner_logo/21.png" },
                { name: "#", img: "/partner_logo/22.png" },
                { name: "#", img: "/partner_logo/23.png" },
                { name: "#", img: "/partner_logo/24.png" },
              ].map((partner, i) => (
                <div
                  key={`partner-duplicate-${i}`}
                  className="mx-4 flex-shrink-0 w-[180px] h-20 bg-[#1a1e42] rounded-xl flex items-center justify-center hover:bg-[#252A47] transition-colors"
                >
                  <div className="relative h-12 w-full">
                    <Image
                      src={partner.img}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 md:py-24 bg-[#0c0f24]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Roadmap</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our strategic plan to revolutionize Web3 fundraising and build the
              future of startup financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 reveal-animation">
            {[
              {
                phase: "Alpha",
                date: "Q2 2025",
                items: [
                  "Core platform functionality.",
                  "Basic AI evaluation.",
                  "Foundational educational content.",
                  "Limited access testing.",
                ],
              },
              {
                phase: "Beta",
                date: "Q3 2025",
                items: [
                  "Enhanced AI capabilities.",
                  "Expanded educational library.",
                  "Initial DeFi features.",
                  "Early adopter onboarding.",
                ],
              },
              {
                phase: "Launch",
                date: "Q4 2025",
                items: [
                  "Complete milestone-based funding.",
                  "Full investor functionality.",
                  "Comprehensive learning paths.",
                ],
              },
              {
                phase: "Expansion",
                date: "Q1-Q2 2026",
                items: [
                  "Tokenized equity framework.",
                  "Secondary market beta.",
                  "Advanced mentorship network.",
                  "Enhanced AI analytics.",
                ],
              },
              {
                phase: "Maturity",
                date: "Q3 2026+",
                items: [
                  "Full ecosystem integration.",
                  "Institutional collaborations & partnerships.",
                  "Global regulatory compliance.",
                ],
              },
            ].map((stage, index) => (
              <div
                key={index}
                className="bg-[#141736] p-6 rounded-lg border border-[#252A47]/30 flex flex-col h-full hover:border-[#4361EE]/30 transition-colors"
              >
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">{stage.date}</p>
                  <h3 className="text-[#7B61FF] text-2xl font-bold">
                    {stage.phase}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 flex-grow">
                  {stage.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7B61FF] mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Token Economy
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The token ($FUND) serves as the utility token powering the
              OnlyFounders ecosystem.
            </p>
          </div>

          {/* Token Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 reveal-animation">
            <div className="bg-[#1a1e42] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-2">Token Standard</h3>
              <p className="text-3xl text-[#7B61FF]">TBD</p>
            </div>
            <div className="bg-[#1a1e42] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-2">Total Supply</h3>
              <p className="text-3xl text-[#7B61FF]">1,000,000,000</p>
            </div>
          </div>

          {/* Token Allocation */}
          <div className="mb-20 reveal-animation">
            <h3 className="text-2xl font-bold mb-10 text-center">
              Token Distribution
            </h3>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Pie Chart */}
              <div className="flex justify-center">
                <div className="relative w-80 h-80">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Community & Ecosystem - 40% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#FF6B6B"
                      strokeWidth="20"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Team & Advisors - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#FFD166"
                      strokeWidth="20"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="100.48"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Treasury - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#06D6A0"
                      strokeWidth="20"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="150.72"
                      transform="rotate(-90 251.2)"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Education Fund - 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#118AB2"
                      strokeWidth="20"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="200.96"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Seed Investors - 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#9C89B8"
                      strokeWidth="20"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="226.08"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Center circle */}
                    <circle cx="50" cy="50" r="30" fill="#1a1e42" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-xl font-bold">100%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                {[
                  {
                    label: "Community & Ecosystem",
                    percentage: 40,
                    color: "#FF6B6B",
                  },
                  {
                    label: "Team & Advisors",
                    percentage: 20,
                    color: "#FFD166",
                  },
                  { label: "Treasury", percentage: 20, color: "#06D6A0" },
                  { label: "Education Fund", percentage: 10, color: "#118AB2" },
                  { label: "Seed Investors", percentage: 10, color: "#9C89B8" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1e42] p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <h4 className="font-medium">{item.label}</h4>
                      </div>
                      <span className="font-bold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-[#252A47] rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Token Utility */}
          <div className="reveal-animation">
            <h3 className="text-2xl font-bold mb-10 text-center">
              Token Utility
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: `Educational Access`,
                  description:
                    "Token holders gain access to exclusive educational content and resources on the platform.",
                },
                {
                  title: "Governance Rights",
                  description:
                    "Participate in platform governance decisions and vote on key protocol changes.",
                },
                {
                  title: "Platform Benefits",
                  description:
                    "Enjoy reduced fees, priority access to new features, and enhanced platform functionality.",
                },
                {
                  title: "Ecosystem Participation",
                  description:
                    "Engage with the broader OnlyFounders ecosystem through staking, rewards, and community initiatives.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1a1e42] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                >
                  <div className="w-12 h-12 bg-[#4361EE] rounded-lg flex items-center justify-center mb-6">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-[#0f1129]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-[#231B4D] rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Join the OnlyFounders Community
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Whether you're a founder looking to raise funds or an investor
                seeking the next big thing, OnlyFounders has you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3A53D9] transition-colors"
                >
                  Explore Startups <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center bg-[#0f1129] text-white px-6 py-3 rounded-lg font-medium border border-[#252A47] hover:bg-[#1a1e42] transition-colors"
                >
                  Start Fundraising
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
