#!/bin/sh
phpcbf --standard=PSR2 app tests routes database
./node_modules/.bin/eslint ./resources/js --ext .js,.vue --fix
