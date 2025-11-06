import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Send, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CreatePaymentModalProps {
  open: boolean;
  onClose: () => void;
  onCreatePayment: (payment: { contact: string; description: string; amount: number }) => void;
}

export const CreatePaymentModal = ({ open, onClose, onCreatePayment }: CreatePaymentModalProps) => {
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const { toast } = useToast();

  const handleCreate = () => {
    if (!contact || !description || !amount) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos',
        variant: 'destructive'
      });
      return;
    }

    const link = `https://mpago.la/${Math.random().toString(36).substr(2, 9)}`;
    setPaymentLink(link);
    
    onCreatePayment({
      contact,
      description,
      amount: parseFloat(amount)
    });

    toast({
      title: 'Link generado',
      description: 'El link de pago ha sido creado exitosamente'
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink);
    toast({
      title: 'Copiado',
      description: 'Link copiado al portapapeles'
    });
  };

  const handleReset = () => {
    setContact('');
    setDescription('');
    setAmount('');
    setPaymentLink('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleReset}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Generar Link de Pago
          </DialogTitle>
          <DialogDescription>
            Completa los datos para crear un nuevo link de pago
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 py-4"
        >
          {!paymentLink ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="contact">Contacto</Label>
                <Input
                  id="contact"
                  placeholder="Nombre del cliente"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  placeholder="Concepto del pago"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Monto ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <Button
                onClick={handleCreate}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Generar Link
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Link de Pago Generado</Label>
                <div className="flex gap-2">
                  <Input
                    value={paymentLink}
                    readOnly
                    className="bg-background/50 font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: 'Link enviado',
                      description: 'El link ha sido enviado al cliente'
                    });
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={handleReset}
                >
                  Crear Otro
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-3">Simular estado del pago:</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-green-500/50 hover:bg-green-500/10"
                    onClick={() => {
                      toast({ title: '✅ Pago aprobado' });
                      setTimeout(handleReset, 1500);
                    }}
                  >
                    Pagar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-red-500/50 hover:bg-red-500/10"
                    onClick={() => {
                      toast({ title: '❌ Pago cancelado' });
                      setTimeout(handleReset, 1500);
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};