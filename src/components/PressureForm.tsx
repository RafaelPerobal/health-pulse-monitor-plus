
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface PressureFormData {
  date: string;
  time: string;
  systolic: number;
  diastolic: number;
  weight?: number;
  position: string;
  location: string;
  notes?: string;
}

interface PressureFormProps {
  onSubmit: (data: PressureFormData) => void;
  onCancel: () => void;
}

export const PressureForm = ({ onSubmit, onCancel }: PressureFormProps) => {
  const [formData, setFormData] = useState<PressureFormData>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    systolic: 0,
    diastolic: 0,
    position: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.systolic > 0 && formData.diastolic > 0 && formData.position && formData.location) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Nova Medição</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="systolic">Sistólica (mmHg)</Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder="120"
                  value={formData.systolic || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, systolic: Number(e.target.value) }))}
                  required
                  min="50"
                  max="250"
                />
              </div>
              <div>
                <Label htmlFor="diastolic">Diastólica (mmHg)</Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder="80"
                  value={formData.diastolic || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, diastolic: Number(e.target.value) }))}
                  required
                  min="30"
                  max="150"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="weight">Peso (kg) - opcional</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                step="0.1"
                value={formData.weight || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) || undefined }))}
              />
            </div>

            <div>
              <Label htmlFor="position">Posição</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a posição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sentada">Sentada</SelectItem>
                  <SelectItem value="deitada">Deitada</SelectItem>
                  <SelectItem value="em-pe">Em pé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Local da medição</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o local" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="braco-esquerdo">Braço esquerdo</SelectItem>
                  <SelectItem value="braco-direito">Braço direito</SelectItem>
                  <SelectItem value="punho">Punho</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Ex: Após caminhada, medicação tomada..."
                value={formData.notes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Salvar Medição
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
