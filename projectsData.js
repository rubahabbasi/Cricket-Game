/**
 * projectsData.js
 * Centralized Spatial Architecture & AI Full-Stack Projects Data
 * Supports localStorage persistence, JSON Export/Import, and real-time CMS syncing.
 */

const STORAGE_KEY = 'spatial_ai_portfolio_projects';

// Initial Style-Locked Project Showcase
const INITIAL_PROJECTS = [
  {
    id: 'proj-01',
    title: 'Cliffside Brutalist Villa',
    subtitle: 'Parametric Concrete & Structural Glass Cantilever',
    category: '3D Architecture',
    badge: 'ARCHITECTURAL BIM / 3D',
    image: 'Gemini_Generated_Image_tdd8iutdd8.jpg',
    wireframeImage: 'Gemini_Generated_Image_tdd8iutdd8.jpg',
    tags: ['Rhino 8', 'Grasshopper', 'Blender 4.2', 'V-Ray 6', 'Unreal Engine 5.4'],
    metrics: {
      primary: 'Polygon Count: 2.8M',
      secondary: 'Solar Analysis: 94.2%',
      specs: 'Cantilever Span: 18.5m'
    },
    demoUrl: 'https://github.com',
    codeUrl: 'https://github.com',
    featured: true,
    description: 'A cliffside luxury residence perched over deep oceanic terrain. Engineered with algorithmic sun-shading louvers via Grasshopper, dual-pane electrochromic structural glass, and photorealistic Octane lighting that blends warm amber interiors with cyber-cyan structural reinforcement wireframes.'
  },
  {
    id: 'proj-02',
    title: 'Spatial AI Dashboard & Node Matrix',
    subtitle: 'Real-Time Building Analytics & Digital Twin Telemetry',
    category: 'AI Web App',
    badge: 'AI FULL-STACK / WEBGL',
    image: '65465.jpg',
    wireframeImage: '65465.jpg',
    tags: ['Next.js 15', 'Three.js r128', 'Python FastAPI', 'WebAudio API', 'LangChain', 'WebGL 2.0'],
    metrics: {
      primary: 'Inference Latency: 14ms',
      secondary: 'Data Points: 50K/sec',
      specs: '60 FPS Instanced Meshes'
    },
    demoUrl: 'https://github.com',
    codeUrl: 'https://github.com',
    featured: true,
    description: 'A multi-layered 3D holographic management dashboard displaying real-time IoT spatial metrics, structural thermal gradients, and deep learning neural graphs. Built with instanced WebGL geometry and WebSockets streaming 50,000 live telemetry nodes at a locked 60 FPS.'
  },
  {
    id: 'proj-03',
    title: 'Smart-City Skyscraper Digital Twin',
    subtitle: 'Aerodynamic Fluid Simulation & Energy Optimization',
    category: 'Digital Twin',
    badge: 'HYBRID 3D + AI TWIN',
    image: 'Gemini_Generated_Image_tdd8iutdd8oioi.jpg',
    wireframeImage: 'Gemini_Generated_Image_tdd8iutdd8oioi.jpg',
    tags: ['Unreal Engine 5.4', 'WebGL Shaders', 'Three.js', 'Python CFD', 'IoT Telemetry'],
    metrics: {
      primary: 'Aerodynamic Drag: -18.4%',
      secondary: 'Draw Calls: 24',
      specs: 'Digital Twin Sync: Real-Time'
    },
    demoUrl: 'https://github.com',
    codeUrl: 'https://github.com',
    featured: true,
    description: 'An interactive 84-story skyscraper digital twin featuring double-helix aerodynamic channels and integrated wind turbines. Incorporates real-time computational fluid dynamics (CFD) neural surrogate models that dynamically recalculate vortex shedding in the browser.'
  },
  {
    id: 'proj-04',
    title: 'Parametric Neural Pavilion',
    subtitle: 'Generative Biomimetic Canopy & Spatial Soundfield',
    category: 'WebGL / Spatial',
    badge: 'GENERATIVE ARCHITECTURE',
    image: 'Gemini_Generated_Image_tdd8iutdd898798.jpg',
    wireframeImage: 'Gemini_Generated_Image_tdd8iutdd898798.jpg',
    tags: ['Three.js', 'Custom GLSL', 'Grasshopper Python', 'WebGPU', 'Parametric Physics'],
    metrics: {
      primary: 'Voronoi Cells: 1,420',
      secondary: 'Render Engine: WebGL 2.0',
      specs: 'Acoustic Clarity: +3.2dB'
    },
    demoUrl: 'https://github.com',
    codeUrl: 'https://github.com',
    featured: false,
    description: 'A biological-inspired architectural shell formed by recursive Voronoi relaxation and acoustic ray-tracing. Interactive WebGL shaders simulate flowing cyan synaptic currents across polished metallic amber ribs in a dark void studio.'
  }
];

// Helper functions for State & Persistence
function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProjects(INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PROJECTS;
  } catch (err) {
    console.warn('[Studio CMS] Could not load localStorage projects, defaulting to preset:', err);
    return INITIAL_PROJECTS;
  }
}

function saveProjects(projectsList) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsList));
    window.dispatchEvent(new CustomEvent('projectsUpdated', { detail: projectsList }));
  } catch (err) {
    console.error('[Studio CMS] Error saving to localStorage:', err);
  }
}

function addProject(newProject) {
  const current = loadProjects();
  const projectWithId = {
    ...newProject,
    id: 'proj-' + Date.now(),
    featured: false
  };
  const updated = [projectWithId, ...current];
  saveProjects(updated);
  return projectWithId;
}

function deleteProject(id) {
  const current = loadProjects();
  const updated = current.filter(p => p.id !== id);
  saveProjects(updated);
  return updated;
}

function resetToDefaultProjects() {
  saveProjects(INITIAL_PROJECTS);
  return INITIAL_PROJECTS;
}

function exportProjectsAsJSON() {
  const data = loadProjects();
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `spatial_ai_projects_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importProjectsFromJSON(jsonText) {
  try {
    const parsed = JSON.parse(jsonText);
    if (!Array.isArray(parsed)) throw new Error('Root JSON must be an array of project objects.');
    saveProjects(parsed);
    return { success: true, count: parsed.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Expose on global window object for universal vanilla browser compatibility
window.ProjectsCMS = {
  INITIAL_PROJECTS,
  loadProjects,
  saveProjects,
  addProject,
  deleteProject,
  resetToDefaultProjects,
  exportProjectsAsJSON,
  importProjectsFromJSON
};
