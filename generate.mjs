import 'dotenv/config';
import fs from 'fs';
import sharp from 'sharp';
import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = process.env.GITHUB_ACTOR || 'Md-Zayan00';

const USER_DATA = {
  name: 'MD ZAYAN',
  githubHandle: 'MD-ZAYAN00',
  title: 'FULL-STACK ARCHITECT',
  subRole: 'SOFTWARE ENGINEER // NEXUS-9 SYS',
  secCode: '25805-ZY-2049',
  
  languages: ['RUST', 'TS', 'JS', 'PYTHON'],
  learning: ['C/C++', 'JAVA'],
  frontend: ['NEXT.JS', 'REACT', 'TAILWIND', 'SHADCN', 'VITE'],
  backend: ['NODE.JS', 'TAURI'],
  database: ['MYSQL', 'SQLITE'],
  infra: ['GITHUB ACTIONS'],

  socials: {
    twitter: '@Zojka00',
    instagram: '@zajko00',
    linkedin: 'md-zayan-95315b40b',
  },
  directivesRaw: 'AUTHORIZATION GRANTED TO CONSTRUCT & DEPLOY DISTRIBUTED ARCHITECTURES. OPERATOR CERTIFIED FOR HIGH-CONCURRENCY SQL UNDER 2026 PROTOCOLS ACT.'
};

// Calibrated line wrapper for large-scale typography
function wrapText(text, maxChars = 32) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current += ' ' + word;
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

// Pure Black & White 1-Bit Dithered Pixel Art
async function processDitheredAvatar(imageBuffer, width = 215, height = 260) {
  try {
    const processedBuffer = await sharp(imageBuffer)
      .resize(width, height, { fit: 'cover', position: 'center' })
      .grayscale()
      .normalize()
      .modulate({ brightness: 1.15, contrast: 1.9 })
      .sharpen({ sigma: 1.5 })
      .png({
        palette: true,
        colours: 2,
        dither: 1.0
      })
      .toBuffer();

    return `data:image/png;base64,${processedBuffer.toString('base64')}`;
  } catch (err) {
    console.warn('Avatar processing fallback:', err.message);
    try {
      const fallback = await sharp(imageBuffer)
        .resize(width, height, { fit: 'cover', position: 'center' })
        .grayscale()
        .normalize()
        .png()
        .toBuffer();
      return `data:image/png;base64,${fallback.toString('base64')}`;
    } catch (e) {
      return null;
    }
  }
}

// Fetch avatar directly from the user's live GitHub profile
async function fetchAvatarBuffer() {
  const headers = { 'User-Agent': 'Badge-Gen' };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    // 1. Fetch live avatar URL from GitHub API
    console.log(`Querying GitHub API for ${USERNAME}'s profile picture...`);
    const res = await axios.get(`https://api.github.com/users/${USERNAME}`, { headers });
    
    if (res.data?.avatar_url) {
      const imgRes = await axios.get(res.data.avatar_url, { responseType: 'arraybuffer' });
      return Buffer.from(imgRes.data);
    }
  } catch (err) {
    console.warn(`GitHub API request failed (${err.message}), attempting direct avatar endpoint...`);
  }

  try {
    // 2. Fallback directly to public raw redirect: https://github.com/<username>.png
    const fallbackUrl = `https://github.com/${USERNAME}.png?size=460`;
    const imgRes = await axios.get(fallbackUrl, { responseType: 'arraybuffer' });
    return Buffer.from(imgRes.data);
  } catch (e) {
    console.error('Could not fetch GitHub profile picture:', e.message);
    return null;
  }
}

function renderBadgeSvg(avatarBase64, theme = 'dark') {
  const isDark = theme === 'dark';

  const palette = {
    bg: isDark ? '#080507' : '#fcf5f5',
    card: isDark ? '#0f090c' : '#f5e8e8',
    panel: isDark ? '#0a0608' : '#ebdada',
    border: isDark ? '#3d161d' : '#cca0a6',
    borderDim: isDark ? '#230b10' : '#e0c2c6',
    primary: isDark ? '#fbebee' : '#1f0d11',
    redAccent: isDark ? '#ff3b56' : '#dc2626',
    redBright: isDark ? '#ff7083' : '#ef4444',
    dim: isDark ? '#80404a' : '#995c64',
    scanline: isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.08)'
  };

  const wrappedDirectives = wrapText(USER_DATA.directivesRaw, 33);

  return `<svg width="1120" height="660" viewBox="0 0 1120 660" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- CRT Scanlines Pattern -->
    <pattern id="scanlines" width="100" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="100" y2="0" stroke="${palette.scanline}" stroke-width="1.6" />
    </pattern>

    <!-- Laser Beam Vertical Flare -->
    <linearGradient id="beamGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${palette.redAccent}" stop-opacity="0" />
      <stop offset="45%" stop-color="${palette.redAccent}" stop-opacity="0.25" />
      <stop offset="50%" stop-color="${palette.redBright}" stop-opacity="0.95" />
      <stop offset="55%" stop-color="${palette.redAccent}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${palette.redAccent}" stop-opacity="0" />
    </linearGradient>

    <!-- Laser Horizontal Flare -->
    <linearGradient id="lineFlare" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${palette.redAccent}" stop-opacity="0" />
      <stop offset="20%" stop-color="${palette.redAccent}" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="80%" stop-color="${palette.redAccent}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${palette.redAccent}" stop-opacity="0" />
    </linearGradient>

    <!-- Occlusion Mask for Dynamic Laser Vanish Effect -->
    <mask id="scan-mask">
      <rect x="0" y="0" width="1120" height="660" fill="white" />
      <g class="laser-scanner">
        <rect x="0" y="-16" width="1120" height="32" fill="black" opacity="0.92" />
        <rect x="0" y="-4" width="1120" height="8" fill="black" opacity="1" />
      </g>
    </mask>

    <style>
      .term-font { font-family: "Courier New", Courier, "Lucida Console", monospace; }
      .bold { font-weight: 900; }
      .text-primary { fill: ${palette.primary}; }
      .text-accent { fill: ${palette.redAccent}; }
      .text-dim { fill: ${palette.dim}; }

      /* Laser Scan Animation */
      .laser-scanner {
        animation: scanSweep 6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate;
      }

      /* Typewriter Load In Animations */
      .type-in {
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        animation: terminalType 0.8s steps(24, end) forwards;
      }

      .fade-in {
        opacity: 0;
        animation: bootFade 0.6s ease-out forwards;
      }

      .seq-1 { animation-delay: 0.1s; }
      .seq-2 { animation-delay: 0.3s; }
      .seq-3 { animation-delay: 0.6s; }
      .seq-4 { animation-delay: 0.9s; }
      .seq-5 { animation-delay: 1.2s; }
      .seq-6 { animation-delay: 1.5s; }

      /* Real-Time ECG Heartbeat Animation */
      .ecg-line {
        stroke-dasharray: 320, 724;
        stroke-dashoffset: 1044;
        animation: ecgTrack 2.8s linear infinite;
      }

      .pulse-glow {
        animation: pulseHeart 1.4s ease-in-out infinite alternate;
      }

      /* SAGAFLOW Targeted Word Glitch */
      .g-state-base { animation: glitchBase 5s infinite; }
      .g-state-1 { animation: glitchCipher1 5s infinite; fill: ${palette.redBright}; }
      .g-state-2 { animation: glitchCipher2 5s infinite; fill: ${palette.redAccent}; }
      .g-state-3 { animation: glitchBlocks 5s infinite; fill: ${palette.redBright}; }

      @keyframes glitchBase {
        0%, 82%, 100% { opacity: 1; visibility: visible; }
        82.1%, 97.9% { opacity: 0; visibility: hidden; }
      }
      @keyframes glitchCipher1 {
        0%, 82%, 88%, 100% { opacity: 0; visibility: hidden; }
        82.1%, 87.9% { opacity: 1; visibility: visible; }
      }
      @keyframes glitchCipher2 {
        0%, 88%, 93%, 100% { opacity: 0; visibility: hidden; }
        88.1%, 92.9% { opacity: 1; visibility: visible; }
      }
      @keyframes glitchBlocks {
        0%, 93%, 98%, 100% { opacity: 0; visibility: hidden; }
        93.1%, 97.9% { opacity: 1; visibility: visible; }
      }

      @keyframes terminalType {
        to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
      }

      @keyframes bootFade {
        to { opacity: 1; }
      }

      @keyframes ecgTrack {
        to { stroke-dashoffset: 0; }
      }

      @keyframes pulseHeart {
        0% { filter: drop-shadow(0 0 1px ${palette.redAccent}); opacity: 0.75; }
        100% { filter: drop-shadow(0 0 4px ${palette.redBright}); opacity: 1; }
      }

      @keyframes scanSweep {
        0% { transform: translateY(25px); }
        100% { transform: translateY(630px); }
      }
    </style>
  </defs>

  <!-- Canvas Background -->
  <rect width="100%" height="100%" fill="${palette.bg}" rx="10" />

  <!-- Outer Technical Casing -->
  <rect x="14" y="14" width="1092" height="632" fill="${palette.card}" stroke="${palette.border}" stroke-width="2" rx="4" />
  <rect x="20" y="20" width="1080" height="620" fill="none" stroke="${palette.borderDim}" stroke-width="1" stroke-dasharray="8 4" />

  <!-- Corner Alignment Reticles -->
  <path d="M 26 40 L 26 26 L 40 26" fill="none" stroke="${palette.redAccent}" stroke-width="2.5" />
  <path d="M 1094 40 L 1094 26 L 1080 26" fill="none" stroke="${palette.redAccent}" stroke-width="2.5" />
  <path d="M 26 620 L 26 634 L 40 634" fill="none" stroke="${palette.redAccent}" stroke-width="2.5" />
  <path d="M 1094 620 L 1094 634 L 1080 634" fill="none" stroke="${palette.redAccent}" stroke-width="2.5" />

  <!-- ================= MASKED CONTENT LAYER ================= -->
  <g mask="url(#scan-mask)">

    <!-- Top Metadata Ribbon -->
    <g class="term-font type-in seq-1">
      <text x="38" y="44" class="text-dim bold" font-size="12" letter-spacing="1.5px">SEC-GRID // 34.0522° N, 118.2437° W</text>
      <text x="940" y="44" class="text-dim bold" font-size="12" letter-spacing="1.5px">MEM: 0x8F4A2</text>
    </g>

    <!-- Top Header Ribbon -->
    <g class="term-font">
      <g class="type-in seq-1">
        <text x="38" y="74" class="text-primary bold" font-size="24" letter-spacing="2px">警察 LAPD // SYSTEM CONSOLE</text>
        <text x="740" y="72" class="text-dim bold" font-size="13.5" letter-spacing="1.5px">SIGNAL: NOMINAL</text>
      </g>

      <!-- Battery Readout -->
      <g transform="translate(950, 56)" class="fade-in seq-2">
        <rect x="0" y="0" width="60" height="20" fill="none" stroke="${palette.redAccent}" stroke-width="1.8" />
        <rect x="5" y="4" width="10" height="12" fill="${palette.redAccent}" />
        <rect x="18" y="4" width="10" height="12" fill="${palette.redAccent}" />
        <rect x="31" y="4" width="10" height="12" fill="${palette.redAccent}" />
        <rect x="44" y="4" width="10" height="12" fill="${palette.redAccent}" />
        <rect x="62" y="6" width="3.5" height="8" fill="${palette.redAccent}" />
      </g>
    </g>

    <line x1="38" y1="92" x2="1082" y2="92" stroke="${palette.border}" stroke-width="1.5" />

    <!-- ================= 3-COLUMN MAIN BODY ================= -->

    <!-- COLUMN 1: LIVE GITHUB AVATAR & IDENTIFICATION (X: 38 -> 255) -->
    <g class="term-font">
      <rect x="38" y="108" width="215" height="260" fill="${palette.panel}" stroke="${palette.border}" stroke-width="1.5" />
      
      <g class="fade-in seq-2">
        ${avatarBase64 ? `
          <image x="40" y="110" width="211" height="256" href="${avatarBase64}" preserveAspectRatio="xMidYMid slice" />
          <rect x="40" y="110" width="211" height="256" fill="url(#scanlines)" pointer-events="none" />
        ` : `
          <rect x="40" y="110" width="211" height="256" fill="${palette.panel}" />
          <text x="145" y="240" text-anchor="middle" class="text-dim bold" font-size="13">NO BIOMETRIC FEED</text>
        `}
      </g>

      <!-- Avatar Reticles -->
      <path d="M 34 104 L 46 104 M 34 104 L 34 116" stroke="${palette.redAccent}" stroke-width="2" fill="none" />
      <path d="M 257 104 L 245 104 M 257 104 L 257 116" stroke="${palette.redAccent}" stroke-width="2" fill="none" />
      <path d="M 34 372 L 46 372 M 34 372 L 34 360" stroke="${palette.redAccent}" stroke-width="2" fill="none" />
      <path d="M 257 372 L 245 372 M 257 372 L 257 360" stroke="${palette.redAccent}" stroke-width="2" fill="none" />

      <!-- ID Readouts below avatar -->
      <g class="type-in seq-3">
        <text x="38" y="394" class="text-dim bold" font-size="12" letter-spacing="1px">OPERATOR ID:</text>
        <text x="38" y="420" class="text-primary bold" font-size="18" letter-spacing="2px">KD6-3.7 // ${USER_DATA.githubHandle}</text>
        <text x="38" y="442" class="text-dim bold" font-size="12" letter-spacing="1.5px">CLEARANCE: ********* [L9]</text>
      </g>
    </g>

    <line x1="275" y1="108" x2="275" y2="455" stroke="${palette.borderDim}" stroke-width="1" />

    <!-- COLUMN 2: TECH STACK & ACTIVE VENTURE (X: 295 -> 675) -->
    <g class="term-font" transform="translate(295, 108)">
      <g class="type-in seq-3">
        <text x="0" y="18" class="text-primary bold" font-size="15" letter-spacing="1.2px">NEXUS 9 SRS // ${USER_DATA.name}</text>
        <text x="0" y="40" class="text-dim bold" font-size="12.5" letter-spacing="1px">SEC CODE: ${USER_DATA.secCode}</text>
        <text x="0" y="64" class="text-accent bold" font-size="14.5" letter-spacing="2px">ブレードランナー</text>
        <text x="0" y="86" class="text-primary bold" font-size="14.5" letter-spacing="0.5px">${USER_DATA.title} | SE</text>
        <line x1="0" y1="98" x2="365" y2="98" stroke="${palette.border}" stroke-width="1" />
      </g>

      <!-- Tech Stack Large Runtime Chips -->
      <g class="fade-in seq-4" transform="translate(0, 114)">
        
        <!-- Row 1: Languages -->
        <text x="0" y="2" class="text-dim bold" font-size="11.5" letter-spacing="1px">LANG:</text>
        <rect x="48" y="-13" width="160" height="22" fill="${palette.panel}" stroke="${palette.border}" rx="2" />
        <text x="128" y="2" text-anchor="middle" class="text-primary bold" font-size="11.5" letter-spacing="1px">${USER_DATA.languages.join(' ')}</text>

        <rect x="216" y="-13" width="150" height="22" fill="${palette.panel}" stroke="${palette.border}" rx="2" />
        <text x="291" y="2" text-anchor="middle" class="text-accent bold" font-size="11" letter-spacing="0.5px">[LRN: C/C++ JAVA]</text>

        <!-- Row 2: Frontend -->
        <text x="0" y="32" class="text-dim bold" font-size="11.5" letter-spacing="1px">FE:</text>
        <rect x="48" y="17" width="318" height="22" fill="${palette.panel}" stroke="${palette.border}" rx="2" />
        <text x="207" y="32" text-anchor="middle" class="text-primary bold" font-size="11" letter-spacing="0.8px">NEXT.JS REACT TAILWIND SHADCN VITE</text>

        <!-- Row 3: Systems / Backend -->
        <text x="0" y="62" class="text-dim bold" font-size="11.5" letter-spacing="1px">SYS:</text>
        <rect x="48" y="47" width="155" height="22" fill="${palette.panel}" stroke="${palette.border}" rx="2" />
        <text x="125" y="62" text-anchor="middle" class="text-primary bold" font-size="11" letter-spacing="0.5px">NODE.JS // TAURI</text>

        <rect x="211" y="47" width="155" height="22" fill="${palette.panel}" stroke="${palette.border}" rx="2" />
        <text x="288" y="62" text-anchor="middle" class="text-primary bold" font-size="10.5" letter-spacing="0.5px">CI/CD: GH-ACTIONS</text>

        <!-- Row 4: Database -->
        <text x="0" y="92" class="text-dim bold" font-size="11.5" letter-spacing="1px">DB:</text>
        <rect x="48" y="77" width="318" height="22" fill="${palette.panel}" stroke="${palette.border}" rx="2" />
        <text x="207" y="92" text-anchor="middle" class="text-primary bold" font-size="11" letter-spacing="0.8px">MYSQL // SQLITE [ACID COMPLIANT]</text>
      </g>

      <!-- Active Venture: SagaFlow Large Glitch Block -->
      <g transform="translate(0, 240)" class="fade-in seq-4">
        <line x1="0" y1="0" x2="365" y2="0" stroke="${palette.borderDim}" stroke-width="1" stroke-dasharray="4 2" />
        
        <text x="0" y="20" class="text-dim bold" font-size="11.5" letter-spacing="1.2px">ACTIVE VENTURE:</text>
        <text x="128" y="20" class="text-primary bold" font-size="11.5" letter-spacing="1.2px">WORKING ON</text>
        
        <g transform="translate(216, 20)">
          <text x="0" y="0" class="text-accent bold g-state-base" font-size="12" letter-spacing="1.5px">SAGAFLOW</text>
          <text x="0" y="0" class="bold g-state-1" font-size="12" letter-spacing="1.5px">5464FL0W</text>
          <text x="0" y="0" class="bold g-state-2" font-size="12" letter-spacing="1.5px">§ΔGΔ_FLØ</text>
          <text x="0" y="0" class="bold g-state-3" font-size="12" letter-spacing="1.5px">█▓▒░█▓▒░</text>
        </g>

        <text x="296" y="20" class="text-accent bold" font-size="11" letter-spacing="0.8px">[FULL-TIME]</text>
      </g>
    </g>

    <line x1="685" y1="108" x2="685" y2="455" stroke="${palette.borderDim}" stroke-width="1" />

    <!-- COLUMN 3: WALLACE CORP, DIRECTIVES (LARGE PRINT) & COMMS (X: 705 -> 1082) -->
    <g class="term-font" transform="translate(705, 108)">
      
      <!-- Wallace Corp Indicator -->
      <g class="fade-in seq-3">
        <rect x="0" y="16" width="6" height="14" fill="${palette.dim}" />
        <rect x="8" y="8" width="6" height="22" fill="${palette.dim}" />
        <rect x="16" y="0" width="6" height="30" fill="${palette.redAccent}" />

        <text x="32" y="16" class="text-primary bold" font-size="18" letter-spacing="3px">WALLACE</text>
        <text x="32" y="30" class="text-dim bold" font-size="10.5" letter-spacing="1.5px">LOGIC &amp; EMBEDDED SYSTEMS</text>
      </g>

      <line x1="0" y1="46" x2="377" y2="46" stroke="${palette.border}" stroke-width="1" />

      <!-- Directives -->
      <g class="type-in seq-5" transform="translate(0, 56)">
        <text x="0" y="14" class="text-primary bold" font-size="12.5" letter-spacing="0.8px">
          ${wrappedDirectives.map((line, idx) => `
            <tspan x="0" dy="${idx === 0 ? 0 : 20}">${line.replace(/&/g, '&amp;')}</tspan>
          `).join('')}
        </text>
      </g>

      <line x1="0" y1="172" x2="377" y2="172" stroke="${palette.borderDim}" stroke-width="1" />

      <!-- Comms Channels -->
      <g class="type-in seq-5" transform="translate(0, 184)">
        <text x="0" y="12" class="text-dim bold" font-size="11.5" letter-spacing="1px">COMMS // CHANNELS:</text>
        
        <text x="0" y="34" class="text-accent bold" font-size="12">X (TWITTER):</text>
        <text x="120" y="34" class="text-primary bold" font-size="12">${USER_DATA.socials.twitter}</text>

        <text x="0" y="54" class="text-accent bold" font-size="12">INSTAGRAM:</text>
        <text x="120" y="54" class="text-primary bold" font-size="12">${USER_DATA.socials.instagram}</text>

        <text x="0" y="74" class="text-accent bold" font-size="12">LINKEDIN:</text>
        <text x="120" y="74" class="text-primary bold" font-size="12">${USER_DATA.socials.linkedin}</text>
      </g>

      <!-- Barcode -->
      <g transform="translate(245, 204)" class="fade-in seq-6">
        ${[2, 5, 1, 4, 2, 6, 1, 3, 5, 2, 4, 1, 3, 6].map((w, i) => `
          <rect x="${i * 9}" y="0" width="${w}" height="16" fill="${palette.dim}" />
        `).join('')}
      </g>
    </g>

    <!-- ================= BOTTOM SPAN: ECG TELEMETRY & FOOTER ================= -->
    <g class="term-font" transform="translate(38, 475)">
      <line x1="0" y1="0" x2="1044" y2="0" stroke="${palette.border}" stroke-width="1.5" />

      <g class="type-in seq-6">
        <text x="0" y="20" class="text-dim bold" font-size="11.5" letter-spacing="1.5px">BASELINE TELEMETRY: [CELLS WITHIN CELLS: INTERLINKED]</text>
      </g>
      
      <!-- Ghost Pulse Path -->
      <path d="M 0 44 L 180 44 L 195 24 L 210 62 L 225 44 L 520 44 L 535 18 L 550 68 L 565 44 L 1044 44" 
            fill="none" stroke="${palette.border}" stroke-width="1.4" opacity="0.4" />

      <!-- Active Looping ECG Sweep -->
      <path class="ecg-line pulse-glow" d="M 0 44 L 180 44 L 195 24 L 210 62 L 225 44 L 520 44 L 535 18 L 550 68 L 565 44 L 1044 44" 
            fill="none" stroke="${palette.redAccent}" stroke-width="2.4" />

      <g class="type-in seq-6">
        <text x="0" y="74" class="text-dim bold" font-size="11" letter-spacing="1.2px">STATUS: BASELINE VERIFIED // PRIVILEGE: ROOT ARCHITECT</text>
      </g>
    </g>

    <!-- Global Footer -->
    <g class="term-font type-in seq-6">
      <line x1="38" y1="595" x2="1082" y2="595" stroke="${palette.border}" stroke-width="1" />
      <text x="560" y="616" text-anchor="middle" class="text-dim bold" font-size="11.5" letter-spacing="2px">
        PROPERTY OF LOS ANGELES POLICE DEPT // SYNTHETIC DETECTION UNIT #2049
      </text>
    </g>

  </g>
  <!-- ================= END MASKED CONTENT LAYER ================= -->

  <!-- ================= ACTIVE LASER SCANNING BEAM ================= -->
  <g class="laser-scanner" pointer-events="none">
    <rect x="22" y="-18" width="1076" height="36" fill="url(#beamGlow)" />
    <rect x="20" y="-1" width="1080" height="3" fill="url(#lineFlare)" />
    <path d="M 18 -5 L 28 0 L 18 5 Z" fill="${palette.redBright}" />
    <path d="M 1102 -5 L 1092 0 L 1102 5 Z" fill="${palette.redBright}" />
  </g>

</svg>`;
}

async function main() {
  try {
    const avatarBuffer = await fetchAvatarBuffer();
    
    let avatarBase64 = null;
    if (avatarBuffer) {
      console.log('Synthesizing 1-bit dithered portrait from live GitHub profile picture...');
      avatarBase64 = await processDitheredAvatar(avatarBuffer, 215, 260);
    }

    fs.writeFileSync('dark.svg', renderBadgeSvg(avatarBase64, 'dark'));
    fs.writeFileSync('light.svg', renderBadgeSvg(avatarBase64, 'light'));

    console.log('✓ Successfully generated dark.svg & light.svg with live GitHub avatar.');
  } catch (err) {
    console.error('Error generating badge:', err.message);
  }
}

main();