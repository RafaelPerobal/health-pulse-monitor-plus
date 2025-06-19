
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PressureReading {
  id: string;
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  weight?: number;
  position: string;
  location: string;
  notes?: string;
  status: 'normal' | 'high' | 'low';
}

interface PressureHistoryProps {
  readings: PressureReading[];
}

export const PressureHistory = ({ readings }: PressureHistoryProps) => {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'normal':
        return { emoji: '✅', label: 'Normal', variant: 'default' as const };
      case 'high':
        return { emoji: '⚠️', label: 'Alta', variant: 'destructive' as const };
      case 'low':
        return { emoji: '⬇️', label: 'Baixa', variant: 'secondary' as const };
      default:
        return { emoji: '❓', label: 'Desconhecido', variant: 'outline' as const };
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  if (readings.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">Nenhuma medição registrada</h3>
          <p className="text-gray-600">
            Comece adicionando sua primeira medição de pressão arterial.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Histórico de Medições
            <Badge variant="outline">{readings.length} registros</Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {readings.map((reading) => {
          const statusInfo = getStatusInfo(reading.status);
          
          return (
            <Card key={reading.id} className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{statusInfo.emoji}</div>
                    <div>
                      <div className="font-semibold text-lg">
                        {reading.systolic} x {reading.diastolic} mmHg
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDate(reading.date)} às {reading.time}
                      </div>
                      {reading.weight && (
                        <div className="text-sm text-gray-500">
                          Peso: {reading.weight} kg
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusInfo.variant}>
                      {statusInfo.label}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      {reading.position} - {reading.location}
                    </div>
                  </div>
                </div>
                
                {reading.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                    <strong>Observações:</strong> {reading.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
