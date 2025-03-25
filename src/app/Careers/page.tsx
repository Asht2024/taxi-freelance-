const CareersPage = () => {
    return (
      <div className="min-h-screen mt-5">
        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Join the ASHT Cab Revolution
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Be part of Gujarat is fastest growing transportation service
            </p>
          </section>
  
          {/* Company Journey */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border-2 border-blue-100">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Our Legacy
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">🚀 Founding Vision</h3>
                <p className="text-gray-600">
                  Established in 2014 under the visionary leadership of Mr. Hiren Pankhaniya 
                  (Director) and Mrs. Nirmalaben Pankhaniya (CEO), ASHT Cab has transformed 
                  from local service provider to regional leader serving 250+ cities.
                </p>
              </div>
  
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">📈 Corporate Evolution</h3>
                <p className="text-gray-600">
                  Incorporated on February 15, 2024, we combine decade-long experience with 
                  cutting-edge technology to redefine smart mobility solutions across Gujarat.
                </p>
              </div>
            </div>
          </div>
  
          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Mr. Hiren Pankhaniya</h3>
                <p className="text-lg text-gray-600 mb-4">Director</p>
                <p className="text-gray-600">
                  Strategic visionary driving operational excellence and market expansion
                </p>
              </div>
  
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Mrs. Nirmalaben Pankhaniya</h3>
                <p className="text-lg text-gray-600 mb-4">Chief Executive Officer</p>
                <p className="text-gray-600">
                  Customer experience champion leading service innovation
                </p>
              </div>
            </div>
          </div>
  
          {/* Tech Team */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border-2 border-blue-100">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Technology Architects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Rahul Singh</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">📧 21012003rs@gmail.com</p>
                  <p className="text-gray-600">📱 8318297569</p>
                  <p className="text-gray-600">
                    B.Tech (Electronics and Communication Device) - IIIT Ranchi<br/>
                    Full Stack Developer specializing in scalable mobility solutions
                  </p>
                </div>
              </div>
  
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Praveen Maurya</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">📧 satyammaurya9620@gmail.com</p>
                  <p className="text-gray-600">📱 8302252848</p>
                  <p className="text-gray-600">
                    B.Tech (Electronics and Communication Device) - IIIT Ranchi<br/>
                    Backend Systems Expert focusing on transportation logistics
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Our Operational Pillars
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Safety First', content: 'ISO-certified maintenance protocols' },
                { title: '24/7 Availability', content: 'Round-the-clock service network' },
                { title: 'Smart Pricing', content: 'Dynamic fare algorithms' },
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.content}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default CareersPage;