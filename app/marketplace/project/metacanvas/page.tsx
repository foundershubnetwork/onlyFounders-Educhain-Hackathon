// Add or update the default export function
export default function MetaCanvasProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">MetaCanvas: Decentralized Creative Platform</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="mb-4">
              MetaCanvas is revolutionizing digital art creation and ownership through a decentralized platform that
              empowers artists and collectors with true ownership and collaborative opportunities.
            </p>
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Collaborative creation tools for artists</li>
                <li>NFT marketplace with fractional ownership</li>
                <li>AI-powered creative assistance</li>
                <li>Community governance for platform decisions</li>
                <li>Cross-chain compatibility</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Funding Goal</h3>
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-blue-600">750,000 USDC</span>
                <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">65% Funded</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <p className="text-sm text-gray-600">487,500 USDC raised of 750,000 USDC goal</p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Team</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">SL</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Lee</p>
                  <p className="text-sm text-gray-600">Founder & CEO</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">JT</span>
                </div>
                <div>
                  <p className="font-medium">James Thompson</p>
                  <p className="text-sm text-gray-600">CTO</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">MK</span>
                </div>
                <div>
                  <p className="font-medium">Maya Kim</p>
                  <p className="text-sm text-gray-600">Creative Director</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Investment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Min. Investment</span>
                <span className="font-medium">100 USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Token Price</span>
                <span className="font-medium">0.05 USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vesting Period</span>
                <span className="font-medium">12 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium">2.5%</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition">
              Invest Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Milestone Tracker</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">MVP Launch</h4>
                <span className="text-green-600">Completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">March 2025 - 150,000 USDC released</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Beta Platform with 100 Artists</h4>
                <span className="text-blue-600">75% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">April 2025 - 200,000 USDC to be released</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Public Launch</h4>
                <span className="text-gray-600">Upcoming</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">June 2025 - 250,000 USDC to be released</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Mobile App Release</h4>
                <span className="text-gray-600">Upcoming</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">August 2025 - 150,000 USDC to be released</p>
            </div>
          </div>
        </div>

        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Market & Traction</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Current Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Monthly Active Users</p>
                  <p className="text-xl font-bold">2,500+</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Artists Onboarded</p>
                  <p className="text-xl font-bold">75</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-600">NFTs Created</p>
                  <p className="text-xl font-bold">450+</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Trading Volume</p>
                  <p className="text-xl font-bold">35,000 USDC</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Market Size</h4>
              <p className="text-gray-700 mb-2">
                The digital art and NFT market is projected to reach $80 billion by 2026, with a CAGR of 35%.
              </p>
              <p className="text-gray-700">
                MetaCanvas is targeting the intersection of collaborative creation tools and NFT marketplaces, a rapidly
                growing segment with limited competition.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Growth Strategy</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Strategic partnerships with established art platforms</li>
                <li>Artist ambassador program with revenue sharing</li>
                <li>Community-driven feature development</li>
                <li>Cross-chain expansion to capture wider audience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Updates & Announcements</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-sm text-gray-500">April 15, 2025</p>
            <h4 className="font-medium">Partnership with ArtBlock Announced</h4>
            <p className="text-gray-700">
              We're excited to announce our strategic partnership with ArtBlock, which will bring 50+ established
              digital artists to our platform at launch.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-sm text-gray-500">April 3, 2025</p>
            <h4 className="font-medium">Beta Testing Milestone Reached</h4>
            <p className="text-gray-700">
              Our beta platform has now onboarded 75 artists and we're on track to reach our goal of 100 artists by the
              end of April.
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-sm text-gray-500">March 20, 2025</p>
            <h4 className="font-medium">MVP Successfully Launched</h4>
            <p className="text-gray-700">
              We've successfully launched our MVP with core features including collaborative canvas, basic NFT minting,
              and user profiles. Initial feedback has been overwhelmingly positive.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

