import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AGB = () => {
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
                Allgemeine Geschäftsbedingungen (AGB)
              </h1>

              <div className="space-y-8">
                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 1 Geltungsbereich
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen Nova WebDesign (nachfolgend "Auftragnehmer") und dem Auftraggeber über die Erbringung von Webdesign-, Webentwicklungs- und verwandten Dienstleistungen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 2 Vertragsgegenstand
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Gegenstand des Vertrages ist die Erbringung von Webdesign- und Webentwicklungsleistungen nach Maßgabe der im Einzelfall getroffenen Vereinbarungen. Die konkreten Leistungen werden in einem separaten Angebot oder Vertrag spezifiziert.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Der Auftragnehmer schuldet die vereinbarten Leistungen als Werkleistung, sofern nicht ausdrücklich etwas anderes vereinbart wurde.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 3 Mitwirkungspflichten des Auftraggebers
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Auftraggeber verpflichtet sich, dem Auftragnehmer alle für die Ausführung des Auftrags erforderlichen Unterlagen, Informationen und Zugangsdaten rechtzeitig zur Verfügung zu stellen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Verzögerungen, die durch unvollständige oder verspätete Mitwirkung des Auftraggebers entstehen, gehen nicht zu Lasten des Auftragnehmers. Dadurch entstehende Mehraufwendungen werden gesondert vergütet.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 4 Vergütung und Zahlungsbedingungen
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die Vergütung richtet sich nach der im Einzelfall getroffenen Vereinbarung. Alle Preise verstehen sich als Nettopreise zuzüglich der gesetzlichen Umsatzsteuer.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug werden Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz berechnet.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Bei umfangreicheren Projekten können Abschlagszahlungen vereinbart werden.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 5 Termine und Fristen
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Termine und Fristen sind nur dann verbindlich, wenn sie ausdrücklich als verbindlich vereinbart wurden. Die Einhaltung von Terminen und Fristen setzt die rechtzeitige Mitwirkung des Auftraggebers voraus.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Bei Verzögerungen durch höhere Gewalt, Arbeitskampf oder andere unvorhersehbare Ereignisse verlängern sich die Fristen entsprechend.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 6 Urheberrechte und Nutzungsrechte
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Auftragnehmer räumt dem Auftraggeber nach vollständiger Bezahlung der Vergütung die einfachen Nutzungsrechte an den erstellten Werken ein, soweit diese urheberrechtlich geschützt sind.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Auftragnehmer behält sich das Recht vor, die erstellten Arbeiten zu Referenzzwecken zu verwenden und zu veröffentlichen.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 7 Gewährleistung
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Auftragnehmer gewährleistet, dass die erbrachten Leistungen zum Zeitpunkt der Abnahme frei von Sach- und Rechtsmängeln sind. Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Bei berechtigten Mängelrügen wird der Auftragnehmer nach seiner Wahl nachbessern oder die Leistung neu erbringen. Schlägt die Nacherfüllung fehl, kann der Auftraggeber Minderung verlangen oder vom Vertrag zurücktreten.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 8 Haftung
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für Schäden, die auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung beruhen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Im Übrigen ist die Haftung auf den typischen, vorhersehbaren Schaden begrenzt. Die Haftung für mittelbare Schäden und entgangenen Gewinn ist ausgeschlossen.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 9 Vertraulichkeit
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Beide Vertragsparteien verpflichten sich, über alle im Rahmen der Geschäftsbeziehung bekannt gewordenen vertraulichen Informationen Stillschweigen zu bewahren.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    § 10 Schlussbestimmungen
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist Wiesbaden, sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Sollten einzelne Bestimmungen dieser AGB unwirksam sein, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.
                  </p>
                </section>

                <section>
                  <p className="text-sm text-muted-foreground">
                    Stand: Januar 2024<br />
                    Nova WebDesign, Wiesbaden
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

export default AGB;