// app/[locale]/search/page.jsx
import { Suspense } from 'react';
import ElegantBreadcrumb from '../../../components/layout/BreadCrumb';
import SearchResultsContent from '@/components/search/CompleteSearchResults';

// ✅ Main Search Page Component
export default async function SearchPage({ params, searchParams }) {
  const { locale } = await params;
  const query = searchParams.q || '';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <ElegantBreadcrumb 
            locale={locale}
            paths={[
              { href: '/', label: 'home' },
              { 
                href: '/search', 
                customLabel: locale === 'vi' ? 'Kết quả tìm kiếm' : 'Search Results'
              }
            ]} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3e1f0e] font-['Montserrat'] mb-2">
            {locale === 'vi' ? 'Kết quả tìm kiếm' : 'Search Results'}
          </h1>
          {query ? (
            <p className="text-[#3e1f0e]/70 font-['Montserrat']">
              {locale === 'vi' ? 'Tìm kiếm cho: ' : 'Search for: '}
              <span className="font-semibold text-[#DE9400]">"{query}"</span>
            </p>
          ) : (
            <p className="text-[#3e1f0e]/70 font-['Montserrat']">
              {locale === 'vi' 
                ? 'Nhập từ khóa để tìm kiếm sản phẩm chocolate cao cấp'
                : 'Enter keywords to search for premium chocolate products'
              }
            </p>
          )}
        </div>

        {/* Search Results Content */}
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResultsContent locale={locale} query={query} />
        </Suspense>
      </div>
    </main>
  );
}

// ✅ Loading Skeleton Component
function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters skeleton */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Results skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}