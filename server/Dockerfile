FROM maven:3.9-eclipse-temurin-23-alpine as MAVEN_BUILD
COPY pom.xml /build/
COPY mvnw /build/
# COPY .mvn /build/.mvn
COPY src /build/src/
WORKDIR /build/
RUN mvn clean install -Dmaven.test.skip=true -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=WARN -B --no-transfer-progress -e && mvn package  -Dmaven.test.skip=true -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=WARN -B --no-transfer-progress -e

FROM openjdk:23
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/taskerapi-0.0.1-SNAPSHOT.jar /app/api.jar
EXPOSE 5000
ENTRYPOINT [  "java",                                     \
              "-Dfile.encoding=UTF-8",                    \
              "-Djava.security.egd=file:/dev/./urandom",  \
              "-jar",                                     \
              "/app/api.jar"                        \
           ]