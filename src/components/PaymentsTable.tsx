import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Payment } from '@/data/fakeData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PaymentsTableProps {
  payments: Payment[];
  onViewPayment?: (payment: Payment) => void;
}

export const PaymentsTable = ({ payments, onViewPayment }: PaymentsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Payment['status']) => {
    const config = {
      approved: { label: 'Aprobado', variant: 'default' as const, icon: CheckCircle, color: 'text-green-400' },
      pending: { label: 'Pendiente', variant: 'secondary' as const, icon: Clock, color: 'text-yellow-400' },
      failed: { label: 'Fallido', variant: 'destructive' as const, icon: XCircle, color: 'text-red-400' },
      cancelled: { label: 'Cancelado', variant: 'outline' as const, icon: XCircle, color: 'text-gray-400' }
    };

    const { label, variant, icon: Icon, color } = config[status];

    return (
      <Badge variant={variant} className="gap-1">
        <Icon className={`h-3 w-3 ${color}`} />
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por contacto, descripción o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === 'approved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('approved')}
          >
            Aprobados
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('pending')}
          >
            Pendientes
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-muted-foreground">Fecha</TableHead>
              <TableHead className="text-muted-foreground">Contacto</TableHead>
              <TableHead className="text-muted-foreground">Descripción</TableHead>
              <TableHead className="text-muted-foreground">Monto</TableHead>
              <TableHead className="text-muted-foreground">Estado</TableHead>
              <TableHead className="text-muted-foreground text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment, index) => (
              <motion.tr
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-border/50 hover:bg-primary/5 transition-colors"
              >
                <TableCell className="font-medium">
                  {new Date(payment.date).toLocaleDateString('es-AR')}
                </TableCell>
                <TableCell>{payment.contact}</TableCell>
                <TableCell className="max-w-[200px] truncate">{payment.description}</TableCell>
                <TableCell className="font-semibold text-primary">
                  ${payment.amount.toLocaleString('es-AR')}
                </TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewPayment?.(payment)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};