interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

export const exerciseDatabase: Record<string, Exercise[]> = {
  'Neck Pain': [
    {
      id: '17',
      title: 'Neck Rotation',
      description: 'Slowly turn your head from side to side. Helps improve neck mobility and reduce stiffness.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    },
    {
      id: '18',
      title: 'Chin Tucks',
      description: 'Draw your chin straight back while keeping your head level. Strengthens deep neck flexors.',
      difficulty: 'Beginner',
      duration: '5-10 minutes'
    },
    {
      id: '19',
      title: 'Isometric Neck Exercises',
      description: 'Place hand on forehead and push against it while keeping head still. Strengthens neck muscles.',
      difficulty: 'Intermediate',
      duration: '8-10 minutes'
    }
  ],
  'Shoulder Pain': [
    {
      id: '1',
      title: 'Pendulum Exercise',
      description: 'Lean over slightly and let your affected arm hang down. Swing your arm gently in small circles. This helps reduce inflammation and improve mobility.',
      difficulty: 'Beginner',
      duration: '5-10 minutes'
    },
    {
      id: '2',
      title: 'Wall Slides',
      description: 'Stand with your back against a wall and slowly slide your arms up and down. Helps improve shoulder blade movement and posture.',
      difficulty: 'Intermediate',
      duration: '10-15 minutes'
    },
    {
      id: '3',
      title: 'Rotator Cuff External Rotation',
      description: 'Using a resistance band, keep your elbow at your side and rotate your arm outward. Strengthens the rotator cuff muscles.',
      difficulty: 'Intermediate',
      duration: '10-12 minutes'
    }
  ],
  'Knee Pain': [
    {
      id: '4',
      title: 'Straight Leg Raises',
      description: 'Lie on your back and raise one leg while keeping it straight. Strengthens quadriceps without stressing the knee joint.',
      difficulty: 'Beginner',
      duration: '10 minutes'
    },
    {
      id: '5',
      title: 'Wall Sits',
      description: 'Stand with your back against a wall and slide down until your thighs are parallel to the ground. Builds knee stability and quad strength.',
      difficulty: 'Intermediate',
      duration: '5-8 minutes'
    },
    {
      id: '6',
      title: 'Step-Ups',
      description: 'Step up onto a platform with one leg, then step back down. Start with a low step and progress as strength improves.',
      difficulty: 'Advanced',
      duration: '15 minutes'
    }
  ],
  'Back Pain': [
    {
      id: '7',
      title: 'Cat-Cow Stretch',
      description: 'On hands and knees, alternate between arching and rounding your back. Improves spine flexibility and relieves tension.',
      difficulty: 'Beginner',
      duration: '5-10 minutes'
    },
    {
      id: '8',
      title: 'Bird Dog Exercise',
      description: 'On hands and knees, extend opposite arm and leg while maintaining balance. Strengthens core and improves stability.',
      difficulty: 'Intermediate',
      duration: '10-15 minutes'
    },
    {
      id: '9',
      title: 'Bridge Exercise',
      description: 'Lie on your back with knees bent, lift hips off the ground. Strengthens lower back and glutes.',
      difficulty: 'Beginner',
      duration: '8-10 minutes'
    }
  ],
  'Ankle Sprain': [
    {
      id: '10',
      title: 'Ankle Alphabet',
      description: 'Draw the alphabet with your toes while keeping your ankle elevated. Improves range of motion and circulation.',
      difficulty: 'Beginner',
      duration: '5-10 minutes'
    },
    {
      id: '11',
      title: 'Heel Raises',
      description: 'Stand on the edge of a step and raise up onto your toes. Strengthens calf muscles and improves ankle stability.',
      difficulty: 'Intermediate',
      duration: '8-12 minutes'
    },
    {
      id: '12',
      title: 'Balance Board Exercises',
      description: 'Stand on a balance board and maintain stability. Enhances proprioception and ankle strength.',
      difficulty: 'Advanced',
      duration: '10-15 minutes'
    }
  ],
  'Wrist Pain': [
    {
      id: '13',
      title: 'Wrist Flexor Stretch',
      description: 'Extend your arm with palm up, gently pull fingers back. Relieves tension in forearm muscles.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    },
    {
      id: '14',
      title: 'Grip Strengthening',
      description: 'Squeeze a stress ball or hand gripper. Improves grip strength and wrist stability.',
      difficulty: 'Intermediate',
      duration: '5-10 minutes'
    }
  ],
  'Elbow Pain': [
    {
      id: '20',
      title: 'Wrist Flexion/Extension',
      description: 'Bend wrist up and down while keeping elbow straight. Improves forearm flexibility.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    },
    {
      id: '21',
      title: 'Forearm Pronation/Supination',
      description: 'Rotate palm up and down while keeping elbow at side. Improves rotational mobility.',
      difficulty: 'Intermediate',
      duration: '8-10 minutes'
    }
  ],
  'Hamstring Strain': [
    {
      id: '22',
      title: 'Standing Hamstring Stretch',
      description: 'Place foot on elevated surface and lean forward. Improves hamstring flexibility.',
      difficulty: 'Beginner',
      duration: '8-10 minutes'
    },
    {
      id: '23',
      title: 'Nordic Hamstring Curl',
      description: 'Kneel with partner holding ankles, slowly lower torso. Strengthens hamstrings eccentrically.',
      difficulty: 'Advanced',
      duration: '10-15 minutes'
    }
  ],
  'Plantar Fasciitis': [
    {
      id: '24',
      title: 'Foot Rolling',
      description: 'Roll foot over a tennis ball or frozen water bottle. Relieves plantar fascia tension.',
      difficulty: 'Beginner',
      duration: '5-10 minutes'
    },
    {
      id: '25',
      title: 'Toe Stretches',
      description: 'Pull toes back towards shin while seated. Stretches plantar fascia and calf.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    }
  ],
  'Tennis Elbow': [
    {
      id: '26',
      title: 'Eccentric Wrist Extension',
      description: 'Lower weight slowly with back of hand facing up. Strengthens wrist extensors.',
      difficulty: 'Intermediate',
      duration: '8-12 minutes'
    },
    {
      id: '27',
      title: 'Forearm Stretches',
      description: 'Extend arm and gently stretch wrist in both directions. Relieves tennis elbow pain.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    }
  ],
  'Groin Strain': [
    {
      id: '28',
      title: 'Butterfly Stretch',
      description: 'Sit with feet together, knees out, gently press knees down. Stretches inner thighs.',
      difficulty: 'Beginner',
      duration: '8-10 minutes'
    },
    {
      id: '29',
      title: 'Lateral Lunges',
      description: 'Step sideways into lunge position. Strengthens adductors and improves flexibility.',
      difficulty: 'Intermediate',
      duration: '10-12 minutes'
    }
  ],
  'Shin Splints': [
    {
      id: '30',
      title: 'Toe Taps',
      description: 'Tap toes while keeping heel on ground. Strengthens anterior tibialis muscle.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    },
    {
      id: '31',
      title: 'Calf Raises',
      description: 'Rise up on toes then lower slowly. Improves lower leg strength and stability.',
      difficulty: 'Intermediate',
      duration: '8-10 minutes'
    }
  ],
  'Rotator Cuff Injury': [
    {
      id: '32',
      title: 'Internal Rotation',
      description: 'Using resistance band, rotate arm inward while keeping elbow at side.',
      difficulty: 'Intermediate',
      duration: '8-10 minutes'
    },
    {
      id: '33',
      title: 'Shoulder Blade Squeezes',
      description: 'Squeeze shoulder blades together. Improves posture and strengthens rotator cuff.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    }
  ],
  'IT Band Syndrome': [
    {
      id: '34',
      title: 'Foam Rolling IT Band',
      description: 'Use foam roller along outside of thigh. Releases IT band tension.',
      difficulty: 'Intermediate',
      duration: '8-10 minutes'
    },
    {
      id: '35',
      title: 'Standing IT Band Stretch',
      description: 'Cross legs and lean to side. Stretches IT band and hip muscles.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    }
  ],
  'Carpal Tunnel': [
    {
      id: '36',
      title: 'Nerve Gliding Exercises',
      description: 'Move wrist and fingers through series of positions. Helps nerve mobility.',
      difficulty: 'Beginner',
      duration: '5-8 minutes'
    },
    {
      id: '37',
      title: 'Wrist Stretches',
      description: 'Gently stretch wrist in all directions. Reduces pressure on median nerve.',
      difficulty: 'Beginner',
      duration: '5-10 minutes'
    }
  ],
  'Hip Pain': [
    {
      id: '15',
      title: 'Hip Flexor Stretch',
      description: 'Kneel on one knee, push hips forward. Releases tight hip flexors and improves mobility.',
      difficulty: 'Beginner',
      duration: '8-10 minutes'
    },
    {
      id: '16',
      title: 'Clamshell Exercise',
      description: 'Lie on side, knees bent, lift top knee while keeping feet together. Strengthens hip abductors.',
      difficulty: 'Intermediate',
      duration: '10-12 minutes'
    }
  ]
};

export const getExercisesForInjury = (injury: string): Exercise[] => {
  return exerciseDatabase[injury] || [];
};