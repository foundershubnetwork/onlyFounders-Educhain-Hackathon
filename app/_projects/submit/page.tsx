import { ProjectSubmissionForm } from "@/components/project-submission-form"

export default function SubmitProjectPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Submit Your Project</h1>
        <p className="text-[#A3A8AF]">
          Join the Optimus AI ecosystem and connect with investors who believe in your vision.
        </p>
      </div>

      <ProjectSubmissionForm />
    </div>
  )
}

