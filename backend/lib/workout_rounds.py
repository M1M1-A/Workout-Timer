class WorkoutRounds:
  def __init__(self):
    self.rounds = []

  def add_round(self, exercise_name, round_duration):
    round = {
      "round_number": len(self.rounds) + 1,
      "exercise_name": exercise_name,
      "round_duration": round_duration
    }

    self.rounds.append(round)

  def get_all_rounds(self):
    return self.rounds

  def edit_round(self, round_number, exercise_name, round_duration):
    for round in self.rounds:
        if round["round_number"] == round_number:
            round["exercise_name"] = exercise_name
            round["round_duration"] = round_duration
            return True
        
    return False 

  def delete_all_rounds(self):
    self.rounds = []
  