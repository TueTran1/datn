import base64
import numpy as np
import cv2
import pyperclip

img = cv2.imread('faces/64799c08ce68934bcc861f82.jpg')
_, im_arr = cv2.imencode('.jpg', img)  # im_arr: image in Numpy one-dim array format.
im_bytes = im_arr.tobytes()
im_b64 = str(base64.b64encode(im_bytes))

with open('capturedbase64.txt', 'w') as o:
    o.write("%s\n" %str(im_b64)[2:-1])
