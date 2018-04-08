#!/bin/bash
export BABEL_ENV='test'
export NODE_ENV='test'
export PUBLIC_URL=''
eslint src __tests__ --fix && flow
