import pytest
import json
from unittest.mock import Mock
from app import app 
from lib.workout_rounds import WorkoutRounds

@pytest.fixture
def workout_rounds_mock():
    mock = Mock()
    return mock

@pytest.fixture
def client(workout_rounds_mock):
    app.workout_rounds = workout_rounds_mock
    app.config.update({"TESTING": True})
    with app.test_client() as client:
        yield client

def test_get_all_rounds(client, workout_rounds_mock):
    workout_rounds_mock.get_all_rounds.return_value = [
        {'round_number': 1, 'exercise_name': "squats", 'round_duration': 30}
    ]

    response = client.get('/get_rounds')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert data is not None
