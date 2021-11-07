# simple-blog-app
## Working version
Node.js v14

## Simple guidelines
* Use `npm init -y` to create package.json
* Then `npm install axios express nodemon cors` to install appropriate packages. Note: some services do not need all of those packages.

## App description
1. Posts service: 
    * Port 4000
2. Comments service: 
    * Port 4001
3. Query service: 
    * Port 4002
4. Moderation service: 
    * Port 4003
5. Event bus: 
    * Port 4005

## Docker commands instruction
1. `docker build -t [image_name]:[tag] .`: build up docker image in current folder. You have to go into the folder containing Dockerfile to create the image.

## Kubernetes commands instruction
1. `kubectl apply -f posts-depl.yaml`: run k8s and create pods.
2. `kubectl get deployments`: list all running deployments.
3. `kubectl get pods`: list all running pods.
4. `kubectl describe deployment [depl name]`: print out details about a specific deployment.
    + In our case, it is `kubectl describe deployment posts-depl`
5. `kubectl delete deployment [depl name]`: delete a deployment
    + In our case, it is `kubectl delete deployment posts-depl`
6. `kubectl delete pod [pod name]`: delete a pod
7. `kubectl rollout restart deployment [depl name]`: to tell k8s to use the latest version of image on docker hub
    + In our case, it is `kubectl rollout restart deployment posts-depl`
8. `kubectl logs [pod name]`: print out the logs of the pod

## Method to update Image used by a deployment
* Step 1: The deployment must be using the 'latest' tag in the pod spec section of the .yaml file
* Step 2: Make an update to your code
* Step 3: Build the image
* Step 4: Push the image to docker hub (using command `docker push [image_name]`)
* Step 5: Run the command `kubectl rollout restart deployment [depl name]`