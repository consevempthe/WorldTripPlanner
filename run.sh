#!/bin/bash

check_error() {
  if [ $1 -ne 0 ]
  then
    echo "run.sh: Build failed!"
    exit $1
  fi
}

if [ -z "$ENV" ]; then
  export ENV=dev
fi

if [[ "$ENV" == "dev" ]]; then
	echo "Building and starting the server in DEVELOPMENT mode."
  ./build_server.sh
  check_error $?
  ./build_client.sh dev &
  PORT=31400 ./run_server.sh
  check_error $?
else
	echo "Building and starting the server in PRODUCTION mode."
  ./build_client.sh
  check_error $?
  ./build_server.sh
  check_error $?
  ./run_server.sh
fi
