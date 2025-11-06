import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, UserCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Login() {
  const navigate = useNavigate();
  const [, setUserRole] = useLocalStorage('userRole', '');

  const handleRoleSelect = (role: 'client' | 'admin') => {
    setUserRole(role);
    navigate(role === 'admin' ? '/admin' : '/client');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <GalaxyBackground />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Rocket className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Integración GHL ↔ MP
            </h1>
          </motion.div>
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Gestiona tus pagos de forma inteligente
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="backdrop-blur-xl bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full"
                  onClick={() => handleRoleSelect('client')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit group-hover:scale-110 transition-transform">
                  <UserCircle className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Vista Cliente</CardTitle>
                <CardDescription>
                  Accede a tu dashboard personal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Ver tus pagos y estadísticas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    Generar links de pago
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Exportar reportes
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                  Ingresar como Cliente
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="backdrop-blur-xl bg-card/50 border-border/50 hover:border-secondary/50 transition-all duration-300 group cursor-pointer h-full"
                  onClick={() => handleRoleSelect('admin')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-secondary/10 w-fit group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-12 w-12 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Vista Administrador</CardTitle>
                <CardDescription>
                  Panel de control global
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Gestionar todos los clientes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    Estadísticas globales
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Reconciliación de pagos
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-gradient-to-r from-secondary to-accent">
                  Ingresar como Admin
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          v1.0.0 • Soporte: soporte@integracion.com
        </motion.p>
      </motion.div>
    </div>
  );
}