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
      const startTime = Date.now();
      
      let issues = [];
      let htmlContent = '';
      let fetchSuccessful = false;
      
      // Try multiple approaches to fetch content
      try {
        // Primary API - AllOrigins
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`);
        const data = await response.json();
        if (data.contents) {
          htmlContent = data.contents;
          fetchSuccessful = true;
        }
      } catch (error) {
        try {
          // Backup API - cors-anywhere alternative
          const proxyResponse = await fetch(`https://thingproxy.freeboard.io/fetch/${cleanUrl}`);
          if (proxyResponse.ok) {
            htmlContent = await proxyResponse.text();
            fetchSuccessful = true;
          }
        } catch (backupError) {
          console.log('All CORS proxies failed, performing basic analysis');
        }
      }
      
      const loadTime = (Date.now() - startTime) / 1000;
      
      let metrics = {
        loadTime,
        mobileResponsive: true, // Assume responsive unless proven otherwise
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
        // Parse HTML content for detailed analysis
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Extract and analyze meta title
        const titleElement = doc.querySelector('title');
        metrics.metaTitle = titleElement ? titleElement.textContent?.trim() || null : null;
        
        // Extract meta description
        const metaDesc = doc.querySelector('meta[name="description"], meta[property="og:description"]');
        metrics.metaDescription = metaDesc ? metaDesc.getAttribute('content')?.trim() || null : null;
        
        // Count H1 tags
        const h1Elements = doc.querySelectorAll('h1');
        metrics.h1Count = h1Elements.length;
        
        // Analyze images
        const images = doc.querySelectorAll('img');
        metrics.imageCount = images.length;
        metrics.imagesWithoutAlt = Array.from(images).filter(img => 
          !img.getAttribute('alt') || img.getAttribute('alt')?.trim() === ''
        ).length;
        
        // Analyze links
        const links = doc.querySelectorAll('a[href]');
        const urlHostname = new URL(cleanUrl).hostname;
        
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href) {
            try {
              if (href.startsWith('http')) {
                const linkUrl = new URL(href);
                if (linkUrl.hostname === urlHostname) {
                  metrics.internalLinks++;
                } else {
                  metrics.externalLinks++;
                }
              } else if (href.startsWith('/') || !href.includes('://')) {
                metrics.internalLinks++;
              }
            } catch (e) {
              // Invalid URL, skip
            }
          }
        });

        // Check for mobile viewport meta tag
        const viewportMeta = doc.querySelector('meta[name="viewport"]');
        metrics.mobileResponsive = !!viewportMeta;
        
        // Advanced SEO checks
        const structuredData = doc.querySelectorAll('script[type="application/ld+json"]');
        const openGraph = doc.querySelectorAll('meta[property^="og:"]');
        const twitterCard = doc.querySelectorAll('meta[name^="twitter:"]');
        const canonicalLink = doc.querySelector('link[rel="canonical"]');
        
        // Title Tag Analysis
        if (!metrics.metaTitle) {
          issues.push({
            type: 'error' as const,
            category: 'SEO Grundlagen',
            message: 'Kein Title-Tag gefunden - kritisch für SEO!',
            impact: 'high' as const
          });
        } else {
          const titleLength = metrics.metaTitle.length;
          if (titleLength < 30) {
            issues.push({
              type: 'warning' as const,
              category: 'Title-Tag',
              message: `Title zu kurz (${titleLength} Zeichen) - optimal sind 50-60`,
              impact: 'medium' as const
            });
          } else if (titleLength > 60) {
            issues.push({
              type: 'warning' as const,
              category: 'Title-Tag',
              message: `Title zu lang (${titleLength} Zeichen) - wird abgeschnitten`,
              impact: 'medium' as const
            });
          } else {
            issues.push({
              type: 'success' as const,
              category: 'Title-Tag',
              message: `Title-Länge optimal (${titleLength} Zeichen)`,
              impact: 'high' as const
            });
          }
        }
        
        // Meta Description Analysis  
        if (!metrics.metaDescription) {
          issues.push({
            type: 'error' as const,
            category: 'SEO Grundlagen',
            message: 'Keine Meta Description gefunden',
            impact: 'high' as const
          });
        } else {
          const descLength = metrics.metaDescription.length;
          if (descLength < 120) {
            issues.push({
              type: 'warning' as const,
              category: 'Meta Description',
              message: `Beschreibung zu kurz (${descLength} Zeichen) - optimal sind 150-160`,
              impact: 'medium' as const
            });
          } else if (descLength > 160) {
            issues.push({
              type: 'warning' as const,
              category: 'Meta Description',
              message: `Beschreibung zu lang (${descLength} Zeichen) - wird abgeschnitten`,
              impact: 'medium' as const
            });
          } else {
            issues.push({
              type: 'success' as const,
              category: 'Meta Description',
              message: `Meta Description optimal (${descLength} Zeichen)`,
              impact: 'high' as const
            });
          }
        }
        
        // H1 Structure Analysis
        if (metrics.h1Count === 0) {
          issues.push({
            type: 'error' as const,
            category: 'Content-Struktur',
            message: 'Keine H1-Überschrift gefunden - wichtig für SEO',
            impact: 'high' as const
          });
        } else if (metrics.h1Count > 1) {
          issues.push({
            type: 'warning' as const,
            category: 'Content-Struktur',
            message: `${metrics.h1Count} H1-Tags gefunden - nur eine empfohlen`,
            impact: 'medium' as const
          });
        } else {
          issues.push({
            type: 'success' as const,
            category: 'Content-Struktur',
            message: 'H1-Struktur korrekt (genau eine H1)',
            impact: 'high' as const
          });
        }
        
        // Image SEO Analysis
        if (metrics.imagesWithoutAlt > 0) {
          issues.push({
            type: 'error' as const,
            category: 'Bilder-SEO',
            message: `${metrics.imagesWithoutAlt} von ${metrics.imageCount} Bildern ohne Alt-Text`,
            impact: 'high' as const
          });
        } else if (metrics.imageCount > 0) {
          issues.push({
            type: 'success' as const,
            category: 'Bilder-SEO',
            message: `Alle ${metrics.imageCount} Bilder haben Alt-Text`,
            impact: 'medium' as const
          });
        }
        
        // Mobile Optimization
        if (!metrics.mobileResponsive) {
          issues.push({
            type: 'error' as const,
            category: 'Mobile SEO',
            message: 'Keine Viewport Meta-Tag gefunden - nicht mobiloptimiert',
            impact: 'high' as const
          });
        } else {
          issues.push({
            type: 'success' as const,
            category: 'Mobile SEO',
            message: 'Viewport Meta-Tag vorhanden - mobiloptimiert',
            impact: 'high' as const
          });
        }
        
        // HTTPS Check
        if (metrics.httpsEnabled) {
          issues.push({
            type: 'success' as const,
            category: 'Technische SEO',
            message: 'HTTPS aktiviert - sicher und SEO-freundlich',
            impact: 'high' as const
          });
        } else {
          issues.push({
            type: 'error' as const,
            category: 'Technische SEO',
            message: 'HTTPS nicht aktiviert - Sicherheitsrisiko und SEO-Nachteil',
            impact: 'high' as const
          });
        }
        
        // Performance Analysis
        if (loadTime < 2) {
          issues.push({
            type: 'success' as const,
            category: 'Performance',
            message: `Ausgezeichnete Ladezeit (${loadTime.toFixed(1)}s)`,
            impact: 'high' as const
          });
        } else if (loadTime < 4) {
          issues.push({
            type: 'warning' as const,
            category: 'Performance',
            message: `Akzeptable Ladezeit (${loadTime.toFixed(1)}s) - unter 3s wäre besser`,
            impact: 'medium' as const
          });
        } else {
          issues.push({
            type: 'error' as const,
            category: 'Performance',
            message: `Langsame Ladezeit (${loadTime.toFixed(1)}s) - kritisch für SEO`,
            impact: 'high' as const
          });
        }
        
        // Advanced SEO Features
        if (structuredData.length > 0) {
          issues.push({
            type: 'success' as const,
            category: 'Erweiterte SEO',
            message: `${structuredData.length} strukturierte Daten gefunden (Schema.org)`,
            impact: 'medium' as const
          });
        } else {
          issues.push({
            type: 'warning' as const,
            category: 'Erweiterte SEO',
            message: 'Keine strukturierten Daten gefunden - verpasste Chance',
            impact: 'low' as const
          });
        }
        
        if (openGraph.length > 0) {
          issues.push({
            type: 'success' as const,
            category: 'Social Media SEO',
            message: `${openGraph.length} Open Graph Tags gefunden`,
            impact: 'medium' as const
          });
        } else {
          issues.push({
            type: 'warning' as const,
            category: 'Social Media SEO',
            message: 'Keine Open Graph Tags - schlecht für Social Media',
            impact: 'medium' as const
          });
        }
        
        if (!canonicalLink) {
          issues.push({
            type: 'warning' as const,
            category: 'Technische SEO',
            message: 'Kein Canonical-Link gefunden - Duplicate Content Risiko',
            impact: 'medium' as const
          });
        }
        
      } else {
        // Fallback for when content couldn't be fetched
        issues = [
          {
            type: 'warning' as const,
            category: 'Analyse-Limitation',
            message: 'Vollständige Analyse nicht möglich (CORS-Beschränkung)',
            impact: 'low' as const
          },
          {
            type: metrics.httpsEnabled ? 'success' : 'error' as const,
            category: 'Basis-Check',
            message: metrics.httpsEnabled ? 'HTTPS aktiviert' : 'HTTPS nicht aktiviert',
            impact: 'high' as const
          },
          {
            type: loadTime < 3 ? 'success' : 'warning' as const,
            category: 'Performance',
            message: `Server-Antwortzeit: ${loadTime.toFixed(1)}s`,
            impact: 'medium' as const
          }
        ];
      }
      
      // Calculate comprehensive SEO score
      let score = 50; // Base score
      
      issues.forEach(issue => {
        const multiplier = issue.impact === 'high' ? 1.5 : issue.impact === 'medium' ? 1 : 0.5;
        
        if (issue.type === 'success') {
          score += (issue.impact === 'high' ? 12 : issue.impact === 'medium' ? 8 : 4) * multiplier;
        } else if (issue.type === 'error') {
          score -= (issue.impact === 'high' ? 15 : issue.impact === 'medium' ? 10 : 6) * multiplier;
        } else if (issue.type === 'warning') {
          score -= (issue.impact === 'high' ? 8 : issue.impact === 'medium' ? 5 : 3) * multiplier;
        }
      });
      
      // Ensure score is between 0 and 100
      score = Math.max(0, Math.min(100, Math.round(score)));
      
      const result: SEOResult = {
        url: cleanUrl,
        score,
        issues,
        metrics
      };
      
      setSeoResult(result);
      
      const errorCount = issues.filter(i => i.type === 'error').length;
      const warningCount = issues.filter(i => i.type === 'warning').length;
      
      toast({
        title: "SEO-Analyse erfolgreich abgeschlossen",
        description: `Score: ${score}/100 - ${errorCount} Fehler, ${warningCount} Warnungen gefunden`,
      });
      
    } catch (error) {
      console.error('SEO analysis error:', error);
      toast({
        title: "Analyse-Fehler",
        description: "Website konnte nicht vollständig analysiert werden. Überprüfen Sie die URL.",
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