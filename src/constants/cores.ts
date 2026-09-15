// src/constants/cores.ts

export const CoresEscuro = {
  bg:           '#0a1628',
  card:         '#111f35',
  border:       '#1e3050',
  inputBg:      '#0d1a2e',
  textPrimario: '#e8f0fe',
  textSecundario: '#6b8aaa',
} as const;

export const CoresClaro = {
  bg:           '#eef4ff',
  card:         '#ffffff',
  border:       '#dde8f5',
  inputBg:      '#f5f9ff',
  textPrimario: '#0d1b2a',
  textSecundario: '#5a7a9a',
} as const;

export const CoresFixas = {
  azul:         '#1560A8',
  azulClaro:    '#2E9EFF',
  branco:       '#ffffff',
  erro:         '#ff6b6b',
  cardPrincipalLabel: 'rgba(255,255,255,0.7)',
  barraFundo:   'rgba(255,255,255,0.2)',
} as const;

export type Temacores = typeof CoresEscuro | typeof CoresClaro;