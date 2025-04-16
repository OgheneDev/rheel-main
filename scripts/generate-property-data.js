// scripts/generate-property-data.js
const fs = require('fs');
const path = require('path');
const https = require('https');

async function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function generatePropertyFiles() {
  try {
    // Create directory for property data
    const dataDir = path.join(process.cwd(), 'public', 'api', 'properties');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Fetch all properties
    console.log('Fetching all properties...');
    const allProperties = await fetchData('https://apidoc.rheel.ng/data/properties');
    
    if (!allProperties.data || !Array.isArray(allProperties.data)) {
      throw new Error('Invalid API response format');
    }
    
    // Generate a file for each property
    console.log(`Found ${allProperties.data.length} properties. Generating JSON files...`);
    
    for (const property of allProperties.data) {
      console.log(`Fetching details for property ${property.id}...`);
      const propertyDetails = await fetchData(`https://apidoc.rheel.ng/data/properties/${property.id}`);
      
      // Write to JSON file
      fs.writeFileSync(
        path.join(dataDir, `${property.id}.json`),
        JSON.stringify(propertyDetails.data || propertyDetails)
      );
      
      console.log(`✅ Generated data for property ${property.id}`);
    }
    
    console.log('✅ All property data generated successfully');
  } catch (error) {
    console.error('❌ Error generating property data:', error);
    process.exit(1);
  }
}

generatePropertyFiles(); 