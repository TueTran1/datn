import face_recognition
import os, sys
import cv2
import numpy as np
import math
from datetime import datetime, timezone
import pymongo
import json

from PIL import Image
import base64
from io import BytesIO


myclient = pymongo.MongoClient("/")
db = myclient["blog-database"]
detection = db["detections"]
user=db["users"]


imagedict= detection.find({},{"_id":1,"captured":1})

with open(r'get-base64.txt', 'w') as fp:
    for item in imagedict:
        if item["captured"] != "" and item["captured"] != None and item["captured"] != "no image":
            fp.write("%s%s\n" % (item["_id"] ,item["captured"]) )
    print('Done')
data = []

with open("get-base64.txt", 'r') as r, open('remove-blank.txt', 'w') as o:
    for line in r:
        if not line.isspace():
            o.write(line)

data = open('remove-blank.txt', 'r').readlines()
for index,value in enumerate(data):
    id = value[0:24]
    value=value[value.rindex(',')+1:]
    bytes_decoded=base64.b64decode(value)
    img=Image.open(BytesIO(bytes_decoded))
    out_jpg=img.convert('RGB')
    name='./faces/'+ str(id)+'.jpg'
    out_jpg.save(name)

# with open('new1.txt') as f:
#     print("blank lines new1",sum(line.isspace() for line in f)) 

# with open('new.txt') as f:
#     print("blank lines new",sum(line.isspace() for line in f)) 


# with open(r"new1.txt", 'r') as fp:
#     for count, line in enumerate(fp):
#         pass
# print('Total Lines', count + 1)

# with open(r"new.txt", 'r') as fp:
#     for count, line in enumerate(fp):
#         pass
# print('Total Lines', count + 1)


