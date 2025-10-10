// src/data/workouts.js
// Canonical workout names, matching CATALOG_BY_ID + WORKOUT_TARGETS
export const WORKOUTS = [
  // Chest / Press
  "Bench Press (Barbell)",
  "Bench Press (Dumbbell)",
  "Incline Bench Press (Barbell)",
  "Incline Bench Press (Dumbbell)",
  "Chest Press (Hammer Strength)",
  "Chest Press (Hammer Strength, Incline)",
  "Dumbbell Fly (Flat)",
  "Pec Deck Fly",
  "Incline Dumbbell Fly",
  //"Push-Up",
  "Dip",
  "Seated French Press",
  //"French Press (Seated, EZ-Bar)",

  // Shoulders / Delts
  //"Overhead Press (Barbell)",
  //"Overhead Press (Dumbbell)",
  "Seated Overhead Press (Barbell)",
  "Seated Overhead Press (Dumbbell)",
  "Upright Row (Wide)",
  "Upright Row (Narrow)",
  //"Lateral Raise",
  "Lateral Raise (Dumbbell)",
  "Lateral Raise (Cable)",
  //"Front Raise",
  "Reverse Fly",
  "Face Pull",
  "Barbell Shrug",
  "Dumbbell Shrug",
  "Smith Machine Shrug",

  // Back / Pull
  "Barbell Row",
  "Underhand Barbell Row",
  "Yates Row (Underhand Barbell Row)",
  "Bent-Over Row (Dumbbell)",
  "Seated Cable Row",
  "Lat Pulldown",
  "Chin-Up",
  "Pull-Up",
  "T-Bar Row",
  "Straight-Arm Pulldown (Half-Moon)",
  "Lat Pulldown (Underhand/Chin-Grip)",

  // Squat / Hinge / Lower
  "Back Squat",
  "Dumbbell Squat",
  //"Back Squat (Low-Bar)",
  "Front Squat",
  "Goblet Squat",
  "Conventional Deadlift",
  "Romanian Deadlift",
  "Stiff-Legged Deadlift",
  "Good Morning",
  "Hip Thrust",
  "Leg Press",
  //"Bulgarian Split Squat",
  "Lunge (Walking)",
  //"Step-Up",
  "Hack Squat",
  "Dumbbell Deadlift",
  "Smith Machine Deadlift",

  // Arms
  "Biceps Curl (Barbell)",
  "Biceps Curl (Dumbbell)",
  "Biceps Curl (EZ-Bar)",
  "Overhead Triceps Extension",
  //"Triceps Pushdown (Cable)",
  "Wrist Curl (Behind-the-Back, Barbell)",
  "Wrist Roller",

  // Legs (isolations)
  "Seated Leg Curl",
  "Lying Leg Curl",
  "Leg Extension",
  "Cable Hip Abduction (Standing)",

  // Calves
  "Calf Raise (Standing)",
  "Calf Raise (Seated)",
  "Donkey Calf Raise",
  "Farmer's Carry",

  // Core
  //"Ab Wheel Rollout",
  //"Cable Crunch",
  //"Plank",
  //"Hanging Leg Raise",
  //"Russian Twist",
  "Crunch",
  "Sit-Up",

  // Hips/Glutes adjunct
  "Abduction Machine",
  "Reverse Crunch",
  "Adduction Machine",
  "Hanging Leg Raise (Straight-Leg)",
].sort((a, b) => a.localeCompare(b));
