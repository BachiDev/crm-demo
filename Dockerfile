# Stage 1: Build the application
FROM gradle:8.5-jdk21 AS build

# Set the working directory
WORKDIR /app

# Copy the Gradle wrapper files and the build files
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .
COPY src ./src

# Build the application using the bootJar task and explicitly skip tests.
RUN ./gradlew bootJar -x test

# ---

# Stage 2: Create the final, lightweight image
# Wechsel zu Eclipse Temurin, da das alte openjdk-Image nicht mehr existiert.
FROM eclipse-temurin:21-jre-jammy

# Set the working directory for the final image
WORKDIR /app

# Copy the JAR from the 'build' stage.
# Hinweis: Falls dein Jar-Name in build/libs/ anders lautet (z.B. crm-0.0.1-SNAPSHOT.jar), 
# stelle sicher, dass der Pfad stimmt.
COPY --from=build /app/build/libs/*.jar app.jar

# Expose the port
EXPOSE 8080

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]