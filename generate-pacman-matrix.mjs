import 'dotenv/config';
import fs from 'fs';
import puppeteer from 'puppeteer';

const USERNAME = process.env.GITHUB_ACTOR || 'Md-Zayan00';

async function generateMatrix(theme = 'dark') {
  console.log(`Launching headless browser to render ${theme} Pacman Matrix...`);
  
  // Crimson/Blade Runner Blade Runner hazardous palette for dark mode
  const darkConfig = {
    colorSnake: '#ff3b56',
    colorDots: '#12080a,#421219,#7a1d2c,#b8283f,#ff3b56'
  };

  // Standard clean green palette for light mode
  const lightConfig = {
    colorSnake: '#dc2626',
    colorDots: '#ebedf0,#9be9a8,#40c463,#30a14e,#216e39'
  };

  const config = theme === 'dark' ? darkConfig : lightConfig;
  const paletteQuery = theme === 'dark' ? '&palette=github-dark' : '&palette=github-light';

  // We use the author's official API endpoint as the rendering engine target
  const url = `https://snk-platane.vercel.app/api/github-user-contribution-snake?userName=${USERNAME}${paletteQuery}&color_snake=${config.colorSnake}&color_dots=${config.colorDots}`;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    
    // Set a very large viewport to ensure the SVG renders fully
    await page.setViewport({ width: 2000, height: 1000 });

    console.log(`Navigating to rendering engine...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    console.log(`Waiting for SVG to synthesize...`);
    // The engine renders the SVG inside a <pre> tag
    await page.waitForSelector('pre > svg');

    // Extract the full animated SVG content
    const svgContent = await page.evaluate(() => {
      const svgElement = document.querySelector('pre > svg');
      if (!svgElement) return null;
      
      // Clean up Vercel's UI wrappings if present
      const clonedSvg = svgElement.cloneNode(true);
      return clonedSvg.outerHTML;
    });

    if (!svgContent) {
      throw new Error("Failed to extract SVG content from engine.");
    }

    return svgContent;

  } catch (err) {
    throw new Error(`Engine rendering failed: ${err.message}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  try {
    console.log(`### Initiating Advanced Pacman Matrix Generation for ${USERNAME} ###`);

    const [darkSvg, lightSvg] = await Promise.all([
      generateMatrix('dark'),
      generateMatrix('light')
    ]);

    fs.writeFileSync('pacman-grid-animated-dark.svg', darkSvg);
    fs.writeFileSync('pacman-grid-animated-light.svg', lightSvg);

    console.log('✓ Successfully synthesized and saved locally:');
    console.log('  - pacman-grid-animated-dark.svg');
    console.log('  - pacman-grid-animated-light.svg');
  } catch (err) {
    console.error('Error during generation:', err.message);
  }
}

main();