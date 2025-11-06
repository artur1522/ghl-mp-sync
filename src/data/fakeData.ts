export interface Payment {
  id: string;
  date: string;
  contact: string;
  description: string;
  amount: number;
  status: 'approved' | 'pending' | 'failed' | 'cancelled';
  clientId?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  ghlSubaccount: string;
  mpStatus: 'connected' | 'disconnected' | 'pending';
  totalPayments: number;
  approved: number;
  pending: number;
  lastUpdate: string;
  mpToken?: string;
  ghlToken?: string;
}

export const fakeClients: Client[] = [
  {
    id: '1',
    name: 'Empresa Demo SA',
    email: 'demo@empresa.com',
    ghlSubaccount: 'SUB-GHL-001',
    mpStatus: 'connected',
    totalPayments: 125000,
    approved: 98500,
    pending: 26500,
    lastUpdate: '2025-01-15T10:30:00',
    mpToken: 'APP_USR_1234567890abcdef',
    ghlToken: 'GHL_TOKEN_xyz789'
  },
  {
    id: '2',
    name: 'Tienda Online XYZ',
    email: 'contacto@tiendaxyz.com',
    ghlSubaccount: 'SUB-GHL-002',
    mpStatus: 'connected',
    totalPayments: 89500,
    approved: 75000,
    pending: 14500,
    lastUpdate: '2025-01-14T15:20:00',
    mpToken: 'APP_USR_fedcba0987654321',
    ghlToken: 'GHL_TOKEN_abc123'
  },
  {
    id: '3',
    name: 'Servicios Pro',
    email: 'info@serviciospro.com',
    ghlSubaccount: 'SUB-GHL-003',
    mpStatus: 'pending',
    totalPayments: 45000,
    approved: 30000,
    pending: 15000,
    lastUpdate: '2025-01-13T09:15:00'
  }
];

export const fakePayments: Payment[] = [
  {
    id: 'PAY-001',
    date: '2025-01-15',
    contact: 'Juan Pérez',
    description: 'Membresía Premium - Enero',
    amount: 15000,
    status: 'approved',
    clientId: '1'
  },
  {
    id: 'PAY-002',
    date: '2025-01-15',
    contact: 'María González',
    description: 'Consultoría estratégica',
    amount: 35000,
    status: 'pending',
    clientId: '1'
  },
  {
    id: 'PAY-003',
    date: '2025-01-14',
    contact: 'Carlos Rodríguez',
    description: 'Producto Digital A',
    amount: 8500,
    status: 'approved',
    clientId: '1'
  },
  {
    id: 'PAY-004',
    date: '2025-01-14',
    contact: 'Ana Martínez',
    description: 'Curso Online',
    amount: 12000,
    status: 'failed',
    clientId: '1'
  },
  {
    id: 'PAY-005',
    date: '2025-01-13',
    contact: 'Pedro Sánchez',
    description: 'Suscripción mensual',
    amount: 5500,
    status: 'approved',
    clientId: '2'
  },
  {
    id: 'PAY-006',
    date: '2025-01-13',
    contact: 'Laura Fernández',
    description: 'Asesoría personalizada',
    amount: 25000,
    status: 'pending',
    clientId: '2'
  },
  {
    id: 'PAY-007',
    date: '2025-01-12',
    contact: 'Diego Torres',
    description: 'Pack de servicios',
    amount: 18000,
    status: 'approved',
    clientId: '3'
  },
  {
    id: 'PAY-008',
    date: '2025-01-12',
    contact: 'Sofía Ramírez',
    description: 'Membresía anual',
    amount: 45000,
    status: 'cancelled',
    clientId: '3'
  }
];

// Función para obtener pagos por cliente
export const getPaymentsByClient = (clientId: string) => {
  return fakePayments.filter(p => p.clientId === clientId);
};

// Función para calcular estadísticas
export const calculateStats = (payments: Payment[]) => {
  return {
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    approved: payments.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    failed: payments.filter(p => p.status === 'failed').reduce((sum, p) => sum + p.amount, 0),
    cancelled: payments.filter(p => p.status === 'cancelled').reduce((sum, p) => sum + p.amount, 0)
  };
};