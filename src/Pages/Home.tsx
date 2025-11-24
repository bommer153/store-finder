import { useState } from 'react'
import ClickSpark from '@/components/ClickSpark';
import branchesData from '@/data/branches.json';

interface Branch {
    id: string;
    name: string;
    storeName: string;
    phone: string;
    address: string;
    isp: string;
    anyDeskId: string;
    area: string;
    keywords?: string[];
}

function Home() {
    const [storeName, setStoreName] = useState('')
    const [branchId, setBranchId] = useState('')
    const [searchResult, setSearchResult] = useState<Branch | null>(null)
    const [notFound, setNotFound] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setNotFound(false)
        setSearchResult(null)

        const nameQuery = storeName.trim().toLowerCase()
        const idQuery = branchId.trim().toUpperCase()

        if (!nameQuery && !idQuery) {
            setNotFound(true)
            return
        }

        const foundBranch = (branchesData.branches as Branch[]).find((branch) => {
            const matchesName = nameQuery
                ? branch.name.toLowerCase().includes(nameQuery) ||
                  branch.storeName.toLowerCase().includes(nameQuery)
                : false
            const matchesKeyword = nameQuery
                ? branch.keywords?.some((keyword) =>
                      keyword.toLowerCase().includes(nameQuery)
                  ) ?? false
                : false
            const matchesId = idQuery ? branch.id.toUpperCase().includes(idQuery) : false
            return matchesName || matchesKeyword || matchesId
        })

        if (foundBranch) {
            setSearchResult(foundBranch)
        } else {
            setNotFound(true)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-stone-200" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #f5e6d3 25%, #e8d5b7 50%, #d4a574 75%, #c9a082 100%)' }}>
            <ClickSpark
                sparkColor='#fff'
                sparkSize={20}
                sparkRadius={30}
                sparkCount={15}
                duration={500}
            >
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

                        {/* Search Results */}
                        {searchResult && (
                            <div className="mt-8 bg-white rounded-lg shadow-2xl p-8 border-2 border-green-600">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'serif' }}>
                                        {searchResult.name} Branch
                                    </h2>
                                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
                                        Area: {searchResult.area}
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>Branch Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-600">Branch ID</p>
                                                <p className="text-base font-medium text-gray-900">{searchResult.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Store Name</p>
                                                <p className="text-base font-medium text-gray-900">{searchResult.storeName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Address</p>
                                                <p className="text-base font-medium text-gray-900">{searchResult.address}</p>
                                            </div>                                           
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>Contact & Support</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-600">Phone</p>
                                                <p className="text-base font-medium text-gray-900">{searchResult.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">ISP</p>
                                                <p className="text-base font-medium text-gray-900">{searchResult.isp}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">AnyDesk ID</p>
                                                <p className="text-base font-medium text-gray-900">{searchResult.anyDeskId}</p>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        )}

                        {notFound && (
                            <div className="mt-8 bg-white rounded-lg shadow-2xl p-8 border-2 border-red-300">
                                <div className="text-center py-8">
                                    <svg
                                        className="mx-auto h-16 w-16 text-red-400 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'serif' }}>
                                        Branch Not Found
                                    </h3>
                                    <p className="text-gray-600">
                                        No branch matched your search. Try another branch name, ID, or one of the suggested keywords such as
                                        "Bicutan", "Makati Ave", "BGC High Street", or "Cebu IT Park".
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </ClickSpark>
        </div>
    )
}

export default Home

