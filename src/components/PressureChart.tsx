
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

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

interface PressureChartProps {
  readings: PressureReading[];
}

export const PressureChart = ({ readings }: PressureChartProps) => {
  if (readings.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📈</div>
          <h3 className="text-xl font-semibold mb-2">Gráfico não disponível</h3>
          <p className="text-gray-600">
            Adicione pelo menos uma medição para visualizar o gráfico de evolução.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Preparar dados para o gráfico (últimos 30 registros, ordenados por data)
  const chartData = readings
    .slice(0, 30)
    .reverse()
    .map((reading, index) => ({
      id: reading.id,
      index: index + 1,
      date: new Date(reading.date).toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit' 
      }),
      systolic: reading.systolic,
      diastolic: reading.diastolic,
      fullDate: reading.date,
      time: reading.time,
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{`${data.date} às ${data.time}`}</p>
          <p className="text-red-500">{`Sistólica: ${data.systolic} mmHg`}</p>
          <p className="text-blue-500">{`Diastólica: ${data.diastolic} mmHg`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Evolução da Pressão Arterial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis 
                  domain={['dataMin - 10', 'dataMax + 10']}
                  stroke="#666"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Linhas de referência para pressão normal */}
                <ReferenceLine y={140} stroke="#ff6b6b" strokeDasharray="5 5" opacity={0.7} />
                <ReferenceLine y={90} stroke="#ff6b6b" strokeDasharray="5 5" opacity={0.7} />
                
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                  name="Sistólica"
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  name="Diastólica"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Sistólica</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Diastólica</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-red-300 border-dashed"></div>
              <span>Limite recomendado (140/90)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Média Sistólica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {Math.round(readings.reduce((acc, r) => acc + r.systolic, 0) / readings.length)} mmHg
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Últimas {readings.length} medições
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Média Diastólica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              {Math.round(readings.reduce((acc, r) => acc + r.diastolic, 0) / readings.length)} mmHg
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Últimas {readings.length} medições
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
