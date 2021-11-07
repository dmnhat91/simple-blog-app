# Explanation of k8s configuration
## posts-srv.yaml
The selector **app: posts** tells the service to find all the different pods which have label **app: posts** and expose those pods to the outside world. You can understand this **app: posts** label thing is just like classname in HTML for a HTML tag. And then you select the tag with classname is like what the selector is for in k8s.

## event-bus-depl.yaml
Notice that if you don't specify the type of Service. K8s will default it to ClusterIP.
The seperator "---" in the file to seperate between k8s objects, because we want create multiple objs in single yaml file.