#!/bin/bash
npm version patch -m "Release new version"
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push $DOCKER_USERNAME/esipe-credentials-client:$(grep 'version' package.json | cut -d '"' -f4)