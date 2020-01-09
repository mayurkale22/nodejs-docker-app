## Install dependencies.

```
$ npm install
```

## Run the app

```
$ npm run start
```

## Build and push the docker image to Google Container Registry

```
$ docker build -t gcr.io/[PROJECT_ID]/nodejs-docker-app:v1 .
$ docker push gcr.io/[PROJECT_ID]/nodejs-docker-app:v1
```

## Create deployment

```
kubectl apply -f deployment.yaml
```

## Useful commands

```
kubectl get deployments
kubectl get pods
kubectl exec -it <pod_name> bash
kubectl set image deployment/nodejs-docker-deployment my-app=nodejs-docker-app:v2
```
