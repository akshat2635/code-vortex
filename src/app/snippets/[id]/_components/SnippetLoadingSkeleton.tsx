import NavigationHeader from "@/components/NavigationHeader";

function SnippetLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <main className="max-w-[85rem] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="max-w-[1000px] mx-auto">
          {/* Skeleton Header */}
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-xl p-4 sm:p-5 mb-4 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-lg bg-[#ffffff08] animate-pulse" />
                <div>
                  <div className="h-6 w-40 bg-[#ffffff08] rounded-lg animate-pulse mb-1.5" />
                  <div className="flex gap-3">
                    <div className="h-4 w-20 bg-[#ffffff08] rounded animate-pulse" />
                    <div className="h-4 w-20 bg-[#ffffff08] rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            {/* Skeleton Code Editor */}
            <div className="h-[300px] bg-[#ffffff08] rounded-lg animate-pulse" />
          </div>
          {/* Skeleton Comments Section */}
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-xl p-4 sm:p-5 backdrop-blur-xl">
            <div className="h-5 w-28 bg-[#ffffff08] rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#ffffff08] animate-pulse" />
                  <div className="flex-1">
                    <div className="h-3.5 w-28 bg-[#ffffff08] rounded animate-pulse mb-1.5" />
                    <div className="h-12 bg-[#ffffff08] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default SnippetLoadingSkeleton;
