import { useState } from "react";
import { Landing } from "./components/landing";
import { DocumentUpload } from "./components/document-upload";
import { UnderstandingSummary } from "./components/understanding-summary";
import { AnalysisResult } from "./components/analysis-result";
import { NextActions } from "./components/next-actions";
import { ExcludedFeatures } from "./components/excluded-features";
import { DesignSystem } from "./components/design-system";
import { StaticScreens } from "./components/static-screens";
import { Button } from "./components/ui/button";
import { Settings, Zap, Palette, Monitor } from "lucide-react";

type AppStep = 'landing' | 'upload' | 'summary' | 'analysis' | 'actions' | 'excluded-features' | 'design-system' | 'static-screens';

interface AppState {
  step: AppStep;
  file: File | null;
  summary: string;
  analysisData: any | null;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    step: 'landing',
    file: null,
    summary: '',
    analysisData: null
  });

  const handleGetStarted = () => {
    setState(prev => ({ ...prev, step: 'upload' }));
  };

  const handleFileUploaded = (file: File) => {
    setState(prev => ({ ...prev, file, step: 'summary' }));
  };

  const handleAnalyze = (summary: string, analysisData?: any) => {
    console.log(analysisData);
    setState(prev => ({ ...prev, summary, analysisData: analysisData ?? null, step: 'analysis' }));
  };

  const handleNext = () => {
    setState(prev => ({ ...prev, step: 'actions' }));
  };

  const handleComplete = () => {
    // Reset to landing or show completion message
    setState(prev => ({ ...prev, step: 'landing' }));
  };

  const showExcludedFeatures = () => {
    setState(prev => ({ ...prev, step: 'excluded-features' }));
  };

  const showDesignSystem = () => {
    setState(prev => ({ ...prev, step: 'design-system' }));
  };

  const showStaticScreens = () => {
    setState(prev => ({ ...prev, step: 'static-screens' }));
  };

  const handleBack = () => {
    switch (state.step) {
      case 'upload':
        setState(prev => ({ ...prev, step: 'landing' }));
        break;
      case 'summary':
        setState(prev => ({ ...prev, step: 'upload' }));
        break;
      case 'analysis':
        setState(prev => ({ ...prev, step: 'summary' }));
        break;
      case 'actions':
        setState(prev => ({ ...prev, step: 'analysis' }));
        break;
      case 'excluded-features':
      case 'design-system':
      case 'static-screens':
        setState(prev => ({ ...prev, step: 'landing' }));
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (state.step) {
      case 'landing':
        return <Landing onGetStarted={handleGetStarted} />;
      case 'upload':
        return <DocumentUpload onFileUploaded={handleFileUploaded} onBack={handleBack} />;
      case 'summary':
        return (
          <UnderstandingSummary
            file={state.file!}
            onAnalyze={handleAnalyze}
            onBack={handleBack}
          />
        );
      case 'analysis':
        return (
          <AnalysisResult
            file={state.file!}
            summary={state.summary}
            analysis={state.analysisData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'actions':
        return <NextActions onBack={handleBack} onComplete={handleComplete} />;
      case 'excluded-features':
        return <ExcludedFeatures onBack={handleBack} />;
      case 'design-system':
        return <DesignSystem />;
      case 'static-screens':
        return <StaticScreens />;
      default:
        return <Landing onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      {state.step !== 'landing' && (
        <nav className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-primary">JobMate AI</h1>
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  {state.step === 'upload' && '문서 업로드'}
                  {state.step === 'summary' && '이해도 요약'}
                  {state.step === 'analysis' && '분석 결과'}
                  {state.step === 'actions' && '액션 플랜'}
                  {state.step === 'excluded-features' && '향후 기능'}
                  {state.step === 'design-system' && '디자인 시스템'}
                  {state.step === 'static-screens' && '정적 화면'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {(state.step === 'design-system' || state.step === 'static-screens') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                  >
                    ← 돌아가기
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Design System Navigation for Landing */}
      {state.step === 'landing' && (
        <div className="fixed top-6 right-6 flex flex-col gap-3 z-50">
          <Button
            onClick={showDesignSystem}
            className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            size="sm"
          >
            <Palette className="w-6 h-6" />
          </Button>
          <Button
            onClick={showStaticScreens}
            className="rounded-full h-14 w-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg"
            size="sm"
          >
            <Monitor className="w-6 h-6" />
          </Button>
          <Button
            onClick={showExcludedFeatures}
            className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            size="sm"
          >
            <Zap className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Main Content */}
      <main className="relative">
        {renderCurrentStep()}
      </main>

      {/* Progress Indicator */}
      {state.step !== 'landing' && state.step !== 'excluded-features' && state.step !== 'design-system' && state.step !== 'static-screens' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-full px-4 py-2 shadow-lg z-50">
          <div className="flex items-center gap-2">
            {['upload', 'summary', 'analysis', 'actions'].map((step, index) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all ${
                  state.step === step
                    ? 'bg-primary w-6'
                    : ['upload', 'summary', 'analysis', 'actions'].indexOf(state.step) > index
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}