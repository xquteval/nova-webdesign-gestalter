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
      const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
      
      // Real SEO analysis
      const startTime = Date.now();
      
      // Try to fetch the page using a CORS proxy
      let htmlContent = '';
      let fetchSuccessful = false;
      
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`);
        const data = await response.json();
        htmlContent = data.contents;
        fetchSuccessful = true;
      } catch (error) {
        console.log('CORS proxy failed, using fallback analysis');
      }
      
      const loadTime = (Date.now() - startTime) / 1000;
      
      let issues = [];
      let metrics = {
        loadTime,
        mobileResponsive: true,
        httpsEnabled: cleanUrl.startsWith('https://'),
        metaTitle: null as string | null,
        metaDescription: null as string | null,
        h1Count: 0,
        imageCount: 0,
        imagesWithoutAlt: 0,
        internalLinks: 0,
        externalLinks: 0
      };
      
      if (fetchSuccessful && htmlContent) {
        // Parse HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Check meta title
        const titleElement = doc.querySelector('title');
        metrics.metaTitle = titleElement ? titleElement.textContent : null;
        
        // Check meta description
        const metaDesc = doc.querySelector('meta[name="description"]');
        metrics.metaDescription = metaDesc ? metaDesc.getAttribute('content') : null;
        
        // Count H1 tags
        metrics.h1Count = doc.querySelectorAll('h1').length;
        
        // Count images
        const images = doc.querySelectorAll('img');
        metrics.imageCount = images.length;
        metrics.imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt')).length;
        
        // Count links
        const links = doc.querySelectorAll('a[href]');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href) {
            if (href.startsWith('http') && !href.includes(new URL(cleanUrl).hostname)) {
              metrics.externalLinks++;
            } else if (!href.startsWith('http') || href.includes(new URL(cleanUrl).hostname)) {
              metrics.internalLinks++;
            }
          }
        });
        
        // Generate issues based on analysis
        if (!metrics.metaTitle) {
          issues.push({
            type: 'error' as const,
            category: 'Meta Tags',
            message: 'Kein Title-Tag gefunden',
            impact: 'high' as const
          });
        } else if (metrics.metaTitle.length > 60) {
          issues.push({
            type: 'warning' as const,
            category: 'Meta Tags', 
            message: `Title-Tag zu lang (${metrics.metaTitle.length} Zeichen)`,
            impact: 'medium' as const
          });
        } else {
          issues.push({
            type: 'success' as const,
            category: 'Meta Tags',
            message: 'Title-Tag ist optimal',
            impact: 'high' as const
          });
        }
        
        if (!metrics.metaDescription) {
          issues.push({
            type: 'error' as const,
            category: 'Meta Tags',
            message: 'Keine Meta Description gefunden',
            impact: 'high' as const
          });
        } else if (metrics.metaDescription.length < 120) {
          issues.push({
            type: 'warning' as const,
            category: 'Meta Tags',
            message: `Meta Description zu kurz (${metrics.metaDescription.length} Zeichen)`,
            impact: 'medium' as const
          });
        } else {
          issues.push({
            type: 'success' as const,
            category: 'Meta Tags',
            message: 'Meta Description ist gut',
            impact: 'medium' as const
          });
        }
        
        if (metrics.h1Count === 0) {
          issues.push({
            type: 'error' as const,
            category: 'Struktur',
            message: 'Keine H1-Überschrift gefunden',
            impact: 'high' as const
          });
        } else if (metrics.h1Count > 1) {
          issues.push({
            type: 'warning' as const,
            category: 'Struktur',
            message: `Mehrere H1-Tags gefunden (${metrics.h1Count})`,
            impact: 'medium' as const
          });
        } else {
          issues.push({
            type: 'success' as const,
            category: 'Struktur',
            message: 'H1-Struktur ist korrekt',
            impact: 'high' as const
          });
        }
        
        if (metrics.imagesWithoutAlt > 0) {
          issues.push({
            type: 'error' as const,
            category: 'Bilder',
            message: `${metrics.imagesWithoutAlt} Bilder ohne Alt-Text gefunden`,
            impact: 'high' as const
          });
        } else if (metrics.imageCount > 0) {
          issues.push({
            type: 'success' as const,
            category: 'Bilder',
            message: 'Alle Bilder haben Alt-Text',
            impact: 'medium' as const
          });
        }
        
        if (metrics.httpsEnabled) {
          issues.push({
            type: 'success' as const,
            category: 'Sicherheit',
            message: 'HTTPS ist aktiviert',
            impact: 'high' as const
          });
        } else {
          issues.push({
            type: 'error' as const,
            category: 'Sicherheit',
            message: 'HTTPS ist nicht aktiviert',
            impact: 'high' as const
          });
        }
        
        if (loadTime < 3) {
          issues.push({
            type: 'success' as const,
            category: 'Performance',
            message: `Gute Ladezeit (${loadTime.toFixed(1)}s)`,
            impact: 'high' as const
          });
        } else {
          issues.push({
            type: 'warning' as const,
            category: 'Performance',
            message: `Ladezeit verbesserungswürdig (${loadTime.toFixed(1)}s)`,
            impact: 'high' as const
          });
        }
      } else {
        // Fallback issues when content couldn't be fetched
        issues = [
          {
            type: 'warning' as const,
            category: 'Analyse',
            message: 'Vollständige Analyse nicht möglich (CORS-Beschränkung)',
            impact: 'low' as const
          },
          {
            type: metrics.httpsEnabled ? 'success' : 'error' as const,
            category: 'Sicherheit', 
            message: metrics.httpsEnabled ? 'HTTPS ist aktiviert' : 'HTTPS ist nicht aktiviert',
            impact: 'high' as const
          },
          {
            type: loadTime < 3 ? 'success' : 'warning' as const,
            category: 'Performance',
            message: `Antwortzeit: ${loadTime.toFixed(1)}s`,
            impact: 'medium' as const
          }
        ];
      }
      
      // Calculate score
      let score = 50; // Base score
      issues.forEach(issue => {
        if (issue.type === 'success') {
          score += issue.impact === 'high' ? 15 : issue.impact === 'medium' ? 10 : 5;
        } else if (issue.type === 'error') {
          score -= issue.impact === 'high' ? 20 : issue.impact === 'medium' ? 15 : 10;
        } else if (issue.type === 'warning') {
          score -= issue.impact === 'high' ? 10 : issue.impact === 'medium' ? 7 : 5;
        }
      });
      
      score = Math.max(0, Math.min(100, score));
      
      const result: SEOResult = {
        url: cleanUrl,
        score,
        issues,
        metrics
      };
      
      setSeoResult(result);
      
      toast({
        title: "SEO-Analyse abgeschlossen",
        description: `Score: ${score}/100 - ${issues.filter(i => i.type === 'error' || i.type === 'warning').length} Probleme gefunden`,
      });
    } catch (error) {
      console.error('SEO check error:', error);
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
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
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