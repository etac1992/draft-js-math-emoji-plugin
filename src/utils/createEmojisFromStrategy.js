/* Idea from https://github.com/tommoor/emojione-picker */
export default function createEmojisFromStrategy() {
  const emojis = {
    greek: {
      Alpha: '\\Alpha',
      Beta: '\\Beta',
      Gamma: '\\Gamma',
      Delta: '\\Delta',
      Epsilon: '\\Epsilon',
      Zeta: '\\Zeta',
      Eta: '\\Eta',
      Theta: '\\Theta',
      Iota: '\\Iota',
      Kappa: '\\Kappa',
      Lambda: '\\Lambda',
      Mu: '\\Mu',
      Nu: '\\Nu',
      Xi: '\\Xi',
      Omicron: '\\Omicron',
      Pi: '\\Pi',
      Sigma: '\\Sigma',
      Tau: '\\Tau',
      Upsilon: '\\Upsilon',
      Phi: '\\Phi',
      Chi: '\\Chi',
      Psi: '\\Psi',
      Omega: '\\Omega',
      Rho: '\\Rho',
      alpha: '\\alpha',
      beta: '\\beta',
      gamma: '\\gamma',
      delta: '\\delta',
      epsilon: '\\varepsilon',
      zeta: '\\zeta',
      eta: '\\eta',
      theta: '\\theta',
      iota: '\\iota',
      kappa: '\\kappa',
      lambda: '\\lambda',
      mu: '\\mu',
      nu: '\\nu',
      xi: '\\xi',
      omicron: '\\omicron',
      pi: '\\pi',
      sigma: '\\sigma',
      tau: '\\tau',
      upsilon: '\\upsilon',
      phi: '\\phi',
      chi: '\\chi',
      psi: '\\psi',
      omega: '\\omega',
      rho: '\\rho',
    },
    factor: {
      exa: 'E',
      peta: 'P',
      tera: 'T',
      giga: 'G',
      mega: 'M',
      kilo: 'k',
      deci: 'd',
      centi: 'c',
      milli: 'm',
      micro: '\\mu',
      nano: 'n',
      pico: 'p',
      femto: 'f',
      atto: 'a',
      zepto: 'z',
      yocto: 'y'
    },
    constants: {
      planck: 'h',
      reducedPlanck: '\\hbar',
      atomic: 'amu',
      boltzmann: 'k\\raisebox{-0.25em}{\\scriptsize B}',
      molar: 'R',
      avogadro: 'N\\raisebox{-0.25em}{\\scriptsize A}',
      speedOfLight: 'c',
      mass: 'm\\raisebox{-0.25em}{\\scriptsize e}',
      elementary: 'e',
      permittivity: '\\varepsilon\\raisebox{-0.25em}{\\scriptsize 0}',
      vacuum: '\\mu\\raisebox{-0.25em}{\\scriptsize 0}'
    },
  };
  return emojis;
}
