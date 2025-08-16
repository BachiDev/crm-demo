# Stage 1: Build the application
FROM openjdk:21-slim AS build
WORKDIR /app
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY frontend frontend
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

# Stage 2: Create the final image
FROM openjdk:21-slim
WORKDIR /app
COPY --from=build /app/build/libs/crm-demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]