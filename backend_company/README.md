Backend part requirements: 
* Python (latest) - programming language
* Django 5.* - framework for the backend apps
* Poetry - tool to storage backend dependencies for the best performance

How to run Dockerfile?
	docker pull python:3.10-slim
	docker build -t backend_company .
	sudo docker run -p 8000:8000 backend_company
