
class WorkoutRounds:
  def __init__(self):
    self.rounds = []

  def add_round(self, exercise_name, round_duration):
    if exercise_name == "":
      raise Exception("Exercise name cannot be blank")
    
    if round_duration == "":
      raise Exception("Round duration cannot be blank")

    if not isinstance(round_duration, (int)):
        raise Exception("Round duration must be a whole number in seconds, e.g 60 or 120")

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
            if exercise_name == "":
              raise Exception("Exercise name cannot be blank")
        
            if round_duration == "":
              raise Exception("Round duration cannot be blank")
            
            if not isinstance(round_duration, (int)):
              raise Exception("Round duration must be a whole number in seconds, e.g 60 or 120")

            round["exercise_name"] = exercise_name
            round["round_duration"] = round_duration
            return True
        
    return False 

  def delete_all_rounds(self):
    self.rounds = []
  