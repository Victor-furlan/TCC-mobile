export const CoresEscuro = {
  // Base
  bg:             '#0B0F19',
  card:           '#111f35',
  border:         '#1e3050',
  inputBg:        '#12243f',
  inputBorder:    '#1e3050',
  textPrimario:   '#FFFFFF',
  textSecundario: '#6b8aaa',

  // cores da tela de login
  authHeaderBg:   '#5d84ab',  // fundo da pagina
  authSvgFundo:   '#ffffff',  //svg de fundo
  authOnda1:      '#1a3a5c',  // onda mais atrás
  authOnda2:      '#162d4a',  // onda do meio
  authOnda3:      '#111f35',  // onda da frente — mesma cor do card
  authTitulo:     '#FFFFFF',
  authSubtitulo:  'rgba(255,255,255,0.8)',
  authEsqueci:    '#5d84ab',
  authLink:       '#1560a8',
  authStatusBar:  'light-content',
} as const;

export const CoresClaro = {
  // Base
  bg:             '#F6FBFF',
  card:           '#F6FBFF',
  border:         '#98C8EB',
  inputBg:        '#E9F6FF',
  inputBorder:    '#ABDCFF',
  textPrimario:   '#0E1D2A',
  textSecundario: '#204461',

  // Auth (login, criar conta, esqueci senha)
  authHeaderBg:   'rgb(169, 199, 230)',
  authSvgFundo:   '#ffffff',  //svg de fundo
  authOnda1:      '#c5dff0',
  authOnda2:      '#d4e8f5',
  authOnda3:      '#F6FBFF',
  authTitulo:     '#FFFFFF',
  authSubtitulo:  'rgba(255,255,255,0.85)',
  authEsqueci:    '#0073B9',
  authLink:       '#0073B9',
  authStatusBar:  'light-content',
} as const;

export const CoresFixas = {
  azul:               '#0073B9',
  azulClaro:          '#3B82F6',
  branco:             '#FFFFFF',
  erro:               '#EF4444',
  cardPrincipalLabel: 'rgba(255,255,255,0.7)',
  barraFundo:         'rgba(255,255,255,0.2)',
} as const;

export type Temacores = typeof CoresEscuro | typeof CoresClaro;