# Quiz Website 

## Eine responsive Quiz Website für das Modul Internettechnologien

Verwendete Technologien: 
https://www.chartjs.org/docs/latest/developers/api.html | https://github.com/KaTeX/KaTeX | https://github.com/swsms/web-quiz-engine

Link zu Website: 
https://www.informatik.htw-dresden.de/~s82095/


### Beschreibung:

Wenn man die Website über den oben genannten Link öffnet kommt man zu der Startseite (index.html). Auf dieser hat man die Auswahl zwischen den verschiedenen Quizen. Zur Auswahl stehen die Standard (offline) Kategorien Mathe, Internettechnologien und Allgemeinwissen. Bei diesen Quizen werden die Fragen über die .JSON Datein geladen und die Fragen des Mathe Quizes werden durch KaTeX erweitert. Es gibt aber auch eine weitere extra Kategorie namens Online. Dieses Quiz lässt sich erreichen über die Navbar auf der Startseite, über die Navbar in einem anderen Quiz oder über die Startseite (bei den Kategorie Karten). Bei diesem werden die Fragen über einen externen Server mittels REST geladen und per Ajax request werden die Aufgaben geholt und das Ergebnis überprüft. Ein Quiz lässt sich über einen Klick auf den Start-Button starten. Danach werden die Fragen in einer zufälligen Reihenfolge geladen und die Antworten werden auch zufällig angeordnet. Wenn man eine Antwort anklickt, dann wird diese Antwort gewertet und man kann keine weitere Antwort abgeben (z.B. durch erneuten Klick). Erst wenn man über den Next-Button die nächste Frage läd kann man wieder eine Antwort abgeben. Es gibt immer 10 Fragen und bei jeder Antwort wird das Diagramm aktualisiert. Wenn man die letzte Frage beantwortet hat, dann gibt es keinen Next-Button mehr, sondern nur noch einen Restart-Button und man kann sich im Diagramm die Statistik anschauen, wie viele Fragen man falsch oder richtig hatte, in dem man über den roten oder den grünen Balken mit dem Mauszeiger hovert. Natürlich kann man das auch schon eher machen, da das Diagramm nach jeder Antwort aktualisiert wird, damit man auch seinen Fortschritt sehen kann.
Die Website ist außerdem responsive (lässt sich auf dem Smartphone, Tablet und Handy ausführen ohne Probleme) und lässt dich als Web-App herunter laden (durch PWA).


