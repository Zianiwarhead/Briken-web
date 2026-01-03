export const PRODUCTS = [
  // --- 1. Fire Extinguishers ---
  { id: 'ext-1', name: 'APW Water Extinguisher', category: 'Extinguishers', spec: 'Air-Pressurized Water' },
  { id: 'ext-2', name: 'Water Mist Extinguisher', category: 'Extinguishers', spec: 'Fine Mist Technology' },
  { id: 'ext-3', name: 'AFFF Foam Extinguisher', category: 'Extinguishers', spec: 'Aqueous Film-Forming Foam' },
  { id: 'ext-4', name: 'ABC Dry Powder', category: 'Extinguishers', spec: 'Multipurpose Chemical' },
  { id: 'ext-5', name: 'CO2 Extinguisher', category: 'Extinguishers', spec: 'Carbon Dioxide (Class B/Electrical)' },
  { id: 'ext-6', name: 'Wet Chemical Extinguisher', category: 'Extinguishers', spec: 'Class K (Kitchen)' },
  { id: 'ext-7', name: 'Halotron Clean Agent', category: 'Extinguishers', spec: 'Residue-Free' },
  { id: 'ext-8', name: 'Metal Fire Extinguisher', category: 'Extinguishers', spec: 'Class D (Magnesium/Lithium)' },

  // --- 2. Suppression Systems ---
  { id: 'sup-1', name: 'Wet Pipe Sprinkler System', category: 'Suppression Systems', spec: 'Standard Commercial' },
  { id: 'sup-2', name: 'Pre-action Sprinkler System', category: 'Suppression Systems', spec: 'Double Interlock' },
  { id: 'sup-3', name: 'FM-200 Flooding System', category: 'Suppression Systems', spec: 'Gas Suppression' },
  { id: 'sup-4', name: 'Kitchen Hood System', category: 'Suppression Systems', spec: 'Wet Chemical Auto-Release' },
  { id: 'sup-5', name: 'CAFS Foam System', category: 'Suppression Systems', spec: 'Compressed Air Foam' },

  // --- 3. Detection & Alarm ---
  { id: 'det-1', name: 'Optical Smoke Detector', category: 'Detection & Alarm', spec: 'Photoelectric' },
  { id: 'det-2', name: 'Rate-of-Rise Heat Detector', category: 'Detection & Alarm', spec: 'Thermal Sensing' },
  { id: 'det-3', name: 'UV/IR Flame Detector', category: 'Detection & Alarm', spec: 'Industrial Grade' },
  { id: 'det-4', name: 'Addressable Control Panel', category: 'Detection & Alarm', spec: 'Intelligent Fire Panel' },
  { id: 'det-5', name: 'Manual Call Point', category: 'Detection & Alarm', spec: 'Break Glass / Pull Station' },
  { id: 'det-6', name: 'Gas Leak Detector', category: 'Detection & Alarm', spec: 'Flammable Gas Sensor' },

  // --- 4. Tools & Equipment ---
  { id: 'tool-1', name: 'Fireman Axe', category: 'Tools & Equipment', spec: 'Heavy Duty' },
  { id: 'tool-2', name: 'Halligan Bar', category: 'Tools & Equipment', spec: 'Forcible Entry Tool' },
  { id: 'tool-3', name: 'Thermal Imaging Camera', category: 'Tools & Equipment', spec: 'Heat Signature Search' },
  { id: 'tool-4', name: 'Fire Blanket', category: 'Tools & Equipment', spec: 'Wall Mounted' },
  { id: 'tool-5', name: 'Hydraulic Rescue Tool', category: 'Tools & Equipment', spec: 'Jaws of Life' },

  // --- 5. Hoses & Hydrants ---
  { id: 'hose-1', name: 'Layflat Fire Hose', category: 'Hoses & Hydrants', spec: 'Canvas - 30m' },
  { id: 'hose-2', name: 'Fire Hydrant Valve', category: 'Hoses & Hydrants', spec: '2.5" Brass Landing Valve' },
  { id: 'hose-3', name: 'Hose Reel Drum', category: 'Hoses & Hydrants', spec: 'Wall Mounted - 30m' },
  { id: 'hose-4', name: 'Suction Hose', category: 'Hoses & Hydrants', spec: 'Heavy Duty Reinforced' },

  // --- 6. PPE ---
  { id: 'ppe-1', name: 'Firefighter Helmet', category: 'PPE', spec: 'High Temp Resistant' },
  { id: 'ppe-2', name: 'Turnout Gear', category: 'PPE', spec: 'Coat & Pants (Nomex/PBI)' },
  { id: 'ppe-3', name: 'SCBA Set', category: 'PPE', spec: 'Self-Contained Breathing Apparatus' },
  { id: 'ppe-4', name: 'Fire Boots', category: 'PPE', spec: 'Steel Toe & Shank' },
  { id: 'ppe-5', name: 'Escape Hood', category: 'PPE', spec: 'Smoke Filtration Mask' },

  // --- 7. Emergency & Signage ---
  { id: 'sign-1', name: 'Exit Sign', category: 'Signage', spec: 'Illuminated / Photoluminescent' },
  { id: 'sign-2', name: 'Emergency Light', category: 'Signage', spec: 'Battery Backup' },
  { id: 'sign-3', name: 'Fire Action Notice', category: 'Signage', spec: 'Standard Instruction' },

  // --- 8. Vehicles & Pumps ---
  { id: 'veh-1', name: 'Portable Fire Pump', category: 'Vehicles & Pumps', spec: 'High Pressure / Petrol' },
  { id: 'veh-2', name: 'Foam Trailer', category: 'Vehicles & Pumps', spec: 'Mobile Foam Unit' },
  
  // --- 9. Specialized ---
  { id: 'spec-1', name: 'Fireproof Safe', category: 'Specialized', spec: 'Document Protection' },
  { id: 'spec-2', name: 'Drip Torch', category: 'Specialized', spec: 'Controlled Burn Tool' },
  { id: 'spec-3', name: 'Flame Arrester', category: 'Specialized', spec: 'Pipeline Safety' },
];

export const CATEGORIES = [
  'All',
  'Extinguishers',
  'Suppression Systems',
  'Detection & Alarm',
  'Tools & Equipment',
  'Hoses & Hydrants',
  'PPE',
  'Signage',
  'Vehicles & Pumps',
  'Specialized'
];
