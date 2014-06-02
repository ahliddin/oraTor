#!/usr/bin/python
import re

data = {}

with open ('../data/ISO-639-2.txt', 'r') as file: 
	for line in file:
		arr = line.split('|')
		lang = re.findall('\w+', arr[3])[0]
		data[arr[0]] = lang
import pprint
pprint.pprint(data)

