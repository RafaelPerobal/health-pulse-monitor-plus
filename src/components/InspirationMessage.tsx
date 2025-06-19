
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface InspirationMessageProps {
  status?: 'normal' | 'high' | 'low';
}

const messages = {
  normal: [
    "Louvado seja Deus! Sua pressão está ótima 🙏",
    "Que alegria! Deus está cuidando de você 💙",
    "Continue assim, seu corpo é templo do Espírito Santo ✨",
    "Parabéns! Sua dedicação ao cuidado pessoal é abençoada 🌟"
  ],
  high: [
    "Ore, repouse e confie. Deus está contigo 🌿",
    "Respire fundo e entregue suas preocupações ao Senhor 🕊️",
    "Um momento de calma: 'Entrega o teu caminho ao Senhor' 💫",
    "Procure orientação médica e mantenha a fé 💙"
  ],
  low: [
    "Cuide-se com carinho, você é preciosa aos olhos de Deus 💝",
    "Descanse um pouco, hidrate-se e confie no cuidado divino 🌸",
    "O Senhor é teu sustento e fortaleza 💪",
    "Procure orientação médica se necessário 🩺"
  ],
  general: [
    "Seu corpo é templo do Espírito Santo. Cuide-se 💙",
    "A cada dia, Deus renova suas forças 🌅",
    "Que a paz do Senhor esteja sempre em seu coração 🕊️",
    "Cuidar da saúde é um ato de amor próprio e gratidão 🙏"
  ]
};

export const InspirationMessage = ({ status }: InspirationMessageProps) => {
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const messageArray = status ? messages[status] : messages.general;
    const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
    setCurrentMessage(randomMessage);
  }, [status]);

  const getCardStyle = () => {
    switch (status) {
      case 'normal':
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200";
      case 'high':
        return "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200";
      case 'low':
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200";
      default:
        return "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200";
    }
  };

  return (
    <Card className={`mb-6 ${getCardStyle()} border-2`}>
      <CardContent className="p-6 text-center">
        <p className="text-lg font-medium text-gray-700 leading-relaxed">
          {currentMessage}
        </p>
      </CardContent>
    </Card>
  );
};
