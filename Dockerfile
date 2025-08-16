# Stage 1: Build the application
FROM openjdk:21-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle build files to the container
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy the source code
COPY src src

# Make the Gradle wrapper executable
RUN chmod +x ./gradlew

# Build the project and create the JAR file
RUN ./gradlew bootJar

# Stage 2: Create the final, lightweight image
FROM openjdk:21-jre-slim

# Set the working directory
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/build/libs/crm-demo-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]