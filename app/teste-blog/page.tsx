'use client';

import React from 'react';

// Dados de exemplo para os cards de blog
const mockPosts = [
  {
    id: 1,
    title: 'Como a inteligência artificial está transformando o jornalismo em 2024',
    excerpt: 'Descubra as principais tendências e ferramentas que estão revolucionando a forma como consumimos notícias.',
    category: 'Tecnologia',
    author: 'Maria Silva',
    date: '28 Dez 2024',
    readTime: '5 min',
    image: 'https://picsum.photos/seed/tech1/800/450',
  },
  {
    id: 2,
    title: 'Os melhores destinos para viajar no verão brasileiro',
    excerpt: 'Praias paradisíacas, aventuras na natureza e experiências culturais únicas aguardam você.',
    category: 'Viagem',
    author: 'João Santos',
    date: '27 Dez 2024',
    readTime: '8 min',
    image: 'https://picsum.photos/seed/travel1/800/450',
  },
  {
    id: 3,
    title: 'Economia verde: investimentos sustentáveis ganham força no Brasil',
    excerpt: 'O mercado financeiro está cada vez mais atento às práticas ESG e oportunidades sustentáveis.',
    category: 'Economia',
    author: 'Ana Costa',
    date: '26 Dez 2024',
    readTime: '6 min',
    image: 'https://picsum.photos/seed/eco1/800/450',
  },
  {
    id: 4,
    title: 'Receitas saudáveis para começar o ano novo com energia',
    excerpt: 'Aprenda a preparar pratos nutritivos e deliciosos que vão transformar sua alimentação.',
    category: 'Saúde',
    author: 'Pedro Lima',
    date: '25 Dez 2024',
    readTime: '4 min',
    image: 'https://picsum.photos/seed/food1/800/450',
  },
  {
    id: 5,
    title: 'O futuro do trabalho remoto: tendências para 2025',
    excerpt: 'Empresas e profissionais se adaptam às novas realidades do mercado de trabalho híbrido.',
    category: 'Carreira',
    author: 'Carla Mendes',
    date: '24 Dez 2024',
    readTime: '7 min',
    image: 'https://picsum.photos/seed/work1/800/450',
  },
  {
    id: 6,
    title: 'Arte contemporânea brasileira conquista o mundo',
    excerpt: 'Artistas nacionais ganham destaque em galerias e museus internacionais.',
    category: 'Cultura',
    author: 'Lucas Ferreira',
    date: '23 Dez 2024',
    readTime: '5 min',
    image: 'https://picsum.photos/seed/art1/800/450',
  },
];

// ============================================
// SEÇÃO 1: Grid Clássico com Cards
// ============================================
const BlogSection1_ClassicGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Estilo 1</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Grid Clássico com Cards</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Layout limpo e tradicional, perfeito para blogs de notícias</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.slice(0, 6).map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Por {post.author}</span>
                  <button className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors flex items-center gap-1">
                    Ler mais
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 2: Layout Magazine com Destaque
// ============================================
const BlogSection2_Magazine = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Estilo 2</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Layout Magazine</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Um artigo em destaque com posts secundários ao lado</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Post Principal */}
          <article className="group relative rounded-3xl overflow-hidden h-[500px] shadow-2xl">
            <img 
              src={mockPosts[0].image} 
              alt={mockPosts[0].title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full mb-4">
                {mockPosts[0].category}
              </span>
              <h3 className="text-3xl font-bold text-white mb-4 line-clamp-3">
                {mockPosts[0].title}
              </h3>
              <p className="text-gray-200 mb-4 line-clamp-2">{mockPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-gray-300 text-sm">
                <span>{mockPosts[0].author}</span>
                <span>•</span>
                <span>{mockPosts[0].date}</span>
                <span>•</span>
                <span>{mockPosts[0].readTime} de leitura</span>
              </div>
            </div>
          </article>

          {/* Posts Secundários */}
          <div className="flex flex-col gap-6">
            {mockPosts.slice(1, 4).map((post) => (
              <article key={post.id} className="group flex gap-5 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-40 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                    {post.category}
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors mb-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 3: Cards com Efeito Hover Criativo
// ============================================
const BlogSection3_CreativeCards = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Estilo 3</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Cards Criativos Dark</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Design moderno com efeitos de hover impressionantes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPosts.slice(0, 6).map((post, index) => (
            <article 
              key={post.id} 
              className="group relative bg-gray-800 rounded-2xl overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-purple-400 text-xs font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Leia</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 4: Lista Minimalista
// ============================================
const BlogSection4_MinimalList = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Estilo 4</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Lista Minimalista</h2>
          <p className="text-gray-600 mt-3">Foco no conteúdo com design clean e elegante</p>
        </div>

        <div className="space-y-0">
          {mockPosts.map((post, index) => (
            <article 
              key={post.id} 
              className={`group py-8 ${index !== mockPosts.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{post.author}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{post.readTime} de leitura</span>
                  </div>
                </div>
                <div className="w-full md:w-48 h-36 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 5: Grid Masonry Style
// ============================================
const BlogSection5_Masonry = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider">Estilo 5</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Grid Masonry</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Layout dinâmico com cards de tamanhos variados</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {mockPosts.map((post, index) => {
            const heights = ['h-72', 'h-96', 'h-80', 'h-[400px]', 'h-64', 'h-88'];
            return (
              <article 
                key={post.id} 
                className={`group break-inside-avoid relative ${heights[index % heights.length]} rounded-3xl overflow-hidden shadow-xl cursor-pointer`}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="inline-block w-fit bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-200 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-4 text-gray-300 text-sm">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 6: Cards com Borda Gradient
// ============================================
const BlogSection6_GradientBorder = () => {
  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Estilo 6</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Borda Gradiente Neon</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Visual futurista com bordas coloridas animadas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.slice(0, 6).map((post, index) => {
            const gradients = [
              'from-cyan-500 via-blue-500 to-purple-500',
              'from-pink-500 via-red-500 to-yellow-500',
              'from-green-500 via-teal-500 to-cyan-500',
              'from-purple-500 via-pink-500 to-red-500',
              'from-yellow-500 via-orange-500 to-red-500',
              'from-blue-500 via-indigo-500 to-purple-500',
            ];
            return (
              <article 
                key={post.id} 
                className="group relative p-[2px] rounded-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]} opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy`} 
                     style={{ backgroundSize: '200% 200%' }} 
                />
                <div className="relative bg-slate-900 rounded-2xl overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>
                  <div className="p-6">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-gray-300 text-sm">{post.author}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 7: Cards Horizontais Grandes
// ============================================
const BlogSection7_HorizontalCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Estilo 7</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Cards Horizontais</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Layout elegante alternando imagem esquerda/direita</p>
        </div>

        <div className="space-y-8">
          {mockPosts.slice(0, 4).map((post, index) => (
            <article 
              key={post.id} 
              className={`group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300`}
            >
              <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-transparent to-white/20`} />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{post.author}</p>
                      <p className="text-gray-500 text-sm">{post.readTime} de leitura</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group/btn">
                    Ler artigo
                    <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 8: Cards com Glassmorphism
// ============================================
const BlogSection8_Glassmorphism = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-violet-200 font-semibold text-sm uppercase tracking-wider">Estilo 8</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Glassmorphism</h2>
          <p className="text-violet-200 mt-3 max-w-2xl mx-auto">Efeito de vidro translúcido super moderno</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPosts.slice(0, 6).map((post) => (
            <article 
              key={post.id} 
              className="group backdrop-blur-xl bg-white/10 rounded-3xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 backdrop-blur-md bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-violet-200 transition-colors">
                  {post.title}
                </h3>
                <p className="text-violet-100/80 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold border border-white/30">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-violet-200 text-sm">{post.author}</span>
                  </div>
                  <span className="text-violet-300/60 text-sm">{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 9: Carousel/Slider Horizontal
// ============================================
const BlogSection9_Carousel = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Estilo 9</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Carousel Horizontal</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Scroll horizontal com snap points</p>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {mockPosts.map((post) => (
              <article 
                key={post.id} 
                className="group flex-shrink-0 w-80 md:w-96 snap-center bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{post.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {mockPosts.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-amber-200 hover:bg-amber-500 transition-colors cursor-pointer" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEÇÃO 10: Grid Compacto com Hover Reveal
// ============================================
const BlogSection10_CompactGrid = () => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Estilo 10</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Grid Compacto</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Muitos posts em pouco espaço com hover reveal</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...mockPosts, ...mockPosts.slice(0, 2)].map((post, index) => (
            <article 
              key={`${post.id}-${index}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img 
                src={`${post.image}&v=${index}`} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {post.category}
                </span>
                <h3 className="text-white font-bold text-sm md:text-base line-clamp-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <span className="text-gray-300 text-xs">{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// Página Principal
// ============================================
export default function TesteBlogPage() {
  return (
    <main className="min-h-screen">
      {/* Header da página de teste */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎨 Galeria de Seções de Blog
          </h1>
          <p className="text-xl text-white/90 mb-6">
            10 estilos diferentes para você escolher e implementar no seu projeto
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <a 
                key={num}
                href={`#style-${num}`}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Estilo {num}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Todas as seções */}
      <div id="style-1"><BlogSection1_ClassicGrid /></div>
      <div id="style-2"><BlogSection2_Magazine /></div>
      <div id="style-3"><BlogSection3_CreativeCards /></div>
      <div id="style-4"><BlogSection4_MinimalList /></div>
      <div id="style-5"><BlogSection5_Masonry /></div>
      <div id="style-6"><BlogSection6_GradientBorder /></div>
      <div id="style-7"><BlogSection7_HorizontalCards /></div>
      <div id="style-8"><BlogSection8_Glassmorphism /></div>
      <div id="style-9"><BlogSection9_Carousel /></div>
      <div id="style-10"><BlogSection10_CompactGrid /></div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">Escolha o estilo que mais combina com seu projeto!</p>
          <p className="text-gray-500 text-sm">
            Cada seção é um componente independente que pode ser copiado e customizado.
          </p>
        </div>
      </footer>
    </main>
  );
}
