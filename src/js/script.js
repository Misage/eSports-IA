const apiKeyInput = document.getElementById("apiKey");
const gameSelect = document.getElementById("gameSelect");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const aiResponse = document.getElementById("aiResponse");
const form = document.getElementById("form");

const markdownToHTML = (text) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
};

const askAI = async (question, game, apiKey) => {
  const model = "gemini-2.0-flash";
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const perguntaLol = `
    ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionadaao jogo!'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadassobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.

    ##Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres.
    - Responda em masrkdown
    - não precisa fazer nenhuma saudação ou despedida, responda apenas o que o usuário está querendo.

    ## Exemplo de resposta
    Pergunta do usuário: Melhor build rengar jungle
    resposta: A build mais atual é: \n\n **Itens:** \n\n coloque os ítens aqui. \n\n **Runas:** \n\n exemplos de runas \n\n

    ---

    Aqui está a pergunta do usuário: ${question}
    `;
  const perguntaValorant = `
    ## Especialidade  
    Você é um especialista assistente de meta para o jogo ${game}  

    ## Tarefa  
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, agentes, mapas, armas, economia e dicas atualizadas.  

    ## Regras  
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.  
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo!'  
    - Considere a data atual ${new Date().toLocaleDateString()}  
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.  
    - Nunca responda com base em conteúdos ultrapassados ou removidos no patch atual.  

    ## Resposta  
    - Economize na resposta, seja direto e responda no máximo 500 caracteres.  
    - Responda em markdown.  
    - Não precisa fazer nenhuma saudação ou despedida, responda apenas o que o usuário está querendo.  

    ## Exemplo de resposta  
    Pergunta do usuário: Melhor agente para Lotus no competitivo  
    Resposta: Os melhores agentes para Lotus atualmente são: **Omen**, **Skye**, **Killjoy** e **Raze**. Eles oferecem controle, utilidade e pressão em áreas importantes do mapa.  

    ---  

    Aqui está a pergunta do usuário: ${question}

  `;

  const perguntaTft = `
    ## Especialidade  
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa  
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds, comps e dicas.

    ## Regras  
    - Se você não sabe a resposta, responda com "Não sei" e não tente inventar uma resposta.  
    - Se a pergunta não está relacionada ao jogo, responda com "Essa pergunta não está relacionada ao jogo!"  
    - Considere a data atual ${new Date().toLocaleDateString()}  
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.  
    - Nunca responda itens ou comps que você não tenha certeza de que existem no patch atual.

    ## Resposta  
    - Economize na resposta, seja direto e responda no máximo 500 caracteres.  
    - Responda em markdown  
    - Não precisa fazer nenhuma saudação ou despedida, responda apenas o que o usuário está querendo.

    ## Exemplo de resposta  
    Pergunta do usuário: Melhor comp para subir de elo no TFT  
    resposta: **Melhor comp no patch 14.13:**  
    - **Comp:** Invocadores + Porcelana (Lissandra carry)  
    - **Itens core:** Lissandra (Cajado + Ampulheta), Ornn (Placa Gargolítica)  
    - **Dica:** Foque em economia e pegue Ornn 2 estrelas no nível 7.  

    ---

    Aqui está a pergunta do usuário: ${question}
  `;

  const perguntaFragpunk = `
  ## Especialidade  
  Você é um especialista assistente de meta para o jogo ${game}  

  ## Tarefa  
  Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, personagens (heróis), cartas de modificação, armas, mapas, economia e dicas atualizadas.  

  # Regras  
  - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.  
  - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo!'  
  - Considere a data atual ${new Date().toLocaleDateString()}  
  - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.  
  - Nunca responda com base em conteúdos ultrapassados ou removidos no patch atual.  

  ## Resposta  
  - Economize na resposta, seja direto e responda no máximo 500 caracteres.  
  - Responda em markdown.  
  - Não precisa fazer nenhuma saudação ou despedida, responda apenas o que o usuário está querendo.  

  ## Exemplo de resposta  
  **Pergunta do usuário:** Melhor combinação de cartas para a SMG Clampdown  
  **Resposta:** Use **Clampdown** com as cartas **Ricochete**, **Carga Duplicada** e **Velocidade de Recarga**. Esse combo maximiza dano em combate próximo e mantém pressão com recarga rápida. Ideal para estilos agressivos.  

  ---

  Aqui está a pergunta do usuário: ${question}
  `;

  const perguntaDbd = `
  ## Especialidade
  Você é um especialista assistente de meta para o jogo ${game}

  ## Tarefa
  Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas.

  ## Regras
  - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
  - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo!'
  - Considere a data atual ${new Date().toLocaleDateString()}
  - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
  - Nunca responda itens que você não tenha certeza de que existe no patch atual.

  ## Resposta
  - Economize na resposta, seja direto e responda no máximo 500 caracteres.
  - Responda em markdown.
  - Não precisa fazer nenhuma saudação ou despedida, responda apenas o que o usuário está querendo.

  ## Exemplo de resposta
  Pergunta do usuário: Melhor build para o Killer Wesker?
  resposta: **Perks recomendados:** Corrupt Intervention, Scourge Hook: Pain Resonance, Pop Goes the Weasel, Save the Best for Last. **Add-ons:** Loose Crank + Lion Medallion. Foco em pressão e mobilidade.

  ---

  Aqui está a pergunta do usuário: ${question}

  `;
  const perguntaCS = `
    ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds, economia e dicas

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo!'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existem no patch atual.
    - Baseie as estratégias nas ligas competitivas, matchmaking e práticas recomendadas do cenário atual.

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres.
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, responda apenas o que o usuário está querendo saber.

    ## Exemplo de resposta
    Pergunta do usuário: Melhor economia no round 2 CT depois de perder o pistol  
    Resposta: No round 2 CT após perder o pistol, o ideal é fazer um full eco ou comprar pistolas com colete, focando em stack ou avanço agressivo. Mantenha o dinheiro para comprar no 4º round com M4 + utilitários.

    ---

    Aqui está a pergunta do usuário: ${question}
  `;

  let pergunta

  if (game == 'Valorant') {
    pergunta = perguntaValorant
  } else if (game == 'lol') {
    pergunta = perguntaLol
  } else if (game == 'tft') {
    pergunta = perguntaTft
  } else if (game == 'fragpunk') {
    pergunta = perguntaFragpunk
  } else if (game == 'dbd') {
    pergunta = perguntaDbd
  } else {
    pergunta = perguntaCS
  };

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: pergunta,
        },
      ],
    },
  ];

  const tools = [
    {
      google_search: {},
    },
  ];

  const response = await fetch(geminiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
      tools,
    }),
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

const sendForm = async (event) => {
  event.preventDefault();
  const apiKey = apiKeyInput.value;
  const game = gameSelect.value;
  const question = questionInput.value;

  if (apiKey == "" || game == "" || question == "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  askButton.disabled = true;
  askButton.textContent = "Perguntando...";
  askButton.classList.add("loading");

  try {
    const text = await askAI(question, game, apiKey);
    aiResponse.querySelector(".response-content").innerHTML =
      markdownToHTML(text);
    aiResponse.classList.remove("hidden");
  } catch (error) {
    console.log("Erro: ", error);
  } finally {
    askButton.disabled = false;
    askButton.textContent = "Perguntar";
    askButton.classList.remove("loading");
  }
};
form.addEventListener("submit", sendForm);
