docker-dev: 

docker-prod:

docker-build:
	docker compose -f docker-compose.yml build
docker-pull:
	docker pull uqtri/codeforge_frontend:latest
	docker pull uqtri/codeforge_backend:latest
	
docker-push:
	docker push uqtri/codeforge_frontend:latest
	docker push uqtri/codeforge_backend:latest