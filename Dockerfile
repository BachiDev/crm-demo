# Stage 1: Build the application (layer-cached: deps first, sources last)
FROM gradle:8.5-jdk21 AS build
WORKDIR /app

COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .

# Resolve dependencies in a cached layer; re-runs only when build files change.
RUN ./gradlew dependencies --no-daemon || true

COPY src ./src

# Unit tests run in CI (./gradlew check). bootJar itself never runs tests,
# so no -x flag is needed here (the old `-x test` was cargo-cult).
RUN ./gradlew bootJar --no-daemon

# ---

# Stage 2: Minimal runtime
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

RUN useradd --create-home --shell /bin/false appuser \
    && apt-get update && apt-get install -y --no-install-recommends wget \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/build/libs/*.jar app.jar
RUN chown appuser:appuser app.jar
USER appuser

EXPOSE 8080

# Render injects $PORT; default 8080 keeps local `docker run` working.
# SerialGC + MaxRAMPercentage fit the 512 MB Render Free instance.
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-8080}/actuator/health/liveness || exit 1

ENTRYPOINT ["sh", "-c", "java -XX:+UseSerialGC -XX:MaxRAMPercentage=75.0 -Dserver.port=${PORT:-8080} -jar app.jar"]
