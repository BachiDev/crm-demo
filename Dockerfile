# Verwende ein offizielles Java Runtime als Basis-Image
# Da du Java 21 nutzt, ist dies eine gute Wahl
FROM openjdk:21-slim

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die gebaute .jar-Datei in den Container
# Dein Bootify-Projekt baut die .jar-Datei normalerweise in build/libs/
# Passe den Namen der .jar-Datei an dein Projekt an
COPY build/libs/crm-demo-0.0.1-SNAPSHOT.jar app.jar

# Exponiere den Port, auf dem die Spring Boot App läuft (Standard ist 8080)
EXPOSE 8080

# Der Befehl zum Starten der Anwendung, wenn der Container startet
ENTRYPOINT ["java", "-jar", "app.jar"]