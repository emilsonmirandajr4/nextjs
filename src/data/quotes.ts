// Banco de frases - adicione suas frases preferidas aqui!
// Você pode ir expandindo essa lista conforme encontrar novas frases

export interface Quote {
    id: number;
    text: string;
    author: string;
    authorInfo?: string;
}

export const quotes: Quote[] = [
    {
        id: 1,
        text: "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
        author: "Winston Churchill",
        authorInfo: "Ex-Primeiro Ministro do Reino Unido"
    },
    {
        id: 2,
        text: "A única maneira de fazer um excelente trabalho é amar o que você faz.",
        author: "Steve Jobs",
        authorInfo: "Co-fundador da Apple"
    },
    {
        id: 3,
        text: "O maior risco é não correr nenhum risco. Em um mundo que muda muito rapidamente, a única estratégia que é garantida para falhar é não correr riscos.",
        author: "Mark Zuckerberg",
        authorInfo: "CEO da Meta"
    },
    {
        id: 4,
        text: "Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças.",
        author: "Charles Darwin",
        authorInfo: "Naturalista e Biólogo"
    },
    {
        id: 5,
        text: "O pessimista vê dificuldade em cada oportunidade. O otimista vê oportunidade em cada dificuldade.",
        author: "Winston Churchill",
        authorInfo: "Ex-Primeiro Ministro do Reino Unido"
    },
    {
        id: 6,
        text: "A melhor maneira de prever o futuro é inventá-lo.",
        author: "Alan Kay",
        authorInfo: "Cientista da Computação"
    },
    {
        id: 7,
        text: "Seu tempo é limitado, não o desperdice vivendo a vida de outra pessoa.",
        author: "Steve Jobs",
        authorInfo: "Co-fundador da Apple"
    },
    {
        id: 8,
        text: "Pessoas que são loucas o suficiente para pensar que podem mudar o mundo são as que realmente o fazem.",
        author: "Rob Siltanen",
        authorInfo: "Publicitário - Campanha Apple"
    },
    {
        id: 9,
        text: "Empreendedorismo é viver alguns anos de sua vida como a maioria das pessoas não fará, para poder passar o resto de sua vida como a maioria das pessoas não pode.",
        author: "Anônimo",
        authorInfo: "Sabedoria Popular"
    },
    {
        id: 10,
        text: "O dinheiro não é a coisa mais importante do mundo. O amor é. Felizmente, eu amo dinheiro.",
        author: "Jackie Mason",
        authorInfo: "Comediante"
    },
    {
        id: 11,
        text: "Não tenha medo de desistir do bom para buscar o ótimo.",
        author: "John D. Rockefeller",
        authorInfo: "Empresário e Filantropo"
    },
    {
        id: 12,
        text: "O segredo do sucesso é saber algo que ninguém mais sabe.",
        author: "Aristóteles Onassis",
        authorInfo: "Magnata Grego"
    },
    {
        id: 13,
        text: "Se você quer algo que nunca teve, precisa fazer algo que nunca fez.",
        author: "Thomas Jefferson",
        authorInfo: "Ex-Presidente dos EUA"
    },
    {
        id: 14,
        text: "Grandes mentes discutem ideias. Mentes medianas discutem eventos. Mentes pequenas discutem pessoas.",
        author: "Eleanor Roosevelt",
        authorInfo: "Diplomata e Ativista"
    },
    {
        id: 15,
        text: "O sucesso geralmente vem para quem está ocupado demais para procurar por ele.",
        author: "Henry David Thoreau",
        authorInfo: "Escritor e Filósofo"
    },
    {
        id: 16,
        text: "Não é a carga que o quebra, é a forma como você a carrega.",
        author: "Lou Holtz",
        authorInfo: "Treinador de Futebol Americano"
    },
    {
        id: 17,
        text: "A diferença entre o possível e o impossível está na determinação da pessoa.",
        author: "Tommy Lasorda",
        authorInfo: "Treinador de Baseball"
    },
    {
        id: 18,
        text: "Você não pode mudar o vento, mas pode ajustar as velas.",
        author: "Billie Jean King",
        authorInfo: "Tenista"
    },
    {
        id: 19,
        text: "O fracasso é simplesmente a oportunidade de começar de novo, desta vez de forma mais inteligente.",
        author: "Henry Ford",
        authorInfo: "Fundador da Ford Motor Company"
    },
    {
        id: 20,
        text: "Não deixe que o barulho das opiniões dos outros abafe a sua própria voz interior.",
        author: "Steve Jobs",
        authorInfo: "Co-fundador da Apple"
    },
    {
        id: 21,
        text: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
        author: "Vidal Sassoon",
        authorInfo: "Cabeleireiro e Empresário"
    },
    {
        id: 22,
        text: "Oportunidades não acontecem. Você as cria.",
        author: "Chris Grosser",
        authorInfo: "Empreendedor"
    },
    {
        id: 23,
        text: "Não espere. O tempo nunca será perfeito.",
        author: "Napoleon Hill",
        authorInfo: "Autor de 'Quem Pensa Enriquece'"
    },
    {
        id: 24,
        text: "Se você não está disposto a arriscar o comum, terá que se contentar com o ordinário.",
        author: "Jim Rohn",
        authorInfo: "Palestrante Motivacional"
    },
    {
        id: 25,
        text: "A persistência é o caminho do êxito.",
        author: "Charles Chaplin",
        authorInfo: "Ator e Cineasta"
    },
    {
        id: 26,
        text: "Se você pode sonhar, você pode fazer.",
        author: "Walt Disney",
        authorInfo: "Fundador da Disney"
    },
    {
        id: 27,
        text: "Quanto maior a dificuldade, maior a glória em superá-la.",
        author: "Epicuro",
        authorInfo: "Filósofo Grego"
    },
    {
        id: 28,
        text: "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.",
        author: "Albert Einstein",
        authorInfo: "Físico Teórico"
    },
    {
        id: 29,
        text: "O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta.",
        author: "Winston Churchill",
        authorInfo: "Ex-Primeiro Ministro do Reino Unido"
    },
    {
        id: 30,
        text: "Acredite que você pode, assim você já está no meio do caminho.",
        author: "Theodore Roosevelt",
        authorInfo: "Ex-Presidente dos EUA"
    },
];

/**
 * Retorna a frase do dia baseada em períodos de 6 horas
 * A frase muda 4x por dia (00h, 06h, 12h, 18h), rotacionando pelo banco
 * Usa timestamp opcional para compatibilidade com static generation
 */
export function getQuoteOfDay(timestamp?: number): Quote {
    // Usa timestamp fornecido ou Date.now() para client-side
    const now = timestamp ?? Date.now();
    const year = new Date(now).getFullYear();
    const yearStart = new Date(year, 0, 0).getTime();
    
    // Calcula períodos de 6 horas desde o início do ano
    const msFromYearStart = now - yearStart;
    const sixHourPeriods = Math.floor(msFromYearStart / (1000 * 60 * 60 * 6));

    // Usa o período de 6h para selecionar a frase (rotaciona quando acaba)
    const index = sixHourPeriods % quotes.length;
    return quotes[index];
}

/**
 * Retorna uma frase aleatória
 */
export function getRandomQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

/**
 * Retorna todas as frases
 */
export function getAllQuotes(): Quote[] {
    return quotes;
}

/**
 * Adiciona uma nova frase (use isso para expandir o banco)
 * Nota: Em produção você vai querer persistir isso em um banco de dados real
 */
export function addQuote(text: string, author: string, authorInfo?: string): Quote {
    const newQuote: Quote = {
        id: quotes.length + 1,
        text,
        author,
        authorInfo,
    };
    quotes.push(newQuote);
    return newQuote;
}
