#!/bin/bash

if [ ! -d "./client/node_modules" ]; then
  # install all dependencies into node_modules
  npm install --prefix client
fi

# compile and bundle client side JavaScript into a single distribution
if [[ "$ENV" == "dev" ]]; then
  npm run dev --prefix client
else
  npm run bundle --prefix client
fi
exit $?
