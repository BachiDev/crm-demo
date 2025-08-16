# Stage 1: Build the application
# Use a base image with both Gradle and the correct JDK version.
# The 'gradle' image includes all the tools needed to build your project.
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
# This saves time and ensures the build is focused on creating the JAR.
RUN ./gradlew bootJar -x test

# ---

# Stage 2: Create the final, lightweight image
# Use a lean OpenJDK image for the final, production-ready container.
FROM openjdk:21-slim

# Set the working directory for the final image
WORKDIR /app

# Copy the JAR from the 'build' stage using a wildcard.
# This is a critical change. It prevents the Dockerfile from breaking if the project
# version number or name changes.
COPY --from=build /app/build/libs/app.jar .

# Expose the port
EXPOSE 8080

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]