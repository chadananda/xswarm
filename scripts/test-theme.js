#!/usr/bin/env node
// test-theme.js - Test dark/light mode implementation across all pages

import puppeteer from 'puppeteer';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Roadmap', path: '/roadmap' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Terms', path: '/terms' },
  { name: 'Documentation', path: '/docs' },
];

async function testTheme() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const issues = [];
  
  for (const pageInfo of pages) {
    console.log(`\nTesting ${pageInfo.name} page...`);
    
    try {
      await page.goto(`http://localhost:4321${pageInfo.path}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      
      // Test light mode (default)
      await page.evaluate(() => {
        document.documentElement.removeAttribute('data-theme');
      });
      await page.waitForTimeout(500);
      
      const lightModeIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check for any remaining dark: classes
        const darkClasses = Array.from(document.querySelectorAll('*')).filter(el => {
          return Array.from(el.classList).some(cls => cls.includes('dark:'));
        });
        
        if (darkClasses.length > 0) {
          issues.push(`Found ${darkClasses.length} elements with dark: classes`);
        }
        
        // Check specific elements
        const elementsToCheck = [
          { selector: 'nav', name: 'Navbar' },
          { selector: 'footer', name: 'Footer' },
          { selector: 'button', name: 'Buttons' },
          { selector: '.card, [class*="card"]', name: 'Cards' },
          { selector: 'article', name: 'Article' },
          { selector: 'aside', name: 'Sidebar' },
        ];
        
        elementsToCheck.forEach(({ selector, name }) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el, idx) => {
            const styles = window.getComputedStyle(el);
            const bgColor = styles.backgroundColor;
            const textColor = styles.color;
            
            // Check if colors are properly set (not transparent or inherit)
            if (bgColor === 'rgba(0, 0, 0, 0)' && el.tagName !== 'BUTTON') {
              issues.push(`${name} #${idx} has transparent background`);
            }
            
            if (textColor === 'rgba(0, 0, 0, 0)') {
              issues.push(`${name} #${idx} has transparent text color`);
            }
          });
        });
        
        return issues;
      });
      
      if (lightModeIssues.length > 0) {
        issues.push({
          page: pageInfo.name,
          mode: 'light',
          issues: lightModeIssues
        });
      }
      
      // Test dark mode
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });
      await page.waitForTimeout(500);
      
      const darkModeIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check if background actually changed
        const bodyStyles = window.getComputedStyle(document.body);
        const bgColor = bodyStyles.backgroundColor;
        
        // Parse RGB values
        const rgb = bgColor.match(/\d+/g);
        if (rgb && parseInt(rgb[0]) > 200) {
          issues.push('Body background is still light in dark mode');
        }
        
        // Check theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          const sunIcon = themeToggle.querySelector('.sun-icon');
          const moonIcon = themeToggle.querySelector('.moon-icon');
          
          if (sunIcon && window.getComputedStyle(sunIcon).display !== 'none') {
            issues.push('Sun icon visible in dark mode');
          }
          
          if (moonIcon && window.getComputedStyle(moonIcon).display === 'none') {
            issues.push('Moon icon hidden in dark mode');
          }
        }
        
        // Check specific problem areas
        const problemSelectors = [
          'button:not(#theme-toggle)',
          'a.bg-blue-600',
          'div[class*="bg-white"]',
          'div[class*="text-gray-"]'
        ];
        
        problemSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            issues.push(`Found ${elements.length} elements matching "${selector}" that may have hardcoded colors`);
          }
        });
        
        return issues;
      });
      
      if (darkModeIssues.length > 0) {
        issues.push({
          page: pageInfo.name,
          mode: 'dark',
          issues: darkModeIssues
        });
      }
      
      console.log(`✓ ${pageInfo.name} tested`);
      
    } catch (error) {
      console.error(`✗ Error testing ${pageInfo.name}:`, error.message);
      issues.push({
        page: pageInfo.name,
        error: error.message
      });
    }
  }
  
  await browser.close();
  
  // Report results
  console.log('\n' + '='.repeat(50));
  console.log('THEME TEST RESULTS');
  console.log('='.repeat(50));
  
  if (issues.length === 0) {
    console.log('\n✅ All theme tests passed!');
  } else {
    console.log(`\n❌ Found ${issues.length} page(s) with issues:\n`);
    issues.forEach(issue => {
      console.log(`Page: ${issue.page}`);
      if (issue.error) {
        console.log(`  Error: ${issue.error}`);
      } else {
        console.log(`  Mode: ${issue.mode}`);
        issue.issues.forEach(i => console.log(`    - ${i}`));
      }
      console.log('');
    });
    
    process.exit(1);
  }
}

// Run the test
testTheme().catch(console.error);