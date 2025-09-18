import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface UnderstandingSummaryProps {
  file: File;
  onAnalyze: (summary: string, analysisData?: any) => void;
  onBack: () => void;
}

export function UnderstandingSummary({ file, onAnalyze, onBack }: UnderstandingSummaryProps) {
  const [summary, setSummary] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnalyze = async () => {
    if (!summary.trim()) return;

    let didNavigate = false;
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('file_names', JSON.stringify([file.name]));
      formData.append('user_summary', summary);
      formData.append('files', file, file.name);

      // Durable Functions 오케스트레이션 시작
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
        // Content-Type은 FormData 사용 시 브라우저가 자동 설정합니다.
      });
    console.log(response);

      if (response.status === 202) {
        const startPayload = await response.json();

        const toProxyPath = (absoluteOrPath: string) => {
          try {
            const u = new URL(absoluteOrPath);
            return `${u.pathname}${u.search}`;
          } catch {
            return absoluteOrPath;
          }
        };

        const statusUrlRaw: string = startPayload.statusQueryGetUri;
        const statusUrlPath = toProxyPath(statusUrlRaw);
        // Durable Functions 상태 URL은 보통 /runtime/... 이므로 그대로 사용 (vite 프록시가 /runtime → 7071로 전달)
        const statusUrl = statusUrlPath.startsWith('/runtime')
          ? statusUrlPath
          : statusUrlPath;

        // 상태 폴링
        const pollIntervalMs = 1500;
        let done = false;
        let finalOutput: any | null = null;
        while (!done) {
          const statusResp = await fetch(statusUrl);
          if (!statusResp.ok) {
            console.error('상태 조회 실패', await statusResp.text());
            break;
          }
          console.log(statusResp)
          const statusJson = await statusResp.json();
          const runtimeStatus = statusJson.runtimeStatus as string;

          if (runtimeStatus === 'Completed') {
            console.log('분석 완료 output:', statusJson.output);
            finalOutput = statusJson.output;
            done = true;
          } else if (runtimeStatus === 'Failed' || runtimeStatus === 'Terminated') {
            console.error('오케스트레이션 종료 상태:', runtimeStatus, statusJson);
            done = true;
          } else {
            await new Promise(r => setTimeout(r, pollIntervalMs));
          }
        }
        // 완료 시 부모로 결과 전달
        if (finalOutput) {
          onAnalyze(summary, finalOutput);
          didNavigate = true;
          return;
        }
      } else {
        console.error('오케스트레이션 시작 실패', response.status, await response.text());
        onAnalyze(summary);
        didNavigate = true;
        return;
      }
    } catch (error) {
      console.error('분석 API 호출 중 오류', error);
      onAnalyze(summary);
      didNavigate = true;
      return;
    } finally{
      setIsSubmitting(false);
      // onAnalyze는 성공/실패 지점에서 단 한 번만 호출
    }
  };

  const guidelines = [
    "문서의 핵심 내용을 자신의 언어로 요약해주세요",
    "이해한 주요 개념과 중요 포인트를 포함하세요",
    "구체적인 예시나 세부사항도 함께 작성하면 더 정확한 분석이 가능합니다",
    "최소 100자 이상 작성해주세요"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">이해도 요약 작성</h1>
          <p className="text-muted-foreground">문서를 읽고 이해한 내용을 작성해주세요.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Document Preview */}
          <Collapsible open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <Card className="overflow-hidden">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {isPreviewOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <div className="bg-muted p-4 rounded-lg max-h-64 overflow-y-auto">
                    <p className="text-sm leading-relaxed">
                      {file.type === 'application/pdf' 
                        ? '이곳에는 PDF 문서의 내용이 표시됩니다. 실제 구현에서는 PDF 파싱을 통해 텍스트 내용을 보여줍니다. 사용자는 이 내용을 참고하여 아래에 자신이 이해한 내용을 작성할 수 있습니다.'
                        : '이곳에 텍스트 파일의 내용이 표시됩니다. 문서의 주요 내용을 파악하여 아래에 이해한 내용을 요약해보세요.'}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Writing Guidelines */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">작성 가이드라인</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  {guideline}
                </li>
              ))}
            </ul>
          </Card>

          {/* Summary Input */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">내가 이해한 내용</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>문서의 핵심 내용을 자신만의 언어로 정리해주세요</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="내가 이해한 내용을 작성해주세요. 문서의 주요 개념, 중요한 포인트, 그리고 구체적인 예시들을 포함하여 자세히 설명해주세요..."
              className="min-h-[300px] resize-none"
            />
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                {summary.length} / 100자 (최소)
              </p>
              <Button 
                onClick={handleAnalyze}
                disabled={summary.length < 100 || isSubmitting}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? '분석 중…' : '분석하기'}
              </Button>
            </div>
          </Card>

          {/* Additional Tips */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h4 className="font-semibold text-primary mb-2">💡 더 나은 분석을 위한 팁</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 이해가 어려웠던 부분도 솔직하게 작성해주세요</li>
              <li>• 문서의 구조나 논리적 흐름에 대한 이해도 포함하세요</li>
              <li>• 실무에 어떻게 적용할 수 있을지 생각해보며 작성하세요</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}