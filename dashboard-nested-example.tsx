// Example: Modified Dashboard with Nested Grid
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      
      {/* Main Grid: 4 columns */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Column 1: Single Card */}
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        
        {/* Column 2: Single Card */}
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        
        {/* Column 3: Bisected into 2 smaller cards */}
        <div className="grid gap-3 grid-cols-2">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Quick Stat 1</p>
            <p className="text-lg font-bold">85%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Quick Stat 2</p>
            <p className="text-lg font-bold">12</p>
          </div>
        </div>
        
        {/* Column 4: Single Card */}
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
        
      </div>
      
      {/* Bottom Row: Charts Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
