
import React from 'react';

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
    link: "https://video.wixstatic.com/video/1e485c_d79f7140e2ea4c9ca8b9e0cd5efed9d2/1080p/mp4/file.mp4", 
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
  },
  {
    title: "The Monad Treatise",
    link: "https://1e485c5d-728a-491a-ad8d-5ec1726259b6.usrfiles.com/ugd/1e485c_5559b2cce019405793c9f6b3981098ca.pdf",
    type: "Document",
    description: "Original source text on the nature of the Absolute Monad."
  },
  {
    title: "Gnostic Commentary Source",
    link: "https://1e485c5d-728a-491a-ad8d-5ec1726259b6.usrfiles.com/ugd/1e485c_e784ac9d3e8c4fcfb13ff7520b9a4785.pdf",
    type: "Document",
    description: "Secondary source commentary on the intersection of faith and biology."
  }
];

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
  )
};

export const MIND_MAP_DATA: any = {
  id: 'monad',
  label: 'The Monad',
  type: 'hub',
  color: COLORS.brandWhite,
  description: 'The Absolute One, the eternal source, the ultimate silence.',
  content: [
    'Practical/Physical monastic practices: visualization, symbols, rituals.',
    'Mind Skills and Mental Shifts: perspective reframing techniques.',
    'Evolutionary and Developmental context: Christianity and Modern Psychology.'
  ],
  detailedInfo: {
    0: {
      title: 'Practical Monasticism',
      explanation: 'Somatic alignment through specific physical protocols designed to stimulate the vagus nerve and resonant frequencies within the body. These rituals bridge the gap between physical existence and spiritual essence.',
      exercises: ['Vagus Nerve Humming (Chanting)', 'Symbolic Visualization of the Monad', 'Sacred Ritual Cleansing']
    },
    1: {
      title: 'Mental Reframing',
      explanation: 'Advanced transformational psychology techniques that shift the observer status of the mind. By deconstructing standard narrative loops, the student moves from a reactive state to a sovereign state.',
      exercises: ['Narrative Deconstruction', 'Perspective Shift Meditation', 'Algorithm Interruption']
    },
    2: {
      title: 'The Evolutionary Context',
      explanation: 'A comparative study of Christianity as a spiritual practice versus modern psychological theories. We explore agency detection and the social theory of mind as evolutionary adaptations that facilitate spiritual belief.',
      exercises: ['Agency Detection Mapping', 'Social Mind Deconstruction', 'Historical Gnostic Comparison']
    }
  },
  subNodes: [
    {
      id: 'matrix',
      label: 'The Matrix',
      type: 'planet',
      color: COLORS.brandBlue,
      description: 'The simulated reality constructed by the Demiurge.',
      content: ['Architectural design of illusion.', 'Archons: Jailers of consciousness.', 'Breaking the algorithm.'],
      detailedInfo: {
        0: {
          title: 'Architectural Illusion',
          explanation: 'The Matrix is built on geometric and digital-like structures that mimic reality to harvest energy through emotional stimulation.',
          exercises: ['Geometric Breakdown Meditation', 'Digital Glitch Detection', 'Symmetry Identification']
        },
        1: {
          title: 'The Archon Jailers',
          explanation: 'Archons are parasitic frequencies that maintain the simulation by inducing emotional loops and parasitic thought patterns.',
          exercises: ['Fear-Harvest Interruption', 'Dream Sovereignty Training', 'Parasitic Thought Labeling']
        },
        2: {
          title: 'Algorithm Breakers',
          explanation: 'Systematic techniques to exit the predictive behavior patterns analyzed by the Matrix architecture.',
          exercises: ['Random Action Protocol', 'predictive Loop Identification', 'Sovereign Intent Activation']
        }
      },
      subNodes: [
        { id: 'archons', label: 'Archons', type: 'moon', color: '#79B0ED', description: 'Parasitic entities feeding on fear.', content: ['Invisibility mechanics', 'Thought insertion protocols'], detailedInfo: {
          0: { title: 'Invisibility Mechanics', explanation: 'How parasites hide behind normalized thoughts.', exercises: ['Silent Observation'] },
          1: { title: 'Insertion Protocols', explanation: 'Identifying thoughts that are not yours.', exercises: ['Inner Voice Auditing'] }
        }},
        { id: 'demiurge', label: 'Demiurge', type: 'moon', color: '#A8CFF8', description: 'The false creator.', content: ['Blind Architect principles'], detailedInfo: {
          0: { title: 'The Blind Architect', explanation: 'The logic of a creator who cannot see the source.', exercises: ['Limit Identification'] }
        }},
        { id: 'awakening', label: 'Awakening', type: 'moon', color: '#D7EEFF', description: 'Direct knowing (Gnosis).', content: ['Remembrance techniques'], detailedInfo: {
          0: { title: 'Remembrance', explanation: 'Gnosis as a memory of the original state.', exercises: ['Ancestral Memory Recall'] }
        }}
      ]
    },
    {
      id: 'chi-kung',
      label: 'Chi Kung',
      type: 'planet',
      color: COLORS.brandOrange,
      description: 'Active meditation and energy cultivation.',
      content: ['Vagus nerve activation.', 'Microcosmic orbit mastery.', 'Sound in body, sound in mind.'],
      detailedInfo: {
        0: {
          title: 'Vagus Nerve Activation',
          explanation: 'The Vagus nerve is the physical interface of the parasympathetic system. Activation triggers the "rest and Gnosis" state.',
          exercises: ['Cold exposure grounding', 'Diaphragmatic resonance', 'Ocular Nerve Relaxation']
        },
        1: {
          title: 'The Microcosmic Orbit',
          explanation: 'Circulating bio-electrical energy through the governing and conception vessels to harmonize the internal solar system.',
          exercises: ['Energy Circulation Breath', 'Spinal Channel Visualization', 'Lower Dantian Storage']
        },
        2: {
          title: 'Bio-Resonant Sound',
          explanation: 'Using vocal and internal resonance to match the frequencies of the Monad, creating a harmonic shield around the consciousness.',
          exercises: ['Bone Resonance Chanting', 'Cellular Vibration Focus', 'Harmonic Alignment']
        }
      },
      subNodes: [
        { id: 'breath', label: 'Breathwork', type: 'moon', color: '#FF9F7C', description: 'Gateway to the autonomic system.', content: ['Bellows breath mechanics'], detailedInfo: {
          0: { title: 'Bellows Breath', explanation: 'Rapid oxygenation and energy moving.', exercises: ['3 Rounds of Fire'] }
        }},
        { id: 'vagus', label: 'Vagus Nerve', type: 'moon', color: '#FFBFA8', description: 'The physical interface of meditation.', content: ['Parasympathetic tone training'], detailedInfo: {
          0: { title: 'Tone Training', explanation: 'Increasing resilience through calm.', exercises: ['Slow Exhale Holding'] }
        }},
        { id: 'meditation', label: 'Active Med.', type: 'moon', color: '#FFDFD4', description: 'Moving with focus.', content: ['Stance work fundamentals'], detailedInfo: {
          0: { title: 'Stance Work', explanation: 'Rooting as a spiritual anchor.', exercises: ['Horse Stance 3-min'] }
        }}
      ]
    },
    {
      id: 'cog-psych',
      label: 'Cognitive Psych',
      type: 'planet',
      color: COLORS.brandYellow,
      description: 'Modern understanding of the human mind.',
      content: ['Agency detection bias.', 'Theory of Mind applications.', 'Neuroplasticity mechanics.'],
      detailedInfo: {
        0: {
          title: 'Agency Detection Bias',
          explanation: 'The evolved tendency to see intent and design even where only stochastic processes exist—often used by the Matrix to hide.',
          exercises: ['Pattern/Noise Discrimination', 'Intent Attribution Auditing', 'Pseudo-Design Mapping']
        },
        1: {
          title: 'Social Theory of Mind',
          explanation: 'Understanding how our brains model other people—and how this modeling is hijacked by religious and digital entities.',
          exercises: ['Empathy Shielding', 'Simulated Interaction Analysis', 'Boundary Reinforcement']
        },
        2: {
          title: 'Practical Neuroplasticity',
          explanation: 'Re-wiring the neural architecture through repeated sovereign focus and active meditation.',
          exercises: ['New Habit Etching', 'Focus Sustain Challenge', 'Synaptic Pruning Meditation']
        }
      },
      subNodes: [
        { id: 'agency', label: 'Agency Detection', type: 'moon', color: '#F7BA55', description: 'The evolved tendency to see intent.', content: ['Hyperactive HADD analysis'], detailedInfo: {
          0: { title: 'HADD Analysis', explanation: 'Why we see ghosts and gods in the shadows.', exercises: ['Visual Noise Testing'] }
        }},
        { id: 'reframing', label: 'Reframing', type: 'moon', color: '#F9CE87', description: 'Neural rewiring via perspective.', content: ['Cognitive reappraisal'], detailedInfo: {
          0: { title: 'Cognitive Reappraisal', explanation: 'Changing emotion by changing definition.', exercises: ['Reframing Negative Input'] }
        }},
        { id: 'metacognition', label: 'Metacognition', type: 'moon', color: '#FBE2B9', description: 'The Observer effect.', content: ['Thinking about thinking'], detailedInfo: {
          0: { title: 'The Meta Observer', explanation: 'Watching the watcher.', exercises: ['Secondary Awareness Drill'] }
        }}
      ]
    }
  ]
};
