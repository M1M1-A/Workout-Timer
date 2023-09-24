
class WorkoutRounds:
  def __init__(self):
    self.rounds = []

  def add_round(self, exercise_name, round_duration):
    if exercise_name == "":
      raise Exception("Exercise name cannot be blank")
    
    if round_duration == "":
      raise Exception("Round duration cannot be blank")

    round = {
      "round_number": len(self.rounds) + 1,
      "exercise_name": exercise_name,
      "round_duration": round_duration
    }

    self.rounds.append(round)

  def get_all_rounds(self):
    return self.rounds

  def edit_round(self, round_number, exercise_name, round_duration):
    pass

  def delete_all_rounds(self):
    pass
  