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
    print(data)
    assert response.status_code == 201
    assert data['message'] == "Round added successfully"
