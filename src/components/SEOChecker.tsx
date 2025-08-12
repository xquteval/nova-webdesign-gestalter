import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Smartphone,
  Zap,
  Eye,
  Link,
  FileText,
  Loader2
} from "lucide-react";

interface SEOResult {
  url: string;
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'success';
    category: string;
    message: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  metrics: {
    loadTime: number;
    mobileResponsive: boolean;
    httpsEnabled: boolean;
    metaTitle: string | null;
    metaDescription: string | null;
    h1Count: number;
    imageCount: number;
    imagesWithoutAlt: number;
    internalLinks: number;
    externalLinks: number;
  };
}

const SEOChecker = () => {
  const [url, setUrl] = useState("");
  const [seoResult, setSeoResult] = useState<SEOResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkSEO = async () => {
    if (!url.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie eine URL ein",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate SEO check (in real implementation, you'd analyze the actual page)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
      const score = Math.floor(Math.random() * 40) + 60; // Score between 60-100
      
      const mockResult: SEOResult = {
        url: cleanUrl,
        score,
        issues: [
          {
            type: 'success',
            category: 'Meta Tags',
            message: 'Title-Tag ist vorhanden und gut optimiert',
            impact: 'high'
          },
          {
            type: 'warning',
            category: 'Meta Tags',
            message: 'Meta Description ist zu kurz (120 Zeichen)',
            impact: 'medium'
          },
          {
            type: 'error',
            category: 'Bilder',
            message: '5 Bilder ohne Alt-Text gefunden',
            impact: 'high'
          },
          {
            type: 'success',
            category: 'Performance',
            message: 'Ladezeit unter 3 Sekunden',
            impact: 'high'
          },
          {
            type: 'warning',
            category: 'Mobile',
            message: 'Einige Elemente sind auf Mobilgeräten zu klein',
            impact: 'medium'
          },
          {
            type: 'success',
            category: 'Sicherheit',
            message: 'HTTPS ist aktiviert',
            impact: 'high'
          }
        ],
        metrics: {
          loadTime: 2.3,
          mobileResponsive: true,
          httpsEnabled: true,
          metaTitle: 'Beispiel Website - Ihre Lösung für...',
          metaDescription: 'Kurze Beschreibung der Website...',
          h1Count: 1,
          imageCount: 12,
          imagesWithoutAlt: 5,
          internalLinks: 25,
          externalLinks: 8
        }
      };
      
      setSeoResult(mockResult);
      
      toast({
        title: "SEO-Analyse abgeschlossen",
        description: `Score: ${score}/100 - Mehrere Optimierungsmöglichkeiten gefunden`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Website konnte nicht analysiert werden",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkSEO();
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-accent-nova flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading text-foreground">
            SEO-Checker
          </CardTitle>
          <p className="text-muted-foreground">
            Analysieren Sie die SEO-Performance Ihrer Website
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ihre-website.de"
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              variant="nova"
              className="min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analysiere...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analysieren
                </>
              )}
            </Button>
          </form>

          {seoResult && (
            <div className="space-y-6 animate-fade-in">
              {/* Score Overview */}
              <div className="text-center p-6 bg-gradient-subtle rounded-lg">
                <div className={`text-6xl font-bold ${getScoreColor(seoResult.score)} mb-2`}>
                  {seoResult.score}
                </div>
                <div className="text-2xl font-semibold text-foreground mb-2">SEO Score</div>
                <Progress value={seoResult.score} className="w-full max-w-md mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {seoResult.score >= 90 ? "Ausgezeichnet!" : 
                   seoResult.score >= 70 ? "Gut - Verbesserungen möglich" : 
                   "Optimierungsbedarf vorhanden"}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {seoResult.metrics.loadTime}s
                    </div>
                    <div className="text-sm text-muted-foreground">Ladezeit</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Smartphone className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {seoResult.metrics.mobileResponsive ? "✓" : "✗"}
                    </div>
                    <div className="text-sm text-muted-foreground">Mobil</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {seoResult.metrics.imageCount}
                    </div>
                    <div className="text-sm text-muted-foreground">Bilder</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Link className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">
                      {seoResult.metrics.internalLinks}
                    </div>
                    <div className="text-sm text-muted-foreground">Links</div>
                  </CardContent>
                </Card>
              </div>

              {/* Issues List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Gefundene Probleme & Empfehlungen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {seoResult.issues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-subtle">
                        {getIssueIcon(issue.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {issue.category}
                            </Badge>
                            <Badge 
                              variant={issue.impact === 'high' ? 'destructive' : 
                                      issue.impact === 'medium' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {issue.impact === 'high' ? 'Hoch' : 
                               issue.impact === 'medium' ? 'Mittel' : 'Niedrig'}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{issue.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-xl text-foreground mb-2">
                  SEO-Optimierung gewünscht?
                </h4>
                <p className="text-muted-foreground mb-4">
                  Lassen Sie uns Ihre Website für Suchmaschinen optimieren und mehr Traffic generieren.
                </p>
                <Button 
                  variant="nova"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  SEO-Beratung anfragen
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOChecker;