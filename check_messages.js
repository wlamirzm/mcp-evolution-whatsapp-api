
const EVOLUTION_API_URL = 'https://evo-prod-new.iotninja.com.br/';
const EVOLUTION_API_KEY = '6d918d3f-38a2-4d7f-98f7-49f1d74d72a0';
const INSTANCE_NAME = 'inst_931199fc_1775776577751';

async function getLastMessage() {
  console.log(`--- Fetching last message for instance: ${INSTANCE_NAME} ---`);
  
  try {
    const response = await fetch(`${EVOLUTION_API_URL}/chat/fetchMessages/${INSTANCE_NAME}`, {
      method: 'GET',
      headers: { 'apikey': EVOLUTION_API_KEY }
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Na Evolution API, o retorno pode ser um array de mensagens ou um objeto com 'messages'
    const messages = data.messages || data;
    
    if (Array.isArray(messages) && messages.length > 0) {
      // Pega a última mensagem
      const lastMsg = messages[0]; // Geralmente a primeira é a mais recente se ordenado desc
      console.log('\nÚltima Mensagem Recebida:');
      console.log(JSON.stringify(lastMsg, null, 2));
    } else {
      console.log('\nNenhuma mensagem encontrada.');
    }

  } catch (error) {
    console.error('\nErro ao buscar mensagens:', error.message);
  }
}

getLastMessage();
