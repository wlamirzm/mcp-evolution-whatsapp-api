
import { spawn } from 'child_process';

const EVOLUTION_API_URL = 'https://evo-prod-new.iotninja.com.br/';
const EVOLUTION_API_KEY = '6d918d3f-38a2-4d7f-98f7-49f1d74d72a0';
const INSTANCE_NAME = 'inst_931199fc_1775776577751';

async function testMCP() {
  const mcpProcess = spawn('node', ['dist/main.js'], {
    cwd: 'c:/Users/wlami/OneDrive/_dev/7 - Antigravity/Agente-SAAS/mcp-evolution',
    env: { ...process.env, EVOLUTION_API_URL, EVOLUTION_API_KEY }
  });

  mcpProcess.stdout.on('data', (data) => {
    console.log(`[STDOUT] ${data}`);
  });

  mcpProcess.stderr.on('data', (data) => {
    console.log(`[STDERR] ${data}`);
  });

  const callReq = JSON.stringify({
      jsonrpc: "2.0",
      method: "tools/call",
      params: {
        name: "find_messages",
        arguments: {
          instanceName: INSTANCE_NAME,
          recordsPerPage: 1
        }
      },
      id: 2
    }) + '\n';
  
  setTimeout(() => {
    mcpProcess.stdin.write(callReq);
  }, 1000);

  setTimeout(() => {
    mcpProcess.kill();
  }, 5000);
}

testMCP();
