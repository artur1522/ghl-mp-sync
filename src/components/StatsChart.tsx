import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsChartProps {
  data: {
    approved: number;
    pending: number;
    failed: number;
    cancelled: number;
  };
}

export const StatsChart = ({ data }: StatsChartProps) => {
  const chartData = [
    { name: 'Aprobados', value: data.approved, color: 'hsl(var(--primary))' },
    { name: 'Pendientes', value: data.pending, color: 'hsl(var(--secondary))' },
    { name: 'Fallidos', value: data.failed, color: 'hsl(var(--destructive))' },
    { name: 'Cancelados', value: data.cancelled, color: 'hsl(var(--muted))' }
  ].filter(item => item.value > 0);

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle>Distribución de Pagos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString('es-AR')}`}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};