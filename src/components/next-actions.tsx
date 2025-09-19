import { useState } from "react";
import { Check, Calendar, Clock, ArrowRight, Plus, Flag, Users, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";

export interface NextActionsProps {
  onBack: () => void;
  onComplete: () => void;
  items?: ActionItem[];
  userId?: string | null;
  reportId?: string | null;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'preparation' | 'study' | 'practice' | 'meeting';
  estimatedTime: string;
  isChecked: boolean;
}

export function NextActions({ onBack, onComplete, items, userId, reportId }: NextActionsProps) {
  const [actionItems, setActionItems] = useState<ActionItem[]>(items ?? []);
  const toggleActionItem = async (id: string) => {
    // 먼저 UI 상태를 업데이트
    const updatedItems = actionItems.map(item => 
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setActionItems(updatedItems);

    // API 호출
    if (userId && reportId) {
      const targetItem = actionItems.find(item => item.id === id);
      if (targetItem) {
        const nextActionIdx = actionItems.findIndex(item => item.id === id);
        const isChecked = !targetItem.isChecked;

        console.log('API 호출 정보:', {
          userId,
          reportId,
          nextActionIdx,
          isChecked,
          targetItemId: id
        });

        try {
          const response = await fetch(
            `/api/checked?user_id=${encodeURIComponent(userId)}&report_id=${encodeURIComponent(reportId)}&next_action_idx=${nextActionIdx}&is_checked=${isChecked}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          
          console.log('API 응답 상태:', response.status);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('액션 아이템 상태 업데이트 실패:', response.status, errorText);
            // API 호출 실패 시 UI 상태를 원래대로 되돌림
            setActionItems(actionItems);
          } else {
            console.log('액션 아이템 상태 업데이트 성공');
          }
        } catch (error) {
          console.error('액션 아이템 상태 업데이트 중 오류:', error);
          // API 호출 실패 시 UI 상태를 원래대로 되돌림
          setActionItems(actionItems);
        }
      }
    } else {
      console.log('userId 또는 reportId가 없음:', { userId, reportId });
    }
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

  const completedCount = actionItems.filter(item => item.isChecked).length;
  const totalCount = actionItems.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">액션 플랜</h1>
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
              <h3 className="font-semibold text-primary">중요도 높은 액션 아이템</h3>
            </div>
            <div className="space-y-3">
              {actionItems
                .filter(item => item.priority === 'high')
                .map(item => (
                  <div key={item.id} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                    <Checkbox
                      id={`highlight-${item.id}`}
                      checked={item.isChecked}
                      onCheckedChange={() => toggleActionItem(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={`highlight-${item.id}`}
                        className={`font-medium cursor-pointer ${item.isChecked ? 'line-through text-muted-foreground' : ''}`}
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
                    checked={item.isChecked}
                    onCheckedChange={() => toggleActionItem(item.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <label 
                        htmlFor={item.id}
                        className={`font-medium cursor-pointer ${item.isChecked ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {item.title}
                      </label>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryIcon(item.category)}
                        <span className="ml-1">{getCategoryText(item.category)}</span>
                      </Badge>
                    </div>
                    
                    <p className={`text-sm mb-2 ${item.isChecked ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
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
        </div>
      </div>
    </div>
  );
}