#!/bin/bash

echo What should the version be?
read VERSION

sudo docker build -t 1248421/keep-music:$VERSION .
sudo docker push 1248421/keep-music:$VERSION

ssh root@157.230.116.205 "
    docker pull 1248421/keep-music:$VERSION &&
    docker tag 1248421/keep-music:$VERSION dokku/keep-music-api:latest &&
    dokku tags:deploy keep-music-api latest
"
