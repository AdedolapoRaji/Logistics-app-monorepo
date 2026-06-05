# Stage 1: Build the application (keeps your caching dependency optimization)
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Updated to the live, secure Eclipse Temurin runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENV PORT=5001
EXPOSE 5001
CMD ["java", "-jar", "app.jar"]
