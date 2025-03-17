import React from 'react';
import '../globals.css'
const PrivacyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full p-6 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your privacy is important to us. Here s how we handle your data.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="leading-relaxed">
              Asth built the Asth app/website as an Open Source app and website. This SERVICE is provided by Asth at no
              cost and is intended for use as is.
            </p>
            <p className="leading-relaxed mt-4">
              This page is used to inform visitors regarding our policies with the collection, use, and disclosure of
              Personal Information if anyone decides to use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Collection and Use</h2>
            <p className="leading-relaxed">
              For a better experience, while using our Service, we may require you to provide us with certain personally
              identifiable information, including but not limited to contacts, location. The information that we request
              will be retained by us and used as described in this privacy policy.
            </p>
            <p className="leading-relaxed mt-4">
              The app does use third-party services that may collect information used to identify you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Service Providers</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Google Play Services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Log Data</h2>
            <p className="leading-relaxed">
              We want to inform you that whenever you use our Service, in a case of an error in the app, we collect data
              and information (through third-party products) on your phone called Log Data. This Log Data may include
              information such as your device Internet Protocol  address, device name, operating system version, the
              configuration of the app when utilizing our Service, the time and date of your use of the Service, and
              other statistics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security</h2>
            <p className="leading-relaxed">
              We value your trust in providing us your Personal Information, thus we are striving to use commercially
              acceptable means of protecting it. But remember that no method of transmission over the internet, or method
              of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically
              for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="leading-relaxed mt-4">This policy is effective as of 2020-12-16.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
              <a
                href="mailto:info@ashtcabservices.in"
                className="ml-1 text-indigo-600 hover:text-purple-600 transition-colors duration-300"
              >
                info@ashtcabservices.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;