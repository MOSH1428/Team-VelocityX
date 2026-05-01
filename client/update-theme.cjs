const fs = require('fs');
const path = require('path');

function replaceColors(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceColors(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace purple with Red
      content = content.replace(/#aa3bff/g, '#ef4444'); 
      content = content.replace(/#8b2fcc/g, '#dc2626');
      
      // Remove unused React imports to fix lints
      content = content.replace(/import\s+React\s+from\s+['"]react['"];?\r?\n/g, '');
      content = content.replace(/import\s+React\s*,\s*\{\s*(.*?)\s*\}\s*from\s+['"]react['"]/g, 'import { $1 } from "react"');

      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceColors('./src');
console.log('Colors replaced and React imports fixed.');
