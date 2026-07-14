// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  baseUrl: 'https://api.chosenschool.org/api',
  // baseUrl: 'https://ijesudunsin-002-site1.ftempurl.com/api',
  companyId: 'c488f43c-4e0f-4a25-f0cf-08de8eb28ccd', // fill in the Busco company UUID
  schoolName: 'Busco School',
  schoolNameFull: 'Busco Nur and Primary School',
  schoolAbbreviation: 'Busco',
  r2BaseUrl: 'https://files.chosenschool.org',
  logoUrl: 'assets/images/busco.png',
  logoWhiteUrl: 'assets/images/busco.png',
  faviconUrl: 'busco.ico',
  heroBgUrl: 'assets/images/assembly.jpeg',

  // Contact info
  address:
    'No. 4 Molipa Estate, Off Irewon road, Ijebu Ode, Ogun state, Nigeria.',
  phoneNumbers: ['08054849749'],
  emails: [
    { address: 'buscoschool@gmail.com', note: 'responds faster' },
    { address: 'buscoschool@gmail.com' },
  ],
  officeHours: 'Monday – Friday: 8:00 AM – 4:00 PM',

  // Theme colors
  primaryColor: '#008000',
  secondaryColor: '#eff4ff',
  accentColor: '#654321',
  bgColor: '#eff4ff',
  sidebarBg: '#008000',
  sidebarMenuHover: '#008000',
  buttonBg: '#654321',
  buttonSecBg: '#008000',
  tableBg: '#008000',
  gradientFrom: '#16a34a',
  gradientTo: '#4ade80',
};
