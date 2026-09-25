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
		title: 'I bring ideas to life on the web through code and design.',
		intro:
			"I am a developer who enjoys designing and building digital experiences. I create accessible, human-centered products because I believe technology can improve people's lives when it is inclusive and easy to use."
	},
	about: {
		title: 'About me',
		body: 'I have been curious about how things work from an early age. When I discovered computers and the Ubuntu philosophy—“I am because we all are”—my interest in open-source software became a passion. The freedom to modify technology and adapt it to my needs inspires me to keep learning and exploring.',
		stack: 'Here are some of the *technologies I have worked with recently.'
	},
	work: {
		title: 'Work',
		items: [
			'In my free time, I experiment with new technologies, customize interfaces and icons for Linux, and contribute to open-source projects. Professionally, I help develop web application interfaces for PuntosColombia.',
			'Previously, I designed the website, deployed containerized servers, and designed and developed the front end of the sales and business management system for Comodisimos.',
			'Before that, I handled the strategy, design, development, server deployment, and production launch of the Todo en Artes website.',
			'Earlier in my career, I worked at two digital marketing agencies. At WebCreativa, I honed my web development skills, discovered my passion for user interfaces, and learned about design and user experience. At CoDigital, I applied that knowledge to build more polished, experience-focused products.',
			'Throughout these 14 years, I have also worked as a freelancer whenever time allowed, bringing dedication and enthusiasm to every project.'
		]
	},
	projects: {
		title: 'Projects',
		intro:
			'Over the past 14 years, I have helped bring more than 300 websites to life. Here are some highlights.',
		iconTheme:
			'A simple, modern icon set designed in Inkscape. JavaScript generates each icon at 16, 24, 32, 48, 64, 96, and 128 pixels.',
		planeTheme:
			'A modern, minimalist dark theme for GNOME. It is easy on the eyes and gives your Linux desktop a polished look.',
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
		stage: (name: string) => `${name}, full-page screenshot`,
		screenshot: (name: string) => `Full-page screenshot of ${name}`,
		failed:
			'The full-resolution screenshot could not be loaded. A smaller version is shown instead.',
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
		title: 'Doy vida a las ideas en la web con código y diseño.',
		intro:
			'Soy desarrollador y disfruto diseñar y crear experiencias digitales. Desarrollo productos accesibles y centrados en las personas porque creo que la tecnología puede mejorar sus vidas cuando es inclusiva y fácil de usar.'
	},
	about: {
		title: 'Sobre mí',
		body: 'Desde pequeño siento curiosidad por entender cómo funcionan las cosas. Cuando descubrí el mundo de los computadores y la filosofía Ubuntu —«soy porque todos somos»—, mi interés por el software libre se convirtió en una pasión. La posibilidad de modificar la tecnología y adaptarla a mis necesidades me impulsa a seguir aprendiendo y explorando.',
		stack: 'Estas son algunas *tecnologías con las que he trabajado recientemente.'
	},
	work: {
		title: 'Experiencia',
		items: [
			'En mi tiempo libre, experimento con nuevas tecnologías, personalizo interfaces e íconos para Linux y contribuyo a proyectos de software libre. Profesionalmente, participo en el desarrollo de interfaces para aplicaciones web de PuntosColombia.',
			'Antes, diseñé el sitio web, implementé servidores en contenedores y realicé el diseño de interfaces y el desarrollo front-end del sistema de ventas y gestión comercial de Comodisimos.',
			'Anteriormente, me encargué de la estrategia, el diseño, el desarrollo, la implementación del servidor y la puesta en producción del sitio web de Todo en Artes.',
			'Al comienzo de mi carrera trabajé en dos agencias de marketing digital. En WebCreativa perfeccioné mis habilidades de desarrollo web, descubrí mi pasión por las interfaces y aprendí sobre diseño y experiencia de usuario. En CoDigital apliqué esos conocimientos para crear productos más detallados y centrados en la experiencia.',
			'Durante estos 14 años también he trabajado como independiente cuando el tiempo me lo ha permitido, aportando dedicación y entusiasmo a cada proyecto.'
		]
	},
	projects: {
		title: 'Proyectos',
		intro:
			'En estos 14 años he ayudado a dar vida a más de 300 sitios web; estos son algunos de los más destacados.',
		iconTheme:
			'Un conjunto de íconos sencillo y moderno, diseñado en Inkscape. JavaScript genera cada ícono en tamaños de 16, 24, 32, 48, 64, 96 y 128 píxeles.',
		planeTheme:
			'Un tema oscuro, moderno y minimalista para GNOME. Es cómodo para la vista y le da un aspecto elegante al escritorio de Linux.',
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
		failed:
			'No se pudo cargar la captura en alta resolución. En su lugar, se muestra una versión más liviana.',
		cta: '¿Quieres un sitio como este?',
		nextShort: (name: string) => `Siguiente: ${name}`,
		videoTitle: (name: string) => `Video de recorrido de ${name}`
	}
};
