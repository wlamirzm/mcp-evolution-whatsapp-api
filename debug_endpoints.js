
const EVOLUTION_API_URL = 'https://evo-prod-new.iotninja.com.br/';
const EVOLUTION_API_KEY = '6d918d3f-38a2-4d7f-98f7-49f1d74d72a0';
const INSTANCE_NAME = 'inst_931199fc_1775776577751';

async function testEndpoints() {
  const endpoints = [
    { method: 'POST', path: `/chat/findMessages/${INSTANCE_NAME}`, body: {} },
    { method: 'GET', path: `/chat/findMessages/${INSTANCE_NAME}` },
    { method: 'POST', path: `/chat/fetchMessages/${INSTANCE_NAME}`, body: {} },
    { method: 'GET', path: `/chat/fetchMessages/${INSTANCE_NAME}` }
  ];

  for (const ep of endpoints) {
    console.log(`\nTesting ${ep.method} ${ep.path}...`);
    try {
      const response = await fetch(`${EVOLUTION_API_URL}${ep.path}`, {
        method: ep.method,
        headers: { 
          'apikey': EVOLUTION_API_KEY,
          'Content-Type': 'application/json'
        },
        body: ep.body ? JSON.stringify(ep.body) : undefined
      });
      
      console.log(`Response Status: ${response.status}`);
      if (response.ok) {
        const data = await response.json();
        console.log('SUCCESS! Sample data:');
        const msgs = data.messages || data.record || (Array.isArray(data) ? data : null);
        if (Array.isArray(msgs)) {
            console.log(JSON.stringify(msgs.slice(0, 1), null, 2));
        } else {
            console.log(JSON.stringify(data, null, 2).slice(0, 500));
        }
        return; // Stop after first success
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

testEndpoints();
