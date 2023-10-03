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

    if exercise_name == "":
        return jsonify({'message': 'Exercise name cannot be blank'}), 400
    
    if round_duration == "":
        return jsonify({'message': "Round duration cannot be blank"}), 400

    if not isinstance(round_duration, (int)):
        return jsonify({'message': "Enter a duration in seconds, e.g 60 or 120"}), 400

    else:
        workout_rounds.add_round(exercise_name, round_duration)
        return jsonify({'message': 'Round added successfully'}), 201

@app.route('/edit_round', methods=['PUT'])
def edit_round():
    data = request.json
    round_number = data.get('round_number')
    exercise_name = data.get('exercise_name')
    round_duration = data.get('round_duration')

    if exercise_name == "":
        return jsonify({'message': "Exercise name cannot be blank"}), 400

    if round_duration == "":
        return jsonify({'message': "Round duration cannot be blank"}), 400

    if not isinstance(round_duration, (int)):
        return jsonify({'message': "Round duration must be a whole number in seconds, e.g 60 or 120"}), 400

    workout_rounds.edit_round(round_number, exercise_name, round_duration)

    return jsonify({'message': 'Round updated successfully'}), 201

@app.route('/delete_all', methods=['DELETE'])
def delete_all_rounds():
    workout_rounds.delete_all_rounds()

    return jsonify({'message': 'All rounds deleted and reset'}), 201

if __name__ == '__main__':
    app.run(debug=True)
