import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Settings, LogOut, Rocket, Eye, RefreshCw, Download } from 'lucide-react';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { DashboardCard } from '@/components/DashboardCard';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fakeClients, fakePayments, calculateStats } from '@/data/fakeData';
import { exportToCSV } from '@/utils/exportData';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'clients' | 'payments' | 'reconciliation' | 'settings'>('clients');
  
  const globalStats = calculateStats(fakePayments);
  const totalClients = fakeClients.length;
  const connectedClients = fakeClients.filter(c => c.mpStatus === 'connected').length;

  const chartData = fakeClients.map(client => ({
    name: client.name,
    total: client.totalPayments,
    aprobados: client.approved,
    pendientes: client.pending
  }));

  const handleLogout = () => {
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const config = {
      connected: { label: 'Conectado', className: 'bg-green-500/10 border-green-500/50 text-green-400' },
      disconnected: { label: 'Desconectado', className: 'bg-red-500/10 border-red-500/50 text-red-400' },
      pending: { label: 'Pendiente', className: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400' }
    };
    
    const { label, className } = config[status as keyof typeof config];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalaxyBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="backdrop-blur-xl bg-card/30 border-b border-border/50 sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Rocket className="h-8 w-8 text-secondary" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Panel de Administración
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={activeTab === 'clients' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('clients')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Clientes
                </Button>
                <Button
                  variant={activeTab === 'payments' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('payments')}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pagos
                </Button>
                <Button
                  variant={activeTab === 'reconciliation' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('reconciliation')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reconciliación
                </Button>
                <Button
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Config
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Total Clientes"
              value={totalClients}
              icon={Users}
              trend={`${connectedClients} conectados`}
              delay={0.1}
            />
            <DashboardCard
              title="Facturación Total"
              value={`$${globalStats.total.toLocaleString('es-AR')}`}
              icon={DollarSign}
              delay={0.2}
            />
            <DashboardCard
              title="Aprobados"
              value={`$${globalStats.approved.toLocaleString('es-AR')}`}
              icon={TrendingUp}
              delay={0.3}
            />
            <DashboardCard
              title="Pendientes"
              value={`$${globalStats.pending.toLocaleString('es-AR')}`}
              icon={TrendingUp}
              delay={0.4}
            />
          </div>

          {/* Content based on active tab */}
          {activeTab === 'clients' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Clientes Registrados</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportToCSV(fakeClients as any, 'clientes')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border/50 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/50">
                          <TableHead>Cliente</TableHead>
                          <TableHead>Subcuenta GHL</TableHead>
                          <TableHead>Estado MP</TableHead>
                          <TableHead>Total Pagos</TableHead>
                          <TableHead>Aprobados</TableHead>
                          <TableHead>Pendientes</TableHead>
                          <TableHead>Última Actualización</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fakeClients.map((client, index) => (
                          <motion.tr
                            key={client.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-border/50 hover:bg-primary/5"
                          >
                            <TableCell className="font-medium">
                              <div>
                                <div>{client.name}</div>
                                <div className="text-xs text-muted-foreground">{client.email}</div>
                              </div>
                            </TableCell>
                            <TableCell><code className="text-xs">{client.ghlSubaccount}</code></TableCell>
                            <TableCell>{getStatusBadge(client.mpStatus)}</TableCell>
                            <TableCell className="font-semibold">${client.totalPayments.toLocaleString('es-AR')}</TableCell>
                            <TableCell className="text-green-400">${client.approved.toLocaleString('es-AR')}</TableCell>
                            <TableCell className="text-yellow-400">${client.pending.toLocaleString('es-AR')}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(client.lastUpdate).toLocaleString('es-AR')}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: 'Detalles del Cliente',
                                    description: client.name
                                  });
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'payments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Estadísticas por Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="aprobados" fill="hsl(var(--primary))" name="Aprobados" />
                      <Bar dataKey="pendientes" fill="hsl(var(--secondary))" name="Pendientes" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'reconciliation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Reconciliación de Pagos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Herramienta para comparar y sincronizar pagos entre GHL y Mercado Pago
                  </p>
                  <Button
                    className="bg-gradient-to-r from-primary to-secondary"
                    onClick={() => {
                      toast({
                        title: 'Reconciliación iniciada',
                        description: 'Procesando datos...'
                      });
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reconciliar Todo
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Configuración de la Aplicación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Client ID (Mercado Pago)</label>
                    <code className="block p-3 bg-background/50 rounded border border-border/50 text-sm">
                      1234567890abcdef
                    </code>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Redirect URL</label>
                    <code className="block p-3 bg-background/50 rounded border border-border/50 text-sm">
                      https://app.integracion.com/callback
                    </code>
                  </div>

                  <Button
                    className="bg-gradient-to-r from-secondary to-accent"
                    onClick={() => {
                      const inviteLink = `https://app.integracion.com/invite/${Math.random().toString(36).substr(2, 9)}`;
                      navigator.clipboard.writeText(inviteLink);
                      toast({
                        title: 'Link de invitación generado',
                        description: 'Copiado al portapapeles'
                      });
                    }}
                  >
                    Generar Link de Invitación
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}