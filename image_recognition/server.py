from flask import Flask, jsonify, request
from ultralytics import YOLO
from flask_cors import CORS


app=Flask(__name__)
CORS(app)

# Load the model
detectionModel = YOLO("best.pt")
#endpoint
@app.route('/detect/category', methods=["POST"]) 
def detectCategory():

    if 'file' not in request.files:
        return jsonify(statue=400, message='File required')
    file = request.files['file']

    filepath = 'temp_img.' + file.filename.split('.')[-1] 
    file.save('temp_img.' + file.filename.split('.')[-1])

    results = detectionModel.predict(filepath)
    print(results)
    result = results[0]

    if(len(result.boxes)>0):
        box = result.boxes[0]
        cords = box.xyxy[0].tolist()

        

        # x1, y1 = math.ceil(cords[0]), math.ceil(cords[1])

        # x2, y2 = math.ceil(cords[2]), math.ceil(cords[3]) 

        # color = (0, 255, 0) 

        cords = box.xyxy[0].tolist()
        class_id = result.names[box.cls[0].item()]
        conf = box.conf[0].item()
        print(class_id)
        # return {"category": class_id}
        return class_id






    return ""

if __name__=='__main__':
    app.run(debug=True,use_reloader=False, port=8002)

    