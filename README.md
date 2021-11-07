# simple-blog-app
## Simple guidelines
* Use `npm init -y` to create package.json
* Then `npm install axios express nodemon cors` to install appropriate packages. Note: some services do not need all of those packages.

## Working version
Node.js v14


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

## Kubernetes commands instruction
`kubectl apply -f posts-depl.yaml`: run k8s and create pods.
`kubectl get deployments`: list all running deployments.
`kubectl get pods`: list all running pods.
`kubectl describe deployment [depl name]`: print out details about a specific deployment
`kubectl delete deployment [depl name]`: delete a deployment
`kubectl delete pod [pod name]`: delete a pod