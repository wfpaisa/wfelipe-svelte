export const en = {
	meta: {
		title: 'Felipe Uribe - Portfolio',
		description: 'Felipe Uribe - Portfolio'
	},
	lang: {
		label: 'Language',
		en: 'English',
		es: 'Spanish'
	},
	nav: {
		about: 'About',
		work: 'Work',
		projects: 'Projects',
		goTo: (section: string) => `Go to section ${section}`,
		home: 'Go to top'
	},
	social: {
		mail: 'Write to Felipe Uribe',
		github: 'Felipe Uribe GitHub profile',
		linkedin: 'Felipe Uribe LinkedIn profile',
		opendesktop: 'Felipe Uribe OpenDesktop profile'
	},
	hero: {
		greeting: 'Hi, my name is',
		title: 'Bringing ideas to life on the web through coding and design.',
		intro:
			"As a developer who enjoys creating digital experiences in both design and development, I am constantly working on building products that are accessible and human-centered. I firmly believe in the power of technology to improve people's lives, and I always strive to make it more inclusive and user-friendly."
	},
	about: {
		title: 'About me',
		body: 'Since I was very young, I have always been a curious person and I have loved understanding how things work. Later, when I discovered the world of computers and familiarized myself with the philosophy of "I am because we all are" (Ubuntu), my interest in open-source software became a true passion. I love the idea of being able to modify and adapt technology to my needs and preferences, and that drives me to continue learning and exploring in this field.',
		stack: 'Here are a few *technologies I have been working with recently.'
	},
	work: {
		title: 'Work',
		items: [
			'Currently, in my free time, I experiment with new technologies, decorate interfaces and iconography for Linux operating systems, and contribute to open-source. Professionally, I contribute to the development of web application interfaces for PuntosColombia.',
			'Previously, I created the design for the web, implemented servers in containers, and created the design and front-end development for the sales and commercial management system for Comodisimos.',
			'Before that, I created the design, strategy, development, server implementation, and production launch for the website for Todo en Artes.',
			'Before all of this, I worked at two digital marketing agencies: the first, "WebCreativa," where I honed my web development skills, discovered my passion for user interfaces, and learned a lot about design and user experience. At the second agency I worked at, "CoDigital," I was able to apply much of my knowledge by developing products in more detail and focusing on experiences.',
			'However, during these 14 years, when work allowed me, I have worked as a freelancer, discovering and applying all my motivation in the projects I have been involved in.'
		]
	},
	projects: {
		title: 'Projects',
		intro:
			'In these 14 years, I have helped bring to life more than 300 websites, here are some of the highlights.',
		iconTheme:
			'A simple and modern set of icons, designed in Inkscape in the sizes: 16px, 24px, 32px, 48px, 64px, 96px, 128px, uses JavaScript to generate each file in different sizes.',
		planeTheme:
			'A beautiful dark theme for Gnome Linux with a modern and minimalistic design, easy on the eyes and providing a sleek look for your desktop.',
		github: (name: string) => `${name} repository on GitHub`,
		gnomeLook: (name: string) => `${name} on gnome-look`
	},
	reader: {
		readSite: 'Read site',
		video: 'Video',
		site: 'Site',
		view: 'View',
		technologies: 'Technologies',
		readFull: (name: string) => `Read the full ${name} site`,
		dialog: (name: string, i: number, n: number) => `${name}, project ${i} of ${n}`,
		previous: (name: string) => `Previous project: ${name}`,
		next: (name: string) => `Next project: ${name}`,
		previousHint: 'Previous (←)',
		nextHint: 'Next (→)',
		close: 'Close project',
		stage: (name: string) => `${name}, full page screenshot`,
		screenshot: (name: string) => `Full page screenshot of ${name}`,
		failed: 'The full-resolution screenshot did not load. You are seeing a lighter version.',
		cta: 'Want a site like this one?',
		nextShort: (name: string) => `Next: ${name}`,
		videoTitle: (name: string) => `${name} video walkthrough`
	}
};

export type Messages = typeof en;

export const es: Messages = {
	meta: {
		title: 'Felipe Uribe - Portafolio',
		description: 'Felipe Uribe - Portafolio'
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
		goTo: (section: string) => `Ir a la sección ${section}`,
		home: 'Ir al inicio'
	},
	social: {
		mail: 'Escribir a Felipe Uribe',
		github: 'Perfil de Felipe Uribe en GitHub',
		linkedin: 'Perfil de Felipe Uribe en LinkedIn',
		opendesktop: 'Perfil de Felipe Uribe en OpenDesktop'
	},
	hero: {
		greeting: 'Hola, mi nombre es',
		title: 'Doy vida a las ideas en la web a través del código y el diseño.',
		intro:
			'Como desarrollador que disfruta crear experiencias digitales tanto en diseño como en desarrollo, trabajo constantemente en productos accesibles y centrados en las personas. Creo firmemente en el poder de la tecnología para mejorar la vida de la gente, y siempre busco que sea más inclusiva y fácil de usar.'
	},
	about: {
		title: 'Sobre mí',
		body: 'Desde muy pequeño he sido una persona curiosa y me ha encantado entender cómo funcionan las cosas. Más tarde, cuando descubrí el mundo de los computadores y me familiaricé con la filosofía de "soy porque todos somos" (Ubuntu), mi interés por el software libre se convirtió en una verdadera pasión. Me encanta la idea de poder modificar y adaptar la tecnología a mis necesidades y preferencias, y eso me impulsa a seguir aprendiendo y explorando en este campo.',
		stack: 'Estas son algunas *tecnologías con las que he trabajado recientemente.'
	},
	work: {
		title: 'Experiencia',
		items: [
			'Actualmente, en mi tiempo libre, experimento con nuevas tecnologías, decoro interfaces e iconografía para sistemas operativos Linux y contribuyo al software libre. Profesionalmente, participo en el desarrollo de interfaces de aplicaciones web para PuntosColombia.',
			'Antes, creé el diseño de la web, implementé servidores en contenedores y realicé el diseño y el desarrollo front-end del sistema de ventas y gestión comercial de Comodisimos.',
			'Antes de eso, hice el diseño, la estrategia, el desarrollo, la implementación del servidor y la puesta en producción del sitio web de Todo en Artes.',
			'Antes de todo esto, trabajé en dos agencias de marketing digital: en la primera, "WebCreativa", perfeccioné mis habilidades de desarrollo web, descubrí mi pasión por las interfaces de usuario y aprendí mucho sobre diseño y experiencia de usuario. En la segunda, "CoDigital", pude aplicar gran parte de mis conocimientos desarrollando productos con más detalle y enfocándome en las experiencias.',
			'Además, durante estos 14 años, cuando el trabajo me lo permitía, he trabajado como freelance, descubriendo y poniendo toda mi motivación en los proyectos en los que he participado.'
		]
	},
	projects: {
		title: 'Proyectos',
		intro:
			'En estos 14 años he ayudado a dar vida a más de 300 sitios web; estos son algunos de los más destacados.',
		iconTheme:
			'Un conjunto de íconos simple y moderno, diseñado en Inkscape en los tamaños 16px, 24px, 32px, 48px, 64px, 96px y 128px; usa JavaScript para generar cada archivo en los distintos tamaños.',
		planeTheme:
			'Un tema oscuro para Gnome en Linux, con un diseño moderno y minimalista, cómodo para la vista y que le da un aspecto elegante a tu escritorio.',
		github: (name: string) => `Repositorio de ${name} en GitHub`,
		gnomeLook: (name: string) => `${name} en gnome-look`
	},
	reader: {
		readSite: 'Ver sitio',
		video: 'Video',
		site: 'Sitio',
		view: 'Vista',
		technologies: 'Tecnologías',
		readFull: (name: string) => `Ver el sitio completo de ${name}`,
		dialog: (name: string, i: number, n: number) => `${name}, proyecto ${i} de ${n}`,
		previous: (name: string) => `Proyecto anterior: ${name}`,
		next: (name: string) => `Siguiente proyecto: ${name}`,
		previousHint: 'Anterior (←)',
		nextHint: 'Siguiente (→)',
		close: 'Cerrar proyecto',
		stage: (name: string) => `${name}, captura de página completa`,
		screenshot: (name: string) => `Captura de página completa de ${name}`,
		failed: 'La captura en alta resolución no cargó. Estás viendo una versión más liviana.',
		cta: '¿Quieres un sitio como este?',
		nextShort: (name: string) => `Siguiente: ${name}`,
		videoTitle: (name: string) => `Video de recorrido de ${name}`
	}
};
