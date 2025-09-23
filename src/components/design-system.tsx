import { useState } from "react";
import { Palette, Type, Square, Layout, Monitor, Smartphone, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function DesignSystem() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    { name: "Primary", value: "#3563E9", description: "신뢰감 있는 파란색" },
    { name: "Secondary", value: "#16A34A", description: "성공/확인용 녹색" },
    { name: "Accent", value: "#F59E0B", description: "주의/중요 강조용 주황색" },
    { name: "Background", value: "#F3F4F6", description: "배경색" },
    { name: "Muted Text", value: "#6B7280", description: "보조 텍스트" },
    { name: "Foreground", value: "#1F2937", description: "진한 텍스트" }
  ];

  const typography = [
    { name: "Heading Large", size: "32px", weight: "Bold", element: "h1" },
    { name: "Heading Medium", size: "24px", weight: "Bold", element: "h2" },
    { name: "Heading Small", size: "20px", weight: "SemiBold", element: "h3" },
    { name: "Body", size: "16px", weight: "Regular", element: "p" },
    { name: "Button", size: "16px", weight: "SemiBold", element: "button" },
    { name: "Meta", size: "14px", weight: "Light", element: "span" }
  ];

  const components = [
    {
      name: "Primary Button",
      description: "주요 액션을 위한 버튼",
      component: <Button className="bg-primary hover:bg-primary/90">시작하기</Button>
    },
    {
      name: "Secondary Button", 
      description: "보조 액션을 위한 버튼",
      component: <Button variant="outline">돌아가기</Button>
    },
    {
      name: "Card",
      description: "콘텐츠 그룹핑을 위한 카드",
      component: (
        <Card className="p-4 w-48">
          <h4 className="font-semibold mb-2">카드 제목</h4>
          <p className="text-sm text-muted-foreground">카드 내용입니다.</p>
        </Card>
      )
    },
    {
      name: "Badge High",
      description: "높은 우선순위 배지",
      component: <Badge className="bg-destructive">높음</Badge>
    },
    {
      name: "Badge Medium",
      description: "중간 우선순위 배지", 
      component: <Badge className="bg-accent">중간</Badge>
    },
    {
      name: "Badge Low",
      description: "낮은 우선순위 배지",
      component: <Badge className="bg-secondary">낮음</Badge>
    }
  ];

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">히든 사수 Design System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            업무 문서 이해도 향상을 위한 AI 서비스의 디자인 시스템
          </p>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Square className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="layouts" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Layouts
            </TabsTrigger>
          </TabsList>

          {/* Colors */}
          <TabsContent value="colors">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Color Palette</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colors.map((color) => (
                    <Card key={color.name} className="p-6">
                      <div 
                        className="w-full h-24 rounded-lg mb-4 cursor-pointer relative group"
                        style={{ backgroundColor: color.value }}
                        onClick={() => copyColor(color.value)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {copiedColor === color.value ? (
                            <Check className="w-6 h-6 text-white" />
                          ) : (
                            <Copy className="w-6 h-6 text-white" />
                          )}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg">{color.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{color.description}</p>
                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {color.value}
                      </code>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Usage Examples */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Usage Examples</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-primary text-primary-foreground">
                    <h4 className="font-semibold mb-2">Primary Actions</h4>
                    <p className="text-sm opacity-90">중요한 액션 버튼, 로고, 강조 요소</p>
                  </Card>
                  <Card className="p-6 bg-secondary text-secondary-foreground">
                    <h4 className="font-semibold mb-2">Success States</h4>
                    <p className="text-sm opacity-90">성공 메시지, 완료 상태, 긍정적 피드백</p>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Typography */}
          <TabsContent value="typography">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Typography Scale</h2>
              
              <div className="space-y-6">
                {typography.map((type) => (
                  <div key={type.name} className="border-b border-border pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{type.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {type.size} • Pretendard {type.weight}
                        </p>
                      </div>
                      <Badge variant="outline">{type.element}</Badge>
                    </div>
                    
                    <div className="text-foreground" style={{ 
                      fontSize: type.size,
                      fontWeight: type.weight === 'Bold' ? 700 : type.weight === 'SemiBold' ? 600 : type.weight === 'Light' ? 300 : 400
                    }}>
                      업무 문서를 더 정확하게 이해하세요
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Typography Guidelines</h3>
                <Card className="p-6">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 기본 폰트: Pretendard</li>
                    <li>• 기본 크기: 16px</li>
                    <li>• 줄 간격: 1.5</li>
                    <li>• 제목은 Bold 또는 SemiBold 사용</li>
                    <li>• 본문은 Regular 사용</li>
                    <li>• 메타 정보는 Light 사용</li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Components */}
          <TabsContent value="components">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">UI Components</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((comp) => (
                  <Card key={comp.name} className="p-6">
                    <div className="mb-4">
                      {comp.component}
                    </div>
                    <h3 className="font-semibold mb-2">{comp.name}</h3>
                    <p className="text-sm text-muted-foreground">{comp.description}</p>
                  </Card>
                ))}
              </div>

              {/* Button States */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Button States</h3>
                <Card className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Button className="w-full mb-2">Default</Button>
                      <p className="text-xs text-muted-foreground">기본 상태</p>
                    </div>
                    <div className="text-center">
                      <Button className="w-full mb-2" disabled>Disabled</Button>
                      <p className="text-xs text-muted-foreground">비활성 상태</p>
                    </div>
                    <div className="text-center">
                      <Button variant="outline" className="w-full mb-2">Outline</Button>
                      <p className="text-xs text-muted-foreground">외곽선</p>
                    </div>
                    <div className="text-center">
                      <Button variant="ghost" className="w-full mb-2">Ghost</Button>
                      <p className="text-xs text-muted-foreground">고스트</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Form Elements */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Form Elements</h3>
                <Card className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">입력 필드</label>
                    <input 
                      type="text" 
                      placeholder="내용을 입력하세요"
                      className="w-full p-3 border border-border rounded-lg bg-input-background focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">텍스트 영역</label>
                    <textarea 
                      placeholder="내가 이해한 내용을 작성해주세요..."
                      className="w-full p-3 border border-border rounded-lg bg-input-background focus:border-primary focus:outline-none min-h-[100px] resize-none"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Layouts */}
          <TabsContent value="layouts">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Layout Principles</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Monitor className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold">Desktop Layout</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 최대 너비: 1200px</li>
                    <li>• 좌우 여백: 24px</li>
                    <li>• 그리드: 12컬럼</li>
                    <li>• 카드 간격: 24px</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold">Mobile Layout</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 단일 컬럼</li>
                    <li>• 좌우 여백: 16px</li>
                    <li>• 터치 영역: 최소 44px</li>
                    <li>• 카드 간격: 16px</li>
                  </ul>
                </Card>
              </div>

              {/* Spacing */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Spacing Scale</h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
                      <div key={size} className="flex items-center gap-4">
                        <div 
                          className="bg-primary rounded"
                          style={{ width: `${size}px`, height: '16px' }}
                        ></div>
                        <span className="text-sm font-mono">{size}px</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Border Radius */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Border Radius</h3>
                <Card className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Small', value: '4px' },
                      { name: 'Medium', value: '8px' },
                      { name: 'Large', value: '12px' },
                      { name: 'Full', value: '9999px' }
                    ].map((radius) => (
                      <div key={radius.name} className="text-center">
                        <div 
                          className="w-16 h-16 bg-primary mx-auto mb-2"
                          style={{ borderRadius: radius.value }}
                        ></div>
                        <p className="text-sm font-medium">{radius.name}</p>
                        <p className="text-xs text-muted-foreground">{radius.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}