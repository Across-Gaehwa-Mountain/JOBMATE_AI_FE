import { FileText, Lightbulb, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface LandingProps {
  onGetStarted: () => void;
  onChooseGuest: () => void;
  onChooseUser: () => void;
  userId: string | null;
  }

export function Landing({ onGetStarted, onChooseGuest, onChooseUser, userId }: LandingProps) {
  const features = [
    {
      icon: <FileText className="w-12 h-12 text-primary" />,
      title: "문서 업로드 및 분석",
      description: "PDF, TXT 파일을 업로드하고 AI가 내용을 분석합니다"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-secondary" />,
      title: "이해도 점검 및 피드백",
      description: "당신의 이해도를 측정하고 개선점을 제안합니다"
    },
    {
      icon: <HelpCircle className="w-12 h-12 text-accent" />,
      title: "핵심 질문 자동 생성",
      description: "문서의 핵심 내용을 파악할 수 있는 질문을 생성합니다"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-primary mb-4">히든 사수</h1>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            업무 문서를 더 정확하게 이해하세요
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            AI 기반 문서 분석과 이해도 측정으로 업무 효율성을 높이고, <br/>
            중요한 내용을 놓치지 않도록 도와드립니다.
          </p>
          
          {!userId && (
          <div className="flex items-center justify-center gap-3">
            <Button 
              onClick={onChooseUser}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-lg transition-all duration-200"
            >
              계정 연동하기
            </Button>
            <Button 
              onClick={onChooseGuest}
              size="lg"
              variant="outline"
              className="px-6 py-4 rounded-lg"
            >
              비회원으로 이용하기 <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          )}
          {userId && (
            <div className="flex items-center justify-center gap-3">
              <Button 
                onClick={onGetStarted}
                size="lg"
                variant="outline"
                className="px-6 py-4 rounded-lg"
              >
                업로드하기 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            AI 기술로 문서 이해의 새로운 경험을 시작하세요
          </p>
        </div>
      </div>
    </div>
  );
}