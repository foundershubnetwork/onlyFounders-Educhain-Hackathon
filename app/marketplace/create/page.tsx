import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectSubmissionForm } from "@/components/project-submission-form"

export default function CreateProjectPage() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Submit Your Project</h1>
        <p className="text-[#A3A8AF]">List your blockchain project and connect with investors on Optimus AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="bg-[#202C41] border-[#313E54]">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Project Details</CardTitle>
              <CardDescription className="text-[#A3A8AF]">
                Fill out the form below to submit your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectSubmissionForm />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="bg-[#1F2A3D] border-[#313E54]">
            <CardHeader>
              <CardTitle className="text-xl text-white">Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#202C41] p-4 rounded-lg border border-[#313E54]">
                <h3 className="text-cyan-400 font-medium mb-2">Project Requirements</h3>
                <ul className="text-[#A3A8AF] text-sm space-y-2">
                  <li>• Clear project description and goals</li>
                  <li>• Detailed tokenomics information</li>
                  <li>• Team background and experience</li>
                  <li>• Roadmap with clear milestones</li>
                </ul>
              </div>

              <div className="bg-[#202C41] p-4 rounded-lg border border-[#313E54]">
                <h3 className="text-purple-400 font-medium mb-2">Review Process</h3>
                <p className="text-[#A3A8AF] text-sm">
                  All submissions undergo a thorough review process to ensure quality and legitimacy before being listed
                  on the marketplace.
                </p>
              </div>

              <div className="bg-[#202C41] p-4 rounded-lg border border-[#313E54]">
                <h3 className="text-amber-400 font-medium mb-2">Listing Fee</h3>
                <p className="text-[#A3A8AF] text-sm">
                  A small listing fee of 100 USDC is required to prevent spam and ensure serious projects.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

