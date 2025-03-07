import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | Nepal Disaster Response System",
  description: "Privacy Policy for Nepal Disaster Response System",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Information about incidents you report</li>
              <li>Location data when reporting incidents</li>
              <li>Communications with our team</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide disaster response services</li>
              <li>Coordinate emergency responses</li>
              <li>Communicate with you about incidents</li>
              <li>Improve our services</li>
              <li>Ensure the security of our platform</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Emergency response teams</li>
              <li>Government authorities</li>
              <li>Service providers</li>
              <li>Other users when necessary for coordination</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="mb-4">We implement appropriate security measures to protect your information, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Regular security audits</li>
              <li>Access controls</li>
              <li>Secure data storage</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of certain data sharing</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
            <p>If you have questions about this privacy policy, please contact us at:</p>
            <p>Email: privacy@nepaldrs.gov.np</p>
            <p>Phone: +977-1-4200000</p>
            <p>Address: Singha Durbar, Kathmandu, Nepal</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}