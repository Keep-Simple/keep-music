#!/bin/bash

echo What should the version be?
read VERSION

sudo docker build -t 1248421/keep-music:$VERSION .
sudo docker push 1248421/keep-music:$VERSION