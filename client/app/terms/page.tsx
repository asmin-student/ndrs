import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms & Conditions | Nepal Disaster Response System",
  description: "Terms and Conditions for Nepal Disaster Response System",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing and using the Nepal Disaster Response System, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>

            <h2 className="text-xl font-semibold mb-4">2. User Responsibilities</h2>
            <p className="mb-4">Users must:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate information when reporting incidents</li>
              <li>Not misuse the platform for false reports</li>
              <li>Maintain confidentiality of their account credentials</li>
              <li>Respect the privacy of others</li>
              <li>Follow guidelines for emergency response coordination</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">3. Incident Reporting</h2>
            <p className="mb-4">When reporting incidents:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate location information</li>
              <li>Include relevant details about the situation</li>
              <li>Update information as conditions change</li>
              <li>Follow verification procedures</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">4. Resource Management</h2>
            <p className="mb-4">Users involved in resource management must:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Accurately report resource availability</li>
              <li>Follow allocation procedures</li>
              <li>Update resource status promptly</li>
              <li>Maintain proper documentation</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">5. Liability</h2>
            <p className="mb-4">The Nepal Disaster Response System:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provides information as-is without warranties</li>
              <li>Is not liable for actions taken based on provided information</li>
              <li>Reserves the right to modify or terminate services</li>
              <li>May update these terms at any time</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">6. Contact</h2>
            <p>For questions about these terms, contact us at:</p>
            <p>Email: legal@nepaldrs.gov.np</p>
            <p>Phone: +977-1-4200000</p>
            <p>Address: Singha Durbar, Kathmandu, Nepal</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}