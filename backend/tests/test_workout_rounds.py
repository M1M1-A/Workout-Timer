from lib.workout_rounds import WorkoutRounds
import pytest

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
