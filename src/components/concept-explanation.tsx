import { X, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ConceptExplanationProps {
  concept: string;
  onClose: () => void;
}

export function ConceptExplanation({ concept, onClose }: ConceptExplanationProps) {
  // Mock explanation data - in real implementation, this would come from AI
  const getExplanation = (concept: string) => {
    const explanations: Record<string, {
      title: string;
      definition: string;
      example: string;
      tips: string[];
    }> = {
      '프로젝트 관리': {
        title: '프로젝트 관리',
        definition: '프로젝트 관리는 특정 목표를 달성하기 위해 자원, 시간, 인력을 효율적으로 계획하고 통제하는 과정입니다. 프로젝트의 시작부터 완료까지 전체 생명주기를 관리하는 체계적인 접근법입니다.',
        example: '예를 들어, 새로운 모바일 앱을 개발하는 프로젝트에서는 요구사항 분석, 설계, 개발, 테스트, 배포의 각 단계를 계획하고 일정을 관리하며, 개발팀, 디자인팀, QA팀 간의 협업을 조율합니다.',
        tips: [
          '명확한 목표와 범위를 정의하세요',
          '현실적인 일정과 예산을 설정하세요',
          '정기적인 진행상황 점검을 실시하세요',
          '위험요소를 미리 식별하고 대응책을 준비하세요'
        ]
      },
      '팀 협업': {
        title: '팀 협업',
        definition: '팀 협업은 공동의 목표를 달성하기 위해 팀원들이 서로의 강점을 활용하고 소통하며 함께 일하는 과정입니다. 효과적인 협업은 개인의 역량을 넘어서는 시너지 효과를 만들어냅니다.',
        example: '개발 프로젝트에서 백엔드 개발자, 프론트엔드 개발자, UI/UX 디자이너가 각자의 전문성을 바탕으로 역할을 분담하고, 정기적인 미팅과 코드 리뷰를 통해 소통하며 하나의 완성된 제품을 만들어가는 과정입니다.',
        tips: [
          '명확한 역할과 책임을 분담하세요',
          '정기적인 소통 채널을 구축하세요',
          '서로의 의견을 존중하고 경청하세요',
          '공동의 목표를 항상 상기시키세요'
        ]
      },
      '리스크 관리': {
        title: '리스크 관리',
        definition: '리스크 관리는 프로젝트나 업무 진행 중 발생할 수 있는 잠재적 위험요소들을 미리 식별하고, 그 영향을 최소화하기 위한 대응 전략을 수립하고 실행하는 과정입니다.',
        example: '소프트웨어 개발 프로젝트에서 핵심 개발자의 갑작스러운 퇴사, 기술적 난이도 증가, 고객 요구사항 변경 등의 위험요소를 미리 파악하고, 백업 인력 확보, 기술 검토, 변경관리 프로세스 등의 대응책을 준비하는 것입니다.',
        tips: [
          '가능한 모든 위험요소를 브레인스토밍하세요',
          '위험도와 영향도에 따라 우선순위를 매기세요',
          '각 위험에 대한 구체적인 대응 계획을 수립하세요',
          '정기적으로 위험요소를 재평가하세요'
        ]
      }
    };

    return explanations[concept] || {
      title: concept,
      definition: `${concept}에 대한 상세한 설명입니다. 이 개념을 이해하는 것이 문서 내용을 파악하는데 중요한 역할을 합니다.`,
      example: `${concept}의 실제 적용 사례를 통해 더 구체적으로 이해할 수 있습니다.`,
      tips: ['관련 개념들과 연결지어 생각해보세요', '실무에 어떻게 적용할지 고민해보세요']
    };
  };

  const explanation = getExplanation(concept);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">{explanation.title}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Definition */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-primary">개념 설명</h3>
            <p className="text-muted-foreground leading-relaxed">
              {explanation.definition}
            </p>
          </div>

          {/* Example */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-secondary">실제 예시</h3>
            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
              <p className="text-muted-foreground leading-relaxed">
                {explanation.example}
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-accent">활용 팁</h3>
            <ul className="space-y-2">
              {explanation.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={onClose} className="flex-1 bg-primary hover:bg-primary/90">
              이해했어요
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              더 자세히 <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}