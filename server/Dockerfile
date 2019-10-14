FROM maven as maven
WORKDIR /usr/src/app
COPY pom.xml .
RUN mvn -B -e -C -T 1C org.apache.maven.plugins:maven-dependency-plugin:3.0.2:go-offline
COPY . .
# RUN mvn -B -e -o -T 1C verify
RUN mvn package spring-boot:repackage

# package without maven
FROM openjdk
COPY --from=maven /usr/src/app/target/*.jar ./
CMD ["/usr/bin/java", "-jar", "-Dspring.profiles.active=default", "/alexey-api-1.0-SNAPSHOT.jar"]