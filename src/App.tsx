import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Landing } from "./components/landing";
import { DocumentUpload } from "./components/document-upload";
import { UnderstandingSummary } from "./components/understanding-summary";
import { AnalysisResult } from "./components/analysis-result";
import { NextActions, ActionItem } from "./components/next-actions";
import { ReportHistory } from "./components/report-history";
import { ExcludedFeatures } from "./components/excluded-features";
import { DesignSystem } from "./components/design-system";
import { StaticScreens } from "./components/static-screens";
import { Button } from "./components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Settings, Zap, Palette, Monitor,Star } from "lucide-react";

type AppStep =
	| "landing"
	| "upload"
	| "summary"
	| "analysis"
	| "actions"
	| "history"
	| "excluded-features"
	| "design-system"
	| "static-screens";

interface AppState {
	step: AppStep;
	file: File | null;
	summary: string;
	analysisData: any | null;
	reportHistory: ReportSummary[];
	selectedReportId: string | null;
	userId: string | null;
	isUserDialogOpen: boolean;
	tempUserId: string;
}

interface ReportSummary {
	id: string;
  title: string;
	fileName: string;
	createdAt: string;
	score?: number;
	goodPoints?: string[];
	improvementPoints?: string[];
	missedPoints?: string[];
	actionItems?: ActionItem[];
}

export default function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const [state, setState] = useState<AppState>({
		step: "landing",
		file: null,
		summary: "",
		analysisData: null,
		reportHistory: [],
		selectedReportId: null,
		userId: null,
		isUserDialogOpen: false,
		tempUserId: "",
	});

	// Deep-link 처리: /report/:id 경로 진입 시 해당 보고서 열기 (userId가 설정된 경우)
	if (typeof window !== "undefined") {
		// no-op: vite ssr 아님, 방어적 체크
	}

	const handleGetStarted = () => {
		setState((prev) => ({ ...prev, step: "upload" }));
		navigate("/report/new");
	};

	const handleChooseGuest = () => {
		setState((prev) => ({
			...prev,
			userId: null,
			reportHistory: [],
			step: "upload",
		}));
		navigate("/report/new");
	};

	const handleChooseUser = () => {
		setState((prev) => ({
			...prev,
			isUserDialogOpen: true,
			tempUserId: prev.userId ?? "",
		}));
	};

	const closeUserDialog = () => {
		setState((prev) => ({ ...prev, isUserDialogOpen: false }));
	};

	const saveUserIdAndProceed = () => {
		const trimmed = state.tempUserId.trim();
		if (!trimmed) return;
		setState((prev) => ({
			...prev,
			userId: trimmed,
			reportHistory: [],
			isUserDialogOpen: false,
			step: "upload",
		}));
		navigate("/report/new");
	};

	const handleFileUploaded = (file: File) => {
		setState((prev) => ({ ...prev, file, step: "summary" }));
	};

	const handleAnalyze = (summary: string, analysisData?: any) => {
		const reportId =
			analysisData?.reports?.report_id ?? analysisData?.report_id;
		setState((prev) => ({
			...prev,
			summary,
			analysisData: analysisData ?? null,
			selectedReportId: reportId ?? prev.selectedReportId,
			step: "analysis",
		}));
		// 분석 응답이 정상(analysisData 존재)이고 reportId가 있으면 라우팅
		if (analysisData) {
			navigate(`/report/${encodeURIComponent(reportId)}`);
		}
	};

	const handleNext = () => {
		setState((prev) => ({ ...prev, step: "actions" }));
		// 같은 경로(/report/:id) 유지, 렌더링만 NextActions로 전환
	};

	const handleComplete = () => {
		const genId = () =>
			crypto?.randomUUID ? crypto.randomUUID() : String(Date.now());
		const reportId = genId();
		const output = state.analysisData?.output ?? state.analysisData ?? {};
		const newReport: ReportSummary = {
			id: reportId,
      title: output.title ?? "알 수 없는 파일",
			fileName: state.file?.name ?? "알 수 없는 파일",
			createdAt: new Date().toISOString(),
			score: output?.score ?? output?.feedback?.score,
			goodPoints: output?.feedback?.good_points ?? [],
			improvementPoints: output?.feedback?.improvement_points ?? [],
			missedPoints:
				output?.feedback?.missed_points ?? output?.feedback?.missed ?? [],
			actionItems: (output?.next_actions ?? []).map((a: any, idx: number) => ({
				id: a?.id ?? `${reportId}-ai-${idx}`,
				title: a?.title ?? `액션 ${idx + 1}`,
				description: a?.description ?? "",
				priority: (a?.priority as ActionItem["priority"]) ?? "medium",
				category: (a?.category as ActionItem["category"]) ?? "study",
				estimatedTime: a?.estimatedTime ?? "1시간",
				isChecked: false,
			})) as ActionItem[],
		};
		setState((prev) => ({
			...prev,
			reportHistory: [newReport, ...prev.reportHistory],
			selectedReportId: reportId,
			step: "history",
		}));
	};

	const showExcludedFeatures = () => {
		setState((prev) => ({ ...prev, step: "excluded-features" }));
	};

	const showDesignSystem = () => {
		setState((prev) => ({ ...prev, step: "design-system" }));
	};

	const showStaticScreens = () => {
		setState((prev) => ({ ...prev, step: "static-screens" }));
	};

	const showHistory = async () => {
		if (!state.userId) return;
		navigate("/history");
		try {
			const resp = await fetch(
				`/api/reports?user_id=${encodeURIComponent(state.userId)}`
			);
			if (!resp.ok) {
				console.error("보고서 이력 조회 실패", await resp.text());
				setState((prev) => ({ ...prev, step: "history" }));
				return;
			}
      const data = await resp.json();
      // reports 배열 안전 추출
      const list = Array.isArray(data) ? data : (Array.isArray(data?.reports) ? data.reports : []);
      
      const mapped: ReportSummary[] = list.map((r: any, idx: number) => {
        const analysis = r.analysis_result ?? r.analysis ?? {};
        const feedback = analysis.feedback ?? {};
        const fileNameFromAnalysis = Array.isArray(analysis.file_analysis)
          ? analysis.file_analysis[0]?.file_name
          : undefined;
        return {
          id: r.report_id ?? r.id ?? String(r._id ?? idx),
          fileName: r.file_name ?? r.fileName ?? fileNameFromAnalysis ?? '알 수 없는 파일',
          createdAt: r.creation_datetime ?? r.created_at ?? r.createdAt ?? new Date().toISOString(),
          score: analysis.score ?? feedback.score,
          title: analysis.title,
          goodPoints: feedback.good_points ?? [],
          improvementPoints: feedback.improvement_points ?? [],
          missedPoints: feedback.missed_points ?? [],
          actionItems: (analysis.next_actions ?? r.next_actions ?? r.actionItems ?? []).map((a: any, aIdx: number) => ({
            id: a?.id ?? `${r.report_id ?? r.id ?? idx}-ai-${aIdx}`,
            title: a?.title ?? `액션 ${aIdx + 1}`,
            description: a?.description ?? '',
            priority: (a?.priority as ActionItem['priority']) ?? 'medium',
            category: (a?.category as ActionItem['category']) ?? 'study',
            estimatedTime: a?.estimatedTime ?? '1시간',
            isChecked: !!a?.isChecked,
          })),
        } as ReportSummary;
      });
      
      setState(prev => ({ ...prev, reportHistory: mapped, step: 'history' }));
		} catch (e) {
			console.error("보고서 이력 조회 중 오류", e);
			setState((prev) => ({ ...prev, step: "history" }));
		}
	};

	const openReport = useCallback(async (reportId: string) => {
		if (!state.userId) return;
		
		// 이미 같은 보고서를 로딩 중이거나 로드된 경우 중복 호출 방지
		if (state.selectedReportId === reportId && state.step === "analysis") {
			return;
		}
		
		try {
			navigate(`/report/${encodeURIComponent(reportId)}`);
			const resp = await fetch(
				`/api/report/${encodeURIComponent(
					reportId
				)}?user_id=${encodeURIComponent(state.userId)}`
			);
			if (!resp.ok) {
				console.error("보고서 상세 조회 실패", await resp.text());
				return;
			}
			const r = await resp.json();
      const ar = r.analysis_result.analysis_result ?? {};
      console.log(ar)
      const fb = ar.feedback ?? {};

      const analysisLike = {
        score: ar.score ?? fb.score,
        feedback: {
          good_points: fb.good_points ?? [],
          improvement_points: fb.improvement_points ?? [],
          missed_points: fb.missed_points ?? []
        },
        mentor_comment: fb.mentor_comment,
        reasoning_summary: fb.reasoning_summary,
        suggested_questions: ar.suggested_questions,
        next_actions: ar.next_actions
      };

      const mappedActions: ActionItem[] = (ar.next_actions ?? []).map((a: any, i: number) => ({
        id: a?.id ?? `${r.report_id}-ai-${i}`,
        title: a?.title ?? `액션 ${i + 1}`,
        description: a?.description ?? '',
        priority: (a?.priority as ActionItem['priority']) ?? 'medium',
        category: (a?.category as ActionItem['category']) ?? 'study',
        estimatedTime: a?.estimatedTime ?? '1시간',
        isChecked: !!a?.isChecked
      }));
			setState((prev) => ({
				...prev,
				selectedReportId: reportId,
				analysisData: analysisLike,
				reportHistory: prev.reportHistory.map((rr) =>
					rr.id === reportId ? { ...rr, actionItems: mappedActions } : rr
				),
				step: "analysis",
			}));
		} catch (e) {
			console.error("보고서 상세 조회 중 오류", e);
		}
	}, [state.userId, state.selectedReportId, state.step, navigate]);

	// URL 경로 동기화 (react-router): /report/:id 로 진입 시 해당 보고서 열기
	useEffect(() => {
		const path = location.pathname;
		if (path.startsWith("/report/") && path !== "/report/new") {
			const id = decodeURIComponent(path.replace("/report/", ""));
			if (state.userId && state.step !== "analysis" && state.step !== "actions") {
				openReport(id);
			}
		}
	}, [location.pathname, state.userId, state.step, openReport]); // 의존성 배열 추가

	const goHome = () => {
		navigate("/");
	};

	const handleBack = () => {
		switch (state.step) {
			// case 'upload':
			//   navigate('/');
			//   setState(prev => ({ ...prev, step: 'landing' }));
			//   break;
			// case 'summary':
			//   setState(prev => ({ ...prev, step: 'upload' }));
			//   break;
			// case 'analysis':
			//   setState(prev => ({ ...prev, step: 'summary' }));
			//   break;
			case "actions":
				setState((prev) => ({ ...prev, step: "analysis" }));
				break;
			case "excluded-features":
			case "design-system":
			case "static-screens":
				setState((prev) => ({ ...prev, step: "landing" }));
				break;
			default:
				navigate(-1);
				break;
		}
	};

	// User mode controls
	const useAsGuest = () => {
		setState((prev) => ({ ...prev, userId: null, reportHistory: [] }));
	};

	const promptUserId = () => {
		const entered = window.prompt(
			"user_id를 입력하세요 (예: user_123)",
			state.userId ?? ""
		);
		if (entered !== null) {
			const trimmed = entered.trim();
			setState((prev) => ({
				...prev,
				userId: trimmed || null,
				reportHistory: [],
			}));
		}
	};

	const renderCurrentStep = () => {
		switch (state.step) {
			case "landing":
				return (
					<Landing
						userId={state.userId}
						onGetStarted={handleGetStarted}
						onChooseGuest={handleChooseGuest}
						onChooseUser={handleChooseUser}
					/>
				);
			case "upload":
				return (
					<DocumentUpload
						onFileUploaded={handleFileUploaded}
						onBack={handleBack}
					/>
				);
			case "summary":
				return (
					<UnderstandingSummary
						user_id={state.userId}
						file={state.file!}
						onAnalyze={handleAnalyze}
						onBack={handleBack}
					/>
				);
			case "analysis":
				return (
					<AnalysisResult
						file={state.file!}
						summary={state.summary}
						analysis={state.analysisData}
						onNext={handleNext}
						onBack={handleBack}
					/>
				);
			case "actions":

				return (
					<NextActions
						onBack={handleBack}
						onComplete={handleComplete}
						items={state.analysisData?.next_actions ?? []}
						userId={state.userId}
						reportId={state.selectedReportId}
					/>
				);
			case "history":
				return (
					<ReportHistory
						reports={state.reportHistory}
						onBack={handleBack}
						onOpen={openReport}
					/>
				);
			case "excluded-features":
				return <ExcludedFeatures onBack={handleBack} />;
			case "design-system":
				return <DesignSystem />;
			case "static-screens":
				return <StaticScreens />;
			default:
				return (
					<Landing
            userId={state.userId}
						onGetStarted={handleGetStarted}
						onChooseGuest={handleChooseGuest}
						onChooseUser={handleChooseUser}
					/>
				);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Top Navigation */}
			{state.step !== "landing" && (
				<nav className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-40">
					<div className="container mx-auto px-4">
						<div className="flex items-center justify-between h-16">
							<div className="flex items-center gap-3">
								<button
									onClick={goHome}
									className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
								>
									 히든 사수
								</button>
								<div className="w-1 h-1 bg-primary rounded-full"></div>
								<span className="text-sm text-muted-foreground">
									{state.step === "upload" && "문서 업로드"}
									{state.step === "summary" && "이해도 요약"}
									{state.step === "analysis" && "분석 결과"}
									{state.step === "actions" && "액션 플랜"}
									{state.step === "history" && "보고서 이력"}
									{state.step === "excluded-features" && "향후 기능"}
									{state.step === "design-system" && "디자인 시스템"}
									{state.step === "static-screens" && "정적 화면"}
								</span>
							</div>

							<div className="flex items-center gap-2">
								<Button variant="outline" size="sm" onClick={promptUserId}>
									{state.userId ? `사용자: ${state.userId}` : "게스트 모드"}
								</Button>
								{state.userId && (
									<Button variant="ghost" size="sm" onClick={showHistory}>
										보고서 이력
									</Button>
								)}
								{(state.step === "design-system" ||
									state.step === "static-screens") && (
									<Button variant="ghost" size="sm" onClick={handleBack}>
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
			{state.step === "landing" && (
				<div className="fixed top-6 right-6 flex flex-col gap-3 z-50">
					{state.userId && (
						<Button
							onClick={showHistory}
							className="rounded-full h-14 w-14 bg-muted hover:bg-muted/90 text-foreground shadow-lg"
							size="sm"
						>
							📚
						</Button>
					)}
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
				<Routes>
					<Route
						path="/"
						element={
							<Landing
								userId={state.userId}
								onGetStarted={handleGetStarted}
								onChooseGuest={handleChooseGuest}
								onChooseUser={handleChooseUser}
							/>
						}
					/>
					<Route
						path="/report/new"
						element={
							state.step === "summary" ? (
								<UnderstandingSummary
									user_id={state.userId}
									file={state.file!}
									onAnalyze={handleAnalyze}
									onBack={handleBack}
								/>
							) : state.step === "upload" ? (
								<DocumentUpload
									onFileUploaded={handleFileUploaded}
									onBack={handleBack}
								/>
							) : (
								<DocumentUpload
									onFileUploaded={handleFileUploaded}
									onBack={handleBack}
								/>
							)
						}
					/>
					<Route
						path="/report/:reportId"
						element={
							state.step === "actions" ? (
								<NextActions
									onBack={handleBack}
									onComplete={handleComplete}
									items={
									state.analysisData?.next_actions ?? []
									}
									userId={state.userId}
									reportId={state.selectedReportId}
								/>
							) : (
								<AnalysisResult
									file={state.file!}
									summary={state.summary}
									analysis={state.analysisData}
									onNext={handleNext}
									onBack={handleBack}
								/>
							)
						}
					/>
					<Route
						path="/history"
						element={
							<ReportHistory
								reports={state.reportHistory}
								onBack={handleBack}
								onOpen={openReport}
							/>
						}
					/>
					<Route
						path="*"
						element={
							<Landing
								userId={state.userId}
								onGetStarted={handleGetStarted}
								onChooseGuest={handleChooseGuest}
								onChooseUser={handleChooseUser}
							/>
						}
					/>
				</Routes>
			</main>

			{/* Progress Indicator */}
			{state.step !== "landing" &&
				state.step !== "excluded-features" &&
				state.step !== "design-system" &&
				state.step !== "static-screens" &&
				state.step !== "history" && (
					<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-full px-4 py-2 shadow-lg z-50">
						<div className="flex items-center gap-2">
							{["upload", "summary", "analysis", "actions"].map(
								(step, index) => (
									<div
										key={step}
										className={`w-2 h-2 rounded-full transition-all ${
											state.step === step
												? "bg-primary w-6"
												: ["upload", "summary", "analysis", "actions"].indexOf(
														state.step
												  ) > index
												? "bg-primary"
												: "bg-muted"
										}`}
									/>
								)
							)}
						</div>
					</div>
				)}

			{/* User ID Dialog */}
			<Dialog
				open={state.isUserDialogOpen}
				onOpenChange={(open) =>
					setState((prev) => ({ ...prev, isUserDialogOpen: open }))
				}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>계정 연동하기</DialogTitle>
					</DialogHeader>
					<div className="space-y-2">
						<label className="text-sm text-muted-foreground">user_id</label>
						<Input
							placeholder="예: user_123"
							value={state.tempUserId}
							onChange={(e) =>
								setState((prev) => ({ ...prev, tempUserId: e.target.value }))
							}
						/>
					</div>
					<DialogFooter>
						<Button variant="ghost" onClick={closeUserDialog}>
							취소
						</Button>
						<Button
							onClick={saveUserIdAndProceed}
							disabled={!state.tempUserId.trim()}
						>
							연동하고 시작
						</Button>
					</DialogFooter>
					</DialogContent>
				</Dialog>
		</div>
	);
}
