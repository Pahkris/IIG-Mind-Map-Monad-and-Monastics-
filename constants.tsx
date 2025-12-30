
import React from 'react';
import { NodeData } from './types';

export const COLORS = {
  brandBlack: '#000000',
  brandWhite: '#FFFFFF',
  brandBlue: '#4A90E2', // Mid-blue
  brandYellow: '#F5A623', // Active CTA
  brandOrange: '#FF7F50', // Warmth/Important
  void: '#050505'
};

export interface LibraryItem {
  title: string;
  link: string;
  type: "Article" | "Video" | "Document" | "Podcast" | "Research";
  description: string;
  internalContent?: string;
}

export const LIBRARY_RESOURCES: LibraryItem[] = [
  { 
    title: "SeTs Ryu Explainer Video", 
    link: "https://youtu.be/NMrs8Cd6EfI", 
    type: "Video", 
    description: "A comprehensive video guide to the SeTs Ryu Monad methodology and practice system." 
  },
  { 
    title: "The Monad & Mindsets Blog", 
    link: "https://www.mindsets.eu/post/monad-to-mindsets", 
    type: "Article", 
    description: "Explore the deep connection between Gnostic theology and modern psychological mindsets." 
  },
  { 
    title: "Eye Of Gnosis Channel", 
    link: "https://www.youtube.com/@Eye_Of_Gnosis", 
    type: "Video", 
    description: "Our primary video resource for gnostic commentaries and visual meditations." 
  },
  { 
    title: "Gnostic Theology Overview", 
    link: "https://1e485c5d-728a-491a-ad8d-5ec1726259b6.usrfiles.com/ugd/1e485c_77c68cfdece340f5a1c9c4c968bc8d6e.pdf", 
    type: "Document", 
    description: "An internal whitepaper detailing the core principles of Monad theology.",
    internalContent: "This document provides an exhaustive overview of the Monad, the Demiurge, and the Archons. It explains the historical context of Gnosticism and how it parallels modern physics and simulation theory. Key takeaway: Gnosis is not taught; it is remembered."
  },
  { 
    title: "Chi Kung Active Meditation", 
    link: "https://static.wixstatic.com/mp3/1e485c_98a4eb6a86864d6c8eff2ab34f892aa5.m4a", 
    type: "Podcast", 
    description: "Audio commentary on the integration of physical movement and mental stillness.",
    internalContent: "Episode Transcript: In this session, we discuss the bio-energetic mastery of the Vagus nerve. By utilizing 'Sound in Body', we create a resonant frequency that shields the practitioner from cognitive loops inherent in the Matrix simulation."
  },
  { 
    title: "Cognitive Adaptations Research", 
    link: "https://1e485c5d-728a-491a-ad8d-5ec1726259b6.usrfiles.com/ugd/1e485c_8a27ae40ea9345448dd8721a14f2c048.pdf", 
    type: "Research", 
    description: "Scientific study on the evolutionary origins of agency detection.",
    internalContent: "Abstract: Our research suggests that religious belief is a byproduct of the Hypersensitive Agency Detection Device (HADD). By understanding this cognitive adaptation, practitioners can 're-hack' their neurology to differentiate between false agency (simulation scripts) and true Gnostic intent."
  }
];

export const MIND_MAP_DATA: NodeData = {
  id: 'monad',
  label: 'The Monad',
  type: 'hub',
  color: '#FFFFFF',
  description: 'The absolute source of all existence. Beyond the simulated layers of the material realm.',
  content: [
    "Understanding Gnosis as direct knowing vs. intellectual belief.",
    "The emanation of the Divine Spark from the Absolute.",
    "Recognizing the biological vessel as a temporary avatar.",
    "The Infinite Silence: Navigating the Pleroma."
  ],
  detailedInfo: {
    0: {
      title: "Gnosis vs. Belief",
      context: "In SeTs Ryu, Gnosis is the unmediated experience of the Absolute. Belief is a cognitive structure built on external authority, whereas Gnosis is an internal recognition of truth.",
      techniques: [
        "Silent contemplation of the 'I AM' presence.",
        "Reflecting on the nature of thought without judgment."
      ],
      mindsets: [
        "Shift from seeking answers to recognizing presence.",
        "Abandoning dogmatic reliance for direct experience."
      ]
    },
    1: {
      title: "The Divine Spark",
      context: "Every living being contains a fragment of the infinite Monad. This spark is the true essence, often buried under layers of biological and social conditioning.",
      techniques: [
        "Center-point breathing: focusing on the energetic core.",
        "Aura condensation: imagining the light within becoming denser."
      ],
      mindsets: [
        "Recognizing oneself as a localized point of the Infinite.",
        "Valuing internal divinity over external validation."
      ]
    },
    2: {
      title: "The Avatar Protocol",
      context: "The biological body is an interface, a 'costume' for the spark to interact with the material simulation. It functions on evolutionary survival code.",
      techniques: [
        "Objectified body scanning: viewing physical sensations as data.",
        "Pattern interrupt: acting against automatic biological impulses."
      ],
      mindsets: [
        "Seeing the body as a high-fidelity tool, not the self.",
        "Maintaining neutrality toward the avatar's aging and scripts."
      ]
    },
    3: {
      title: "Infinite Silence",
      context: "The Pleroma is the 'Fullness' or the ocean of silence from which all emanates. To return to the Monad is to merge back into this silence.",
      techniques: [
        "Entering the gap between thoughts.",
        "Meditation on the 'Empty Space' that contains all things."
      ],
      mindsets: [
        "Silence as power, not absence.",
        "Resting in the unmanifested as a source of strength."
      ]
    }
  },
  subNodes: [
    {
      id: 'matrix',
      label: 'The Matrix',
      type: 'planet',
      color: '#4ADE80',
      description: 'The simulated reality governed by cognitive scripts and emotional loops.',
      content: [
        "Identifying the Demiurge: The Architect.",
        "Archons as feedback loops.",
        "Breaking the cycle of Samsara."
      ],
      detailedInfo: {
        0: {
          title: "The Demiurge Architect",
          context: "The Demiurge is the 'blind' designer of the physical simulation. It is the personification of the ego's need to control and categorize reality.",
          techniques: [
            "Deconstructing daily 'necessities' as simulated scripts.",
            "Identifying the 'Inner Architect' that creates mental boxes."
          ],
          mindsets: [
            "Moving beyond the need for a hierarchical creator.",
            "Embracing the chaos that exists outside the Demiurge's order."
          ]
        },
        1: {
          title: "Archonic Feedback Loops",
          context: "Archons are psychological and energetic control mechanisms. They feed on fear, guilt, and the low-frequency vibrations of the simulation.",
          techniques: [
            "Emotional neutrality practice during high-stress triggers.",
            "Identifying repetitive fear-based thought patterns."
          ],
          mindsets: [
            "Refusing to provide 'Loosh' (emotional energy) to the system.",
            "Developing a thick, resonant field of calm."
          ]
        },
        2: {
          title: "Breaking Samsara",
          context: "Samsara is the closed loop of material reincarnation. Breaking it requires the realization that there is nowhere to 'go' but within.",
          techniques: [
            "Visualization of the exit from the planetary energy grid.",
            "Daily practice of non-attachment to the 'Character's' legacy."
          ],
          mindsets: [
            "Seeing the end of the simulation as a graduation.",
            "Letting go of the desire for material repetition."
          ]
        }
      },
      subNodes: [
        {
          id: 'archons',
          label: 'Archons',
          type: 'moon',
          color: '#86EFAC',
          description: 'Systems of control that feed on low-frequency emotional states.',
          content: ["Detection of external agency scripts."],
          detailedInfo: {
            0: {
              title: "Agency Script Detection",
              context: "Archons often hijack our 'Agency Detection' system, making us feel watched or manipulated to trigger fear.",
              techniques: [
                "Questioning the source of sudden paranoid thoughts.",
                "Reality-testing external signals for validity."
              ],
              mindsets: [
                "Critical thinking as a shield against the Archons.",
                "Sovereignty over one's own narrative."
              ]
            }
          }
        },
        {
          id: 'demiurge',
          label: 'Demiurge',
          type: 'moon',
          color: '#BBF7D0',
          description: 'The personification of the egoic world-building instinct.',
          content: ["Deconstructing the 'Blind God' archetype."],
          detailedInfo: {
            0: {
              title: "Blind God Deconstruction",
              context: "The archetype of the Demiurge is an ancient warning against absolute material power without spiritual connection.",
              techniques: [
                "Creative exercises that bypass the 'logical' ego.",
                "Exploring the limits of material control."
              ],
              mindsets: [
                "Connecting to the Pleroma above the Demiurge.",
                "Recognizing the 'I am the only god' thought as egoic trap."
              ]
            }
          }
        }
      ]
    },
    {
      id: 'chi-kung',
      label: 'Chi Kung',
      type: 'planet',
      color: '#3B82F6',
      description: 'Bio-energetic practices for neurological sovereignty and health.',
      content: [
        "Mastery of the Vagus nerve.",
        "Sound in Body resonance.",
        "The Microcosmic Orbit."
      ],
      detailedInfo: {
        0: {
          title: "Vagus Nerve Mastery",
          context: "The Vagus nerve is the physiological anchor for Gnosis. A strong vagal tone allows for deep calm in the face of Matrix stressors.",
          techniques: [
            "Diaphragmatic breathing with extended exhales.",
            "Cold exposure to stimulate the vagus highway."
          ],
          mindsets: [
            "Biological mastery leads to spiritual sovereignty.",
            "Using the body as a stabilizer for the mind."
          ]
        },
        1: {
          title: "Sound in Body",
          context: "Internal resonance creates a frequency shield. When the body hums with Chi, external scripts cannot easily penetrate the psyche.",
          techniques: [
            "Vocal toning targeting the three 'Dantians'.",
            "Mantra vibration felt in the bones."
          ],
          mindsets: [
            "The practitioner as a resonant instrument.",
            "Maintaining a high-frequency baseline."
          ]
        },
        2: {
          title: "The Microcosmic Orbit",
          context: "The circulation of Chi through the Governor and Conception vessels creates a self-sustaining loop of energy.",
          techniques: [
            "Visualizing light moving up the spine and down the front.",
            "Coordinating energy flow with the breath."
          ],
          mindsets: [
            "Infinite energy internal to the self.",
            "Balance between the ascending and descending forces."
          ]
        }
      },
      subNodes: [
        {
          id: 'breath',
          label: 'Breath',
          type: 'moon',
          color: '#60A5FA',
          description: 'The fuel for bio-energetic circulation and focus.',
          content: ["Pranic breathing techniques."],
          detailedInfo: {
            0: {
              title: "Pranic Breathing",
              context: "Prana is the subtle energy carried in the breath. It is the fuel for the Spark's work within the Avatar.",
              techniques: [
                "Box breathing (4-4-4-4) for focus.",
                "Skull-shining breath for clarity."
              ],
              mindsets: [
                "Breath as the bridge to the Absolute.",
                "Vitality as a conscious choice."
              ]
            }
          }
        },
        {
          id: 'vagus',
          label: 'Vagus',
          type: 'moon',
          color: '#93C5FD',
          description: 'The highway of the parasympathetic nervous system.',
          content: ["Toning the nerve through sound."],
          detailedInfo: {
            0: {
              title: "Vagal Toning",
              context: "The Vagus nerve can be trained like a muscle to return the body to a state of peace faster.",
              techniques: [
                "Humming 'Hee' while focusing on the throat.",
                "Softening the gaze to activate the parasympathetic state."
              ],
              mindsets: [
                "Control over the avatar's hardware.",
                "Sovereignty over the flight-or-fight reflex."
              ]
            }
          }
        }
      ]
    },
    {
      id: 'cognition',
      label: 'Cognitive Psych',
      type: 'planet',
      color: '#A855F7',
      description: 'Scientific study of behavioral patterns and neuroplasticity.',
      content: [
        "Neuroplasticity for Gnostic intent.",
        "HADD: Agency detection.",
        "Evolutionary psychology."
      ],
      detailedInfo: {
        0: {
          title: "Neuroplasticity & Intent",
          context: "Neuroplasticity is the brain's physical ability to rewire itself. Intent is the signal that directs this rewiring.",
          techniques: [
            "Focused visualization of new behavioral patterns.",
            "Repetition of Gnostic affirmations to strengthen neural pathways."
          ],
          mindsets: [
            "The brain as malleable clay.",
            "Confidence in the power of directed thought."
          ]
        },
        1: {
          title: "HADD & Agency Bias",
          context: "Hypersensitive Agency Detection Device (HADD) is a survival bias that makes us see intent in random events.",
          techniques: [
            "Objective logic checks for 'paranormal' occurrences.",
            "Tracing the evolutionary root of fear-based patterns."
          ],
          mindsets: [
            "Skepticism as a spiritual virtue.",
            "Clarity over superstitious fear."
          ]
        },
        2: {
          title: "Evolutionary Psych",
          context: "Understanding the survival scripts of our ancestors helps us recognize the 'Hardware' of the Matrix.",
          techniques: [
            "Analyzing social status drives.",
            "Identifying the 'survival' root of anxiety."
          ],
          mindsets: [
            "Compassion for the animal body's history.",
            "Transcending ancestral limitations."
          ]
        }
      },
      subNodes: [
        {
          id: 'neuroplasticity',
          label: 'Neuroplasticity',
          type: 'moon',
          color: '#C084FC',
          description: 'The biological mechanism of change and growth.',
          content: ["Habit loop deconstruction."],
          detailedInfo: {
            0: {
              title: "Habit Loop Deconstruction",
              context: "Habits are formed by the Cue-Routine-Reward cycle. They are the automation of the Avatar.",
              techniques: [
                "Journaling cues to identify triggers.",
                "Consciously choosing a new routine for a known reward."
              ],
              mindsets: [
                "Patience with biological rewiring.",
                "Persistence in establishing Gnostic habits."
              ]
            }
          }
        },
        {
          id: 'hadd',
          label: 'HADD',
          type: 'moon',
          color: '#D8B4FE',
          description: 'The cognitive bias that creates false gods and demons.',
          content: ["Identifying agency in random events."],
          detailedInfo: {
            0: {
              title: "Identifying Agency",
              context: "Recognizing when our brains are tricking us into seeing ghosts or conspiracies.",
              techniques: [
                "Mindfulness during patterns of paranoia.",
                "Seeking naturalistic explanations first."
              ],
              mindsets: [
                "Intellectual integrity.",
                "Mental hygiene in the information age."
              ]
            }
          }
        }
      ]
    }
  ]
};

export const ICONS = {
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"></path></svg>
  ),
  Mic: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
  ),
  ChevronRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
  ),
  Compare: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"></path><path d="M8 3H3v5"></path><path d="M21 3 3 21"></path><path d="m16 21 5-5"></path><path d="M8 21 3 16"></path></svg>
  ),
  Fullscreen: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
  ),
  Pause: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
  ),
  Play: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  ),
  Share: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
  )
};
