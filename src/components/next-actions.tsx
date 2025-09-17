import { useState } from "react";
import { Check, Calendar, Clock, ArrowRight, Plus, Flag, Users, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";

interface NextActionsProps {
  onBack: () => void;
  onComplete: () => void;
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'preparation' | 'study' | 'practice' | 'meeting';
  estimatedTime: string;
  completed: boolean;
}

export function NextActions({ onBack, onComplete }: NextActionsProps) {
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: '1',
      title: '프로젝트 관리 도구 학습',
      description: '문서에서 언급된 프로젝트 관리 도구들의 사용법을 익히고 실제 업무에 적용해보세요.',
      priority: 'high',
      category: 'study',
      estimatedTime: '2-3시간',
      completed: false
    },
    {
      id: '2',
      title: '팀 미팅 전 체크리스트 작성',
      description: '다음 팀 미팅에서 논의할 리스크 관리 방안과 질문사항을 정리해주세요.',
      priority: 'high',
      category: 'preparation',
      estimatedTime: '30분',
      completed: false
    },
    {
      id: '3',
      title: '리스크 관리 계획 수립',
      description: '현재 진행 중인 프로젝트의 잠재적 리스크를 식별하고 대응 방안을 구체화하세요.',
      priority: 'medium',
      category: 'practice',
      estimatedTime: '1-2시간',
      completed: false
    },
    {
      id: '4',
      title: '관련 문서 추가 검토',
      description: '프로젝트 관리 관련 추가 문서들을 읽고 이해도를 보완해주세요.',
      priority: 'medium',
      category: 'study',
      estimatedTime: '1시간',
      completed: false
    },
    {
      id: '5',
      title: '동료와 개념 논의',
      description: '이해한 개념들을 동료들과 공유하고 피드백을 받아보세요.',
      priority: 'low',
      category: 'meeting',
      estimatedTime: '45분',
      completed: false
    }
  ]);

  const toggleActionItem = (id: string) => {
    setActionItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getPriorityColor = (priority: ActionItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPriorityText = (priority: ActionItem['priority']) => {
    switch (priority) {
      case 'high':
        return '높음';
      case 'medium':
        return '중간';
      case 'low':
        return '낮음';
    }
  };

  const getCategoryIcon = (category: ActionItem['category']) => {
    switch (category) {
      case 'preparation':
        return <Calendar className="w-4 h-4" />;
      case 'study':
        return <FileText className="w-4 h-4" />;
      case 'practice':
        return <Flag className="w-4 h-4" />;
      case 'meeting':
        return <Users className="w-4 h-4" />;
    }
  };

  const getCategoryText = (category: ActionItem['category']) => {
    switch (category) {
      case 'preparation':
        return '준비사항';
      case 'study':
        return '학습';
      case 'practice':
        return '실습';
      case 'meeting':
        return '미팅';
    }
  };

  const completedCount = actionItems.filter(item => item.completed).length;
  const totalCount = actionItems.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">다음 액션 계획</h1>
          <p className="text-muted-foreground">분석 결과를 바탕으로 제안된 구체적인 행동 계획입니다.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Overview */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">진행 현황</h2>
              <span className="text-2xl font-bold text-primary">{completedCount}/{totalCount}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 mb-2">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">
              {completedCount > 0 ? `${Math.round((completedCount / totalCount) * 100)}% 완료` : '시작해보세요!'}
            </p>
          </Card>

          {/* Meeting Preparation Highlight */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-primary">미팅 전 중요 준비사항</h3>
            </div>
            <div className="space-y-3">
              {actionItems
                .filter(item => item.priority === 'high')
                .map(item => (
                  <div key={item.id} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                    <Checkbox
                      id={`highlight-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={() => toggleActionItem(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={`highlight-${item.id}`}
                        className={`font-medium cursor-pointer ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {item.title}
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <Badge className={getPriorityColor(item.priority)}>
                      {getPriorityText(item.priority)}
                    </Badge>
                  </div>
              ))}
            </div>
          </Card>

          {/* All Action Items */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">전체 액션 아이템</h3>
            <div className="space-y-4">
              {actionItems.map(item => (
                <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={() => toggleActionItem(item.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <label 
                        htmlFor={item.id}
                        className={`font-medium cursor-pointer ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {item.title}
                      </label>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryIcon(item.category)}
                        <span className="ml-1">{getCategoryText(item.category)}</span>
                      </Badge>
                    </div>
                    
                    <p className={`text-sm mb-2 ${item.completed ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.estimatedTime}
                      </div>
                    </div>
                  </div>

                  <Badge className={getPriorityColor(item.priority)}>
                    {getPriorityText(item.priority)}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Add Custom Action */}
          <Card className="p-6 border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="text-center">
              <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <h4 className="font-medium text-muted-foreground mb-1">커스텀 액션 추가</h4>
              <p className="text-sm text-muted-foreground">
                개인적으로 필요한 추가 액션을 등록해보세요
              </p>
            </div>
          </Card>

          {/* Save Actions */}
          <Card className="p-6 bg-secondary/5 border-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-secondary mb-2">액션 플랜 저장</h4>
                <p className="text-sm text-muted-foreground">
                  이 액션 플랜을 내 할 일 목록에 추가하고 진행상황을 추적하세요
                </p>
              </div>
              <Button className="bg-secondary hover:bg-secondary/90">
                내 할 일로 저장
              </Button>
            </div>
          </Card>

          {/* Complete */}
          <div className="flex justify-between items-center pt-6">
            <p className="text-muted-foreground">
              모든 액션을 완료하면 문서 이해도가 크게 향상됩니다
            </p>
            <Button 
              onClick={onComplete}
              className="bg-primary hover:bg-primary/90"
            >
              분석 완료 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}