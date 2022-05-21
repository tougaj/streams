#!/usr/bin/env bash

sleep_seconds=$(( 1*60 + 0 ))

while [[ true ]]; do
	curl http://132.226.223.144:9997/v1/paths/list > streamList.json
	
	echo Next run $(date --date="$sleep_seconds sec" "+%d.%m.%Y %T")
	sleep $sleep_seconds"s"
done