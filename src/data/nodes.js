// Etapas e opções baseadas em roteiro/roteiro.md, com os ajustes de balanceamento
// marcados como "ajuste" (o valor original do roteiro vem entre parênteses).
//
// Contexto: o grupo prepara um seminário de Sociologia sobre "Lazer e cidadania" e,
// antes do jogo começar, já entrevistou moradores da vizinhança. Esses dados são
// sensíveis: enviá-los a uma IA quebra a segurança.
//
// A ordem das opções no array define a letra (A, B, C) e foi embaralhada de propósito,
// para a opção mais equilibrada não ficar sempre na mesma posição. O comentário
// "op N" indica o número da opção no roteiro.
//
// Os efeitos ficam escondidos do jogador até ele escolher; só o custo de tempo aparece antes.
// `proximo` (opcional) é o id da etapa seguinte; sem ele, o jogo segue para a etapa logo acima.
// `opcional: true` marca uma etapa bônus: se o grupo chegar a ela sem tempo para pagar
// nenhuma opção, ela é pulada (sem os pontos dela) em vez de causar derrota por tempo.
export const nodes = [
  {
    id: 'pesquisa',
    titulo: 'Pesquisar o tema',
    descricao:
      'Antes de analisar as entrevistas com a vizinhança, o grupo precisa entender o tema "Lazer e cidadania". Por onde vocês começam?',
    opcoes: [
      {
        // op 3
        id: 'pesquisa-ia',
        texto: 'Pedir para a IA pesquisar o tema',
        custoTempo: 1,
        efeitos: { aprendizado: 1, qualidade: 1 }, // ajuste (aprendizado +2): terceirizar a pesquisa não pode render como o livro
        feedback:
          'Rápido, mas a IA pode misturar informações e inventar referências. Vocês ficaram com uma visão superficial do tema.',
      },
      {
        // op 1
        id: 'pesquisa-livro',
        texto: 'Apenas o livro didático',
        custoTempo: 2,
        efeitos: { aprendizado: 3, qualidade: 3 },
        proximo: 'sintese', // livro didático já é fonte confiável: pula a verificação
        feedback:
          'O livro didático é uma fonte confiável e revisada. Como não há fontes externas para checar, vocês podem pular a verificação.',
      },
      {
        // op 2
        id: 'pesquisa-livro-sites',
        texto: 'Livro didático + websites',
        custoTempo: 3,
        efeitos: { aprendizado: 4, qualidade: 5 }, // ajuste (aprendizado +5): tira a vantagem isolada do caminho "IA como apoio"
        feedback:
          'Combinar fontes amplia a visão sobre o tema. Mas sites variam muito em confiabilidade, então vale verificar o que encontraram.',
      },
    ],
  },
  {
    id: 'fontes',
    titulo: 'Verificação das fontes',
    descricao: 'Vocês reuniram material de várias origens. O que fazer com essas fontes?',
    opcoes: [
      {
        // op 2
        id: 'fontes-verificar',
        texto: 'Verificar as fontes',
        custoTempo: 3,
        efeitos: { aprendizado: 2, qualidade: 5 },
        feedback:
          'Conferir autoria, data e origem de cada fonte deu ao trabalho uma base sólida e confiável.',
      },
      {
        // op 3
        id: 'fontes-ia',
        texto: 'Pedir para alguma IA verificar a veracidade das fontes',
        custoTempo: 1,
        efeitos: { aprendizado: 0, qualidade: -2 }, // ajuste (qualidade +0): a IA não substitui a checagem
        feedback:
          'A IA não tem como garantir se uma fonte é verdadeira, e pode errar com confiança. Ela "aprovou" fontes duvidosas, e o grupo confiou.',
      },
      {
        // op 1
        id: 'fontes-nao-verificar',
        texto: 'Não verificar as fontes',
        custoTempo: 0,
        efeitos: { aprendizado: 0, qualidade: -4 }, // ajuste (-1): não verificar precisa custar caro
        feedback:
          'Sem checagem, informações falsas ou desatualizadas entraram no trabalho, e a professora percebeu.',
      },
    ],
  },
  {
    id: 'sintese',
    titulo: 'Síntese do tema',
    descricao:
      'Vocês têm em mãos as respostas das entrevistas com os moradores, com nomes, endereços e opiniões pessoais. Como analisar esses dados e relacioná-los com o tema?',
    opcoes: [
      {
        // op 1
        id: 'sintese-manual',
        texto: 'Analisar os dados e relacionar com o tema de forma totalmente manual',
        custoTempo: 4,
        efeitos: { aprendizado: 5, qualidade: 5 },
        feedback:
          'Trabalhoso, mas os dados ficaram protegidos e o grupo entendeu de verdade como as respostas dos moradores se conectam com o tema.',
      },
      {
        // op 2
        id: 'sintese-manual-ia',
        texto: 'Analisar os dados manualmente e pedir para a IA relacionar com o tema',
        custoTempo: 2,
        efeitos: { aprendizado: 4, qualidade: 3 },
        feedback:
          'Os dados dos moradores ficaram só com o grupo: a IA recebeu apenas as conclusões da análise, sem informações pessoais. Um uso seguro da ferramenta como apoio.',
      },
      {
        // op 3
        id: 'sintese-ia',
        texto: 'Fazer a análise e a relação com o tema totalmente por IA',
        custoTempo: 1,
        efeitos: { aprendizado: 0, qualidade: 0 },
        quebraSeguranca: true,
        feedback:
          'Para a IA analisar, vocês enviaram as entrevistas com dados pessoais dos moradores. Essas informações podem ser armazenadas e usadas por terceiros, e quem confiou no grupo ficou exposto.',
      },
    ],
  },
  {
    id: 'roteiro',
    titulo: 'Construção do roteiro',
    descricao: 'Com a síntese pronta, vocês precisam organizar o que vai ser falado no seminário.',
    opcoes: [
      {
        // op 1
        id: 'roteiro-manual',
        texto: 'Estruturar os tópicos e construir as falas de forma manual',
        custoTempo: 4,
        efeitos: { aprendizado: 7, qualidade: 3 }, // ajuste (aprendizado +5)
        feedback:
          'Levou tempo, mas organizar tudo sozinhos fez o grupo dominar o conteúdo de ponta a ponta.',
      },
      {
        // op 3
        id: 'roteiro-ia',
        texto: 'Pedir para a IA estruturar e montar as falas sozinha',
        custoTempo: 1,
        efeitos: { aprendizado: -2, qualidade: 0 }, // ajuste (aprendizado +0): desestimula delegar as falas
        feedback:
          'As falas não são de vocês. O grupo não entende o próprio roteiro, e na hora de apresentar vai ser difícil explicar o que está escrito.',
      },
      {
        // op 2
        id: 'roteiro-ia-estrutura',
        texto: 'Estruturar os tópicos com IA e construir as falas manualmente a partir disso',
        custoTempo: 2,
        efeitos: { aprendizado: 5, qualidade: 4 },
        feedback:
          'A IA ajudou a organizar, e as falas são de vocês. Ganharam tempo sem perder a autoria.',
      },
    ],
  },
  {
    id: 'slides',
    titulo: 'Confecção dos slides',
    descricao: 'O seminário precisa de slides. Como vocês vão fazê-los?',
    opcoes: [
      {
        // op 3
        id: 'slides-ia-sem-contexto',
        texto: 'Só pedir para a IA fazer slides sobre o tema, sem dar contexto',
        custoTempo: 1,
        efeitos: { aprendizado: 0, qualidade: -2 }, // ajuste (qualidade +0): slides genéricos atrapalham a apresentação
        feedback:
          'Sem contexto, a IA fez slides genéricos que não combinam com o que o grupo vai falar. Durante a apresentação, a turma ficou confusa com slides que diziam uma coisa enquanto o grupo falava outra.',
      },
      {
        // op 2
        id: 'slides-ia-roteiro',
        texto: 'Alimentar a IA com o roteiro e pedir para ela fazer os slides a partir dele',
        custoTempo: 2,
        efeitos: { aprendizado: 1, qualidade: 4 },
        feedback:
          'Com um bom contexto, a IA produziu slides fiéis ao roteiro do grupo.',
      },
      {
        // op 1
        id: 'slides-manual',
        texto: 'Fazer os slides totalmente à mão, sem o uso de IA',
        custoTempo: 3,
        efeitos: { aprendizado: 3, qualidade: 3 }, // ajuste (aprendizado +1)
        feedback:
          'Escolher cada imagem e cada palavra fez o grupo revisar o conteúdo mais uma vez.',
      },
    ],
  },
  {
    id: 'perguntas',
    titulo: 'Estudar possíveis perguntas',
    opcional: true,
    descricao:
      'Etapa bônus! Sobrou tempo, então vocês podem se preparar para as perguntas da turma e da professora. Como fazem isso?',
    opcoes: [
      {
        // op 2
        id: 'perguntas-ia-resposta-manual',
        texto: 'Pedir para uma IA formular perguntas e respondê-las manualmente',
        custoTempo: 2,
        efeitos: { aprendizado: 5, qualidade: 5 },
        feedback:
          'A IA trouxe perguntas que vocês não tinham imaginado, e responder sozinhos fixou o conteúdo.',
      },
      {
        // op 1
        id: 'perguntas-manual',
        texto: 'Formular as perguntas manualmente',
        custoTempo: 3,
        efeitos: { aprendizado: 7, qualidade: 3 }, // ajuste (aprendizado +4)
        feedback:
          'Pensar nas perguntas obrigou o grupo a enxergar o tema pelos olhos da turma. Vocês chegaram muito bem preparados.',
      },
      {
        // op 3
        id: 'perguntas-ia',
        texto: 'Pedir para a IA formular as perguntas e dar as respostas',
        custoTempo: 1,
        efeitos: { aprendizado: 1, qualidade: 2 }, // ajuste (qualidade +3): respostas decoradas rendem menos que estudar
        feedback:
          'Vocês têm respostas prontas, mas decoradas. Uma pergunta um pouco diferente pode pegar o grupo de surpresa.',
      },
    ],
  },
]
