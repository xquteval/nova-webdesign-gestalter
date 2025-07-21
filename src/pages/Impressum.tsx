import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Impressum = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </Button>

          <Card>
            <CardContent className="p-12">
              <h1 className="font-heading font-bold text-4xl text-foreground mb-8">
                Impressum
              </h1>

              <div className="space-y-8">
                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Angaben gemäß § 5 TMG
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground">Nova WebDesign</p>
                      <p>Max Mustermann</p>
                      <p>Wilhelmstraße 123</p>
                      <p>65183 Wiesbaden</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Kontakt
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-accent-nova" />
                      <span className="text-muted-foreground">+49 611 123 456</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-accent-nova" />
                      <span className="text-muted-foreground">hallo@nova-webdesign.de</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-accent-nova" />
                      <span className="text-muted-foreground">Wilhelmstraße 123, 65183 Wiesbaden</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Umsatzsteuer-ID
                  </h2>
                  <p className="text-muted-foreground">
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    DE123456789
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Wirtschafts-ID
                  </h2>
                  <p className="text-muted-foreground">
                    Wirtschaftsidentifikationsnummer: 1234567890123
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  <div className="text-muted-foreground">
                    <p>Max Mustermann</p>
                    <p>Wilhelmstraße 123</p>
                    <p>65183 Wiesbaden</p>
                  </div>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Haftung für Inhalte
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Haftung für Links
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    Urheberrecht
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Impressum;