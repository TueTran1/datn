import face_recognition
import os, sys
import cv2
import numpy as np
import math
from datetime import datetime, timezone
import pymongo
import pytz
from bson.objectid import ObjectId
from PIL import Image
import base64
from io import BytesIO


myclient = pymongo.MongoClient("mongodb+srv://tranthanhtue:tuetran123@cluster0.lsnutbu.mongodb.net/")
db = myclient["blog-database"]
detection = db["detections"]
user=db["users"]

# Helper
def face_confidence(face_distance, face_match_threshold=0.6):
    range = (1.0 - face_match_threshold)
    linear_val = (1.0 - face_distance) / (range * 2.0)

    if face_distance > face_match_threshold:
        return str(round(linear_val * 100, 2)) + '%'
    else:
        value = (linear_val + ((1.0 - linear_val) * math.pow((linear_val - 0.5) * 2, 0.2))) * 100
        return str(round(value, 2)) + '%'



class FaceRecognition:
    face_locations = []
    face_encodings = []
    face_names = []
    known_face_encodings = []
    known_face_names = []
    
    process_current_frame = True
    

    def __init__(self):
        self.getImage()
        self.encode_faces()

    def encode_faces(self):
        for image in os.listdir('faces'):
            face_image = face_recognition.load_image_file(f"faces/{image}")
            face_encoding = face_recognition.face_encodings(face_image)[0]

            self.known_face_encodings.append(face_encoding)
            self.known_face_names.append(image[:-4])

    def getImage(self):
        imagedict= user.find({},{"_id":1,"image":1})

        with open(r'get-base64.txt', 'w') as fp:
            for item in imagedict:
                if item["image"] != "" and item["image"] != None and item["image"] != "no image":
                    fp.write("%s%s\n" % (item["_id"] ,item["image"]) )
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

    def run_recognition(self):
        video_capture = cv2.VideoCapture(0)
        
        while True:
            
            # self.encode_faces()
            ret, frame = video_capture.read()
            
            # Only process every other frame of video to save time
            if self.process_current_frame:
                # Resize frame of video to 1/4 size for faster face recognition processing
                small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

                # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
                rgb_small_frame = small_frame[:, :, ::-1]

                # Find all the faces and face encodings in the current frame of video
                self.face_locations = face_recognition.face_locations(rgb_small_frame)
                self.face_encodings = face_recognition.face_encodings(rgb_small_frame, self.face_locations)
                
                self.face_names = []
                for face_encoding in self.face_encodings:
                    
                    # See if the face is a match for the known face(s)
                    matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
                    name = "Unknown"
                    confidence = '???'

                    

                    # Calculate the shortest distance to face
                    face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)

                    best_match_index = np.argmin(face_distances)
                    if matches[best_match_index]:
                        name = self.known_face_names[best_match_index]
                        
                        confidence = face_confidence(face_distances[best_match_index])
                        k=[]
                        
                        times=[]
                        for x in detection.find({"user":ObjectId(name),"type":"Out"},{"_id":0,"time":1}):
                            k.append(x)

                        for e in k:
                            tmp = e["time"]
                            times.append(tmp)
                        
                        if times==[]:
                            detected = datetime.now()
                            # detected = datetime.now(pytz.timezone('Asia/Ho_Chi_Minh'))
                            time= "".join(e for e in str(detected) if e.isalnum())
                            cv2.imwrite("captured/"+name+time+".jpg", frame)

                            img = cv2.imread("captured/"+name+time+".jpg")
                            _, im_arr = cv2.imencode('.jpg', img)  # im_arr: image in Numpy one-dim array format.
                            im_bytes = im_arr.tobytes()
                            im_b64 = str(base64.b64encode(im_bytes))
                            captured= "data:image/jpeg;base64,"+(im_b64[2:-1])

                            detection.insert_one({"user":ObjectId(name),"time": detected,"type":"Out","confidence":confidence,"captured":captured })
                            print(name,datetime.now(pytz.timezone('Asia/Ho_Chi_Minh')),"Out")

                        else:
                            latest = max(times)
                            # latest = latest.replace(tzinfo=timezone.utc).astimezone(tz=None)
                            print("latest: ",name,latest)
                            # now = datetime.now()
                            # now = datetime.utcnow()
                            # now = now.replace(tzinfo=timezone.utc).astimezone(tz=None)
                            
                            diff = (datetime.now()-latest).total_seconds()  
                            print("diff: ",name,diff)
                            detected = datetime.now()
                            # detected = datetime.now(pytz.timezone('Asia/Ho_Chi_Minh'))

                            if (datetime.now()-latest).total_seconds() > 10:
                                time= "".join(e for e in str(detected) if e.isalnum())
                                cv2.imwrite("captured/"+name+time+".jpg", frame)
                                        
                                img = cv2.imread("captured/"+name+time+".jpg")
                                _, im_arr = cv2.imencode('.jpg', img)  # im_arr: image in Numpy one-dim array format.
                                im_bytes = im_arr.tobytes()
                                im_b64 = str(base64.b64encode(im_bytes))
                                captured= "data:image/jpeg;base64,"+(im_b64[2:-1])

                                detection.insert_one({ "user":ObjectId(name),"time": detected,"type":"Out","confidence":confidence,"captured":captured })
                                print("        ",name,datetime.now(),"Out")
                    self.face_names.append(f'{name} ({confidence})')
                        


            self.process_current_frame = not self.process_current_frame

            # Display the results
            for (top, right, bottom, left), name in zip(self.face_locations, self.face_names):
                # Scale back up face locations since the frame we detected in was scaled to 1/4 size
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4

                # Create the frame with the name
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
                cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
                cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_DUPLEX, 0.8, (255, 255, 255), 1)
                
            

            # Display the resulting image
            cv2.imshow('Face Recognition', frame)

            # Hit 'q' on the keyboard to quit!
            if cv2.waitKey(1) == ord('q'):
                break
            
            
        # Release handle to the webcam
        video_capture.release()
        cv2.destroyAllWindows()


if __name__ == '__main__':
    fr = FaceRecognition()
    fr.run_recognition()
    
