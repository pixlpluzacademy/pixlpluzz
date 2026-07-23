/** Official Pixl Pluz social profile URLs */
export const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/pixlplusagency',
    icon: 'facebook',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/pixlpluz/',
    icon: 'instagram',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pixlpluz/',
    icon: 'linkedin',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@PixlPluz',
    icon: 'youtube',
  },
] as const

export type SocialIconName = (typeof SOCIAL_LINKS)[number]['icon']
