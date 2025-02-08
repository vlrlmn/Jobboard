# Vue frontend service by tmazitov

### How to run

Before run you need to install Docker and be in the service root folder.

1. ```bash docker build -t frontend .``` - build the image with the frontend service inside.

2. ```bash docker run -p 3000:3000 frontend``` - run image using 3000 port.