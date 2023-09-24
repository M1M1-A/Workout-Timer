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

def test_returns_error_if_round_added_without_exercise_name(workout_rounds):
  with pytest.raises(Exception) as e:
    workout_rounds.add_round("", 30)
  assert str(e.value) == "Exercise name cannot be blank"

def test_returns_error_if_round_added_without_round_duration(workout_rounds):
  with pytest.raises(Exception) as e:
    workout_rounds.add_round("Squats", "")
  assert str(e.value) == "Round duration cannot be blank"

def test_returns_error_if_round_duration_not_an_integer(workout_rounds):
  with pytest.raises(Exception) as e:
    workout_rounds.add_round("Squats", 20.5)
  assert str(e.value) == "Round duration must be a whole number in seconds, e.g 60 or 120"

def test_adding_round_then_amending_details():
    workout_rounds = WorkoutRounds()
    workout_rounds.add_round("squats", 30)
    workout_rounds.edit_round(1, "lunges", 40)
    rounds = workout_rounds.get_all_rounds()
    assert rounds == [{"round_number": 1, 
                      "exercise_name": "lunges",
                      "round_duration": 40}]
    
def test_amending_details_for_multiple_rounds():
    workout_rounds = WorkoutRounds()
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
    
def test_amending_round_details_without_exercise_name_raises_error():
    workout_rounds = WorkoutRounds()
    workout_rounds.add_round("squats", 30)
    with pytest.raises (Exception) as e:
      workout_rounds.edit_round(1, "", 40)

    assert str(e.value) == "Exercise name cannot be blank"

def test_amending_round_details_without_round_duration_raises_error():
    workout_rounds = WorkoutRounds()
    workout_rounds.add_round("squats", 30)
    with pytest.raises (Exception) as e:
      workout_rounds.edit_round(1, "squats", "")

    assert str(e.value) == "Round duration cannot be blank"

def test_returns_error_if_round_duration_not_integer():
    workout_rounds = WorkoutRounds()
    workout_rounds.add_round("squats", 30)
    with pytest.raises (Exception) as e:
      workout_rounds.edit_round(1, "squats", 20.5)

    assert str(e.value) == "Round duration must be a whole number in seconds, e.g 60 or 120"
