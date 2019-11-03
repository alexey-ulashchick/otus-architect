#!/bin/bash


wrk -d30s -t1 -c1 --latency -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTcyNDA3OTI3LCJpYXQiOjE1NzIzMjE1Mjd9.GWncZfa1w3oEFj11qB4JbePWhhQrol9FdKD1_dXZJUgQf06LZVQGHrWeq5y2sr3tueLvu1pAwKkbRcD4SHUpAQ" http://otus.alexey.technology/api/pages?query=t
wrk -d30s -t5 -c5 --latency -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTcyNDA3OTI3LCJpYXQiOjE1NzIzMjE1Mjd9.GWncZfa1w3oEFj11qB4JbePWhhQrol9FdKD1_dXZJUgQf06LZVQGHrWeq5y2sr3tueLvu1pAwKkbRcD4SHUpAQ" http://otus.alexey.technology/api/pages?query=t
wrk -d30s -t10 -c10 --latency -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTcyNDA3OTI3LCJpYXQiOjE1NzIzMjE1Mjd9.GWncZfa1w3oEFj11qB4JbePWhhQrol9FdKD1_dXZJUgQf06LZVQGHrWeq5y2sr3tueLvu1pAwKkbRcD4SHUpAQ" http://otus.alexey.technology/api/pages?query=t
wrk -d30s -t10 -c50 --latency -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTcyNDA3OTI3LCJpYXQiOjE1NzIzMjE1Mjd9.GWncZfa1w3oEFj11qB4JbePWhhQrol9FdKD1_dXZJUgQf06LZVQGHrWeq5y2sr3tueLvu1pAwKkbRcD4SHUpAQ" http://otus.alexey.technology/api/pages?query=t
wrk -d30s -t10 -c100 --latency -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTcyNDA3OTI3LCJpYXQiOjE1NzIzMjE1Mjd9.GWncZfa1w3oEFj11qB4JbePWhhQrol9FdKD1_dXZJUgQf06LZVQGHrWeq5y2sr3tueLvu1pAwKkbRcD4SHUpAQ" http://otus.alexey.technology/api/pages?query=t
wrk -d30s -t10 -c500 --latency -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTcyNDA3OTI3LCJpYXQiOjE1NzIzMjE1Mjd9.GWncZfa1w3oEFj11qB4JbePWhhQrol9FdKD1_dXZJUgQf06LZVQGHrWeq5y2sr3tueLvu1pAwKkbRcD4SHUpAQ" http://otus.alexey.technology/api/pages?query=t
wrk -d30s -t10 -c1000 --latency -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTcyNDA3OTI3LCJpYXQiOjE1NzIzMjE1Mjd9.GWncZfa1w3oEFj11qB4JbePWhhQrol9FdKD1_dXZJUgQf06LZVQGHrWeq5y2sr3tueLvu1pAwKkbRcD4SHUpAQ" http://otus.alexey.technology/api/pages?query=t

