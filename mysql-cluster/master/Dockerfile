# Derived from official mysql image (our base image)
FROM mysql:5.7.15

ENV MYSQL_DATABASE=otus_dev
ENV MYSQL_ROOT_PASSWORD=dockerinternal

# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./*.sql /docker-entrypoint-initdb.d/