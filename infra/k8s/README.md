# Basic knowledge
## Deployment
A deployment is a Kubernetes object that is intended to manage a set of pods.
![Deployment](../../images/Deployment.png)
If somehow, there is a pod that crashes, the deployment auto creates a new pod again.
## Networking with services
A Service is another kind of object in Kubernetes.
![Service](../../images/Service.png)
There are different types of Service in k8.
![Service Types](../../images/ServiceTypes.png)
## Load balancer
![How Load Balancer works](../../images/LoadBalancer.png)
The Load balancer receives request from React App and will reach to appropriate Cluster IP Service
![How Load Balancer works 2](../../images/LoadBalancer2.png)
## Ingress
![Ingress Definition](../../images/Ingress.png)
![How Ingress works](../../images/IngressMechanism.png)
## Full Overview
![Full k8s Overview](../../images/K8sOverview.png)
## K8s routing
![Routing path](../../images/K8sRouting.png)

# Explanation of k8s configuration
## posts-srv.yaml
The selector **app: posts** tells the service to find all the different pods which have label **app: posts** and expose those pods to the outside world. You can understand this **app: posts** label thing is just like classname in HTML for a HTML tag. And then you select the tag with classname is like what the selector is for in k8s.

## event-bus-depl.yaml
Notice that if you don't specify the type of Service. K8s will default it to ClusterIP.
The seperator "---" in the file to seperate between k8s objects, because we want create multiple objs in single yaml file.