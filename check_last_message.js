
const EVOLUTION_API_URL = 'https://evo-prod-new.iotninja.com.br/';
const EVOLUTION_API_KEY = '6d918d3f-38a2-4d7f-98f7-49f1d74d72a0';
const INSTANCE_NAME = 'inst_931199fc_1775776577751';

async function getLastMessageDetailed() {
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/chat/findMessages/${INSTANCE_NAME}`, {
      method: 'POST',
      headers: { 
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: 1,
        recordsPerPage: 1
      })
    });
    
    if (response.ok) {
        const data = await response.json();
        const lastMsg = data.messages.records[0];
        
        console.log('--- Última Mensagem Recebida ---');
        console.log(`De: ${lastMsg.pushName || 'Desconhecido'}`);
        console.log(`JID: ${lastMsg.key.remoteJid}`);
        console.log(`Tipo: ${lastMsg.messageType}`);
        
        const content = lastMsg.message.conversation || lastMsg.message.extendedTextMessage?.text || '[Mídia]';
        console.log(`Conteúdo: "${content}"`);
        console.log(`ID: ${lastMsg.key.id}`);
        console.log(`Enviada as: ${new Date(data.messages.records[0].messageTimestamp * 1000).toLocaleString('pt-BR')}`);
    }
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

getLastMessageDetailed();
