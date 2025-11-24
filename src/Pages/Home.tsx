import { useState } from 'react'

function Home() {
  const [storeName, setStoreName] = useState('')
  const [branchId, setBranchId] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for store branches:', { storeName, branchId })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-stone-200" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #f5e6d3 25%, #e8d5b7 50%, #d4a574 75%, #c9a082 100%)' }}>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/Images/logo.png" 
              alt="Store Logo" 
              className="h-32 w-auto object-contain"
            />
          </div>
          
          <div className="relative inline-block mb-6">
            {/* Decorative ribbon effect */}
            <div className="absolute -top-2 -left-4 w-full h-12 bg-red-600 rounded-t-lg transform -rotate-1"></div>
            <div className="absolute -top-2 -right-4 w-full h-12 bg-red-600 rounded-t-lg transform rotate-1"></div>
            <h1 className="relative text-5xl font-bold text-white mb-4 px-8 py-3 bg-red-600 rounded-lg shadow-lg" style={{ fontFamily: 'serif' }}>
              Find Store Branch
            </h1>
          </div>
          <p className="text-xl text-gray-700" style={{ fontFamily: 'serif' }}>
            Search for specific store branches by name or branch ID
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-2xl p-8 border-2 border-red-600 relative">
            {/* Decorative green ribbons */}
            <div className="absolute -top-3 left-8 w-16 h-6 bg-green-600 rounded-full transform rotate-12"></div>
            <div className="absolute -top-3 right-8 w-16 h-6 bg-green-600 rounded-full transform -rotate-12"></div>
            {/* Store Name Search */}
            <div className="mb-6 mt-4">
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-800 mb-2" style={{ fontFamily: 'serif' }}>
                Store Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Enter store name..."
                  className="block w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-600 text-lg bg-amber-50/70"
                />
              </div>
            </div>

            {/* Branch ID Search */}
            <div className="mb-6">
              <label htmlFor="branchId" className="block text-sm font-medium text-gray-800 mb-2" style={{ fontFamily: 'serif' }}>
                Branch ID / Code (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="branchId"
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  placeholder="Enter branch ID or code..."
                  className="block w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-600 text-lg bg-amber-50/70"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-red-700"
              style={{ fontFamily: 'serif' }}
            >
              Search Branches
            </button>
          </form>
        
        </div>
      </div>
    </div>
  )
}

export default Home

