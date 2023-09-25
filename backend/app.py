from flask import Flask, request, jsonify
from lib.workout_rounds import WorkoutRounds

app = Flask(__name__)

workout_rounds = WorkoutRounds()

@app.route('/get_rounds', methods=['GET'])
def get_all_rounds():
    rounds = workout_rounds.get_all_rounds()
    return jsonify(rounds)

@app.route('/add_round', methods=['POST'])
def add_round():
    data = request.json  
    exercise_name = data.get('exercise_name')
    round_duration = data.get('round_duration')

    workout_rounds.add_round(exercise_name, round_duration)

    return jsonify({'message': 'Round added successfully'}), 201

# @app.route('/edit_round', methods=['UPDATE'])


# @app.route('/delete_all', methods=['DELETE'])


if __name__ == '__main__':
    app.run(debug=True)
