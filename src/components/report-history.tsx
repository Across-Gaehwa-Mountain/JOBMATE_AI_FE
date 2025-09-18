import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileText, Clock, ArrowRight } from "lucide-react";

export interface ReportListItem {
  id: string;
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
              <Card key={r.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{r.fileName}</span>
                      {typeof r.score === 'number' && (
                        <Badge variant="secondary">점수 {r.score}</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => onOpen(r.id)}>
                  열기 <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


