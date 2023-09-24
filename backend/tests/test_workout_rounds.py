from lib.workout_rounds import WorkoutRounds
import pytest

# creating an instance of WorkoutRounds class to use for all tests
@pytest.fixture
def workout_rounds():
  return WorkoutRounds()

def test_initally_rounds_is_empty(workout_rounds):
  rounds = workout_rounds.get_all_rounds()
  assert rounds == []

