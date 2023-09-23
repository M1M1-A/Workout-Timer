from flask import Flask, request, jsonify
from lib.workout_rounds import WorkoutRounds

app = Flask(__name__)

workout_rounds = WorkoutRounds()

@app.route('/get_rounds', methods=['GET'])
def get_all_rounds():
    rounds = workout_rounds.get_all_rounds()
    return jsonify({'rounds': rounds})

@app.route('/add_round', methods=['POST'])
def add_round():
    data = request.json  
    exercise_name = data.get('exercise_name')
    interval_time = data.get('interval_time')

    workout_rounds.add_round(exercise_name, interval_time)

    return jsonify({'message': 'Round added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)
