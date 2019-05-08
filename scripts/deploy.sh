#!/bin/bash

if [[ $TRAVIS_BRANCH == "master" ]]
then
    npm version patch -m "Release version %s"

    git config --global user.email "evan.suau@etu.u-pec.fr"
    git config --global user.name "esuau"
    git remote add upstream https://${GH_TOKEN}@github.com/esuau/esipe-credentials-client
    git push upstream master
    
    VERSION=$(grep 'version' package.json | cut -d '"' -f4)
else 
    VERSION=latest
fi

docker tag esipe-credentials-client esuau/esipe-credentials-client:$VERSION
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push $DOCKER_USERNAME/esipe-credentials-client:$VERSION