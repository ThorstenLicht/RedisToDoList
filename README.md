# RedisToDoList

Installation Guide:

Phase 1: Redis Container:

1. Get the code from the repostiory and go to the folder RedisToDoList in the Terminal
2. start Docker
3. "docker-compose -f redis-docker-compose.yml up -d" - in cmd in the repository folder with the .yml file
4. "localhost:8001" - in Browser
5. accept privacy settings
6. "I already have a database"
7. "Connect to a Redis Database"
8. Host: redis, Port: 6379, Name: redis-local, others: empty
9. Add Redis Database

Phase 2: Backend and Frontend

1. go in a terminal to the folder RedisToDoList
2. Frontend:
   a. cd .\frontend\
   b. npm i
   c. npm start

3. Backend:
   a. cd .\backend\
   b. npm i
   c. npm start

redis collections:
http: https://orange-capsule-481991.postman.co/workspace/Redis~2307c415-17ab-46a9-8da2-29d9356b4270/collection/33275456-4ae7e10e-7faa-4163-8412-285dd5b272cc?action=share&creator=33275456
ws: https://orange-capsule-481991.postman.co/workspace/Redis~2307c415-17ab-46a9-8da2-29d9356b4270/collection/65e304eb5f2e5c765c5517fc?action=share&creator=33275456
