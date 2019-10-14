# Starting from maven image to build JAR
FROM maven as maven
WORKDIR /usr/src/app

# Copy pom.xml and installing dependencies. Doing this separatly helps with further caching.
COPY pom.xml .
RUN mvn -B -e -C -T 1C org.apache.maven.plugins:maven-dependency-plugin:3.0.2:go-offline

# Copying source files and builing
COPY . .
RUN mvn package spring-boot:repackage

# Creating application image and using JAR file from MAVEN image
FROM openjdk
COPY --from=maven /usr/src/app/target/*.jar ./
CMD ["/usr/bin/java", "-jar", "-Dspring.profiles.active=default", "/alexey-api-1.0-SNAPSHOT.jar"]
