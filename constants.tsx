
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

// Define the central hub data structure used by SolarSystem
export const MIND_MAP_DATA: NodeData = {
  id: 'monad',
  label: 'The Monad',
  type: 'hub',
  color: '#FFFFFF',
  description: 'The absolute source of all existence. Beyond the simulated layers of the material realm.',
  content: [
    "Understanding Gnosis as direct knowing vs. intellectual belief.",
    "The emanation of the Divine Spark from the Absolute.",
    "Recognizing the biological vessel as a temporary avatar."
  ],
  detailedInfo: {
    0: {
      title: "The Essence of Gnosis",
      explanation: "Gnosis is an internal awakening to the reality of the Monad. It is not something that can be taught through external scriptures alone; it is a remembrance of one's origin before the simulation began.",
      exercises: [
        "Internal Silence: Observing thoughts without identifying as the thinker.",
        "The Mirror of the Soul: Reflecting on the source of consciousness."
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
        "Identifying the Demiurge: The Architect of limited perception.",
        "Archons as feedback loops in the human psyche.",
        "Breaking the cycle of Samsara through awareness."
      ],
      subNodes: [
        {
          id: 'archons',
          label: 'Archons',
          type: 'moon',
          color: '#F87171',
          description: 'Systems of control that feed on low-frequency emotional states.',
          content: ["Detection of external agency scripts."]
        },
        {
          id: 'demiurge',
          label: 'Demiurge',
          type: 'moon',
          color: '#FB923C',
          description: 'The personification of the egoic world-building instinct.',
          content: ["Deconstructing the 'Blind God' archetype."]
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
        "Mastery of the Vagus nerve for emotional regulation.",
        "Sound in Body: Using resonance to shield against external frequencies.",
        "The Microcosmic Orbit as a biological energy loop."
      ],
      detailedInfo: {
        0: {
          title: "Vagus Nerve Mastery",
          explanation: "The Vagus nerve is the physiological anchor for the SeTs Ryu practice. By strengthening its tone, we can maintain the 'Sound in Body' state even under external psychological pressure.",
          exercises: [
            "Resonant Chanting: Low tones to stimulate the thoracic cavity.",
            "Breath Control: 4-7-8 timing to reset the nervous system."
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
          content: ["Pranic breathing techniques."]
        },
        {
          id: 'vagus',
          label: 'Vagus',
          type: 'moon',
          color: '#93C5FD',
          description: 'The highway of the parasympathetic nervous system.',
          content: ["Toning the nerve through cold exposure and sound."]
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
        "Neuroplasticity: Rewiring the avatar for Gnostic intent.",
        "HADD: The Hypersensitive Agency Detection Device.",
        "Evolutionary psychology and its role in the simulation."
      ],
      subNodes: [
        {
          id: 'neuroplasticity',
          label: 'Neuroplasticity',
          type: 'moon',
          color: '#C084FC',
          description: 'The biological mechanism of change and growth.',
          content: ["Habit loop deconstruction."]
        },
        {
          id: 'hadd',
          label: 'HADD',
          type: 'moon',
          color: '#D8B4FE',
          description: 'The cognitive bias that creates false gods and demons.',
          content: ["Identifying agency in random events."]
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
  )
};
