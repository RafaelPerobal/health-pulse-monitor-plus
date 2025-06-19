
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Heart, TrendingUp, Calendar } from "lucide-react";
import { PressureForm } from "@/components/PressureForm";
import { PressureHistory } from "@/components/PressureHistory";
import { PressureChart } from "@/components/PressureChart";
import { InspirationMessage } from "@/components/InspirationMessage";

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

const Index = () => {
  const [readings, setReadings] = useState<PressureReading[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'chart'>('home');

  // Carregar dados do localStorage
  useEffect(() => {
    const savedReadings = localStorage.getItem('pressureReadings');
    if (savedReadings) {
      setReadings(JSON.parse(savedReadings));
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('pressureReadings', JSON.stringify(readings));
  }, [readings]);

  const addReading = (reading: Omit<PressureReading, 'id' | 'status'>) => {
    const status = getStatus(reading.systolic, reading.diastolic);
    const newReading: PressureReading = {
      ...reading,
      id: Date.now().toString(),
      status
    };
    setReadings(prev => [newReading, ...prev]);
    setShowForm(false);
  };

  const getStatus = (systolic: number, diastolic: number): 'normal' | 'high' | 'low' => {
    if (systolic < 90 || diastolic < 60) return 'low';
    if (systolic >= 140 || diastolic >= 90) return 'high';
    return 'normal';
  };

  const recentReading = readings[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Heart className="text-red-500" />
            SaúdePressão+
          </h1>
          <p className="text-gray-600">Monitore sua pressão arterial com carinho</p>
        </div>

        {/* Mensagem Inspiracional */}
        <InspirationMessage status={recentReading?.status} />

        {/* Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
              className="mx-1"
            >
              <Heart className="w-4 h-4 mr-2" />
              Início
            </Button>
            <Button
              variant={activeTab === 'history' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('history')}
              className="mx-1"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Histórico
            </Button>
            <Button
              variant={activeTab === 'chart' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('chart')}
              className="mx-1"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Gráfico
            </Button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Última Leitura */}
            {recentReading && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Última Medição</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-800">
                        {recentReading.systolic} x {recentReading.diastolic}
                        <span className="text-lg ml-2">mmHg</span>
                      </div>
                      <div className="text-gray-600 text-sm">
                        {recentReading.date} às {recentReading.time}
                      </div>
                    </div>
                    <div className="text-4xl">
                      {recentReading.status === 'normal' && '✅'}
                      {recentReading.status === 'high' && '⚠️'}
                      {recentReading.status === 'low' && '⬇️'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resumo Estatístico */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {readings.filter(r => r.status === 'normal').length}
                  </div>
                  <div className="text-sm text-gray-600">Medições Normais</div>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {readings.filter(r => r.status === 'high').length}
                  </div>
                  <div className="text-sm text-gray-600">Pressão Alta</div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {readings.length}
                  </div>
                  <div className="text-sm text-gray-600">Total de Medições</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <PressureHistory readings={readings} />
        )}

        {activeTab === 'chart' && (
          <PressureChart readings={readings} />
        )}

        {/* Botão Nova Medição */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Modal do Formulário */}
        {showForm && (
          <PressureForm
            onSubmit={addReading}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
