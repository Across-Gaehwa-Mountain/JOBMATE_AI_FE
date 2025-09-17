import { useState, useCallback } from "react";
import { Upload, File, CheckCircle, X, Cloud } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface DocumentUploadProps {
  onFileUploaded: (file: File) => void;
  onBack: () => void;
}

export function DocumentUpload({ onFileUploaded, onBack }: DocumentUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === 'application/pdf' || file.type === 'text/plain')) {
      uploadFile(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  }, []);

  const uploadFile = (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleContinue = () => {
    if (uploadedFile) {
      onFileUploaded(uploadedFile);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">문서 업로드</h1>
          <p className="text-muted-foreground">분석할 문서를 업로드해주세요.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!uploadedFile ? (
            <Card
              className={`p-12 border-2 border-dashed transition-all duration-200 ${
                isDragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <Cloud className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-2">파일을 드래그하거나 클릭하여 업로드</h3>
                <p className="text-muted-foreground mb-6">PDF, TXT 파일을 지원합니다</p>
                
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      파일 선택
                    </span>
                  </Button>
                </label>
                
                <div className="mt-6 text-sm text-muted-foreground">
                  최대 파일 크기: 10MB
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Upload Progress */}
              {isUploading && (
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <File className="w-8 h-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <Progress value={uploadProgress} className="mt-2" />
                    </div>
                  </div>
                </Card>
              )}

              {/* Upload Complete */}
              {!isUploading && uploadProgress === 100 && (
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="w-8 h-8 text-secondary" />
                    <div className="flex-1">
                      <p className="font-medium flex items-center gap-2">
                        {uploadedFile.name}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • 업로드 완료
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* File Preview */}
              {!isUploading && uploadProgress === 100 && (
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">문서 미리보기</h3>
                  <div className="bg-muted p-4 rounded-lg max-h-64 overflow-y-auto">
                    <p className="text-sm text-muted-foreground">
                      {uploadedFile.type === 'application/pdf' 
                        ? 'PDF 파일이 업로드되었습니다. 분석을 시작하려면 계속 버튼을 클릭하세요.'
                        : '텍스트 파일 내용을 여기서 미리 볼 수 있습니다...'}
                    </p>
                  </div>
                </Card>
              )}

              {/* Continue Button */}
              {!isUploading && uploadProgress === 100 && (
                <div className="flex justify-end">
                  <Button 
                    onClick={handleContinue}
                    className="bg-primary hover:bg-primary/90"
                  >
                    계속하기
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}