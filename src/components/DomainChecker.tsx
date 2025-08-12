import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Globe, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Server,
  Shield,
  Search,
  Loader2
} from "lucide-react";

interface DomainInfo {
  domain: string;
  available: boolean;
  registrar?: string;
  createdDate?: string;
  expiryDate?: string;
  nameservers?: string[];
  status?: string[];
}

const DomainChecker = () => {
  const [domain, setDomain] = useState("");
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkDomain = async () => {
    if (!domain.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie eine Domain ein",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '');
    
    try {
      // Real domain check using WHOIS API
      const response = await fetch(`https://api.whoisjson.com/v1/${cleanDomain}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Domain check failed');
      }
      
      const whoisData = await response.json();
      
      const domainInfo: DomainInfo = {
        domain: cleanDomain,
        available: !whoisData.registered,
        registrar: whoisData.registered ? whoisData.registrar : undefined,
        createdDate: whoisData.registered ? whoisData.created_date?.split('T')[0] : undefined,
        expiryDate: whoisData.registered ? whoisData.expiry_date?.split('T')[0] : undefined,
        nameservers: whoisData.registered ? whoisData.nameservers : undefined,
        status: whoisData.registered ? whoisData.status : undefined
      };
      
      setDomainInfo(domainInfo);
      
      toast({
        title: "Domain geprüft",
        description: `${cleanDomain} wurde erfolgreich analysiert`,
      });
    } catch (error) {
      console.error('Domain check error:', error);
      
      // Fallback to DNS check
      try {
        const response = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=A`);
        const dnsData = await response.json();
        
        const hasRecords = dnsData.Answer && dnsData.Answer.length > 0;
        
        const fallbackInfo: DomainInfo = {
          domain: cleanDomain,
          available: !hasRecords,
          registrar: hasRecords ? "Unbekannt (DNS aktiv)" : undefined,
        };
        
        setDomainInfo(fallbackInfo);
        
        toast({
          title: "Domain geprüft",
          description: `${cleanDomain} wurde analysiert (DNS-Check)`,
        });
      } catch (fallbackError) {
        toast({
          title: "Fehler",
          description: "Domain konnte nicht geprüft werden. Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkDomain();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading text-foreground">
            Domain-Checker
          </CardTitle>
          <p className="text-muted-foreground">
            Prüfen Sie die Verfügbarkeit und Details einer Domain
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="beispiel.de"
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Prüfen...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Prüfen
                </>
              )}
            </Button>
          </form>

          {domainInfo && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-subtle">
                {domainInfo.available ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <h3 className="font-semibold text-lg">
                    {domainInfo.domain}
                  </h3>
                  <p className="text-muted-foreground">
                    {domainInfo.available ? "Domain ist verfügbar!" : "Domain ist bereits registriert"}
                  </p>
                </div>
                <Badge 
                  variant={domainInfo.available ? "default" : "secondary"}
                  className="ml-auto"
                >
                  {domainInfo.available ? "Verfügbar" : "Registriert"}
                </Badge>
              </div>

              {!domainInfo.available && (
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Server className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Domain-Details</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        {domainInfo.registrar && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Registrar:</span>
                            <span>{domainInfo.registrar}</span>
                          </div>
                        )}
                        {domainInfo.createdDate && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Erstellt:</span>
                            <span>{domainInfo.createdDate}</span>
                          </div>
                        )}
                        {domainInfo.expiryDate && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Läuft ab:</span>
                            <span>{domainInfo.expiryDate}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Nameserver</h4>
                      </div>
                      <div className="space-y-1">
                        {domainInfo.nameservers?.map((ns, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            {ns}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {domainInfo.available && (
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-green-800 mb-2">
                    Domain verfügbar!
                  </h4>
                  <p className="text-green-700 mb-4">
                    Diese Domain kann registriert werden. Möchten Sie eine Website dafür erstellen lassen?
                  </p>
                  <Button 
                    variant="nova"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Jetzt Website anfragen
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainChecker;