import { useState } from 'react'
import ClickSpark from '@/components/ClickSpark';
import branchesData from '@/data/branches.json';

interface Branch {
    // Personal Details
    id: string;
    name: string;
    storeName: string;
    phone: string;
    address: string;  
    anyDeskId: string;
    area: string;
    keywords?: string[];  
    email?: string;
    // Network Details
    dateInstalled?: string;
    isp: string;
    connectionType?: string;
    networkPhoneNumber?: string;
    accountNumber?: string;
    serviceId?: string;
    bandwidth?: string;
    plan?: string;
    // CCTV Details
    dvrNvr?: string;
    serialNumber?: string;
    numberOfCameras?: number;
    recordingDays?: number;
    ipAddress?: string;
    adminPassword?: string;
}

function Home() {
    const [storeName, setStoreName] = useState('')
    const [branchId, setBranchId] = useState('')
    const [searchResult, setSearchResult] = useState<Branch | null>(null)
    const [notFound, setNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const handleCopy = async (text: string, fieldId: string) => {
        if (!text || text === 'N/A') return
        try {
            await navigator.clipboard.writeText(text)
            setCopiedField(fieldId)
            setTimeout(() => setCopiedField(null), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setNotFound(false)
        setSearchResult(null)
        setShowResult(false)
        setIsLoading(true)

        const nameQuery = storeName.trim().toLowerCase()
        const idQuery = branchId.trim().toUpperCase()

        if (!nameQuery && !idQuery) {
            setTimeout(() => {
                setIsLoading(false)
                setTimeout(() => {
                    setNotFound(true)
                    setShowResult(true)
                }, 100)
            }, 400)
            return
        }

        // Simulate soft loading effect with a small delay
        setTimeout(() => {
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

            setIsLoading(false)
            
            // Small delay before showing results for smooth transition
            setTimeout(() => {
                if (foundBranch) {
                    setSearchResult(foundBranch)
                    setShowResult(true)
                    setShowPassword(false) // Reset password visibility on new search
                } else {
                    setNotFound(true)
                    setShowResult(true)
                }
            }, 100)
        }, 400)
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
                            <div className="absolute -top-2 -left-4 w-full h-12 rounded-t-lg transform -rotate-1" style={{ backgroundColor: '#8B0000' }}></div>
                            <div className="absolute -top-2 -right-4 w-full h-12 rounded-t-lg transform rotate-1" style={{ backgroundColor: '#8B0000' }}></div>
                            <h1 className="relative text-5xl font-bold text-white mb-4 px-8 py-3 rounded-lg shadow-lg" style={{ fontFamily: 'serif', backgroundColor: '#8B0000' }}>
                                Find Store Branch
                            </h1>
                        </div>
                        <p className="text-xl text-gray-700" style={{ fontFamily: 'serif' }}>
                            Search for specific store branches by name or branch ID
                        </p>
                    </div>

                    {/* Search Form */}
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-2xl p-8 border-2 relative overflow-hidden" style={{ borderColor: '#8B0000' }}>
                            {/* Decorative coffee elements */}
                            <div className="absolute top-4 left-4 opacity-10">
                                <svg className="w-20 h-20 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                                    <ellipse cx="12" cy="12" rx="8" ry="10" transform="rotate(-20 12 12)"/>
                                    <ellipse cx="12" cy="12" rx="6" ry="8" transform="rotate(20 12 12)" fill="none" stroke="currentColor" strokeWidth="1"/>
                                </svg>
                            </div>
                            <div className="absolute top-4 right-4 opacity-10">
                                <svg className="w-16 h-16 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                                    <ellipse cx="12" cy="12" rx="8" ry="10" transform="rotate(20 12 12)"/>
                                    <ellipse cx="12" cy="12" rx="6" ry="8" transform="rotate(-20 12 12)" fill="none" stroke="currentColor" strokeWidth="1"/>
                                </svg>
                            </div>
                            <div className="absolute bottom-4 left-4 opacity-10">
                                <svg className="w-14 h-14 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 2h14l-1 18H6L5 2zm2 2l1 14h6l1-14H7z"/>
                                </svg>
                            </div>
                            <div className="absolute bottom-4 right-4 opacity-10">
                                <svg className="w-18 h-18 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 2h14l-1 18H6L5 2zm2 2l1 14h6l1-14H7zm3 2v2h4V6h-4zm0 4v2h4v-2h-4z"/>
                                    <path d="M19 8h2v2h-2V8zm0 4h2v2h-2v-2z" opacity="0.5"/>
                                </svg>
                            </div>
                            
                                    {/* Corner decorations */}
                                    <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 rounded-tl-lg" style={{ borderColor: '#D4A574' }}></div>
                                    <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: '#8B0000' }}></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: '#D4A574' }}></div>
                                    <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 rounded-br-lg" style={{ borderColor: '#8B0000' }}></div>
                            
                            {/* Decorative coffee steam lines */}
                            <div className="absolute top-8 right-12 opacity-15">
                                <svg className="w-8 h-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4"/>
                                </svg>
                            </div>
                            <div className="absolute top-12 left-12 opacity-15">
                                <svg className="w-6 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4"/>
                                </svg>
                            </div>
                            
                            {/* Decorative ribbons with Mary Grace colors */}
                            <div className="absolute -top-3 left-8 w-16 h-6 rounded-full transform rotate-12 shadow-md" style={{ backgroundColor: '#8B0000' }}></div>
                            <div className="absolute -top-3 right-8 w-16 h-6 rounded-full transform -rotate-12 shadow-md" style={{ backgroundColor: '#D4A574' }}></div>
                            {/* Store Name Search */}
                            <div className="mb-6 mt-4 relative z-10">
                                <label htmlFor="storeName" className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2" style={{ fontFamily: 'serif' }}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#8B0000' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Store Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{ color: '#8B0000' }}
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
                                        className="block w-full pl-12 pr-4 py-4 border-2 rounded-lg text-lg transition-all duration-200"
                                        style={{ 
                                            borderColor: '#D4A574',
                                            backgroundColor: '#F5E6D3'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#8B0000';
                                            e.target.style.boxShadow = '0 0 0 2px rgba(139, 0, 0, 0.2)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#D4A574';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Branch ID Search */}
                            <div className="mb-6 relative z-10">
                                <label htmlFor="branchId" className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2" style={{ fontFamily: 'serif' }}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#8B0000' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                    </svg>
                                    Branch ID / Code (Optional)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{ color: '#8B0000' }}
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
                                        className="block w-full pl-12 pr-4 py-4 border-2 rounded-lg text-lg transition-all duration-200"
                                        style={{ 
                                            borderColor: '#D4A574',
                                            backgroundColor: '#F5E6D3'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#8B0000';
                                            e.target.style.boxShadow = '0 0 0 2px rgba(139, 0, 0, 0.2)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#D4A574';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Search Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative z-10 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 flex items-center justify-center gap-2 overflow-hidden group"
                                style={{ 
                                    backgroundColor: '#8B0000',
                                    borderColor: '#8B0000',
                                    fontFamily: 'serif'
                                }}
                                onMouseEnter={(e) => {
                                    if (!e.currentTarget.disabled) {
                                        e.currentTarget.style.backgroundColor = '#6B0000';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!e.currentTarget.disabled) {
                                        e.currentTarget.style.backgroundColor = '#8B0000';
                                    }
                                }}
                            >
                                {/* Coffee bean decoration on button */}
                                <div className="absolute left-4 opacity-20 group-hover:opacity-30 transition-opacity">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <ellipse cx="12" cy="12" rx="8" ry="10" transform="rotate(-15 12 12)"/>
                                    </svg>
                                </div>
                                <div className="absolute right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <ellipse cx="12" cy="12" rx="8" ry="10" transform="rotate(15 12 12)"/>
                                    </svg>
                                </div>
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="relative z-10">Searching...</span>
                                    </>
                                ) : (
                                    <span className="relative z-10 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Search Branches
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="mt-8 bg-white rounded-lg shadow-2xl p-8 border-2 border-amber-300 animate-pulse">
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="relative w-16 h-16 mb-6">
                                        <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                                    </div>
                                    <p className="text-lg text-gray-600" style={{ fontFamily: 'serif' }}>
                                        Searching for branches...
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Search Results */}
                        {searchResult && showResult && !isLoading && (
                            <div className="mt-8 space-y-6">
                                {/* Personal Details */}
                                <div className="bg-white rounded-lg shadow-2xl p-8 border-2 animate-fade-in relative overflow-hidden" style={{ borderColor: '#D4A574' }}>
                                    {/* Decorative coffee beans */}
                                    <div className="absolute top-2 right-2 opacity-10">
                                        <svg className="w-16 h-16 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                                            <ellipse cx="12" cy="12" rx="8" ry="10" transform="rotate(-15 12 12)"/>
                                            <ellipse cx="12" cy="12" rx="6" ry="8" transform="rotate(15 12 12)" fill="none" stroke="currentColor" strokeWidth="1"/>
                                        </svg>
                                    </div>
                                    <div className="absolute bottom-2 left-2 opacity-10">
                                        <svg className="w-12 h-12 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                                            <ellipse cx="12" cy="12" rx="8" ry="10" transform="rotate(15 12 12)"/>
                                            <ellipse cx="12" cy="12" rx="6" ry="8" transform="rotate(-15 12 12)" fill="none" stroke="currentColor" strokeWidth="1"/>
                                        </svg>
                                    </div>
                                    {/* Corner decorations */}
                                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 rounded-tl-lg" style={{ borderColor: '#D4A574' }}></div>
                                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 rounded-br-lg" style={{ borderColor: '#D4A574' }}></div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6 italic relative z-10 flex items-center gap-2" style={{ fontFamily: 'serif' }}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#8B0000' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Personal Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Store ID</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.id}</p>
                                                <button
                                                    onClick={() => handleCopy(searchResult.id, 'id')}
                                                    className="p-1 hover:bg-gray-100 rounded transition"
                                                    title="Copy Store ID"
                                                >
                                                    {copiedField === 'id' ? (
                                                        <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Branch Name</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.name}</p>
                                                <button
                                                    onClick={() => handleCopy(searchResult.name, 'name')}
                                                    className="p-1 hover:bg-gray-100 rounded transition"
                                                    title="Copy Branch Name"
                                                >
                                                    {copiedField === 'name' ? (
                                                        <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Area</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.area}</p>
                                                <button
                                                    onClick={() => handleCopy(searchResult.area, 'area')}
                                                    className="p-1 hover:bg-gray-100 rounded transition"
                                                    title="Copy Area"
                                                >
                                                    {copiedField === 'area' ? (
                                                        <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Anydesk</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.anyDeskId}</p>
                                                <button
                                                    onClick={() => handleCopy(searchResult.anyDeskId, 'anydesk')}
                                                    className="p-1 hover:bg-gray-100 rounded transition"
                                                    title="Copy Anydesk ID"
                                                >
                                                    {copiedField === 'anydesk' ? (
                                                        <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Store Name</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.storeName}</p>
                                                <button
                                                    onClick={() => handleCopy(searchResult.storeName, 'storeName')}
                                                    className="p-1 hover:bg-gray-100 rounded transition"
                                                    title="Copy Store Name"
                                                >
                                                    {copiedField === 'storeName' ? (
                                                        <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Phone no</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.phone}</p>
                                                <button
                                                    onClick={() => handleCopy(searchResult.phone, 'phone')}
                                                    className="p-1 hover:bg-gray-100 rounded transition"
                                                    title="Copy Phone Number"
                                                >
                                                    {copiedField === 'phone' ? (
                                                        <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Email</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.email || 'N/A'}</p>
                                                {searchResult.email && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.email || '', 'email')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Email"
                                                    >
                                                        {copiedField === 'email' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Network Details */}
                                <div className="bg-white rounded-lg shadow-2xl p-8 border-2 animate-fade-in relative overflow-hidden" style={{ borderColor: '#8B0000' }}>
                                    {/* Decorative coffee steam */}
                                    <div className="absolute top-4 right-4 opacity-10">
                                        <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                        </svg>
                                    </div>
                                    <div className="absolute bottom-4 left-4 opacity-10">
                                        <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                        </svg>
                                    </div>
                                    {/* Corner decorations */}
                                    <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: '#8B0000' }}></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: '#8B0000' }}></div>
                                    <div className="flex items-center justify-between mb-6 relative z-10">
                                        <h3 className="text-xl font-semibold text-gray-800 italic flex items-center gap-2" style={{ fontFamily: 'serif' }}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#8B0000' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                            </svg>
                                            Network Details
                                        </h3>                                      
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                            <p className="text-sm text-gray-600 mb-1">ISP</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.isp || 'N/A'}</p>
                                                {searchResult.isp && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.isp || '', 'isp')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy ISP"
                                                    >
                                                        {copiedField === 'isp' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Date Installed</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.dateInstalled || 'N/A'}</p>
                                                {searchResult.dateInstalled && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.dateInstalled || '', 'dateInstalled')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Date Installed"
                                                    >
                                                        {copiedField === 'dateInstalled' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Connection Type</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.connectionType || 'N/A'}</p>
                                                {searchResult.connectionType && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.connectionType || '', 'connectionType')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Connection Type"
                                                    >
                                                        {copiedField === 'connectionType' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>                                      
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Account #</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.accountNumber || 'N/A'}</p>
                                                {searchResult.accountNumber && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.accountNumber || '', 'accountNumber')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Account Number"
                                                    >
                                                        {copiedField === 'accountNumber' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                                            <p className="text-sm text-gray-600 mb-1">ServiceID/CID</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.serviceId || 'N/A'}</p>
                                                {searchResult.serviceId && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.serviceId || '', 'serviceId')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy ServiceID/CID"
                                                    >
                                                        {copiedField === 'serviceId' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Bandwidth</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.bandwidth || 'N/A'}</p>
                                                {searchResult.bandwidth && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.bandwidth || '', 'bandwidth')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Bandwidth"
                                                    >
                                                        {copiedField === 'bandwidth' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Plan</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.plan || 'N/A'}</p>
                                                {searchResult.plan && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.plan || '', 'plan')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Plan"
                                                    >
                                                        {copiedField === 'plan' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CCTV Details */}
                                <div className="bg-white rounded-lg shadow-2xl p-8 border-2 animate-fade-in relative overflow-hidden" style={{ borderColor: '#8B0000' }}>
                                    {/* Decorative coffee cup */}
                                    <div className="absolute top-3 right-3 opacity-10">
                                        <svg className="w-18 h-18 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 2h14l-1 18H6L5 2zm2 2l1 14h6l1-14H7zm3 2v2h4V6h-4zm0 4v2h4v-2h-4zm0 4v2h4v-2h-4z"/>
                                            <path d="M19 8h2v2h-2V8zm0 4h2v2h-2v-2z" opacity="0.5"/>
                                        </svg>
                                    </div>
                                    <div className="absolute bottom-3 left-3 opacity-10">
                                        <svg className="w-14 h-14 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 2h14l-1 18H6L5 2zm2 2l1 14h6l1-14H7z"/>
                                        </svg>
                                    </div>
                                    {/* Corner decorations */}
                                    <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: '#8B0000' }}></div>
                                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: '#8B0000' }}></div>
                                    {/* Decorative dots pattern */}
                                    <div className="absolute top-8 left-8 w-2 h-2 rounded-full opacity-30" style={{ backgroundColor: '#D4A574' }}></div>
                                    <div className="absolute top-12 left-12 w-2 h-2 rounded-full opacity-30" style={{ backgroundColor: '#D4A574' }}></div>
                                    <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full opacity-30" style={{ backgroundColor: '#D4A574' }}></div>
                                    <div className="absolute bottom-12 right-12 w-2 h-2 rounded-full opacity-30" style={{ backgroundColor: '#D4A574' }}></div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6 italic relative z-10 flex items-center gap-2" style={{ fontFamily: 'serif' }}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#8B0000' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        CCTV Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                            <p className="text-sm text-gray-600 mb-1">DVR/NVR</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.dvrNvr || 'N/A'}</p>
                                                {searchResult.dvrNvr && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.dvrNvr || '', 'dvrNvr')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy DVR/NVR"
                                                    >
                                                        {copiedField === 'dvrNvr' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Serial Number</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.serialNumber || 'N/A'}</p>
                                                {searchResult.serialNumber && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.serialNumber || '', 'serialNumber')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Serial Number"
                                                    >
                                                        {copiedField === 'serialNumber' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                            <p className="text-sm text-gray-600 mb-1">No. of Camera</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.numberOfCameras || 'N/A'}</p>
                                                {searchResult.numberOfCameras && (
                                                    <button
                                                        onClick={() => handleCopy(String(searchResult.numberOfCameras), 'numberOfCameras')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Number of Cameras"
                                                    >
                                                        {copiedField === 'numberOfCameras' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                            <p className="text-sm text-gray-600 mb-1">No. of Recording Days</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.recordingDays || 'N/A'}</p>
                                                {searchResult.recordingDays && (
                                                    <button
                                                        onClick={() => handleCopy(String(searchResult.recordingDays), 'recordingDays')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy Recording Days"
                                                    >
                                                        {copiedField === 'recordingDays' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                            <p className="text-sm text-gray-600 mb-1">IP Address</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900">{searchResult.ipAddress || 'N/A'}</p>
                                                {searchResult.ipAddress && (
                                                    <button
                                                        onClick={() => handleCopy(searchResult.ipAddress || '', 'ipAddress')}
                                                        className="p-1 hover:bg-gray-100 rounded transition"
                                                        title="Copy IP Address"
                                                    >
                                                        {copiedField === 'ipAddress' ? (
                                                            <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                                            <p className="text-sm text-gray-600 mb-1">Admin Password</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-medium text-gray-900 flex-1">
                                                    {searchResult.adminPassword 
                                                        ? (showPassword ? searchResult.adminPassword : '••••••••')
                                                        : 'N/A'
                                                    }
                                                </p>
                                                {searchResult.adminPassword && (
                                                    <>
                                                        <button
                                                            onClick={() => handleCopy(searchResult.adminPassword || '', 'adminPassword')}
                                                            className="p-1 hover:bg-gray-100 rounded transition"
                                                            title="Copy Password"
                                                        >
                                                            {copiedField === 'adminPassword' ? (
                                                                <svg className="w-4 h-4" style={{ color: '#8B0000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="p-1.5 hover:bg-gray-100 rounded transition"
                                                            style={{ color: '#8B0000' }}
                                                            title={showPassword ? 'Hide password' : 'Show password'}
                                                        >
                                                            {showPassword ? (
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m13.42 13.42L21 21M12 12l.01.01M3 3l18 18" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {notFound && showResult && !isLoading && (
                            <div className="mt-8 bg-white rounded-lg shadow-2xl p-8 border-2 border-red-300 animate-fade-in">
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

