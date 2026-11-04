/* =========================================================
   Idiomas — detecta pelo navegador (ou ?lang=xx), guarda a
   escolha e traduz a interface + textos dos projetos.
   ========================================================= */
(() => {
  const L = {
    pt: {
      _name: "Português", role: "Designer & Diretor de Arte",
      nav_featured: "Destaques", nav_work: "Trabalhos", nav_archive: "Arquivo", nav_about: "Sobre", cta_talk: "Vamos conversar",
      portfolio: "( Portfólio )", today: "Hoje", available: "Disponível para projetos",
      hero_sub: "Social media, branding, varejo, imobiliário, web & eventos.", scroll: "Role",
      about_label: "( 01 ) — Sobre", badge: "DESIGNER ✦ DIRETOR DE ARTE ✦ SOCIAL ✦ BRANDING ✦ VAREJO ✦ ",
      about_text: "Eu desenho marcas que precisam vender amanhã de manhã. Encartes de farmácia, lançamentos imobiliários, campanhas de data comemorativa, sites e torneios de card game — tudo com o mesmo cuidado de tipografia, ritmo e cor. Design que aparece no feed, na rua e no balcão.",
      featured_label: "( 02 ) — Destaques", featured_h: 'Projetos <em class="serif">em destaque</em>',
      work_label: "( 03 ) — Todos os trabalhos", work_h: 'Índice <em class="serif">completo</em>',
      archive_label: "( 04 ) — Arquivo", archive_h: 'Todas as <em class="serif">peças</em>', archive_hint: "Arraste para explorar ✦ clique para ampliar",
      services_label: "( 05 ) — O que eu faço", services_h: "Disciplinas", clients_label: "Marcas & projetos",
      contact_label: "( 06 ) — Contato", contact_h: 'Vamos tirar<br>a sua ideia <em class="serif">do papel?</em>',
      made: "Feito à mão com GSAP + Lenis", back_top: "Voltar ao topo ↑", loader: "portfólio",
      view_project: "Ver projeto", pieces: "peças", pages_short: "pág.", pages: "páginas", all: "Todos", project: "projeto", projects: "projetos",
      deliverables: "Entregas", palette: "Paleta", archive_word: "Arquivo", next_project: "Próximo projeto →", copied: "E-mail copiado ✓",
      c_open: "abrir", c_zoom: "ampliar", c_drag: "arraste", c_close: "fechar", c_next: "próximo", c_copy: "copiar", c_hi: "oi!", c_top: "topo",
      marquee: ["Social Media", "Branding", "Varejo", "Encartes", "Imobiliário", "Web & Landing", "Eventos", "Direção de Arte"],
      cats: {},
      svc: {
        "Social Media": "Linhas editoriais, posts, carrosséis, stories e capas de reels para marcas que publicam todo dia — com sistema visual consistente mês a mês.",
        "Varejo & Encartes": "Lâminas de oferta, encartes A4, campanhas de data e ações de trade com indústria. Hierarquia de preço que vende no primeiro olhar.",
        "Imobiliário": "Key visuals de lançamentos, placas, tapumes, empenas, books e peças de vendas para incorporadoras.",
        "Branding": "Refresh de marca, papelaria, sistemas visuais e guias que fazem a identidade funcionar em qualquer ponto de contato.",
        "Web & Landing Page": "Landing pages e sites desenhados do briefing ao handoff — desktop, tablet e mobile, com protótipo navegável.",
        "Eventos & Games": "Identidade de eventos e torneios, telas de palco, artes de divulgação e materiais para comunidade.",
      },
    },
    en: {
      _name: "English", role: "Designer & Art Director",
      nav_featured: "Featured", nav_work: "Work", nav_archive: "Archive", nav_about: "About", cta_talk: "Let's talk",
      portfolio: "( Portfolio )", today: "Today", available: "Available for projects",
      hero_sub: "Social media, branding, retail, real estate, web & events.", scroll: "Scroll",
      about_label: "( 01 ) — About", badge: "DESIGNER ✦ ART DIRECTOR ✦ SOCIAL ✦ BRANDING ✦ RETAIL ✦ ",
      about_text: "I design brands that need to sell by tomorrow morning. Pharmacy flyers, real estate launches, holiday campaigns, websites and trading card game tournaments — all with the same care for typography, rhythm and color. Design that shows up in the feed, on the street and at the counter.",
      featured_label: "( 02 ) — Featured", featured_h: 'Featured <em class="serif">projects</em>',
      work_label: "( 03 ) — All work", work_h: 'Full <em class="serif">index</em>',
      archive_label: "( 04 ) — Archive", archive_h: 'Every <em class="serif">piece</em>', archive_hint: "Drag to explore ✦ click to enlarge",
      services_label: "( 05 ) — What I do", services_h: "Disciplines", clients_label: "Brands & projects",
      contact_label: "( 06 ) — Contact", contact_h: 'Let\'s get<br>your idea <em class="serif">off the ground?</em>',
      made: "Handmade with GSAP + Lenis", back_top: "Back to top ↑", loader: "portfolio",
      view_project: "View project", pieces: "pieces", pages_short: "pp.", pages: "pages", all: "All", project: "project", projects: "projects",
      deliverables: "Deliverables", palette: "Palette", archive_word: "Archive", next_project: "Next project →", copied: "Email copied ✓",
      c_open: "open", c_zoom: "zoom", c_drag: "drag", c_close: "close", c_next: "next", c_copy: "copy", c_hi: "hi!", c_top: "top",
      marquee: ["Social Media", "Branding", "Retail", "Flyers", "Real Estate", "Web & Landing", "Events", "Art Direction"],
      cats: { "Social Media": "Social Media", "Varejo & Encartes": "Retail & Flyers", "Imobiliário": "Real Estate", "Branding": "Branding", "Web & Landing Page": "Web & Landing Page", "Eventos & Games": "Events & Games" },
      svc: {
        "Social Media": "Editorial calendars, posts, carousels, stories and reel covers for brands that publish every day — with a consistent visual system month after month.",
        "Varejo & Encartes": "Offer sheets, A4 flyers, seasonal campaigns and trade promotions with manufacturers. Price hierarchy that sells at first glance.",
        "Imobiliário": "Launch key visuals, site signage, hoardings, building wraps, sales books and collateral for developers.",
        "Branding": "Brand refreshes, stationery, visual systems and guidelines that make an identity work at every touchpoint.",
        "Web & Landing Page": "Landing pages and websites designed from brief to handoff — desktop, tablet and mobile, with a clickable prototype.",
        "Eventos & Games": "Identities for events and tournaments, stage screens, promotional art and community materials.",
      },
    },
    es: {
      _name: "Español", role: "Diseñador & Director de Arte",
      nav_featured: "Destacados", nav_work: "Trabajos", nav_archive: "Archivo", nav_about: "Sobre mí", cta_talk: "Hablemos",
      portfolio: "( Portafolio )", today: "Hoy", available: "Disponible para proyectos",
      hero_sub: "Redes sociales, branding, retail, inmobiliario, web y eventos.", scroll: "Desliza",
      about_label: "( 01 ) — Sobre mí", badge: "DISEÑADOR ✦ DIRECTOR DE ARTE ✦ SOCIAL ✦ BRANDING ✦ RETAIL ✦ ",
      about_text: "Diseño marcas que necesitan vender mañana por la mañana. Folletos de farmacia, lanzamientos inmobiliarios, campañas de fechas especiales, sitios web y torneos de juegos de cartas — todo con el mismo cuidado por la tipografía, el ritmo y el color. Diseño que aparece en el feed, en la calle y en el mostrador.",
      featured_label: "( 02 ) — Destacados", featured_h: 'Proyectos <em class="serif">destacados</em>',
      work_label: "( 03 ) — Todos los trabajos", work_h: 'Índice <em class="serif">completo</em>',
      archive_label: "( 04 ) — Archivo", archive_h: 'Todas las <em class="serif">piezas</em>', archive_hint: "Arrastra para explorar ✦ haz clic para ampliar",
      services_label: "( 05 ) — Lo que hago", services_h: "Disciplinas", clients_label: "Marcas & proyectos",
      contact_label: "( 06 ) — Contacto", contact_h: '¿Hacemos<br>realidad tu <em class="serif">idea?</em>',
      made: "Hecho a mano con GSAP + Lenis", back_top: "Volver arriba ↑", loader: "portafolio",
      view_project: "Ver proyecto", pieces: "piezas", pages_short: "pág.", pages: "páginas", all: "Todos", project: "proyecto", projects: "proyectos",
      deliverables: "Entregables", palette: "Paleta", archive_word: "Archivo", next_project: "Siguiente proyecto →", copied: "Correo copiado ✓",
      c_open: "abrir", c_zoom: "ampliar", c_drag: "arrastra", c_close: "cerrar", c_next: "siguiente", c_copy: "copiar", c_hi: "¡hola!", c_top: "arriba",
      marquee: ["Redes Sociales", "Branding", "Retail", "Folletos", "Inmobiliario", "Web & Landing", "Eventos", "Dirección de Arte"],
      cats: { "Social Media": "Redes Sociales", "Varejo & Encartes": "Retail & Folletos", "Imobiliário": "Inmobiliario", "Branding": "Branding", "Web & Landing Page": "Web & Landing Page", "Eventos & Games": "Eventos & Juegos" },
      svc: {
        "Social Media": "Líneas editoriales, posts, carruseles, stories y portadas de reels para marcas que publican todos los días — con un sistema visual coherente mes a mes.",
        "Varejo & Encartes": "Hojas de ofertas, folletos A4, campañas de temporada y acciones de trade con la industria. Jerarquía de precios que vende a primera vista.",
        "Imobiliário": "Key visuals de lanzamientos, carteles, vallas de obra, medianeras, books y piezas de venta para desarrolladoras.",
        "Branding": "Renovación de marca, papelería, sistemas visuales y guías que hacen funcionar la identidad en cualquier punto de contacto.",
        "Web & Landing Page": "Landing pages y sitios diseñados del brief al handoff — desktop, tablet y móvil, con prototipo navegable.",
        "Eventos & Games": "Identidad de eventos y torneos, pantallas de escenario, artes de difusión y materiales para la comunidad.",
      },
    },
    fr: {
      _name: "Français", role: "Designer & Directeur Artistique",
      nav_featured: "À la une", nav_work: "Projets", nav_archive: "Archives", nav_about: "À propos", cta_talk: "Discutons",
      portfolio: "( Portfolio )", today: "Aujourd'hui", available: "Disponible pour des projets",
      hero_sub: "Réseaux sociaux, branding, retail, immobilier, web & événements.", scroll: "Défiler",
      about_label: "( 01 ) — À propos", badge: "DESIGNER ✦ DIRECTEUR ARTISTIQUE ✦ SOCIAL ✦ BRANDING ✦ RETAIL ✦ ",
      about_text: "Je conçois des marques qui doivent vendre dès demain matin. Prospectus de pharmacie, lancements immobiliers, campagnes saisonnières, sites web et tournois de jeux de cartes — toujours avec le même soin pour la typographie, le rythme et la couleur. Un design qui se voit dans le feed, dans la rue et au comptoir.",
      featured_label: "( 02 ) — À la une", featured_h: 'Projets <em class="serif">phares</em>',
      work_label: "( 03 ) — Tous les projets", work_h: 'Index <em class="serif">complet</em>',
      archive_label: "( 04 ) — Archives", archive_h: 'Toutes les <em class="serif">pièces</em>', archive_hint: "Glissez pour explorer ✦ cliquez pour agrandir",
      services_label: "( 05 ) — Ce que je fais", services_h: "Disciplines", clients_label: "Marques & projets",
      contact_label: "( 06 ) — Contact", contact_h: 'On donne vie<br>à votre <em class="serif">idée ?</em>',
      made: "Fait main avec GSAP + Lenis", back_top: "Retour en haut ↑", loader: "portfolio",
      view_project: "Voir le projet", pieces: "pièces", pages_short: "p.", pages: "pages", all: "Tous", project: "projet", projects: "projets",
      deliverables: "Livrables", palette: "Palette", archive_word: "Archives", next_project: "Projet suivant →", copied: "E-mail copié ✓",
      c_open: "ouvrir", c_zoom: "agrandir", c_drag: "glisser", c_close: "fermer", c_next: "suivant", c_copy: "copier", c_hi: "salut !", c_top: "haut",
      marquee: ["Réseaux Sociaux", "Branding", "Retail", "Prospectus", "Immobilier", "Web & Landing", "Événements", "Direction Artistique"],
      cats: { "Social Media": "Réseaux Sociaux", "Varejo & Encartes": "Retail & Prospectus", "Imobiliário": "Immobilier", "Branding": "Branding", "Web & Landing Page": "Web & Landing Page", "Eventos & Games": "Événements & Jeux" },
      svc: {
        "Social Media": "Lignes éditoriales, posts, carrousels, stories et couvertures de reels pour des marques qui publient chaque jour — avec un système visuel cohérent mois après mois.",
        "Varejo & Encartes": "Feuilles d'offres, prospectus A4, campagnes saisonnières et opérations trade avec l'industrie. Une hiérarchie des prix qui vend au premier regard.",
        "Imobiliário": "Key visuals de lancements, panneaux, palissades de chantier, bâches, brochures et supports de vente pour promoteurs.",
        "Branding": "Refonte de marque, papeterie, systèmes visuels et chartes qui font vivre l'identité à chaque point de contact.",
        "Web & Landing Page": "Landing pages et sites conçus du brief au handoff — desktop, tablette et mobile, avec prototype cliquable.",
        "Eventos & Games": "Identités d'événements et de tournois, écrans de scène, visuels de promotion et supports pour la communauté.",
      },
    },
    de: {
      _name: "Deutsch", role: "Designer & Art Director",
      nav_featured: "Highlights", nav_work: "Arbeiten", nav_archive: "Archiv", nav_about: "Über mich", cta_talk: "Lass uns reden",
      portfolio: "( Portfolio )", today: "Heute", available: "Offen für Projekte",
      hero_sub: "Social Media, Branding, Handel, Immobilien, Web & Events.", scroll: "Scrollen",
      about_label: "( 01 ) — Über mich", badge: "DESIGNER ✦ ART DIRECTOR ✦ SOCIAL ✦ BRANDING ✦ HANDEL ✦ ",
      about_text: "Ich gestalte Marken, die schon morgen früh verkaufen müssen. Apotheken-Prospekte, Immobilien-Launches, Kampagnen zu Feiertagen, Websites und Sammelkartenspiel-Turniere — immer mit derselben Sorgfalt für Typografie, Rhythmus und Farbe. Design, das im Feed, auf der Straße und an der Theke wirkt.",
      featured_label: "( 02 ) — Highlights", featured_h: 'Ausgewählte <em class="serif">Projekte</em>',
      work_label: "( 03 ) — Alle Arbeiten", work_h: 'Vollständiger <em class="serif">Index</em>',
      archive_label: "( 04 ) — Archiv", archive_h: 'Alle <em class="serif">Arbeiten</em>', archive_hint: "Ziehen zum Erkunden ✦ klicken zum Vergrößern",
      services_label: "( 05 ) — Was ich mache", services_h: "Disziplinen", clients_label: "Marken & Projekte",
      contact_label: "( 06 ) — Kontakt", contact_h: 'Bringen wir<br>deine Idee <em class="serif">aufs Papier?</em>',
      made: "Handgemacht mit GSAP + Lenis", back_top: "Nach oben ↑", loader: "portfolio",
      view_project: "Projekt ansehen", pieces: "Arbeiten", pages_short: "S.", pages: "Seiten", all: "Alle", project: "Projekt", projects: "Projekte",
      deliverables: "Leistungen", palette: "Palette", archive_word: "Archiv", next_project: "Nächstes Projekt →", copied: "E-Mail kopiert ✓",
      c_open: "öffnen", c_zoom: "zoom", c_drag: "ziehen", c_close: "schließen", c_next: "weiter", c_copy: "kopieren", c_hi: "hallo!", c_top: "oben",
      marquee: ["Social Media", "Branding", "Handel", "Prospekte", "Immobilien", "Web & Landing", "Events", "Art Direction"],
      cats: { "Social Media": "Social Media", "Varejo & Encartes": "Handel & Prospekte", "Imobiliário": "Immobilien", "Branding": "Branding", "Web & Landing Page": "Web & Landingpage", "Eventos & Games": "Events & Games" },
      svc: {
        "Social Media": "Redaktionspläne, Posts, Karussells, Stories und Reel-Cover für Marken, die täglich posten — mit einem konsistenten visuellen System, Monat für Monat.",
        "Varejo & Encartes": "Angebotsblätter, A4-Prospekte, saisonale Kampagnen und Trade-Aktionen mit Herstellern. Eine Preishierarchie, die auf den ersten Blick verkauft.",
        "Imobiliário": "Key Visuals für Launches, Bauschilder, Bauzäune, Fassadenbanner, Verkaufsbroschüren und Vertriebsmaterial für Bauträger.",
        "Branding": "Marken-Refresh, Geschäftsausstattung, visuelle Systeme und Guidelines, die eine Identität an jedem Touchpoint funktionieren lassen.",
        "Web & Landing Page": "Landingpages und Websites vom Briefing bis zur Übergabe — Desktop, Tablet und Mobile, mit klickbarem Prototyp.",
        "Eventos & Games": "Identitäten für Events und Turniere, Bühnenscreens, Promo-Grafiken und Material für die Community.",
      },
    },
    it: {
      _name: "Italiano", role: "Designer & Art Director",
      nav_featured: "In evidenza", nav_work: "Lavori", nav_archive: "Archivio", nav_about: "Chi sono", cta_talk: "Parliamone",
      portfolio: "( Portfolio )", today: "Oggi", available: "Disponibile per progetti",
      hero_sub: "Social media, branding, retail, immobiliare, web ed eventi.", scroll: "Scorri",
      about_label: "( 01 ) — Chi sono", badge: "DESIGNER ✦ ART DIRECTOR ✦ SOCIAL ✦ BRANDING ✦ RETAIL ✦ ",
      about_text: "Progetto marchi che devono vendere già domattina. Volantini per farmacie, lanci immobiliari, campagne per le ricorrenze, siti web e tornei di giochi di carte collezionabili — sempre con la stessa cura per tipografia, ritmo e colore. Design che si vede nel feed, per strada e al bancone.",
      featured_label: "( 02 ) — In evidenza", featured_h: 'Progetti <em class="serif">in evidenza</em>',
      work_label: "( 03 ) — Tutti i lavori", work_h: 'Indice <em class="serif">completo</em>',
      archive_label: "( 04 ) — Archivio", archive_h: 'Tutti i <em class="serif">lavori</em>', archive_hint: "Trascina per esplorare ✦ clicca per ingrandire",
      services_label: "( 05 ) — Cosa faccio", services_h: "Discipline", clients_label: "Brand & progetti",
      contact_label: "( 06 ) — Contatti", contact_h: 'Diamo forma<br>alla tua <em class="serif">idea?</em>',
      made: "Fatto a mano con GSAP + Lenis", back_top: "Torna su ↑", loader: "portfolio",
      view_project: "Vedi progetto", pieces: "lavori", pages_short: "pag.", pages: "pagine", all: "Tutti", project: "progetto", projects: "progetti",
      deliverables: "Deliverable", palette: "Palette", archive_word: "Archivio", next_project: "Progetto successivo →", copied: "E-mail copiata ✓",
      c_open: "apri", c_zoom: "ingrandisci", c_drag: "trascina", c_close: "chiudi", c_next: "avanti", c_copy: "copia", c_hi: "ciao!", c_top: "su",
      marquee: ["Social Media", "Branding", "Retail", "Volantini", "Immobiliare", "Web & Landing", "Eventi", "Art Direction"],
      cats: { "Social Media": "Social Media", "Varejo & Encartes": "Retail & Volantini", "Imobiliário": "Immobiliare", "Branding": "Branding", "Web & Landing Page": "Web & Landing Page", "Eventos & Games": "Eventi & Giochi" },
      svc: {
        "Social Media": "Piani editoriali, post, caroselli, stories e copertine di reel per brand che pubblicano ogni giorno — con un sistema visivo coerente mese dopo mese.",
        "Varejo & Encartes": "Fogli offerte, volantini A4, campagne stagionali e attività di trade con l'industria. Una gerarchia dei prezzi che vende al primo sguardo.",
        "Imobiliário": "Key visual per lanci, cartelli di cantiere, recinzioni, maxi teli, brochure e materiali di vendita per costruttori.",
        "Branding": "Restyling del marchio, cancelleria, sistemi visivi e linee guida che fanno funzionare l'identità in ogni punto di contatto.",
        "Web & Landing Page": "Landing page e siti progettati dal brief all'handoff — desktop, tablet e mobile, con prototipo navigabile.",
        "Eventos & Games": "Identità di eventi e tornei, schermi da palco, grafiche promozionali e materiali per la community.",
      },
    },
    ru: {
      _name: "Русский", role: "Дизайнер и арт-директор",
      nav_featured: "Избранное", nav_work: "Работы", nav_archive: "Архив", nav_about: "Обо мне", cta_talk: "Обсудим проект",
      portfolio: "( Портфолио )", today: "Сегодня", available: "Открыт для проектов",
      hero_sub: "Соцсети, брендинг, ритейл, недвижимость, веб и события.", scroll: "Листайте",
      about_label: "( 01 ) — Обо мне", badge: "ДИЗАЙНЕР ✦ АРТ-ДИРЕКТОР ✦ SOCIAL ✦ БРЕНДИНГ ✦ РИТЕЙЛ ✦ ",
      about_text: "Я создаю бренды, которые должны продавать уже завтра утром. Листовки для аптек, запуски жилых комплексов, праздничные кампании, сайты и турниры по коллекционным карточным играм — всё с одинаковым вниманием к типографике, ритму и цвету. Дизайн, который работает в ленте, на улице и у прилавка.",
      featured_label: "( 02 ) — Избранное", featured_h: 'Избранные <em class="serif">проекты</em>',
      work_label: "( 03 ) — Все работы", work_h: 'Полный <em class="serif">список</em>',
      archive_label: "( 04 ) — Архив", archive_h: 'Все <em class="serif">работы</em>', archive_hint: "Перетаскивайте ✦ нажмите, чтобы увеличить",
      services_label: "( 05 ) — Чем я занимаюсь", services_h: "Направления", clients_label: "Бренды и проекты",
      contact_label: "( 06 ) — Контакты", contact_h: 'Воплотим<br>вашу <em class="serif">идею?</em>',
      made: "Сделано вручную на GSAP + Lenis", back_top: "Наверх ↑", loader: "портфолио",
      view_project: "Смотреть проект", pieces: "работ", pages_short: "стр.", pages: "страниц", all: "Все", project: "проект", projects: "проектов",
      deliverables: "Что сделано", palette: "Палитра", archive_word: "Архив", next_project: "Следующий проект →", copied: "E-mail скопирован ✓",
      c_open: "открыть", c_zoom: "увеличить", c_drag: "тяните", c_close: "закрыть", c_next: "далее", c_copy: "копировать", c_hi: "привет!", c_top: "вверх",
      marquee: ["Соцсети", "Брендинг", "Ритейл", "Листовки", "Недвижимость", "Веб и лендинги", "События", "Арт-дирекшн"],
      cats: { "Social Media": "Соцсети", "Varejo & Encartes": "Ритейл и листовки", "Imobiliário": "Недвижимость", "Branding": "Брендинг", "Web & Landing Page": "Веб и лендинги", "Eventos & Games": "События и игры" },
      svc: {
        "Social Media": "Контент-планы, посты, карусели, сторис и обложки для рилс для брендов, которые публикуются каждый день, — с единой визуальной системой месяц за месяцем.",
        "Varejo & Encartes": "Листы с акциями, листовки А4, сезонные кампании и трейд-акции с производителями. Иерархия цен, которая продаёт с первого взгляда.",
        "Imobiliário": "Ключевые визуалы запусков, щиты, строительные ограждения, баннеры на фасады, буклеты и материалы для отделов продаж девелоперов.",
        "Branding": "Обновление бренда, фирменная канцелярия, визуальные системы и гайдлайны, благодаря которым айдентика работает в любой точке контакта.",
        "Web & Landing Page": "Лендинги и сайты от брифа до передачи в разработку — десктоп, планшет и мобильная версия, с кликабельным прототипом.",
        "Eventos & Games": "Айдентика событий и турниров, экраны для сцены, промо-графика и материалы для сообщества.",
      },
    },
    ja: {
      _name: "日本語", role: "デザイナー & アートディレクター",
      nav_featured: "注目", nav_work: "作品", nav_archive: "アーカイブ", nav_about: "について", cta_talk: "お問い合わせ",
      portfolio: "( ポートフォリオ )", today: "現在", available: "プロジェクト受付中",
      hero_sub: "SNS、ブランディング、小売、不動産、Web、イベント。", scroll: "スクロール",
      about_label: "( 01 ) — について", badge: "DESIGNER ✦ ART DIRECTOR ✦ SOCIAL ✦ BRANDING ✦ RETAIL ✦ ",
      about_text: "明日の朝には売れなければならないブランドをデザインしています。薬局のチラシ、不動産のローンチ、季節のキャンペーン、Webサイト、トレーディングカードゲームの大会まで。どれもタイポグラフィ、リズム、色に同じだけこだわっています。フィードでも、街なかでも、店頭でも映えるデザインを。",
      featured_label: "( 02 ) — 注目", featured_h: '注目の<em class="serif">プロジェクト</em>',
      work_label: "( 03 ) — すべての作品", work_h: '作品<em class="serif">一覧</em>',
      archive_label: "( 04 ) — アーカイブ", archive_h: 'すべての<em class="serif">作品</em>', archive_hint: "ドラッグで探索 ✦ クリックで拡大",
      services_label: "( 05 ) — 領域", services_h: "専門領域", clients_label: "ブランド & プロジェクト",
      contact_label: "( 06 ) — お問い合わせ", contact_h: 'あなたのアイデアを<br><em class="serif">形にしませんか?</em>',
      made: "GSAP + Lenis で手作り", back_top: "トップへ ↑", loader: "portfolio",
      view_project: "プロジェクトを見る", pieces: "点", pages_short: "ページ", pages: "ページ", all: "すべて", project: "件", projects: "件",
      deliverables: "制作物", palette: "カラー", archive_word: "アーカイブ", next_project: "次のプロジェクト →", copied: "メールをコピーしました ✓",
      c_open: "開く", c_zoom: "拡大", c_drag: "ドラッグ", c_close: "閉じる", c_next: "次へ", c_copy: "コピー", c_hi: "こんにちは", c_top: "トップ",
      marquee: ["SNS", "ブランディング", "小売", "チラシ", "不動産", "Web & LP", "イベント", "アートディレクション"],
      cats: { "Social Media": "SNS", "Varejo & Encartes": "小売 & チラシ", "Imobiliário": "不動産", "Branding": "ブランディング", "Web & Landing Page": "Web & LP", "Eventos & Games": "イベント & ゲーム" },
      svc: {
        "Social Media": "毎日発信するブランドのための編集カレンダー、投稿、カルーセル、ストーリーズ、リール表紙。毎月一貫したビジュアルシステムで。",
        "Varejo & Encartes": "特売シート、A4チラシ、季節のキャンペーン、メーカーとの販促施策。ひと目で売れる価格のヒエラルキー。",
        "Imobiliário": "デベロッパー向けのローンチ用キービジュアル、看板、仮囲い、壁面広告、販売用ブック、営業ツール。",
        "Branding": "ブランドリフレッシュ、ステーショナリー、ビジュアルシステム、ガイドライン。あらゆるタッチポイントで機能するアイデンティティ。",
        "Web & Landing Page": "ブリーフからハンドオフまで設計するLPとWebサイト。デスクトップ、タブレット、モバイル、操作できるプロトタイプ付き。",
        "Eventos & Games": "イベントや大会のアイデンティティ、ステージ用スクリーン、告知ビジュアル、コミュニティ向け素材。",
      },
    },
    zh: {
      _name: "中文", role: "设计师 & 艺术总监",
      nav_featured: "精选", nav_work: "作品", nav_archive: "档案", nav_about: "关于", cta_talk: "聊聊合作",
      portfolio: "( 作品集 )", today: "至今", available: "接受项目合作",
      hero_sub: "社交媒体、品牌、零售、地产、网页与活动。", scroll: "滚动",
      about_label: "( 01 ) — 关于", badge: "DESIGNER ✦ ART DIRECTOR ✦ SOCIAL ✦ BRANDING ✦ RETAIL ✦ ",
      about_text: "我设计的品牌需要明天一早就开始卖货。药房传单、地产开盘、节日营销、网站，以及集换式卡牌游戏比赛——都以同样的用心对待字体、节奏与色彩。让设计在信息流里、街头上和柜台前都同样出彩。",
      featured_label: "( 02 ) — 精选", featured_h: '精选<em class="serif">项目</em>',
      work_label: "( 03 ) — 全部作品", work_h: '完整<em class="serif">索引</em>',
      archive_label: "( 04 ) — 档案", archive_h: '全部<em class="serif">作品</em>', archive_hint: "拖动浏览 ✦ 点击放大",
      services_label: "( 05 ) — 我的工作", services_h: "专业领域", clients_label: "品牌与项目",
      contact_label: "( 06 ) — 联系", contact_h: '让你的想法<br><em class="serif">落地吧?</em>',
      made: "以 GSAP + Lenis 手工打造", back_top: "回到顶部 ↑", loader: "portfolio",
      view_project: "查看项目", pieces: "件", pages_short: "页", pages: "页", all: "全部", project: "个项目", projects: "个项目",
      deliverables: "交付内容", palette: "配色", archive_word: "档案", next_project: "下一个项目 →", copied: "邮箱已复制 ✓",
      c_open: "打开", c_zoom: "放大", c_drag: "拖动", c_close: "关闭", c_next: "下一个", c_copy: "复制", c_hi: "你好!", c_top: "顶部",
      marquee: ["社交媒体", "品牌", "零售", "传单", "地产", "网页与落地页", "活动", "艺术指导"],
      cats: { "Social Media": "社交媒体", "Varejo & Encartes": "零售与传单", "Imobiliário": "地产", "Branding": "品牌", "Web & Landing Page": "网页与落地页", "Eventos & Games": "活动与游戏" },
      svc: {
        "Social Media": "为每天发布内容的品牌制作内容规划、帖子、轮播图、快拍和短视频封面——月复一月保持统一的视觉系统。",
        "Varejo & Encartes": "促销单页、A4 传单、节日营销和与厂商合作的推广活动。让价格层级一眼就能促成购买。",
        "Imobiliário": "为开发商制作开盘主视觉、工地标牌、围挡、楼体广告、销售楼书和销售物料。",
        "Branding": "品牌焕新、办公物料、视觉系统与规范手册，让品牌形象在每个触点都能发挥作用。",
        "Web & Landing Page": "从需求到交付的落地页与网站设计——桌面、平板与移动端，并附可交互原型。",
        "Eventos & Games": "活动与赛事的视觉形象、舞台屏幕、宣传画面和社区物料。",
      },
    },
  };

  const codes = Object.keys(L);
  const pick = () => {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (q && L[q]) return q;
      const s = localStorage.getItem("lang");
      if (s && L[s]) return s;
    } catch {}
    for (const l of navigator.languages || [navigator.language || "pt"]) {
      const c = String(l).toLowerCase().slice(0, 2);
      if (L[c]) return c;
    }
    return "pt";
  };
  const lang = pick();
  const D = L[lang], P = L.pt;
  const t = (k) => (D[k] !== undefined ? D[k] : P[k]);
  const cat = (c) => (D.cats && D.cats[c]) || c;
  const proj = (slug) => ((window.I18N_PROJECTS || {})[lang] || {})[slug] || null;

  window.I18N = { lang, codes, langs: L, t, cat, proj, cjk: lang === "ja" || lang === "zh" };

  /* aplica na página (antes do main.js dividir os textos) */
  document.documentElement.lang = { pt: "pt-BR", zh: "zh-CN" }[lang] || lang;
  if (window.SITE) window.SITE.role = t("role");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(el.dataset.i18n); if (v === undefined) return;
    el.textContent = v; if (el.hasAttribute("data-text")) el.dataset.text = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { const v = t(el.dataset.i18nHtml); if (v !== undefined) el.innerHTML = v; });
  document.querySelectorAll("[data-i18n-cursor]").forEach((el) => { const v = t(el.dataset.i18nCursor); if (v !== undefined) el.dataset.cursor = v; });

  /* seletor */
  const box = document.querySelector("[data-lang]");
  if (box) {
    const btn = box.querySelector(".lang__btn"), menu = box.querySelector(".lang__menu");
    box.querySelector(".lang__cur").textContent = lang.toUpperCase();
    btn.dataset.cursor = D._name;
    menu.innerHTML = codes.map((c) => `<li><button role="option" aria-selected="${c === lang}" data-l="${c}" class="${c === lang ? "is-on" : ""}"><span class="mono">${c.toUpperCase()}</span> ${L[c]._name}</button></li>`).join("");
    const toggle = (on) => { box.classList.toggle("is-open", on); btn.setAttribute("aria-expanded", on); };
    btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(!box.classList.contains("is-open")); });
    document.addEventListener("click", () => toggle(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
    menu.addEventListener("click", (e) => {
      const b = e.target.closest("[data-l]"); if (!b) return;
      try { localStorage.setItem("lang", b.dataset.l); } catch {}
      const u = new URL(location.href); u.searchParams.delete("lang");
      document.body.style.transition = "opacity .35s"; document.body.style.opacity = "0";
      setTimeout(() => location.replace(u.toString()), 320);
    });
  }
})();
