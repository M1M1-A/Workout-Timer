from lib.workout_rounds import WorkoutRounds
import pytest, json

# creating an instance of WorkoutRounds class to use for all tests
@pytest.fixture
def workout_rounds():
  return WorkoutRounds()

def test_initally_rounds_is_empty(workout_rounds):
  rounds = workout_rounds.get_all_rounds()
  assert rounds == []

def test_adding_round(workout_rounds):
  workout_rounds.add_round("Squats", 30)
  rounds = workout_rounds.get_all_rounds()
  assert rounds == [{
                      "round_number": 1,
                      "exercise_name": "Squats",
                      "round_duration": 30
                    }]
  
def test_adding_multiple_rounds(workout_rounds):
  workout_rounds.add_round("Squats", 30)
  workout_rounds.add_round("Lunges", 40)
  rounds = workout_rounds.get_all_rounds()
  assert rounds == [{
                      "round_number": 1,
                      "exercise_name": "Squats",
                      "round_duration": 30
                    },
                    {
                      "round_number": 2,
                      "exercise_name": "Lunges",
                      "round_duration": 40
                    }]

def test_adding_round_then_amending_details(workout_rounds):
  workout_rounds.add_round("squats", 30)
  workout_rounds.edit_round(1, "lunges", 40)
  rounds = workout_rounds.get_all_rounds()
  assert rounds == [{"round_number": 1, 
                    "exercise_name": "lunges",
                    "round_duration": 40}]
    
def test_amending_details_for_multiple_rounds(workout_rounds):
  workout_rounds.add_round("squats", 30)
  workout_rounds.add_round("lunges", 30)
  workout_rounds.edit_round(1, "squats", 40)
  workout_rounds.edit_round(2, "lunges", 40)
  rounds = workout_rounds.get_all_rounds()
  assert rounds == [{"round_number": 1, 
                    "exercise_name": "squats",
                    "round_duration": 40},
                    {"round_number": 2, 
                    "exercise_name": "lunges",
                    "round_duration": 40}
                    ]
    
def test_deleting_all_rounds_resets_rounds_to_empty(workout_rounds):
  workout_rounds.add_round("squats", 30)
  workout_rounds.delete_all_rounds()
  rounds = workout_rounds.get_all_rounds()
  assert rounds == []

def test_adding_multiple_rounds_and_resetting_to_empty(workout_rounds):
  workout_rounds.add_round("squats", 30)
  workout_rounds.add_round("lunges", 30)
  workout_rounds.delete_all_rounds()
  rounds = workout_rounds.get_all_rounds()
  assert rounds == []