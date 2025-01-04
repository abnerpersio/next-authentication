import { Card, CardContent } from '@/components/ui/card';
import { ClientsChart } from './_components/clients-chart';
import { EarningsChart } from './_components/earnings-chart';

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="grid grid-cols-4 gap-4 p-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <span className="block text-md">Total Revenue</span>

              <h1 className="text-2xl font-bold">$45,231.89</h1>
              <span className="block text-sm text-muted-foreground">
                +20.1% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <span className="block text-md">Total Revenue</span>

              <h1 className="text-2xl font-bold">$45,231.89</h1>
              <span className="block text-sm text-muted-foreground">
                +20.1% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <span className="block text-md">Total Revenue</span>

              <h1 className="text-2xl font-bold">$45,231.89</h1>
              <span className="block text-sm text-muted-foreground">
                +20.1% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <span className="block text-md">Total Revenue</span>

              <h1 className="text-2xl font-bold">$45,231.89</h1>
              <span className="block text-sm text-muted-foreground">
                +20.1% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        <EarningsChart />

        <ClientsChart />
      </div>
    </div>
  );
}
