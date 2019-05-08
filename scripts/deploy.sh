#!/bin/bash
npm version patch -m "Release new version"
VERSION=$(grep 'version' package.json | cut -d '"' -f4)
docker tag esipe-credentials-client esuau/esipe-credentials-client:$VERSION
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push $DOCKER_USERNAME/esipe-credentials-client:$VERSION