const en = {
  dir: "ltr",
  lang: "en",
  a11y: {
    skipToContent: "Skip to main content",
    // Must contain the button's visible text ("AR"/"EN") to satisfy WCAG label-in-name.
    langToggleToAr: "Switch language to Arabic (AR)",
    langToggleToEn: "Switch language to English (EN)",
  },
  nav: {
    about: "About",
    timeline: "Timeline",
    skills: "Skills",
    projects: "Projects",
    demo: "Demo",
    testimonials: "Testimonials",
    contact: "Contact",
  },
  hero: {
    greeting: "Hello, I'm",
    name: "Mohamed El-Seady",
    description:
      "I build production web and mobile products end-to-end \u2014 most recently Class A, an edTech SaaS I founded, designed, and shipped with React, Next.js, TypeScript, and PostgreSQL.",
    viewCV: "View CV",
    viewWork: "View My Work",
    roles: [
      "Full-Stack Engineer",
      "React & Next.js Developer",
      "React Native Developer",
      "Founder of Class A",
    ],
  },
  about: {
    title: "About Me",
    subtitle: "Full-Stack Engineer & Founder of Class A",
    p1: "With <strong>5+ years</strong> of hands-on experience crafting modern web applications. I build interactive, responsive, and accessible user interfaces using <strong>TypeScript</strong> and <strong>React.js</strong>, and mobile apps using <strong>React Native</strong>.",
    p2: "I love turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you'll find me exploring new technologies and contributing to open-source projects.",
    yearsExp: "Years Experience",
    projectsDone: "Projects Completed",
    technologies: "Technologies",
  },
  services: {
    title: "What I Do",
    webDev: "Web Development",
    webDevDesc: "Building robust, scalable web applications with React.js.",
    mobileDev: "Mobile App Development",
    mobileDevDesc: "Creating mobile apps for iOS and Android using React Native.",
    responsive: "Responsive Design",
    responsiveDesc:
      "Translating Figma designs into pixel-perfect, responsive layouts that work flawlessly across all devices.",
    performance: "Performance Optimization",
    performanceDesc:
      "Optimizing web apps for speed with lazy loading, code splitting, and best practices for Core Web Vitals.",
  },
  githubStats: {
    title: "GitHub Overview",
    activity: "Activity",
    repos: "Public repositories",
    followers: "Followers",
    commits: "Public commits",
    memberSince: "On GitHub since",
    viewProfile: "View profile on GitHub",
    topLanguages: "Most used languages",
  },
  timeline: {
    title: "Career Journey",
    classA: {
      date: "Dec 2025 - Present",
      title: "Founder & CEO",
      company:
        '<a href="https://classaapp.com" target="_blank" rel="noopener noreferrer">Class A</a> (Cairo, Egypt)',
      mode: "Remote, Full-time",
      tech: "Next.js | React | TypeScript | PostgreSQL | Supabase | Tailwind",
      sectionTitle: "Key Accomplishments:",
      h1: "Product: Took an edTech SaaS from market research and prototyping to a live, production platform, owning strategy, design, branding, and engineering",
      h2: "Architecture: Built a multi-tenant system with role-based permissions, authentication, and audit logging",
      h3: "Operations: Shipped QR-code attendance with POS scanner check-in, smart session scheduling, and auto-generation",
      h4: "Billing: Delivered bulk monthly invoicing, discounts, payment statuses, and trial/subscription flows, plus automated WhatsApp reminders to parents",
      h5: "Reporting: Built PDF/Excel exports and analytics for collections, outstanding dues, per-group revenue, absence trends, and debt-aging",
    },
    nursery: {
      date: "Jan 2024 - Jun 2026",
      title: "Software Engineer",
      company: "Nursery Story (Scotland, UK)",
      mode: "Remote, Full-time",
      tech: "TypeScript | React.js | React Native | Node.js | PostgreSQL",
      sectionTitle: "Key Accomplishments:",
      h1: "Mobile: Delivered invoicing feature (React Native) with payment gateway integration",
      h2: "Mobile: Managed full-cycle App Store & Google Play deployments across iOS & Android",
      h3: "Frontend: Implemented funding schedule logic & social engagement features (likes, comments)",
      h4: "Backend: Optimized database queries, reducing load time by 95% for large nurseries",
      h5: "Backend: Designed booking workflows & payment logging for 70+ nurseries & 300+ childminders",
    },
    upskilling: {
      date: "Feb 2023 - Jan 2024",
      title: "Software Engineer",
      company:
        '<a href="https://upskilling-egypt.com/" target="_blank" rel="noopener noreferrer">Upskilling</a> (Maadi, Egypt)',
      mode: "Hybrid, Full-time",
      tech: "React | TypeScript | Node.js | MUI | JWT Auth",
      sectionTitle: "Projects Built:",
      h1: "Hotel Management: Full-stack system with JWT auth, admin dashboard, booking & room management",
      h2: "Quiz Platform: Role-based access (admin/student), quiz creation, result tracking, progress analytics",
      h3: "Food Management: CRUD operations with permissions, image upload with preview, user roles",
      h4: "Dark/Light theme support & Arabic/English localization across all projects",
    },
    education: {
      title: "Education Background",
      date1: "2014 - 2018",
      title1: "Bachelor of Commerce - English Section",
      company1: "Tanta University",
      h1: "Strong foundation in Business & Economics",
      h2: "Strong analytical and problem-solving skills",
      date2: "2020 - Present",
      title2: "Self-Taught Full-Stack Developer",
      company2: "Continuous Learning & Development",
      h3: "Frontend & Mobile: TypeScript, React.js, Next.js, React Native, Redux, MUI",
      h4: "Backend: Node.js, Express.js, SQL, JWT Auth",
    },
  },
  blog: {
    title: "Recommended Reading",
    subtitle:
      "Articles and docs by other authors that shaped how I build. Curated, not written, by me.",
    readArticle: "Read Article",
    articles: [
      {
        title: "A Complete Guide to useEffect",
        description:
          "Master React Hooks with an in-depth exploration of useEffect. Learn how to manage side effects, handle dependencies, and write efficient React code that avoids common pitfalls.",
        category: "React",
        author: "OverReacted",
      },
      {
        title: "Web Vitals: Essential Metrics for Performance",
        description:
          "Google's official guide to Core Web Vitals and key performance metrics. Learn how to measure, optimize, and monitor your website's real-world performance with actionable insights.",
        category: "Performance",
        author: "Google Web.dev",
      },
      {
        title: "Understanding Promises, async/await & Event Loop",
        description:
          "Deep dive into JavaScript's asynchronous model. Understand promises, async/await syntax, the event loop, hoisting, and how JavaScript executes code under the hood.",
        category: "JavaScript",
        author: "JavaScript.info",
      },
      {
        title: "Advanced TypeScript: Generics & Type Utilities",
        description:
          "Master advanced TypeScript patterns including generics, utility types, and conditional types. Learn professional patterns for building scalable, type-safe applications at scale.",
        category: "TypeScript",
        author: "LogRocket Blog",
      },
      {
        title: "Hoisting in JavaScript: Variables & Functions",
        description:
          "Understand how JavaScript hoisting works with var, let, const, and function declarations. Learn the Temporal Dead Zone and avoid common bugs related to variable scope.",
        category: "JavaScript",
        author: "MDN Web Docs",
      },
      {
        title: "Database Design Patterns & SQL Optimization",
        description:
          "Learn database design best practices, query optimization techniques, and how to build scalable data architectures. Covers relationships, indexing, and performance tuning.",
        category: "Database",
        author: "Prisma Blog",
      },
    ],
  },
  skills: {
    title: "Tech Stack",
  },
  projects: {
    title: "Featured Projects",
    all: "All",
    javascript: "JavaScript",
    react: "React",
    nextjs: "Next.js",
    moreOn: "And many more on",
    viewAll: "View All on GitHub",
    labels: {
      role: "Role",
      challenge: "Challenge",
      outcome: "Outcome",
      privateSource: "Private source",
    },
    classA: {
      title: "Class A · EdTech SaaS",
      desc: "Multi-tenant platform for tutoring and educational centres, replacing scattered WhatsApp groups, spreadsheets, and paper records with one structured system for admins, teachers, and parents.",
      role: "Founder, product lead, and full-stack engineer",
      challenge:
        "Multi-tenant billing, QR attendance, and WhatsApp automation across Arabic and English",
      outcome: "Live SaaS taken from market research through to production",
      readCaseStudy: "Read the full case study",
    },
    hotel: {
      title: "Hotel Management System",
      desc: "Full-featured hotel booking and management dashboard with room availability, reservations, and guest management.",
      role: "Full-stack feature builder",
      challenge: "Auth, room CRUD, bookings, and admin flows",
      outcome: "Production-style dashboard with protected workflows",
    },
    quiz: {
      title: "Quiz App",
      desc: "Interactive quiz application with multiple categories, timer, score tracking, and dynamic question generation.",
      role: "Frontend logic and state management",
      challenge: "Timed quiz flow, scoring, and role-based UX",
      outcome: "Reusable quiz experience with progress tracking",
    },
    food: {
      title: "Food Management App",
      desc: "Restaurant food ordering and management platform with menu management, order tracking, and admin dashboard.",
      role: "CRUD interface and API integration",
      challenge: "Permissions, image preview, and form validation",
      outcome: "Admin-ready management flow for food items",
    },
    cart: {
      title: "React Shopping Cart",
      desc: "E-commerce shopping cart with product listing, add-to-cart functionality, and dynamic price calculation.",
      role: "Frontend shopping experience",
      challenge: "Cart state, totals, and responsive product layout",
      outcome: "Clear e-commerce flow from browsing to checkout",
    },
    social: {
      title: "Social Media App",
      desc: "Social platform with user posts, comments, and real-time data fetched from REST APIs using Axios.",
      role: "API-driven UI builder",
      challenge: "Async data loading, posts, comments, and UX states",
      outcome: "Interactive feed experience backed by REST APIs",
    },
  },
  testimonials: {
    title: "Recommendations",
    subtitle: "Verified professional signals from LinkedIn",
    source: "LinkedIn Recommendation",
    view: "View full recommendation",
    // One entry per recommendation, matched by index to the cards in index.html.
    // ar.js must stay the same length and order.
    items: [
      {
        quote:
          "Mo is a visionary product builder and innovator. He is the mastermind behind Class A, conceiving the idea and executing it flawlessly from scratch\u2026 He built a system that not only includes all top-tier market features but also addresses existing gaps by introducing missing functionalities that none of the competitors offered.",
        author: "Yara Khaled",
        role: "Architect",
        context: "Worked with Mohamed on the same team",
        date: "June 30, 2026",
      },
      {
        quote:
          "Mohamed has a strong technical background and the ability to work across different technologies with confidence and efficiency. What really sets Mohamed apart is his personality and team spirit\u2026 I highly recommend Mohamed to any team looking for a skilled, dependable, and genuinely supportive Full Stack Developer.",
        author: "Hamas Ahmed",
        role: "Software Engineer \u00b7 React, Next.js, TypeScript, React Native \u00b7 Instructor @ ITI",
        context: "Worked with Mohamed on the same team",
        date: "April 23, 2026",
      },
      {
        quote:
          "I've had the pleasure of working closely with Mohamed El-Seady, and I can confidently say he is one of the most reliable and impactful full-stack engineers I've worked with. His ability to deliver high-quality solutions across web and mobile consistently elevates the entire team.",
        author: "Mahmoud El-Fiky",
        role: "Full-Stack & Cross-platform Mobile Developer",
        context: "Worked with Mohamed on the same team",
        date: "December 10, 2025",
      },
    ],
  },
  demoVideo: {
    title: "Demo Videos",
    badgeLabel: "Product demo",
    classATitle: "Class A · product demo",
    classADesc:
      "A walkthrough of the platform I founded and built: attendance, billing, and the parent portal.",
    playClassA: "Play video: Class A product demo",
    portfolioTitle: "Portfolio walkthrough",
    desc: "See all features, UI, and logic of my work in action. <br><small>(Video hosted on Vidline)</small>",
  },
  projectSearch: {
    searchPlaceholder: "Search projects by name or technology...",
    noResults: "No projects found matching your search.",
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Have a project in mind or want to collaborate? Feel free to reach out!",
    email: "Email",
    phone: "Phone",
    phoneValue: "+20 114 681 7834",
    location: "Location",
    locationValue: "Egypt",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Your Message",
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    subjectLabel: "Subject",
    messageLabel: "Your Message",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Failed to send. Please try again.",
  },
  chat: {
    title: "Quick Answers",
    subtitle: "Common questions about my work, answered instantly.",
    greeting:
      "Hi! 👋 Pick a question below or type a keyword (skills, projects, experience, contact) and I'll pull up the answer. For anything else, the contact form reaches me directly.",
    inputPlaceholder: "Type your message...",
    inputLabel: "Type your message",
    suggestedSkills: "What are your skills?",
    suggestedProjects: "Tell me about projects",
    suggestedExperience: "Work experience?",
    suggestedContact: "How to contact?",
    responses: {
      skills:
        "I'm skilled in React.js, React Native, TypeScript, Next.js, Node.js, JavaScript, SQL, MongoDB, Redux, MUI, Tailwind CSS, and more. I also have experience with Git, REST APIs, JWT authentication, accessibility, and responsive design.",
      projects:
        "My flagship is Class A, an edTech SaaS I founded and built end-to-end: multi-tenant architecture, QR attendance, billing, and WhatsApp automation. Alongside it I've built Hotel Management Systems, Quiz Platforms, Food Management Systems, and multiple React/React Native applications.",
      experience:
        "I have 5+ years of professional experience. I'm the founder of Class A, an edTech SaaS, and previously a Software Engineer at Nursery Story (UK) and Upskilling (Egypt), plus self-taught learning since 2020. I've worked with teams across different time zones and contributed to frontend, backend, and mobile app development.",
      contact:
        "You can reach me via email at mohamedelseady247@gmail.com, phone at +20 114 681 7834, or connect on LinkedIn and GitHub. I'm open to freelance projects and new opportunities!",
      default:
        "Thanks for your interest! Feel free to explore more sections of my portfolio or contact me directly with specific questions.",
    },
  },
  caseStudy: {
    backToPortfolio: "Back to portfolio",
    eyebrow: "Case study",
    title: "Class A · an edTech SaaS, from market research to production",
    lede: "Tutoring centres across Egypt run on WhatsApp groups, paper registers, and spreadsheets that never reconcile. I interviewed the people living with that problem, found what every existing tool was missing, and built the system that fixes it.",
    visitSite: "Visit classaapp.com",
    meta: {
      role: "Role",
      roleValue: "Founder, product lead, sole engineer",
      timeline: "Timeline",
      timelineValue: "Dec 2025 – present",
      stack: "Stack",
      stackValue: "Next.js, TypeScript, PostgreSQL, Supabase",
      status: "Status",
      statusValue: "Live in production",
    },
    demo: {
      title: "See it running",
      body: "A walkthrough of the product: how a session is scheduled, how attendance is taken at the door, and what a parent sees at the other end.",
    },
    problem: {
      title: "The problem",
      p1: "A mid-sized tutoring centre juggles a few hundred students across dozens of groups. Almost none of that runs on software. Attendance is a paper register. Fees are a notebook or a spreadsheet. Parent communication is a WhatsApp group where announcements scroll away within hours.",
      p2: "The failure mode is always the same: money leaks. Nobody can say with confidence which students owe what, how long they have owed it, or which groups are actually profitable. By the time an owner notices, the debt is months old and awkward to chase.",
    },
    research: {
      title: "Research before code",
      p1: "I did not start by writing software. I started by interviewing teachers and centre owners about how their week actually runs: what they track, where the time goes, and which mistakes cost them money. Then I worked through the tools already on the market feature by feature.",
      p2: "Two things came out of that. First, the existing products covered the obvious surface: students, groups, invoices. Second, they consistently stopped short at exactly the points where the real work happens.",
      gapsTitle: "The gaps competitors left open",
      gap1Title: "Attendance that costs time",
      gap1Body:
        "Marking a register student by student does not scale to a room filling up in three minutes. Nobody was solving the door, only the database.",
      gap2Title: "Chasing money by hand",
      gap2Body:
        "Tools recorded debt but left the follow-up entirely manual, which meant it did not happen.",
      gap3Title: "Parents left outside the system",
      gap3Body:
        "Parents are the paying customer, yet had no way to see attendance or progress without asking a teacher directly.",
      gap4Title: "English-first interfaces",
      gap4Body:
        "Products aimed at an Arabic-speaking market with RTL treated as an afterthought, rather than as the primary experience.",
    },
    decisions: {
      title: "What I built, and why",
      d1Title: "QR attendance, built for the doorway",
      d1Body:
        "Every student gets a QR code; a POS scanner at the door checks them in. The constraint that shaped this was not technical. It was that a queue of teenagers will not wait for an admin to scroll a list. Sessions generate automatically from each group's schedule, so the register exists before anyone walks in.",
      d2Title: "Billing that chases itself",
      d2Body:
        "Invoices generate in bulk each month, carry discounts and payment status, and feed a debt-aging view. The piece that changes behaviour is the automation on top: parents get WhatsApp reminders for absences and unpaid invoices without an admin deciding to send them. Recording debt is easy; collecting it is the product.",
      d3Title: "A parent portal, not a parent broadcast",
      d3Body:
        "Parents get their own view: attendance history, progress over time, and assessments. This was the clearest gap in the market and the one owners reacted to most strongly, because it removes a whole category of interruption from their day.",
      d4Title: "Arabic first, not Arabic added",
      d4Body:
        "Full Arabic and English localisation with real RTL, plus multi-currency and multi-timezone support. The product also installs as a PWA on iOS and Android, because most of these centres are phone-first and were never going to sit at a desktop.",
    },
    architecture: {
      title: "Architecture and engineering",
      p1: "Class A is multi-tenant from the database up, with role-based permissions separating admins, teachers, and parents, and audit logging over the actions that touch money. Every tenant shares one deployment, so isolation had to be enforced at the data layer rather than hoped for at the UI.",
      s1Title: "Application",
      s1Body:
        "Next.js and React with TypeScript end-to-end, React Query for server state, react-hook-form and Zod for validated forms, Tailwind for styling.",
      s2Title: "Data",
      s2Body: "PostgreSQL via Supabase, with Knex.js for queries and migrations.",
      s3Title: "Localisation",
      s3Body:
        "next-intl driving Arabic and English, including RTL layout, currencies, and timezones.",
      s4Title: "Confidence",
      s4Body:
        "Playwright smoke tests over the critical paths, Sentry for error monitoring in production.",
    },
    outcome: {
      title: "Where it stands",
      p1: "Class A is live and in use by tutoring centres. It went from an idea to a production platform, carried by one person: product strategy, design, branding, and full-stack engineering.",
      p2: "The part I would carry into any team is the sequence: talk to the people with the problem, map what existing tools refuse to do, and build for the constraint rather than the feature list. The QR scanner exists because of a queue at a door, not because it looked good on a roadmap.",
      quote:
        "He is the mastermind behind Class A, conceiving the idea and executing it flawlessly from scratch\u2026 He built a system that not only includes all top-tier market features but also addresses existing gaps by introducing missing functionalities that none of the competitors offered.",
      quoteAuthor: "Yara Khaled",
      quoteRole: "Architect · worked with Mohamed on the same team",
    },
    shots: {
      dashboard:
        "The dashboard answers the three questions an owner asks every morning: who is coming today, who owes money, and what came in this month.",
      attendance:
        "Attendance resolves to a percentage per student, which is what parents actually ask about.",
      payments: "Payment status, discounts, and outstanding balances in one view.",
      reports:
        "Reports export to PDF and Excel: collections, outstanding dues, per-group revenue, absence trends, and debt aging.",
    },
    gallery: {
      title: "More of the product",
      students: "Students",
      groups: "Groups",
      calendar: "Session calendar",
      analytics: "Analytics",
    },
    cta: {
      title: "Want to talk about building something like this?",
      contact: "Get in touch",
      moreWork: "See more work",
    },
  },
  footer: {
    tagline: "Building the web, one pixel at a time.",
    copy: 'Made with <span class="heart">&hearts;</span> by Mandela &copy; <span id="currentYear"></span> All Rights Reserved.',
  },
};
