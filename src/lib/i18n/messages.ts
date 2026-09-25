export const en = {
	meta: {
		title: 'Felipe Uribe — Web Designer and Developer',
		description: 'Portfolio of Felipe Uribe, a web designer and developer.'
	},
	lang: {
		label: 'Language',
		en: 'English',
		es: 'Spanish'
	},
	nav: {
		about: 'About',
		work: 'Experience',
		projects: 'Projects',
		goTo: (section: string) => `Go to ${section}`,
		home: 'Go to top'
	},
	social: {
		mail: 'Email Felipe Uribe',
		github: "Felipe Uribe's GitHub profile",
		linkedin: "Felipe Uribe's LinkedIn profile",
		opendesktop: "Felipe Uribe's OpenDesktop profile"
	},
	hero: {
		greeting: "Hi, I'm",
		title: 'I design interfaces and turn them into web products.',
		intro:
			'I work across design and development, taking web projects from the first sketch to production. I care about clear interfaces, solid code, and the details that make a website easy to use.'
	},
	about: {
		title: 'About me',
		body: 'I have always wanted to understand how things work. That curiosity led me to computers, Linux, and open-source software. Being able to open up a tool, change it, and adapt it to a real need is still one of the things I enjoy most about this work.',
		stack: 'These are some of the *technologies I use in my work.'
	},
	work: {
		title: 'Experience',
		items: [
			'Today I build web application interfaces at Puntos Colombia. In my own time, I explore new tools, design themes and icons for Linux, and contribute to open-source projects.',
			'At Comodísimos, I designed websites, built the front end of its sales and business management system, and deployed containerized servers.',
			'At Todo en Artes, I took the website from strategy and design through development, server setup, and launch.',
			'I began my career at two digital agencies. WebCreativa is where I sharpened my development skills and became interested in interface design. At CoDigital, I brought design and code together on more ambitious digital projects.',
			'Freelance work has also been part of my career throughout these 14 years, giving me the chance to work with different businesses and teams on a wide range of projects.'
		]
	},
	projects: {
		title: 'Projects',
		intro:
			'I have worked on more than 300 websites over the past 14 years. This is a selection of that work.',
		iconTheme:
			'I designed this icon set in Inkscape and wrote a JavaScript tool to export every icon at 16, 24, 32, 48, 64, 96, and 128 pixels.',
		planeTheme:
			'I designed Plane as a dark, minimalist theme for GNOME, with restrained contrast for comfortable everyday use.',
		github: (name: string) => `${name} repository on GitHub`,
		gnomeLook: (name: string) => `${name} on GNOME-Look.org`
	},
	reader: {
		readSite: 'View project',
		video: 'Video',
		site: 'Site',
		view: 'Project view',
		technologies: 'Technologies',
		readFull: (name: string) => `View the full-page screenshot of ${name}`,
		dialog: (name: string, i: number, n: number) => `${name}, project ${i} of ${n}`,
		previous: (name: string) => `Previous project: ${name}`,
		next: (name: string) => `Next project: ${name}`,
		previousHint: 'Previous (←)',
		nextHint: 'Next (→)',
		close: 'Close project',
		stage: (name: string) => `${name}, full-page screenshot`,
		screenshot: (name: string) => `Full-page screenshot of ${name}`,
		failed: 'The full-resolution screenshot could not be loaded. Showing a smaller version.',
		cta: 'Have a web project in mind?',
		nextShort: (name: string) => `Next: ${name}`,
		videoTitle: (name: string) => `Video walkthrough of ${name}`
	}
};

export type Messages = typeof en;

export const es: Messages = {
	meta: {
		title: 'Felipe Uribe — Diseñador y desarrollador web',
		description: 'Portafolio de Felipe Uribe, diseñador y desarrollador web.'
	},
	lang: {
		label: 'Idioma',
		en: 'Inglés',
		es: 'Español'
	},
	nav: {
		about: 'Sobre mí',
		work: 'Experiencia',
		projects: 'Proyectos',
		goTo: (section: string) => `Ir a ${section}`,
		home: 'Ir al inicio'
	},
	social: {
		mail: 'Escribir a Felipe Uribe',
		github: 'Perfil de Felipe Uribe en GitHub',
		linkedin: 'Perfil de Felipe Uribe en LinkedIn',
		opendesktop: 'Perfil de Felipe Uribe en OpenDesktop'
	},
	hero: {
		greeting: 'Hola, soy',
		title: 'Diseño interfaces y las convierto en productos web.',
		intro:
			'Trabajo entre el diseño y el desarrollo, y llevo cada proyecto desde el primer boceto hasta producción. Cuido la claridad de la interfaz, la calidad del código y los detalles que hacen que un sitio sea fácil de usar.'
	},
	about: {
		title: 'Sobre mí',
		body: 'Siempre he querido entender cómo funcionan las cosas. Esa curiosidad me llevó a los computadores, a Linux y al software libre. Poder abrir una herramienta, modificarla y adaptarla a una necesidad concreta sigue siendo una de las cosas que más disfruto de este oficio.',
		stack: 'Estas son algunas de las *tecnologías que uso en mi trabajo.'
	},
	work: {
		title: 'Experiencia',
		items: [
			'Actualmente desarrollo interfaces para las aplicaciones web de Puntos Colombia. Fuera del trabajo exploro nuevas herramientas, diseño temas e íconos para Linux y colaboro con proyectos de software libre.',
			'En Comodísimos diseñé sitios web, desarrollé el front-end de su sistema de ventas y gestión comercial e implementé servidores en contenedores.',
			'En Todo en Artes llevé el sitio web desde la estrategia y el diseño hasta el desarrollo, la configuración del servidor y la puesta en producción.',
			'Comencé mi carrera en dos agencias digitales. En WebCreativa perfeccioné mis habilidades de desarrollo y descubrí mi interés por el diseño de interfaces. En CoDigital uní diseño y código en proyectos digitales de mayor alcance.',
			'El trabajo independiente también ha sido parte de estos 14 años de carrera y me ha permitido colaborar con distintos negocios y equipos en proyectos muy diversos.'
		]
	},
	projects: {
		title: 'Proyectos',
		intro:
			'En 14 años he trabajado en más de 300 sitios web. Esta es una selección de esos proyectos.',
		iconTheme:
			'Diseñé este conjunto de íconos en Inkscape y programé una herramienta en JavaScript que exporta cada ícono en 16, 24, 32, 48, 64, 96 y 128 píxeles.',
		planeTheme:
			'Diseñé Plane como un tema oscuro y minimalista para GNOME, con un contraste moderado que resulta cómodo para el uso diario.',
		github: (name: string) => `Repositorio de ${name} en GitHub`,
		gnomeLook: (name: string) => `${name} en GNOME-Look.org`
	},
	reader: {
		readSite: 'Ver proyecto',
		video: 'Video',
		site: 'Sitio',
		view: 'Vista del proyecto',
		technologies: 'Tecnologías',
		readFull: (name: string) => `Ver la captura completa de ${name}`,
		dialog: (name: string, i: number, n: number) => `${name}, proyecto ${i} de ${n}`,
		previous: (name: string) => `Proyecto anterior: ${name}`,
		next: (name: string) => `Siguiente proyecto: ${name}`,
		previousHint: 'Anterior (←)',
		nextHint: 'Siguiente (→)',
		close: 'Cerrar proyecto',
		stage: (name: string) => `${name}, captura de página completa`,
		screenshot: (name: string) => `Captura de página completa de ${name}`,
		failed: 'No se pudo cargar la captura en alta resolución. Se muestra una versión más liviana.',
		cta: '¿Tienes un proyecto web en mente?',
		nextShort: (name: string) => `Siguiente: ${name}`,
		videoTitle: (name: string) => `Recorrido en video de ${name}`
	}
};
