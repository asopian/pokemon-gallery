#!/usr/bin/bash

for ((n=1; n<=802; n++)); do
	curl -O https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$n.png
done

for ((n=10001; n<=10147; n++)); do
	curl -O https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$n.png
done