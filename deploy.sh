#!/bin/bash

check_error() {
  if [ $1 -ne 0 ]
  then
    echo "deploy.sh: Build failed!"
    exit $1
  fi
}

export CS314MODE=prod
./build_client.sh
check_error $?
./build_server.sh
check_error $?

