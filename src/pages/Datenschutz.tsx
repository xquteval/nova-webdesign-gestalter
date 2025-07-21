import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Datenschutz = () => {
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
                Datenschutzerklärung
              </h1>

              <div className="space-y-8">
                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    1. Datenschutz auf einen Blick
                  </h2>
                  
                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Allgemeine Hinweise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                  </p>

                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Datenerfassung auf unserer Website
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    <strong>Wie erfassen wir Ihre Daten?</strong><br />
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    2. Allgemeine Hinweise und Pflichtinformationen
                  </h2>
                  
                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Datenschutz
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                  </p>

                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Hinweis zur verantwortlichen Stelle
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                  </p>
                  <div className="text-muted-foreground mb-4">
                    <p>Nova WebDesign</p>
                    <p>Max Mustermann</p>
                    <p>Wilhelmstraße 123</p>
                    <p>65183 Wiesbaden</p>
                    <p>Telefon: +49 611 123 456</p>
                    <p>E-Mail: hallo@nova-webdesign.de</p>
                  </div>

                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Widerruf Ihrer Einwilligung zur Datenverarbeitung
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    3. Datenerfassung auf unserer Website
                  </h2>
                  
                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Cookies
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
                  </p>

                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Server-Log-Dateien
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>

                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Kontaktformular
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    4. Soziale Medien
                  </h2>
                  
                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Instagram Plugin
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Auf unseren Seiten sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA 94025, USA integriert.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                    5. Ihre Rechte
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
                  </p>
                </section>

                <section>
                  <p className="text-sm text-muted-foreground">
                    Stand der Datenschutzerklärung: Januar 2024
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

export default Datenschutz;