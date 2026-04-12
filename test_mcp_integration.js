
import { spawn } from 'child_process';

const EVOLUTION_API_URL = 'https://evo-prod-new.iotninja.com.br/';
const EVOLUTION_API_KEY = '6d918d3f-38a2-4d7f-98f7-49f1d74d72a0';
const INSTANCE_NAME = 'inst_931199fc_1775776577751';

async function testMCP() {
  console.log('--- Iniciando Teste de Integração MCP ---');
  
  const mcpProcess = spawn('node', ['dist/main.js'], {
    cwd: 'c:/Users/wlami/OneDrive/_dev/7 - Antigravity/Agente-SAAS/mcp-evolution',
    env: {
      ...process.env,
      EVOLUTION_API_URL,
      EVOLUTION_API_KEY
    }
  });

  let output = '';
  mcpProcess.stdout.on('data', (data) => {
    output += data.toString();
    try {
        const json = JSON.parse(output.trim());
        if (json.id === 2) {
            console.log('\n✅ Resposta do Servidor MCP para find_messages:');
            console.log(JSON.stringify(json.result, null, 2));
            mcpProcess.kill();
        }
    } catch (e) {
        // Aguardando JSON completo
    }
  });

  mcpProcess.stderr.on('data', (data) => {
    console.log(`[STDERR] ${data}`);
  });

  // 1. Listar Ferramentas
  console.log('1. Verificando se a ferramenta find_messages existe...');
  const listReq = JSON.stringify({
    jsonrpc: "2.0",
    method: "tools/list",
    params: {},
    id: 1
  }) + '\n';
  
  mcpProcess.stdin.write(listReq);

  // 2. Chamar a ferramenta find_messages
  setTimeout(() => {
    console.log('2. Chamando a ferramenta find_messages via JSON-RPC...');
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
    mcpProcess.stdin.write(callReq);
  }, 1000);

  setTimeout(() => {
    if (mcpProcess.connected) mcpProcess.kill();
  }, 10000);
}

testMCP();
