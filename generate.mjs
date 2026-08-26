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

// Clean text-wrapping helper to ensure lines never exceed column width
function wrapText(text, maxChars = 40) {
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
async function processDitheredAvatar(imageBuffer, width = 175, height = 205) {
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

async function fetchAvatarBuffer() {
  try {
    if (GITHUB_TOKEN) {
      const res = await axios.get(`https://api.github.com/users/${USERNAME}`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, 'User-Agent': 'Badge-Gen' }
      });
      if (res.data?.avatar_url) {
        const img = await axios.get(res.data.avatar_url, { responseType: 'arraybuffer' });
        return Buffer.from(img.data);
      }
    }
  } catch (e) {
    console.warn('Could not fetch avatar online, checking local avatar.png...');
  }
  if (fs.existsSync('./avatar.png')) return fs.readFileSync('./avatar.png');
  return null;
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

  // Safely wrap directives for the 290px column
  const wrappedDirectives = wrapText(USER_DATA.directivesRaw, 41);

  return `<svg width="880" height="520" viewBox="0 0 880 520" xmlns="http://www.w3.org/2000/svg">
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
      <rect x="0" y="0" width="880" height="520" fill="white" />
      <g class="laser-scanner">
        <rect x="0" y="-12" width="880" height="24" fill="black" opacity="0.92" />
        <rect x="0" y="-4" width="880" height="8" fill="black" opacity="1" />
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
        stroke-dasharray: 260, 544;
        stroke-dashoffset: 804;
        animation: ecgTrack 2.8s linear infinite;
      }

      .pulse-glow {
        animation: pulseHeart 1.4s ease-in-out infinite alternate;
      }

      /* Clean Targeted Glitch Cycling for SAGAFLOW */
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
        100% { transform: translateY(490px); }
      }
    </style>
  </defs>

  <!-- Static Canvas Background -->
  <rect width="100%" height="100%" fill="${palette.bg}" rx="8" />

  <!-- Outer Technical Casing -->
  <rect x="14" y="14" width="852" height="492" fill="${palette.card}" stroke="${palette.border}" stroke-width="2" rx="2" />
  <rect x="20" y="20" width="840" height="480" fill="none" stroke="${palette.borderDim}" stroke-width="1" stroke-dasharray="6 3" />

  <!-- Corner Reticles -->
  <path d="M 24 36 L 24 24 L 36 24" fill="none" stroke="${palette.redAccent}" stroke-width="2" />
  <path d="M 856 36 L 856 24 L 844 24" fill="none" stroke="${palette.redAccent}" stroke-width="2" />
  <path d="M 24 484 L 24 496 L 36 496" fill="none" stroke="${palette.redAccent}" stroke-width="2" />
  <path d="M 856 484 L 856 496 L 844 496" fill="none" stroke="${palette.redAccent}" stroke-width="2" />

  <!-- ================= MASKED CONTENT LAYER ================= -->
  <g mask="url(#scan-mask)">

    <!-- Top Metadata Ribbon -->
    <g class="term-font type-in seq-1">
      <text x="38" y="38" class="text-dim" font-size="8.5" letter-spacing="1.5px">SEC-GRID // 34.0522° N, 118.2437° W</text>
      <text x="735" y="38" class="text-dim" font-size="8.5" letter-spacing="1.5px">MEM: 0x8F4A2</text>
    </g>

    <!-- Top Header Ribbon -->
    <g class="term-font">
      <g class="type-in seq-1">
        <text x="38" y="60" class="text-primary bold" font-size="18" letter-spacing="2px">警察 LAPD // SYSTEM CONSOLE</text>
        <text x="590" y="58" class="text-dim" font-size="10.5" letter-spacing="1px">SIGNAL: NOMINAL</text>
      </g>

      <!-- Battery Readout -->
      <g transform="translate(755, 46)" class="fade-in seq-2">
        <rect x="0" y="0" width="46" height="15" fill="none" stroke="${palette.redAccent}" stroke-width="1.5" />
        <rect x="4" y="3" width="7" height="9" fill="${palette.redAccent}" />
        <rect x="13" y="3" width="7" height="9" fill="${palette.redAccent}" />
        <rect x="22" y="3" width="7" height="9" fill="${palette.redAccent}" />
        <rect x="31" y="3" width="7" height="9" fill="${palette.redAccent}" />
        <rect x="47" y="4" width="2" height="7" fill="${palette.redAccent}" />
      </g>
    </g>

    <line x1="38" y1="74" x2="842" y2="74" stroke="${palette.border}" stroke-width="1.5" />

    <!-- ================= 3-COLUMN MAIN BODY ================= -->

    <!-- COLUMN 1: AVATAR & IDENTIFICATION -->
    <g class="term-font">
      <rect x="38" y="88" width="175" height="205" fill="${palette.panel}" stroke="${palette.border}" stroke-width="1.5" />
      
      <g class="fade-in seq-2">
        ${avatarBase64 ? `
          <image x="40" y="90" width="171" height="201" href="${avatarBase64}" preserveAspectRatio="xMidYMid slice" />
          <rect x="40" y="90" width="171" height="201" fill="url(#scanlines)" pointer-events="none" />
        ` : `
          <rect x="40" y="90" width="171" height="201" fill="${palette.panel}" />
          <text x="125" y="195" text-anchor="middle" class="text-dim" font-size="10">NO BIOMETRIC FEED</text>
        `}
      </g>

      <!-- Avatar Reticles -->
      <path d="M 34 84 L 44 84 M 34 84 L 34 94" stroke="${palette.redAccent}" stroke-width="1.5" fill="none" />
      <path d="M 217 84 L 207 84 M 217 84 L 217 94" stroke="${palette.redAccent}" stroke-width="1.5" fill="none" />
      <path d="M 34 297 L 44 297 M 34 297 L 34 287" stroke="${palette.redAccent}" stroke-width="1.5" fill="none" />
      <path d="M 217 297 L 207 297 M 217 297 L 217 287" stroke="${palette.redAccent}" stroke-width="1.5" fill="none" />

      <!-- ID Readouts -->
      <g class="type-in seq-3">
        <text x="38" y="314" class="text-dim" font-size="9" letter-spacing="1px">OPERATOR ID:</text>
        <text x="38" y="332" class="text-primary bold" font-size="15" letter-spacing="2px">KD6-3.7 // ${USER_DATA.githubHandle}</text>
        <text x="38" y="348" class="text-dim" font-size="8.5" letter-spacing="1px">CLEARANCE: ********* [L9]</text>
      </g>
    </g>

    <line x1="230" y1="88" x2="230" y2="355" stroke="${palette.borderDim}" stroke-width="1" />

    <!-- COLUMN 2: TECH STACK & ACTIVE VENTURE -->
    <g class="term-font" transform="translate(245, 88)">
      <g class="type-in seq-3">
        <text x="0" y="14" class="text-primary bold" font-size="11.5" letter-spacing="1.2px">NEXUS 9 SRS // ${USER_DATA.name}</text>
        <text x="0" y="30" class="text-dim" font-size="9.5" letter-spacing="1px">SEC CODE: ${USER_DATA.secCode}</text>
        <text x="0" y="50" class="text-accent" font-size="11" letter-spacing="2px">ブレードランナー</text>
        <text x="0" y="66" class="text-primary bold" font-size="11" letter-spacing="0.5px">${USER_DATA.title} | SE</text>
        <line x1="0" y1="76" x2="275" y2="76" stroke="${palette.border}" stroke-width="1" />
      </g>

      <!-- Tech Stack Runtime Grid -->
      <g class="fade-in seq-4" transform="translate(0, 88)">
        <text x="0" y="0" class="text-dim bold" font-size="8" letter-spacing="1px">LANG:</text>
        <rect x="34" y="-9" width="124" height="13" fill="${palette.panel}" stroke="${palette.border}" />
        <text x="96" y="1" text-anchor="middle" class="text-primary bold" font-size="7.5">${USER_DATA.languages.join(' ')}</text>

        <rect x="162" y="-9" width="112" height="13" fill="${palette.panel}" stroke="${palette.border}" />
        <text x="218" y="1" text-anchor="middle" class="text-accent bold" font-size="7">[LRN: C/C++ JAVA]</text>

        <text x="0" y="16" class="text-dim bold" font-size="8" letter-spacing="1px">FE:</text>
        <rect x="34" y="7" width="240" height="13" fill="${palette.panel}" stroke="${palette.border}" />
        <text x="154" y="17" text-anchor="middle" class="text-primary bold" font-size="7.2">NEXT.JS REACT TAILWIND SHADCN VITE</text>

        <text x="0" y="32" class="text-dim bold" font-size="8" letter-spacing="1px">SYS:</text>
        <rect x="34" y="23" width="118" height="13" fill="${palette.panel}" stroke="${palette.border}" />
        <text x="93" y="33" text-anchor="middle" class="text-primary bold" font-size="7.5">NODE.JS // TAURI</text>

        <rect x="156" y="23" width="118" height="13" fill="${palette.panel}" stroke="${palette.border}" />
        <text x="215" y="33" text-anchor="middle" class="text-primary bold" font-size="7.2">CI/CD: GH-ACTIONS</text>

        <text x="0" y="48" class="text-dim bold" font-size="8" letter-spacing="1px">DB:</text>
        <rect x="34" y="39" width="240" height="13" fill="${palette.panel}" stroke="${palette.border}" />
        <text x="154" y="49" text-anchor="middle" class="text-primary bold" font-size="7.5">MYSQL // SQLITE [ACID COMPLIANT]</text>
      </g>

      <!-- Active Venture: SagaFlow Full-Time Glitch Block -->
      <g transform="translate(0, 158)" class="fade-in seq-4">
        <line x1="0" y1="0" x2="275" y2="0" stroke="${palette.borderDim}" stroke-width="1" stroke-dasharray="4 2" />
        
        <text x="0" y="14" class="text-dim bold" font-size="8.5" letter-spacing="1.2px">ACTIVE VENTURE:</text>
        <text x="96" y="14" class="text-primary bold" font-size="8.5" letter-spacing="1.2px">WORKING ON</text>
        
        <g transform="translate(162, 14)">
          <text x="0" y="0" class="text-accent bold g-state-base" font-size="8.5" letter-spacing="1.2px">SAGAFLOW</text>
          <text x="0" y="0" class="bold g-state-1" font-size="8.5" letter-spacing="1.2px">5464FL0W</text>
          <text x="0" y="0" class="bold g-state-2" font-size="8.5" letter-spacing="1.2px">§ΔGΔ_FLØ</text>
          <text x="0" y="0" class="bold g-state-3" font-size="8.5" letter-spacing="1.2px">█▓▒░█▓▒░</text>
        </g>

        <text x="224" y="14" class="text-accent bold" font-size="8" letter-spacing="0.8px">[FULL-TIME]</text>
      </g>
    </g>

    <line x1="535" y1="88" x2="535" y2="355" stroke="${palette.borderDim}" stroke-width="1" />

    <!-- COLUMN 3: WALLACE CORP, DIRECTIVES (AUTOWRAPPED) & COMMS -->
    <g class="term-font" transform="translate(550, 88)">
      
      <!-- Wallace Corp Indicator -->
      <g class="fade-in seq-3">
        <rect x="0" y="12" width="4" height="10" fill="${palette.dim}" />
        <rect x="6" y="6" width="4" height="16" fill="${palette.dim}" />
        <rect x="12" y="0" width="4" height="22" fill="${palette.redAccent}" />

        <text x="24" y="12" class="text-primary bold" font-size="14" letter-spacing="3px">WALLACE</text>
        <text x="24" y="22" class="text-dim" font-size="7.5" letter-spacing="1.5px">LOGIC &amp; EMBEDDED SYSTEMS</text>
      </g>

      <line x1="0" y1="36" x2="292" y2="36" stroke="${palette.border}" stroke-width="1" />

      <!-- Wrapped Directives Section -->
      <g class="type-in seq-5" transform="translate(0, 42)">
        <text x="0" y="10" class="text-primary bold" font-size="8" letter-spacing="0.6px">
          ${wrappedDirectives.map((line, idx) => `
            <tspan x="0" dy="${idx === 0 ? 0 : 12.5}">${line.replace(/&/g, '&amp;')}</tspan>
          `).join('')}
        </text>
      </g>

      <line x1="0" y1="104" x2="292" y2="104" stroke="${palette.borderDim}" stroke-width="1" />

      <!-- Comms Channels -->
      <g class="type-in seq-5" transform="translate(0, 114)">
        <text x="0" y="8" class="text-dim bold" font-size="8" letter-spacing="1px">COMMS // CHANNELS:</text>
        
        <text x="0" y="24" class="text-accent bold" font-size="8.8">X (TWITTER):</text>
        <text x="95" y="24" class="text-primary" font-size="8.8">${USER_DATA.socials.twitter}</text>

        <text x="0" y="38" class="text-accent bold" font-size="8.8">INSTAGRAM:</text>
        <text x="95" y="38" class="text-primary" font-size="8.8">${USER_DATA.socials.instagram}</text>

        <text x="0" y="52" class="text-accent bold" font-size="8.8">LINKEDIN:</text>
        <text x="95" y="52" class="text-primary" font-size="8.8">${USER_DATA.socials.linkedin}</text>
      </g>

      <!-- Barcode -->
      <g transform="translate(195, 126)" class="fade-in seq-6">
        ${[2, 4, 1, 3, 2, 5, 1, 3, 4, 2, 3, 1, 2, 5].map((w, i) => `
          <rect x="${i * 6.5}" y="0" width="${w}" height="10" fill="${palette.dim}" />
        `).join('')}
      </g>
    </g>

    <!-- ================= BOTTOM SPAN: ECG TELEMETRY & FOOTER ================= -->
    <g class="term-font" transform="translate(38, 370)">
      <line x1="0" y1="0" x2="804" y2="0" stroke="${palette.border}" stroke-width="1.5" />

      <g class="type-in seq-6">
        <text x="0" y="16" class="text-dim bold" font-size="8.5" letter-spacing="1.5px">BASELINE TELEMETRY: [CELLS WITHIN CELLS: INTERLINKED]</text>
      </g>
      
      <!-- Ghost Pulse Path -->
      <path d="M 0 34 L 140 34 L 155 20 L 170 48 L 185 34 L 380 34 L 395 14 L 410 52 L 425 34 L 804 34" 
            fill="none" stroke="${palette.border}" stroke-width="1.2" opacity="0.4" />

      <!-- Active Looping ECG Sweep -->
      <path class="ecg-line pulse-glow" d="M 0 34 L 140 34 L 155 20 L 170 48 L 185 34 L 380 34 L 395 14 L 410 52 L 425 34 L 804 34" 
            fill="none" stroke="${palette.redAccent}" stroke-width="1.8" />

      <g class="type-in seq-6">
        <text x="0" y="54" class="text-dim bold" font-size="8" letter-spacing="1px">STATUS: BASELINE VERIFIED // PRIVILEGE: ROOT ARCHITECT</text>
      </g>
    </g>

    <!-- Global Footer -->
    <g class="term-font type-in seq-6">
      <line x1="38" y1="465" x2="842" y2="465" stroke="${palette.border}" stroke-width="1" />
      <text x="440" y="482" text-anchor="middle" class="text-dim" font-size="8.5" letter-spacing="2px">
        PROPERTY OF LOS ANGELES POLICE DEPT // SYNTHETIC DETECTION UNIT #2049
      </text>
    </g>

  </g>
  <!-- ================= END MASKED CONTENT LAYER ================= -->

  <!-- ================= ACTIVE LASER SCANNING BEAM ================= -->
  <g class="laser-scanner" pointer-events="none">
    <rect x="22" y="-18" width="836" height="36" fill="url(#beamGlow)" />
    <rect x="20" y="-1" width="840" height="2.5" fill="url(#lineFlare)" />
    <path d="M 18 -4 L 28 0 L 18 4 Z" fill="${palette.redBright}" />
    <path d="M 862 -4 L 852 0 L 862 4 Z" fill="${palette.redBright}" />
  </g>

</svg>`;
}

async function main() {
  try {
    console.log('Fetching avatar stream for user: Md-Zayan00...');
    const avatarBuffer = await fetchAvatarBuffer();
    
    let avatarBase64 = null;
    if (avatarBuffer) {
      console.log('Synthesizing pure monochrome 1-bit dithered portrait (Landscape)...');
      avatarBase64 = await processDitheredAvatar(avatarBuffer, 175, 205);
    }

    fs.writeFileSync('dark.svg', renderBadgeSvg(avatarBase64, 'dark'));
    fs.writeFileSync('light.svg', renderBadgeSvg(avatarBase64, 'light'));

    console.log('✓ Successfully generated dark.svg & light.svg (Precision 880x520 px with autowrap)');
  } catch (err) {
    console.error('Error generating badge:', err.message);
  }
}

main();