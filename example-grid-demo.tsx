// Example: Nested Grid in Tailwind CSS
export default function GridDemo() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Nested Grid Demo</h1>
      
      {/* Main Grid: 4 columns */}
      <div className="grid gap-6 grid-cols-4 h-96">
        
        {/* Column 1: Normal */}
        <div className="bg-blue-100 p-4 rounded">
          <h3>Column 1</h3>
          <p>Single column</p>
        </div>
        
        {/* Column 2: Normal */}
        <div className="bg-green-100 p-4 rounded">
          <h3>Column 2</h3>
          <p>Single column</p>
        </div>
        
        {/* Column 3: Bisected into 2 sub-columns */}
        <div className="bg-purple-100 p-4 rounded">
          <h3>Column 3 (Bisected)</h3>
          {/* Nested Grid: 2 columns */}
          <div className="grid gap-2 grid-cols-2 h-32 mt-4">
            <div className="bg-purple-200 p-2 rounded text-sm">
              Sub-col 3a
            </div>
            <div className="bg-purple-300 p-2 rounded text-sm">
              Sub-col 3b
            </div>
          </div>
        </div>
        
        {/* Column 4: Bisected into 3 sub-columns */}
        <div className="bg-orange-100 p-4 rounded">
          <h3>Column 4 (3 sub-cols)</h3>
          {/* Nested Grid: 3 columns */}
          <div className="grid gap-1 grid-cols-3 h-32 mt-4">
            <div className="bg-orange-200 p-2 rounded text-xs">
              4a
            </div>
            <div className="bg-orange-300 p-2 rounded text-xs">
              4b
            </div>
            <div className="bg-orange-400 p-2 rounded text-xs">
              4c
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
