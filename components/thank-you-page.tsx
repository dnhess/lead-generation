import Link from "next/link"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-[#e8ebff] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-[#6b7aff]" />
        </div>

        <h1 className="text-2xl font-bold mb-4">Thank You</h1>

        <p className="text-gray-600 mb-8">
          Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.
        </p>

        <Button asChild className="w-full bg-zinc-900 hover:bg-zinc-800">
          <Link href="/">Go Back to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}

