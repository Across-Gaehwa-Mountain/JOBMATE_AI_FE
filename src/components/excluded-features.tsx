import { useState } from "react";
import { Mic, MessageSquare, GitBranch, BarChart3, Palette, ArrowRight, Lock, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ExcludedFeaturesProps {
  onBack: () => void;
}

export function ExcludedFeatures({ onBack }: ExcludedFeaturesProps) {
  const features = [
    {
      id: 'voice-to-text',
      icon: <Mic className="w-8 h-8" />,
      title: '음성 회의 → 텍스트 변환',
      description: '회의 음성을 실시간으로 텍스트로 변환하고 분석합니다',
      reason: '가능하지 어려움',
      status: 'coming-soon',
      details: {
        overview: '회의나 강의 음성을 자동으로 텍스트로 변환하여 JobMate AI로 분석할 수 있는 기능입니다.',
        benefits: [
          '실시간 회의 내용 기록 및 분석',
          '중요한 내용 자동 하이라이트',
          '회의 후 즉시 이해도 측정 가능',
          '음성 인식 정확도 95% 이상'
        ],
        workflow: [
          '회의 시작 시 음성 녹음 시작',
          'AI가 실시간으로 음성을 텍스트로 변환',
          '중요 키워드 및 개념 자동 추출',
          '회의 종료 후 즉시 이해도 분석 시작',
          '참가자별 이해도 점수 및 피드백 제공'
        ],
        mockInterface: '음성 녹음 버튼, 실시간 텍스트 표시, 키워드 하이라이트, 회의 요약 생성'
      }
    },
    {
      id: 'slack-teams',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Slack/Teams 연동',
      description: '팀 커뮤니케이션 도구와 연동하여 자동 분석합니다',
      reason: '확장성이 측면으로만 제공해도 되는 부가적인 내용으로 중요도 낮음',
      status: 'planned',
      details: {
        overview: 'Slack이나 Microsoft Teams와 직접 연동하여 채팅 내용을 자동으로 분석하고 중요 문서를 감지합니다.',
        benefits: [
          '중요 문서 공유 시 자동 알림',
          '팀원별 이해도 현황 대시보드',
          '문서 관련 질문 자동 감지',
          '팀 전체 지식 수준 향상'
        ],
        workflow: [
          'Slack/Teams 워크스페이스에 JobMate 앱 설치',
          '문서 링크나 파일 공유 시 자동 감지',
          '팀원들에게 이해도 측정 제안',
          '결과를 채널에 요약하여 공유',
          '팀 지식 베이스 구축'
        ],
        mockInterface: '봇 명령어, 자동 알림 메시지, 이해도 현황 대시보드, 팀 리포트'
      }
    },
    {
      id: 'agent-separation',
      icon: <GitBranch className="w-8 h-8" />,
      title: '에이전트 구조의 완전 분리',
      description: '초기엔 단일 플롯으로 통합 처리하는 것이 낫다',
      reason: '초기엔 단일 플롯으로 통합 처리하는 것이 낫다',
      status: 'future',
      details: {
        overview: 'AI 에이전트를 역할별로 완전히 분리하여 전문화된 분석을 제공합니다.',
        benefits: [
          '문서 분석 전용 에이전트',
          '질문 생성 전용 에이전트',
          '피드백 생성 전용 에이전트',
          '각 에이전트 간 협업으로 정확도 향상'
        ],
        workflow: [
          '문서 분석 에이전트가 1차 분석 수행',
          '이해도 측정 에이전트가 사용자 입력 평가',
          '질문 생성 에이전트가 맞춤형 질문 생성',
          '피드백 에이전트가 종합적 조언 제공',
          '코디네이터 에이전트가 전체 프로세스 관리'
        ],
        mockInterface: '에이전트별 진행 상태, 각 에이전트의 분석 결과, 에이전트 간 협업 과정 시각화'
      }
    },
    {
      id: 'pr-commit',
      icon: <GitBranch className="w-8 h-8" />,
      title: 'PR/커밋 분석',
      description: '개발 문서와 코드 변경사항을 연계 분석합니다',
      reason: '부가적임',
      status: 'planned',
      details: {
        overview: 'Git PR과 커밋 메시지를 분석하여 개발 문서의 실제 구현도를 측정합니다.',
        benefits: [
          '문서와 실제 구현의 일치도 분석',
          '개발 진행도 자동 추적',
          '코드 리뷰 품질 향상',
          '기술 문서 업데이트 알림'
        ],
        workflow: [
          'GitHub/GitLab 레포지토리 연동',
          'PR 생성 시 관련 문서 자동 감지',
          '커밋 메시지와 문서 내용 비교 분석',
          '구현 누락 사항 자동 감지',
          '개발팀에 피드백 제공'
        ],
        mockInterface: 'Git 연동 설정, PR 분석 결과, 구현도 대시보드, 개발 진행 현황'
      }
    },
    {
      id: 'advanced-viz',
      icon: <BarChart3 className="w-8 h-8" />,
      title: '고급 시각화/UX',
      description: '더 세련된 데이터 시각화와 사용자 경험을 제공합니다',
      reason: '시간부족',
      status: 'enhancement',
      details: {
        overview: '인터랙티브 차트, 3D 시각화, 개인화된 대시보드 등 고급 UI/UX 기능입니다.',
        benefits: [
          '인터랙티브 이해도 히트맵',
          '시간별 학습 진도 3D 그래프',
          '개인화된 학습 패턴 분석',
          '몰입형 학습 경험 제공'
        ],
        workflow: [
          '사용자 행동 패턴 수집',
          '개인별 최적 학습 방식 분석',
          '맞춤형 시각화 인터페이스 생성',
          '학습 효과 실시간 측정',
          '적응형 UI 자동 조정'
        ],
        mockInterface: '3D 차트, 애니메이션 대시보드, 드래그 앤 드롭 인터페이스, VR/AR 지원'
      }
    }
  ];

  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'coming-soon':
        return 'bg-accent text-accent-foreground';
      case 'planned':
        return 'bg-secondary text-secondary-foreground';
      case 'future':
        return 'bg-muted text-muted-foreground';
      case 'enhancement':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'coming-soon':
        return '곧 출시';
      case 'planned':
        return '계획 중';
      case 'future':
        return '향후 개발';
      case 'enhancement':
        return '개선 예정';
      default:
        return '검토 중';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">향후 기능 로드맵</h1>
          <p className="text-muted-foreground">현재 개발 중이거나 계획된 추가 기능들을 미리 체험해보세요.</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Feature List */}
            <div className="lg:col-span-1 space-y-3">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedFeature.id === feature.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedFeature(feature)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-primary mt-1">{feature.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {feature.description}
                      </p>
                      <Badge className={`text-xs ${getStatusColor(feature.status)}`}>
                        {getStatusText(feature.status)}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Feature Detail */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-primary">{selectedFeature.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{selectedFeature.title}</h2>
                      <Badge className={getStatusColor(selectedFeature.status)}>
                        {getStatusText(selectedFeature.status)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{selectedFeature.details.overview}</p>
                    
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm">
                        <strong>제외 이유:</strong> {selectedFeature.reason}
                      </p>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="benefits" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="benefits">주요 혜택</TabsTrigger>
                    <TabsTrigger value="workflow">작업 흐름</TabsTrigger>
                    <TabsTrigger value="interface">인터페이스</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="benefits" className="mt-6">
                    <ul className="space-y-3">
                      {selectedFeature.details.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="workflow" className="mt-6">
                    <div className="space-y-4">
                      {selectedFeature.details.workflow.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-muted-foreground">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="interface" className="mt-6">
                    <Card className="p-4 bg-muted/30 border-dashed">
                      <div className="flex items-center gap-3 mb-3">
                        <Palette className="w-5 h-5 text-primary" />
                        <h4 className="font-medium">예상 인터페이스</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {selectedFeature.details.mockInterface}
                      </p>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    베타 테스트 신청
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    출시 알림 받기
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-2">
                새로운 기능에 대한 의견을 들려주세요
              </h3>
              <p className="text-muted-foreground mb-4">
                어떤 기능이 가장 필요하다고 생각하시나요? 여러분의 피드백이 개발 우선순위를 결정합니다.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                피드백 보내기 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}