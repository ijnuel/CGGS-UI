// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  baseUrl: 'https://api.chosenschool.org/api',
  schoolName: 'Chosen Generation',
  schoolNameFull: 'Chosen Generation Schools',
  schoolAbbreviation: 'CGGS',
  logoUrl: 'assets/images/logo.png',
  logoWhiteUrl: 'assets/images/logo-white.png',
  faviconUrl: 'favicon.ico',
  heroBgUrl: 'assets/images/cggs-building.jpg',

  // Contact info
  address: 'No. 47 Olorunsogo, Ijaregbe Road, Ilesa, Osun State, Nigeria.',
  phoneNumbers: ['08062315427', '09037535756'],
  emails: [
    { address: 'ijitonajesudunsin@gmail.com', note: 'responds faster' },
    { address: 'Chosengenerationacad@gmail.com' },
  ],
  officeHours: 'Monday – Friday: 8:00 AM – 4:00 PM',

  // Theme colors
  primaryColor: '#0f0e17',
  secondaryColor: '#c3c9d8',
  accentColor: '#006efe',
  bgColor: '#eff4ff',
  sidebarBg: '#0f0e17',
  sidebarMenuHover: '#646177',
  buttonBg: '#006efe',
  buttonSecBg: '#0f0e17',
  tableBg: '#0f0e17',
  gradientFrom: '#0f0e17',
  gradientTo: '#006efe',
};
