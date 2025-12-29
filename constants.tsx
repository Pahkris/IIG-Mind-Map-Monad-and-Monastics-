
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
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
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
    link: "#internal", 
    type: "Document", 
    description: "An internal whitepaper detailing the core principles of Monad theology.",
    internalContent: "This document provides an exhaustive overview of the Monad, the Demiurge, and the Archons. It explains the historical context of Gnosticism and how it parallels modern physics and simulation theory. Key takeaway: Gnosis is not taught; it is remembered."
  },
  { 
    title: "Chi Kung Active Meditation", 
    link: "#internal", 
    type: "Podcast", 
    description: "Audio commentary on the integration of physical movement and mental stillness.",
    internalContent: "Episode Transcript: In this session, we discuss the bio-energetic mastery of the Vagus nerve. By utilizing 'Sound in Body', we create a resonant frequency that shields the practitioner from cognitive loops inherent in the Matrix simulation."
  },
  { 
    title: "Cognitive Adaptations Research", 
    link: "#internal", 
    type: "Research", 
    description: "Scientific study on the evolutionary origins of agency detection.",
    internalContent: "Abstract: Our research suggests that religious belief is a byproduct of the Hypersensitive Agency Detection Device (HADD). By understanding this cognitive adaptation, practitioners can 're-hack' their neurology to differentiate between false agency (simulation scripts) and true Gnostic intent."
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
    'Practical/Physical monastic practices: visualization methods, symbols and rituals.',
    'Mind Skills: techniques such as perspective reframing and mental shifts.',
    'Evolutionary Context: Religious belief as a byproduct of cognitive adaptations.'
  ],
  detailedInfo: {
    0: {
      title: 'Monastic Visualizations',
      explanation: 'Visualization is the bridge between the material and the Monad. By focusing on sacred symbols, one aligns their neuro-frequency with the void.',
      exercises: ['Vagus Nerve Stimulation (Humming)', 'Golden Ratio Breathing', 'Infinite Point Visualization']
    },
    1: {
      title: 'Mental Reframing',
      explanation: 'Transformational psychology requires breaking the standard algorithm of thought. By reframing suffering as "data", we detach from the Demiurge.',
      exercises: ['The Observer Shift', 'Narrative Deconstruction', 'Pattern Interruption']
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
        1: {
          title: 'The Archon Jailers',
          explanation: 'Archons are parasitic frequencies that maintain the simulation by inducing emotional loops.',
          exercises: ['Fear-Harvest Interruption', 'Dream Sovereignty Training']
        }
      },
      subNodes: [
        { id: 'archons', label: 'Archons', type: 'moon', color: '#888', description: 'Parasitic entities feeding on fear.', content: ['Invisibility mechanics', 'Thought insertion protocols'] },
        { id: 'demiurge', label: 'Demiurge', type: 'moon', color: '#666', description: 'The false creator.', content: ['Blind Architect principles'] },
        { id: 'awakening', label: 'Awakening', type: 'moon', color: COLORS.brandYellow, description: 'Direct knowing (Gnosis).', content: ['Remembrance techniques'] }
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
          title: 'Vagus Nerve Mastery',
          explanation: 'The Vagus nerve is the physical interface of the parasympathetic system. Activation triggers the "rest and Gnosis" state.',
          exercises: ['Cold exposure grounding', 'Diaphragmatic resonance']
        }
      },
      subNodes: [
        { id: 'breath', label: 'Breathwork', type: 'moon', color: '#ff9a76', description: 'Gateway to the autonomic system.', content: ['Bellows breath mechanics'] },
        { id: 'vagus', label: 'Vagus Nerve', type: 'moon', color: '#ffb38a', description: 'The physical interface of meditation.', content: ['Parasympathetic tone training'] },
        { id: 'meditation', label: 'Active Med.', type: 'moon', color: '#ffd1bc', description: 'Moving with focus.', content: ['Stance work fundamentals'] }
      ]
    },
    {
      id: 'cog-psych',
      label: 'Cognitive Psych',
      type: 'planet',
      color: COLORS.brandYellow,
      description: 'Modern understanding of the human mind.',
      content: ['Agency detection bias.', 'Theory of Mind applications.', 'Neuroplasticity mechanics.'],
      subNodes: [
        { id: 'agency', label: 'Agency Detection', type: 'moon', color: '#f7d794', description: 'The evolved tendency to see intent.', content: ['Hyperactive HADD analysis'] },
        { id: 'reframing', label: 'Reframing', type: 'moon', color: '#f8c291', description: 'Neural rewiring via perspective.', content: ['Cognitive reappraisal'] },
        { id: 'metacognition', label: 'Metacognition', type: 'moon', color: '#e77f67', description: 'The Observer effect.', content: ['Thinking about thinking'] }
      ]
    }
  ]
};
