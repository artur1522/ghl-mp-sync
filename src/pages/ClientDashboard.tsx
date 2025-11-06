import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Clock, CheckCircle, XCircle, Plus, Download, LogOut, Rocket } from 'lucide-react';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { DashboardCard } from '@/components/DashboardCard';
import { PaymentsTable } from '@/components/PaymentsTable';
import { CreatePaymentModal } from '@/components/CreatePaymentModal';
import { StatsChart } from '@/components/StatsChart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fakePayments, calculateStats, Payment } from '@/data/fakeData';
import { exportToCSV, exportToJSON } from '@/utils/exportData';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [payments, setPayments] = useLocalStorage<Payment[]>('clientPayments', fakePayments.filter(p => p.clientId === '1'));
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const stats = calculateStats(payments);

  const handleCreatePayment = (newPayment: { contact: string; description: string; amount: number }) => {
    const payment: Payment = {
      id: `PAY-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      contact: newPayment.contact,
      description: newPayment.description,
      amount: newPayment.amount,
      status: 'pending',
      clientId: '1'
    };
    
    setPayments([payment, ...payments]);
  };

  const handleLogout = () => {
    navigate('/');
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
                <Rocket className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Panel de Cliente
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/50">
                    <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
                    GHL Conectado
                  </Badge>
                  <Badge variant="outline" className="bg-blue-500/10 border-blue-500/50">
                    <CheckCircle className="h-3 w-3 mr-1 text-blue-400" />
                    Mercado Pago
                  </Badge>
                </div>
                
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Total Cobrado"
              value={`$${stats.approved.toLocaleString('es-AR')}`}
              icon={DollarSign}
              trend="+12% este mes"
              delay={0.1}
            />
            <DashboardCard
              title="Pendientes"
              value={`$${stats.pending.toLocaleString('es-AR')}`}
              icon={Clock}
              delay={0.2}
            />
            <DashboardCard
              title="Aprobados"
              value={payments.filter(p => p.status === 'approved').length}
              icon={CheckCircle}
              delay={0.3}
            />
            <DashboardCard
              title="Fallidos"
              value={payments.filter(p => p.status === 'failed').length}
              icon={XCircle}
              delay={0.4}
            />
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <StatsChart data={stats} />
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Generar Link de Pago
            </Button>
            
            <Button
              variant="outline"
              onClick={() => exportToCSV(payments, 'mis-pagos')}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            
            <Button
              variant="outline"
              onClick={() => exportToJSON(payments, 'mis-pagos')}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar JSON
            </Button>
          </motion.div>

          {/* Payments Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <PaymentsTable
              payments={payments}
              onViewPayment={(payment) => {
                toast({
                  title: 'Detalles del Pago',
                  description: `${payment.contact} - $${payment.amount.toLocaleString('es-AR')}`
                });
              }}
            />
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground border-t border-border/50 mt-12"
        >
          v1.0.0 • Soporte: soporte@integracion.com
        </motion.footer>
      </div>

      <CreatePaymentModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePayment={handleCreatePayment}
      />
    </div>
  );
}