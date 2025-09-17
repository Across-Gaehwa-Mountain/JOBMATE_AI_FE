import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, XCircle, ChevronDown, ChevronUp, Lightbulb, Target, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ConceptExplanation } from "./concept-explanation";

interface AnalysisResultProps {
  file: File;
  summary: string;
  onNext: () => void;
  onBack: () => void;
}

interface FeedbackItem {
  type: 'good' | 'needs-improvement' | 'missed';
  title: string;
  content: string;
  keywords?: string[];
}

interface Question {
  id: string;
  question: string;
  importance: 'high' | 'medium' | 'low';
  category: string;
}

export function AnalysisResult({ file, summary, onNext, onBack }: AnalysisResultProps) {
  const [comprehensionScore, setComprehensionScore] = useState(0);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  // Mock data - in real implementation, this would come from AI analysis
  const feedback: FeedbackItem[] = [
    {
      type: 'good',
      title: '핵심 개념 이해',
      content: '문서의 주요 개념들을 잘 파악하셨습니다. 특히 프로젝트 관리 방법론과 팀 협업 프로세스에 대한 이해가 뛰어납니다.',
      keywords: ['프로젝트 관리', '팀 협업']
    },
    {
      type: 'needs-improvement',
      title: '세부 구현 방법',
      content: '전체적인 흐름은 이해하셨지만, 구체적인 구현 방법론과 도구 사용법에 대한 이해가 부족합니다.',
      keywords: ['구현 방법론', '도구 사용법']
    },
    {
      type: 'missed',
      title: '리스크 관리',
      content: '문서에서 중요하게 다룬 리스크 관리 전략과 대응 방안에 대한 언급이 누락되었습니다.',
      keywords: ['리스크 관리', '대응 방안']
    }
  ];

  const questions: Question[] = [
    {
      id: '1',
      question: '프로젝트에서 가장 중요한 성공 요인은 무엇인가요?',
      importance: 'high',
      category: '핵심 개념'
    },
    {
      id: '2',
      question: '팀 간 의사소통 프로세스는 어떻게 구성되어 있나요?',
      importance: 'high',
      category: '프로세스'
    },
    {
      id: '3',
      question: '리스크가 발생했을 때 어떤 단계를 거쳐 해결하나요?',
      importance: 'medium',
      category: '리스크 관리'
    }
  ];

  useEffect(() => {
    // Animate score counting
    const timer = setInterval(() => {
      setComprehensionScore(prev => {
        if (prev >= 72) {
          clearInterval(timer);
          return 72;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const getFeedbackIcon = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'good':
        return <CheckCircle className="w-6 h-6 text-secondary" />;
      case 'needs-improvement':
        return <AlertCircle className="w-6 h-6 text-accent" />;
      case 'missed':
        return <XCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getFeedbackColor = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'good':
        return 'border-secondary/20 bg-secondary/5';
      case 'needs-improvement':
        return 'border-accent/20 bg-accent/5';
      case 'missed':
        return 'border-destructive/20 bg-destructive/5';
    }
  };

  const getImportanceBadge = (importance: Question['importance']) => {
    switch (importance) {
      case 'high':
        return <Badge variant="destructive">높음</Badge>;
      case 'medium':
        return <Badge variant="secondary">중간</Badge>;
      case 'low':
        return <Badge variant="outline">낮음</Badge>;
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedConcept(keyword);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">분석 결과</h1>
          <p className="text-muted-foreground">AI가 분석한 당신의 문서 이해도 결과입니다.</p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Comprehension Score */}
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - comprehensionScore / 100)}`}
                    className="text-primary transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{comprehensionScore}%</span>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">이해도 점수</h2>
            <p className="text-muted-foreground">
              전반적으로 문서의 핵심 내용을 잘 이해하고 계십니다!
            </p>
          </Card>

          {/* Feedback Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {feedback.map((item, index) => (
              <Card key={index} className={`p-6 ${getFeedbackColor(item.type)}`}>
                <div className="flex items-start gap-3">
                  {getFeedbackIcon(item.type)}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.content}</p>
                    {item.keywords && (
                      <div className="flex flex-wrap gap-2">
                        {item.keywords.map((keyword, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleKeywordClick(keyword)}
                            className="text-xs h-6 px-2 hover:bg-primary hover:text-primary-foreground"
                          >
                            {keyword}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Core Questions */}
          <Card>
            <Collapsible open={isQuestionsOpen} onOpenChange={setIsQuestionsOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <h3 className="font-semibold">핵심 질문</h3>
                      <p className="text-sm text-muted-foreground">
                        문서 이해도를 확인할 수 있는 중요한 질문들
                      </p>
                    </div>
                  </div>
                  {isQuestionsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6 space-y-4">
                  {questions.map((question) => (
                    <div key={question.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                      <Target className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getImportanceBadge(question.importance)}
                          <Badge variant="outline" className="text-xs">
                            {question.category}
                          </Badge>
                        </div>
                        <p className="font-medium">{question.question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-primary">다음 단계 제안</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              분석 결과를 바탕으로 업무에 활용할 수 있는 구체적인 액션 아이템을 확인해보세요.
            </p>
            <Button onClick={onNext} className="bg-primary hover:bg-primary/90">
              액션 플랜 보기
            </Button>
          </Card>
        </div>

        {/* Concept Explanation Modal */}
        {selectedConcept && (
          <ConceptExplanation
            concept={selectedConcept}
            onClose={() => setSelectedConcept(null)}
          />
        )}
      </div>
    </div>
  );
}