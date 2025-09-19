import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileText, Clock, ArrowRight, Star } from "lucide-react";

export interface ReportListItem {
  id: string;
  title: string;
  fileName: string;
  createdAt: string;
  score?: number;
}

interface ReportHistoryProps {
  reports: ReportListItem[];
  onBack: () => void;
  onOpen: (reportId: string) => void;
}

export function ReportHistory({ reports, onBack, onOpen }: ReportHistoryProps) {
  const handleBackClick = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      onBack();
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBackClick} className="mb-4">
            ← 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">보고서 이력</h1>
          <p className="text-muted-foreground">이전에 분석한 보고서들의 목록입니다.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {reports.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">아직 저장된 보고서가 없습니다.</Card>
          ) : (
            reports.map((r) => (
              <Card key={r.id} className="p-4 group transition-all duration-200 ease-in-out hover:shadow-md hover:border-primary/30">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  {/* 아이콘에 부드러운 배경색을 추가하여 시각적 포인트를 줍니다. */}
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    {/* 파일 이름을 더 강조합니다. */}
                    <span className="font-semibold text-base text-card-foreground">{r.title}</span>
                    
                    {/* 보조 정보를 한 줄로 묶어 깔끔하게 표시합니다. */}
                    <div className="text-xs text-muted-foreground flex items-center gap-4">
                      {/* 점수 */}
                      {typeof r.score === 'number' && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500" />
                          <span className="font-medium">{r.score}점</span>
                        </div>
                      )}
                      {/* 생성 날짜 */}
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(r.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
        
                {/* 버튼은 평소에는 숨겨져 있다가, 카드(group)에 마우스를 올리면 나타납니다.
                  이를 통해 UI가 더 깔끔하고 정돈된 느낌을 줍니다.
                */}
                <Button size="sm" className="bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => onOpen(r.id)}>
                  열기
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


