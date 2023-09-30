import pytest
import json
from app import app 

@pytest.fixture
def client():
    app.config.update({"TESTING": True})
    with app.test_client() as client:
        yield client

def test_get_all_rounds_initially_empty(client):
    response = client.get('/get_rounds')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert data == []
    assert len(data) == 0 

def test_get_all_rounds(client):
    client.post('/add_round', json={"exercise_name": "Squats", "round_duration": 30})

    response = client.get('/get_rounds')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert data is not None
    assert len(data) > 0 
    assert "Squats" in data[0]["exercise_name"] 

def test_add_round(client):
    response = client.post('/add_round', json={"exercise_name": "Squats", "round_duration": 30})
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 201
    assert data['message'] == "Round added successfully"

def test_edit_round(client):
    client.post('/add_round', json={"exercise_name": "Squats", "round_duration": 30})

    response = client.put('/edit_round', json={"round_number": 1, "exercise_name": "Lunges", "round_duration": 30})
    data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 201
    assert data['message'] == "Round updated successfully"

    response2 = client.get('/get_rounds')
    data = json.loads(response2.get_data(as_text=True))

    assert "Lunges" in data[0]["exercise_name"] 

def test_deleting_all_rounds_and_resetting(client):
    client.post('/add_round', json={"exercise_name": "Squats", "round_duration": 30})
    
    response = client.delete('/delete_all')
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 201
    assert data['message'] == "All rounds deleted and reset"

    response2 = client.get('/get_rounds')
    data = json.loads(response2.get_data(as_text=True))

    assert data == []
    assert len(data) == 0 

def test_returns_error_if_round_added_without_exercise_name(client):
    response = client.post('/add_round', json={"exercise_name": "", "round_duration": 30})
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 400
    assert data['message'] == "Exercise name cannot be blank"

def test_returns_error_if_round_added_without_round_duration(client):
    response = client.post('/add_round', json={"exercise_name": "Squats", "round_duration": ""})
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 400
    assert data['message'] == "Round duration cannot be blank"

def test_returns_error_if_round_duration_not_an_integer(client):
    response = client.post('/add_round', json={"exercise_name": "Squats", "round_duration": 10.5})
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 400
    assert data['message'] == "Round duration must be a whole number in seconds, e.g 60 or 120"

def test_amending_round_details_without_exercise_name_raises_error(client):
    client.post('/add_round', json={"exercise_name": "Squats", "round_duration": 30})

    response = client.put('/edit_round', json={"round_number": 1, "exercise_name": "", "round_duration": 30})
    data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 400
    assert data['message'] == "Exercise name cannot be blank"

def test_amending_round_details_without_round_duration_raises_error(client):
    client.post('/add_round', json={"exercise_name": "Squats", "round_duration": 30})

    response = client.put('/edit_round', json={"round_number": 1, "exercise_name": "Lunges", "round_duration": ""})
    data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 400
    assert data['message'] == "Round duration cannot be blank"

def test_returns_error_if_round_amended_and_round_duration_not_integer(client):
    client.post('/add_round', json={"exercise_name": "Squats", "round_duration": 30})

    response = client.put('/edit_round', json={"round_number": 1, "exercise_name": "Lunges", "round_duration": 10.5})
    data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 400
    assert data['message'] == "Round duration must be a whole number in seconds, e.g 60 or 120"
