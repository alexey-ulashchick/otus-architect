# OTUS: High Load Architecture class.
Project page: <a href="http://otus.alexey.technology" target="_blank">http://otus.alexey.technology</a>

## HomeWork #3.
- Replication schema is MASTER / 2 SLAVES
- Metrics collection: cAdviser + Prometheus + Grafana
- Requests redirected to slaves: auth + search query
- Latency / througthput didn't change a lot since same single phisical VPS instance is used
- Metrics before redirecting reads:
![explain](https://raw.githubusercontent.com/alexey-ulashchick/otus-architect/master/doc/master-only.png)
- Metrics after redirecting reads:
![explain](https://raw.githubusercontent.com/alexey-ulashchick/otus-architect/master/doc/read-from-slaves.png)

## HomeWork #2.
- Data genarated and injectd with NodeJS scripts. Folder /data contains all realted logic and appropriate dataset.
- Query for the search functionallity (email is PK):
```sql
  (select email, firstName, lastName, city from pages where firstName like ? limit 1000)
     union
  (select email, firstName, lastName, city from pages where lastName like ? limit 1000)
     limit 1000;
```
- Sorting by id (email) is implemented at application level
- Indexes for search optimization:
```sql
create index pages_firstName_email_lastName_city_index
  on pages (firstName, email, lastName, city);
```
```sql
create index pages_lastName_email_firstName_city_index
  on pages (lastName, email, firstName, city);
```
- Explain after applying indexes:
![explain](https://raw.githubusercontent.com/alexey-ulashchick/otus-architect/master/doc/explain.png)

- Latency, Throgthput charts:
![performance-charts](https://raw.githubusercontent.com/alexey-ulashchick/otus-architect/master/doc/performance-charts.png)

## HomeWork #1.
### Techonology stack
- Backend: Java Spring stack: Spring Boot/Spring MVC/Spring Security
- Frontend: SPA via React & Grommet
- Database: MySQL

### Keynotes
- Authorization through JWT Tokens
- Deployment via docker images and docker-compose. Nginx for handling incoming requests.
- Database initialization in db_init.sql
- Database schema:
![Database Schema](https://raw.githubusercontent.com/alexey-ulashchick/otus-architect/master/doc/data-diagram.png)

### Functional/Features realization:
- Registration is available through SignUp button via email & password
- Login is using email & password from default page
- User is able to create/edit personal page
- User is able to see list of created personal pages by other users
- User is able to see detail about other user by choosing his/her personal page in the list

### Screenshots
Login:
![login](https://raw.githubusercontent.com/alexey-ulashchick/otus-architect/master/doc/login.png)

Home:
![home](https://raw.githubusercontent.com/alexey-ulashchick/otus-architect/master/doc/home-page.png)

Creating Page:
![page-edit](https://raw.githubusercontent.com/alexey-ulashchick/otus-architect/master/doc/page-edit.png)



