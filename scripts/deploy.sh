#!/bin/bash

if [[ $TRAVIS_BRANCH == "master" ]]
then
    git config --global user.email "evan.suau@etu.u-pec.fr"
    git config --global user.name "esuau"
    git remote set-url origin https://${GH_TOKEN}@github.com/esuau/esipe-credentials-client

    npm version patch -m "Release version %s"

    git push origin master --tags
    
    VERSION=$(grep 'version' package.json | cut -d '"' -f4)
else 
    VERSION=latest
fi

docker tag esipe-credentials-client esuau/esipe-credentials-client:$VERSION
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push $DOCKER_USERNAME/esipe-credentials-client:$VERSION