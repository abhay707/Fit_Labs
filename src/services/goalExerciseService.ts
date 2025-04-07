import { Exercise } from '../types';

export const goalExerciseDatabase: Record<string, Exercise[]> = {
  'weight-loss': [
    {
      id: 'wl-1',
      title: 'High-Intensity Interval Training (HIIT)',
      description: 'Alternate between 30 seconds of high-intensity exercise and 30 seconds of rest for 15-20 minutes. Effective for burning calories and improving cardiovascular health.',
      difficulty: 'Intermediate',
      duration: '20-30 minutes'
    },
    {
      id: 'wl-2',
      title: 'Circuit Training',
      description: 'Perform a series of exercises with minimal rest between them. Combines strength and cardio for maximum calorie burn.',
      difficulty: 'Intermediate',
      duration: '30-45 minutes'
    },
    {
      id: 'wl-3',
      title: 'Steady-State Cardio',
      description: 'Maintain a moderate intensity for an extended period. Good for building endurance and burning fat.',
      difficulty: 'Beginner',
      duration: '30-60 minutes'
    },
    {
      id: 'wl-4',
      title: 'Bodyweight Circuit',
      description: 'Complete 3 rounds of: 15 squats, 10 push-ups, 10 lunges per leg, 30-second plank. Great for burning calories without equipment.',
      difficulty: 'Beginner',
      duration: '20-30 minutes'
    },
    {
      id: 'wl-5',
      title: 'Jump Rope Intervals',
      description: 'Jump rope for 1 minute, rest for 30 seconds. Repeat for 10-15 rounds. Excellent for cardiovascular health and calorie burning.',
      difficulty: 'Intermediate',
      duration: '15-20 minutes'
    }
  ],
  'weight-gain': [
    {
      id: 'wg-1',
      title: 'Compound Strength Training',
      description: 'Focus on heavy compound lifts like squats, deadlifts, and bench press. Aim for 4-6 sets of 6-8 reps with heavier weights.',
      difficulty: 'Advanced',
      duration: '45-60 minutes'
    },
    {
      id: 'wg-2',
      title: 'Progressive Overload Training',
      description: 'Gradually increase the weight or reps in your strength training routine. Essential for muscle and strength gains.',
      difficulty: 'Intermediate',
      duration: '40-50 minutes'
    },
    {
      id: 'wg-3',
      title: 'Full Body Hypertrophy Workout',
      description: 'Target all major muscle groups with 3-4 sets of 8-12 reps. Focus on proper form and controlled movements.',
      difficulty: 'Intermediate',
      duration: '50-60 minutes'
    },
    {
      id: 'wg-4',
      title: 'Caloric Surplus Diet Planning',
      description: 'Learn to calculate your maintenance calories and add 300-500 calories daily. Focus on protein intake of 1.6-2.2g per kg of bodyweight.',
      difficulty: 'Beginner',
      duration: '15-20 minutes'
    },
    {
      id: 'wg-5',
      title: 'Rest and Recovery Optimization',
      description: 'Strategies for proper sleep, stress management, and active recovery to maximize muscle growth and weight gain.',
      difficulty: 'Beginner',
      duration: '10-15 minutes'
    }
  ],
  'muscle-gain': [
    {
      id: 'mg-1',
      title: 'Hypertrophy Training Split',
      description: 'Follow a push/pull/legs or upper/lower body split routine. Focus on 8-12 reps per set with moderate to heavy weights.',
      difficulty: 'Intermediate',
      duration: '45-60 minutes'
    },
    {
      id: 'mg-2',
      title: 'Time Under Tension Training',
      description: 'Slow down your reps, especially the eccentric (lowering) phase. Increases muscle damage and growth stimulus.',
      difficulty: 'Intermediate',
      duration: '40-50 minutes'
    },
    {
      id: 'mg-3',
      title: 'Compound Movement Focus',
      description: 'Prioritize multi-joint exercises like squats, deadlifts, bench press, and rows for maximum muscle recruitment.',
      difficulty: 'Advanced',
      duration: '50-60 minutes'
    },
    {
      id: 'mg-4',
      title: 'Protein Timing and Nutrition',
      description: 'Strategies for optimal protein intake and meal timing to support muscle protein synthesis and recovery.',
      difficulty: 'Beginner',
      duration: '15-20 minutes'
    },
    {
      id: 'mg-5',
      title: 'Progressive Overload Techniques',
      description: 'Methods to continually challenge your muscles through increasing weight, reps, sets, or decreasing rest periods.',
      difficulty: 'Intermediate',
      duration: '30-40 minutes'
    }
  ],
  'maintenance': [
    {
      id: 'mt-1',
      title: 'Balanced Fitness Routine',
      description: 'Combine strength training, cardio, and flexibility work in a balanced weekly routine to maintain overall fitness.',
      difficulty: 'Intermediate',
      duration: '30-45 minutes'
    },
    {
      id: 'mt-2',
      title: 'Functional Fitness Circuit',
      description: 'Perform exercises that mimic everyday movements to maintain strength and mobility for daily activities.',
      difficulty: 'Beginner',
      duration: '20-30 minutes'
    },
    {
      id: 'mt-3',
      title: 'Active Recovery Sessions',
      description: 'Low-intensity activities like walking, swimming, or yoga to maintain fitness while allowing for recovery.',
      difficulty: 'Beginner',
      duration: '30-40 minutes'
    },
    {
      id: 'mt-4',
      title: 'Maintenance Nutrition Plan',
      description: 'Guidelines for maintaining your current weight and body composition through balanced nutrition.',
      difficulty: 'Beginner',
      duration: '15-20 minutes'
    },
    {
      id: 'mt-5',
      title: 'Mobility and Flexibility Routine',
      description: 'A comprehensive stretching and mobility routine to maintain joint health and prevent injuries.',
      difficulty: 'Beginner',
      duration: '15-20 minutes'
    }
  ],
  'general-fitness': [
    {
      id: 'gf-1',
      title: 'Full Body Circuit Training',
      description: 'A balanced workout targeting all major muscle groups with a mix of strength and cardio exercises.',
      difficulty: 'Intermediate',
      duration: '30-45 minutes'
    },
    {
      id: 'gf-2',
      title: 'Cardiovascular Endurance Training',
      description: 'Moderate intensity cardio activities like jogging, cycling, or swimming to improve heart health and stamina.',
      difficulty: 'Beginner',
      duration: '20-30 minutes'
    },
    {
      id: 'gf-3',
      title: 'Functional Strength Workout',
      description: 'Exercises that improve strength for everyday activities, focusing on core stability and multi-joint movements.',
      difficulty: 'Intermediate',
      duration: '30-40 minutes'
    },
    {
      id: 'gf-4',
      title: 'Flexibility and Mobility Session',
      description: 'A combination of static stretches, dynamic movements, and foam rolling to improve overall mobility.',
      difficulty: 'Beginner',
      duration: '15-20 minutes'
    },
    {
      id: 'gf-5',
      title: 'Balanced Nutrition Basics',
      description: 'Learn the fundamentals of a balanced diet that supports overall health and fitness goals.',
      difficulty: 'Beginner',
      duration: '10-15 minutes'
    }
  ]
};

export const getExercisesForGoal = (goal: string): Exercise[] => {
  return goalExerciseDatabase[goal] || [];
};