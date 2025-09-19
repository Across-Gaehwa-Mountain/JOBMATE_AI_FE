import { useState } from "react";
import { 
  Monitor, 
  Smartphone, 
  FileText, 
  Lightbulb, 
  HelpCircle, 
  ArrowRight, 
  Upload, 
  Cloud, 
  CheckCircle,
  Target,
  Calendar,
  Flag,
  Users,
  Clock,
  Check,
  ChevronDown,
  Mic,
  MessageSquare,
  GitBranch,
  BarChart3,
  Brain
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function StaticScreens() {
  const [selectedScreen, setSelectedScreen] = useState('landing');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const screens = [
    { id: 'landing', name: '랜딩 페이지', description: '서비스 소개 및 시작 화면' },
    { id: 'upload', name: '문서 업로드', description: '파일 업로드 인터페이스' },
    { id: 'summary', name: '이해도 요약', description: '사용자 이해도 입력 화면' },
    { id: 'analysis', name: '분석 결과', description: 'AI 분석 결과 대시보드' },
    { id: 'actions', name: '액션 플랜', description: '다음 단계 제안 화면' },
    { id: 'features', name: '향후 기능', description: '제외된 기능들의 플로우' }
  ];

  // Static Landing Screen
  const LandingScreen = () => (
    <div className={`bg-gradient-to-br from-muted/30 to-background ${viewMode === 'mobile' ? 'p-4' : 'p-16'}`}>
      <div className={`${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-6xl'} mx-auto`}>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">히든 사수</h1>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          <h2 className="text-3xl font-semibold mb-6">업무 문서를 더 정확하게 이해하세요</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            AI 기반 문서 분석과 이해도 측정으로 업무 효율성을 높이고, 중요한 내용을 놓치지 않도록 도와드립니다.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg">
            시작하기 <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Features */}
        <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8`}>
          {[
            { icon: <FileText className="w-12 h-12 text-primary" />, title: "문서 업로드 및 분석", desc: "PDF, TXT 파일을 업로드하고 AI가 내용을 분석합니다" },
            { icon: <Lightbulb className="w-12 h-12 text-secondary" />, title: "이해도 점검 및 피드백", desc: "당신의 이해도를 측정하고 개선점을 제안합니다" },
            { icon: <HelpCircle className="w-12 h-12 text-accent" />, title: "핵심 질문 자동 생성", desc: "문서의 핵심 내용을 파악할 수 있는 질문을 생성합니다" }
          ].map((feature, index) => (
            <Card key={index} className="p-8 text-center border hover:shadow-lg transition-all">
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Static Upload Screen
  const UploadScreen = () => (
    <div className={`bg-background ${viewMode === 'mobile' ? 'p-4' : 'p-8'}`}>
      <div className={`${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'} mx-auto`}>
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">← 돌아가기</Button>
          <h1 className="text-3xl font-bold mb-2">문서 업로드</h1>
          <p className="text-muted-foreground">분석할 문서를 업로드해주세요.</p>
        </div>

        <Card className="p-12 border-2 border-dashed border-border hover:border-primary/50">
          <div className="text-center">
            <Cloud className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-2">파일을 드래그하거나 클릭하여 업로드</h3>
            <p className="text-muted-foreground mb-6">PDF, TXT 파일을 지원합니다</p>
            <Button className="bg-primary hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />파일 선택
            </Button>
            <div className="mt-6 text-sm text-muted-foreground">최대 파일 크기: 10MB</div>
          </div>
        </Card>

        {/* Upload Complete State */}
        <Card className="p-6 mt-6">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-secondary" />
            <div className="flex-1">
              <p className="font-medium">project-requirements.pdf</p>
              <p className="text-sm text-muted-foreground">2.3 MB • 업로드 완료</p>
            </div>
          </div>
        </Card>

        <div className="flex justify-end mt-6">
          <Button className="bg-primary hover:bg-primary/90">계속하기</Button>
        </div>
      </div>
    </div>
  );

  // Static Summary Screen
  const SummaryScreen = () => (
    <div className={`bg-background ${viewMode === 'mobile' ? 'p-4' : 'p-8'}`}>
      <div className={`${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'} mx-auto space-y-6`}>
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">← 돌아가기</Button>
          <h1 className="text-3xl font-bold mb-2">이해도 요약 작성</h1>
          <p className="text-muted-foreground">문서를 읽고 이해한 내용을 작성해주세요.</p>
        </div>

        {/* Document Preview */}
        <Card>
          <div className="flex items-center justify-between p-4 hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">project-requirements.pdf</p>
                <p className="text-sm text-muted-foreground">2.3 MB</p>
              </div>
            </div>
            <ChevronDown className="w-5 h-5" />
          </div>
        </Card>

        {/* Guidelines */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">작성 가이드라인</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
              문서의 핵심 내용을 자신의 언어로 요약해주세요
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
              이해한 주요 개념과 중요 포인트를 포함하세요
            </li>
          </ul>
        </Card>

        {/* Summary Input */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">내가 이해한 내용</h3>
          <textarea 
            className="w-full min-h-[300px] p-4 border border-border rounded-lg bg-input-background resize-none"
            placeholder="내가 이해한 내용을 작성해주세요. 문서의 주요 개념, 중요한 포인트, 그리고 구체적인 예시들을 포함하여 자세히 설명해주세요..."
            value="이 문서는 새로운 프로젝트의 요구사항을 정리한 것으로, 주요 목표는 사용자 경험을 개선하고 업무 효율성을 높이는 것입니다. 특히 AI 기반의 문서 분석 기능을 통해 사용자가 복잡한 문서를 더 쉽게 이해할 수 있도록 도와주는 것이 핵심입니다..."
            readOnly
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">247 / 100자 (최소)</p>
            <Button className="bg-primary hover:bg-primary/90">분석하기</Button>
          </div>
        </Card>
      </div>
    </div>
  );

  // Static Analysis Screen
  const AnalysisScreen = () => (
    <div className={`bg-background ${viewMode === 'mobile' ? 'p-4' : 'p-8'}`}>
      <div className={`${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-6xl'} mx-auto space-y-8`}>
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">← 돌아가기</Button>
          <h1 className="text-3xl font-bold mb-2">분석 결과</h1>
          <p className="text-muted-foreground">AI가 분석한 당신의 문서 이해도 결과입니다.</p>
        </div>

        {/* Score */}
        <Card className="p-8 text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
              <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={`${2 * Math.PI * 54}`} strokeDashoffset={`${2 * Math.PI * 54 * 0.28}`}
                className="text-primary" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">72%</span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-2">이해도 점수</h2>
          <p className="text-muted-foreground">전반적으로 문서의 핵심 내용을 잘 이해하고 계십니다!</p>
        </Card>

        {/* Feedback Cards */}
        <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'} gap-6`}>
          <Card className="p-6 border-secondary/20 bg-secondary/5">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-secondary" />
              <div>
                <h3 className="font-semibold mb-2">핵심 개념 이해</h3>
                <p className="text-sm text-muted-foreground mb-3">문서의 주요 개념들을 잘 파악하셨습니다.</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs h-6 px-2">프로젝트 관리</Button>
                  <Button variant="outline" size="sm" className="text-xs h-6 px-2">팀 협업</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-accent/20 bg-accent/5">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-accent" />
              <div>
                <h3 className="font-semibold mb-2">보완이 필요한 부분</h3>
                <p className="text-sm text-muted-foreground mb-3">구체적인 구현 방법론에 대한 이해가 부족합니다.</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs h-6 px-2">구현 방법론</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-destructive/20 bg-destructive/5">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-6 h-6 text-destructive" />
              <div>
                <h3 className="font-semibold mb-2">놓친 중요 개념</h3>
                <p className="text-sm text-muted-foreground mb-3">리스크 관리 전략에 대한 언급이 누락되었습니다.</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs h-6 px-2">리스크 관리</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Core Questions */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-primary" />
            <h3 className="font-semibold">핵심 질문</h3>
          </div>
          <div className="space-y-4">
            {[
              { question: "프로젝트에서 가장 중요한 성공 요인은 무엇인가요?", priority: "높음", category: "핵심 개념" },
              { question: "팀 간 의사소통 프로세스는 어떻게 구성되어 있나요?", priority: "높음", category: "프로세스" }
            ].map((q, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                <Target className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">높음</Badge>
                    <Badge variant="outline" className="text-xs">{q.category}</Badge>
                  </div>
                  <p className="font-medium">{q.question}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  // Static Actions Screen
  const ActionsScreen = () => (
    <div className={`bg-background ${viewMode === 'mobile' ? 'p-4' : 'p-8'}`}>
      <div className={`${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'} mx-auto space-y-6`}>
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">← 돌아가기</Button>
          <h1 className="text-3xl font-bold mb-2">다음 액션 계획</h1>
          <p className="text-muted-foreground">분석 결과를 바탕으로 제안된 구체적인 행동 계획입니다.</p>
        </div>

        {/* Progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">진행 현황</h2>
            <span className="text-2xl font-bold text-primary">2/5</span>
          </div>
          <Progress value={40} className="mb-2" />
          <p className="text-sm text-muted-foreground">40% 완료</p>
        </Card>

        {/* High Priority Actions */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-primary">미팅 전 중요 준비사항</h3>
          </div>
          <div className="space-y-3">
            {[
              { title: "프로젝트 관리 도구 학습", desc: "문서에서 언급된 도구들의 사용법을 익히세요", completed: true },
              { title: "팀 미팅 전 체크리스트 작성", desc: "리스크 관리 방안과 질문사항을 정리하세요", completed: false }
            ].map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <input type="checkbox" checked={action.completed} className="mt-1" readOnly />
                <div className="flex-1">
                  <p className={`font-medium ${action.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {action.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{action.desc}</p>
                </div>
                <Badge className="bg-destructive">높음</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* All Actions */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">전체 액션 아이템</h3>
          <div className="space-y-4">
            {[
              { title: "리스크 관리 계획 수립", category: "실습", time: "1-2시간", priority: "중간", icon: <Flag className="w-4 h-4" /> },
              { title: "관련 문서 추가 검토", category: "학습", time: "1시간", priority: "중간", icon: <FileText className="w-4 h-4" /> },
              { title: "동료와 개념 논의", category: "미팅", time: "45분", priority: "낮음", icon: <Users className="w-4 h-4" /> }
            ].map((action, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <input type="checkbox" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium">{action.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {action.icon}
                      <span className="ml-1">{action.category}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {action.time}
                    </div>
                  </div>
                </div>
                <Badge className={action.priority === '중간' ? 'bg-accent' : 'bg-secondary'}>{action.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  // Static Features Screen
  const FeaturesScreen = () => (
    <div className={`bg-background ${viewMode === 'mobile' ? 'p-4' : 'p-8'}`}>
      <div className={`${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-6xl'} mx-auto`}>
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">← 돌아가기</Button>
          <h1 className="text-3xl font-bold mb-2">향후 기능 로드맵</h1>
          <p className="text-muted-foreground">현재 개발 중이거나 계획된 추가 기능들을 미리 체험해보세요.</p>
        </div>

        <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1' : 'lg:grid-cols-3'} gap-6`}>
          {/* Feature List */}
          <div className="space-y-3">
            {[
              { icon: <Mic className="w-6 h-6" />, title: "음성 회의 → 텍스트 변환", status: "곧 출시" },
              { icon: <MessageSquare className="w-6 h-6" />, title: "Slack/Teams 연동", status: "계획 중" },
              { icon: <GitBranch className="w-6 h-6" />, title: "에이전트 구조의 완전 분리", status: "향후 개발" }
            ].map((feature, index) => (
              <Card key={index} className={`p-4 cursor-pointer ${index === 0 ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <Badge className="text-xs bg-accent">{feature.status}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Feature Detail */}
          <div className={`${viewMode === 'mobile' ? 'col-span-1' : 'lg:col-span-2'}`}>
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Mic className="w-8 h-8 text-primary" />
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">음성 회의 → 텍스트 변환</h2>
                    <Badge className="bg-accent">곧 출시</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    회의나 강의 음성을 자동으로 텍스트로 변환하여 히든 사수로 분석할 수 있는 기능입니다.
                  </p>
                </div>
              </div>

              <Tabs defaultValue="benefits">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="benefits">주요 혜택</TabsTrigger>
                  <TabsTrigger value="workflow">작업 흐름</TabsTrigger>
                  <TabsTrigger value="interface">인터페이스</TabsTrigger>
                </TabsList>
                
                <TabsContent value="benefits" className="mt-6">
                  <ul className="space-y-3">
                    {[
                      "실시간 회의 내용 기록 및 분석",
                      "중요한 내용 자동 하이라이트",
                      "회의 후 즉시 이해도 측정 가능"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (selectedScreen) {
      case 'landing': return <LandingScreen />;
      case 'upload': return <UploadScreen />;
      case 'summary': return <SummaryScreen />;
      case 'analysis': return <AnalysisScreen />;
      case 'actions': return <ActionsScreen />;
      case 'features': return <FeaturesScreen />;
      default: return <LandingScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Static Screen Layouts</h1>
          <p className="text-xl text-muted-foreground">히든 사수의 모든 화면 레이아웃을 정적 형태로 확인하세요</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <select 
              value={selectedScreen} 
              onChange={(e) => setSelectedScreen(e.target.value)}
              className="p-2 border border-border rounded-lg bg-background"
            >
              {screens.map(screen => (
                <option key={screen.id} value={screen.id}>{screen.name}</option>
              ))}
            </select>
            <span className="text-sm text-muted-foreground">
              {screens.find(s => s.id === selectedScreen)?.description}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
              className="flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              Desktop
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
              className="flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Mobile
            </Button>
          </div>
        </div>

        {/* Screen Display */}
        <div className="border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="bg-muted px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
            </div>
            <span className="text-sm text-muted-foreground ml-4">
              {screens.find(s => s.id === selectedScreen)?.name} - {viewMode === 'desktop' ? '1440px' : '375px'}
            </span>
          </div>
          
          <div className={`${viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''} bg-background overflow-auto`}>
            {renderScreen()}
          </div>
        </div>

        {/* Screen Navigation */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {screens.map((screen) => (
              <Button
                key={screen.id}
                variant={selectedScreen === screen.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedScreen(screen.id)}
                className="text-xs"
              >
                {screen.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}