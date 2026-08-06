export type HomeFaqItem = {
  q: string
  a?: string
  bullets?: string[]
}

/** Homepage FAQ copy — used by FAQSection UI and FAQPage JSON-LD. */
export const HOME_FAQS: HomeFaqItem[] = [
  {
    q: ' Why Pixl Pluz Academy the best option for an AI-integrated course in Kochi?',
    a: 'Pixl Pluz Academy combines AI-integrated, scholarship-based training with a strong focus on practical learning. Live projects, agency-style training, placement support, International exposure, and mentorship from industry professionals make it a well-rounded choice for building real, job-ready skills.',
  },
  {
    q: 'What AI courses does Pixl Pluz provide?',
    bullets: [
      'AI-integrated digital marketing course',
      'AI-powered web development course',
      'Data science and AI course',
      'Cybersecurity course with AI',
    ],
  },
  {
    q: 'Does Pixl Pluz offer an online AI-integrated course in Kochi?',
    a: 'Yes. Pixl Pluz provides flexible learning options for students looking for an online/offline digital marketing course in Kochi with practical assignments, mentor support, and a live project with global exposure.',
  },
  {
    q: 'What are the eligibility criteria for Pixl Pluz scholarship-based AI-integrated course?',
    a: 'At Pixl Pluz, Candidates must register and attend the entrance test. Our counsellor then contacts shortlisted candidates, and scholarship winners are selected based on the results.',
  },
  {
    q: 'Does Pixl Pluz provide an AI tools subscription for the students?',
    a: 'Yes. We provide access to pro-versions of the key AI tools needed for each course including AI writing assistants, design tools, SEO tools, and automation platforms.',
    bullets: [
      'ChatGPT Plus',
      'Perplexity Pro',
      'Canva Pro',
      'Notion AI Plus',
      'Claude Pro',
      'Jasper Creator',
      'Grammarly Premium',
      'Leonardo AI Pro',
    ],
  },
  {
    q: 'Does Pixl Plus provide placement assistance after the course?',
    a: 'Yes, Pixl Plus offers placement assistance to help students transition smoothly into the industry, including support with resume building, interview preparation, and connecting learners to relevant job opportunities after course completion.',
  },
  {
    q: 'Do I need any prior knowledge of AI or coding to join Pixl Plus?',
    a: 'No, the courses are designed for beginners, so you can start with zero prior experience.',
  },
  {
    q: "Which course should I choose if I'm not sure what I want to specialize in?",
    a: "Start with our AI-integrated digital marketing course it's the most beginner-friendly and helps you explore the digital field before specializing further.",
  },
  {
    q: 'How is "AI-integrated" different from a normal digital marketing or web development course?',
    a: 'Our courses teach you to use AI tools alongside core skills, so you learn faster, work smarter, and stay updated with how the industry actually works today.',
  },
  {
    q: 'Is the data science and AI course suitable for non-engineering students?',
    a: 'Yes, the course is designed to be beginner-friendly, so non-engineering students can join and learn step by step.',
  },
]
