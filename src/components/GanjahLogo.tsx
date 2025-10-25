import { motion } from 'motion/react';
import { Theme } from './ThemeSelector';
import { getThemeStyles } from '../utils/themeUtils';

interface GanjahLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  theme?: Theme;
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export function GanjahLogo({ size = 'md', animated = true, theme = 'fire' }: GanjahLogoProps) {
  const styles = getThemeStyles(theme);
  const sizeClass = sizes[size];

  const Wrapper = animated ? motion.div : 'div';
  const animationProps = animated ? {
    animate: {
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    },
    whileHover: { scale: 1.15, rotate: [0, -5, 5, 0] },
  } : {};

  return (
    <Wrapper className={`${sizeClass} relative`} {...animationProps}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Gradiente verde natural */}
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7CB342" stopOpacity="1" />
            <stop offset="50%" stopColor="#558B2F" stopOpacity="1" />
            <stop offset="100%" stopColor="#33691E" stopOpacity="1" />
          </linearGradient>
          
          <radialGradient id="leafHighlight">
            <stop offset="0%" stopColor="#9CCC65" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#558B2F" stopOpacity="0.3" />
          </radialGradient>

          <filter id="leafShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="1" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#leafShadow)" transform="translate(120, 120)">
          
          {/* HOJA CENTRAL (la más larga y delgada) */}
          <path
            d="M 0,-90 
               C -3,-85 -4,-75 -4,-60
               C -4,-45 -3,-30 -2,-15
               L -2,45
               C -1,50 0,55 0,58
               C 0,55 1,50 2,45
               L 2,-15
               C 3,-30 4,-45 4,-60
               C 4,-75 3,-85 0,-90 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
          />
          
          {/* Vena central */}
          <line x1="0" y1="-88" x2="0" y2="56" stroke="#558B2F" strokeWidth="1.5" opacity="0.6"/>
          
          {/* Serrado de hoja central */}
          <path d="M -4,-60 L -6,-58 L -4,-55 L -6,-52 L -4,-48 L -5,-44 L -4,-40" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.7"/>
          <path d="M 4,-60 L 6,-58 L 4,-55 L 6,-52 L 4,-48 L 5,-44 L 4,-40" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.7"/>

          {/* HOJA LATERAL IZQUIERDA 1 (segunda más larga) */}
          <path
            d="M -8,-70
               C -15,-68 -25,-62 -35,-52
               C -45,-42 -52,-30 -56,-15
               C -58,-5 -58,5 -56,12
               C -54,8 -50,2 -45,-5
               C -40,-12 -33,-20 -25,-28
               C -17,-36 -10,-45 -6,-54
               C -5,-60 -6,-65 -8,-70 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
          />
          
          {/* Vena lateral izq 1 */}
          <path d="M -8,-68 Q -30,-40 -55,10" stroke="#558B2F" strokeWidth="1.2" opacity="0.5" fill="none"/>
          
          {/* Serrado lateral izq 1 */}
          <path d="M -25,-50 L -28,-48 L -26,-45 L -29,-42 L -27,-38" 
                stroke="#33691E" strokeWidth="0.4" fill="none" opacity="0.6"/>

          {/* HOJA LATERAL DERECHA 1 */}
          <path
            d="M 8,-70
               C 15,-68 25,-62 35,-52
               C 45,-42 52,-30 56,-15
               C 58,-5 58,5 56,12
               C 54,8 50,2 45,-5
               C 40,-12 33,-20 25,-28
               C 17,-36 10,-45 6,-54
               C 5,-60 6,-65 8,-70 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
          />
          
          {/* Vena lateral der 1 */}
          <path d="M 8,-68 Q 30,-40 55,10" stroke="#558B2F" strokeWidth="1.2" opacity="0.5" fill="none"/>
          
          {/* Serrado lateral der 1 */}
          <path d="M 25,-50 L 28,-48 L 26,-45 L 29,-42 L 27,-38" 
                stroke="#33691E" strokeWidth="0.4" fill="none" opacity="0.6"/>

          {/* HOJA LATERAL IZQUIERDA 2 (más ancha) */}
          <path
            d="M -15,-55
               C -25,-50 -38,-40 -50,-25
               C -62,-10 -70,8 -73,25
               C -75,35 -74,45 -70,52
               C -68,46 -63,38 -56,28
               C -49,18 -40,8 -30,-2
               C -22,-12 -16,-22 -13,-32
               C -12,-40 -13,-48 -15,-55 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
            opacity="0.95"
          />
          
          {/* Vena lateral izq 2 */}
          <path d="M -15,-52 Q -45,-15 -71,48" stroke="#558B2F" strokeWidth="1.3" opacity="0.5" fill="none"/>
          
          {/* Serrado lateral izq 2 */}
          <path d="M -40,-30 L -43,-27 L -41,-23 L -44,-19 L -42,-15 L -45,-10" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M -55,5 L -58,8 L -56,12 L -59,16 L -57,20" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.6"/>

          {/* HOJA LATERAL DERECHA 2 */}
          <path
            d="M 15,-55
               C 25,-50 38,-40 50,-25
               C 62,-10 70,8 73,25
               C 75,35 74,45 70,52
               C 68,46 63,38 56,28
               C 49,18 40,8 30,-2
               C 22,-12 16,-22 13,-32
               C 12,-40 13,-48 15,-55 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
            opacity="0.95"
          />
          
          {/* Vena lateral der 2 */}
          <path d="M 15,-52 Q 45,-15 71,48" stroke="#558B2F" strokeWidth="1.3" opacity="0.5" fill="none"/>
          
          {/* Serrado lateral der 2 */}
          <path d="M 40,-30 L 43,-27 L 41,-23 L 44,-19 L 42,-15 L 45,-10" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M 55,5 L 58,8 L 56,12 L 59,16 L 57,20" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.6"/>

          {/* HOJA LATERAL IZQUIERDA 3 (intermedia) */}
          <path
            d="M -20,-35
               C -30,-28 -42,-15 -52,2
               C -62,19 -68,38 -70,55
               C -71,65 -69,73 -65,78
               C -64,71 -60,62 -54,51
               C -48,40 -40,28 -31,18
               C -24,10 -19,2 -17,-8
               C -17,-18 -18,-27 -20,-35 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
            opacity="0.92"
          />
          
          {/* Vena lateral izq 3 */}
          <path d="M -20,-32 Q -48,10 -66,75" stroke="#558B2F" strokeWidth="1.1" opacity="0.5" fill="none"/>
          
          {/* Serrado lateral izq 3 */}
          <path d="M -45,0 L -48,3 L -46,7 L -49,11 L -47,15" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M -58,30 L -61,33 L -59,37 L -62,41 L -60,45" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.6"/>

          {/* HOJA LATERAL DERECHA 3 */}
          <path
            d="M 20,-35
               C 30,-28 42,-15 52,2
               C 62,19 68,38 70,55
               C 71,65 69,73 65,78
               C 64,71 60,62 54,51
               C 48,40 40,28 31,18
               C 24,10 19,2 17,-8
               C 17,-18 18,-27 20,-35 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
            opacity="0.92"
          />
          
          {/* Vena lateral der 3 */}
          <path d="M 20,-32 Q 48,10 66,75" stroke="#558B2F" strokeWidth="1.1" opacity="0.5" fill="none"/>
          
          {/* Serrado lateral der 3 */}
          <path d="M 45,0 L 48,3 L 46,7 L 49,11 L 47,15" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M 58,30 L 61,33 L 59,37 L 62,41 L 60,45" 
                stroke="#33691E" strokeWidth="0.5" fill="none" opacity="0.6"/>

          {/* HOJA LATERAL IZQUIERDA 4 (más pequeña inferior) */}
          <path
            d="M -22,-10
               C -30,-3 -40,12 -48,30
               C -56,48 -60,67 -60,82
               C -60,90 -58,96 -55,100
               C -54,93 -51,84 -46,73
               C -41,62 -35,50 -28,40
               C -23,32 -20,24 -19,15
               C -19,8 -20,0 -22,-10 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
            opacity="0.88"
          />
          
          {/* Vena lateral izq 4 */}
          <path d="M -22,-8 Q -45,30 -56,98" stroke="#558B2F" strokeWidth="1" opacity="0.5" fill="none"/>
          
          {/* Serrado lateral izq 4 */}
          <path d="M -42,20 L -45,23 L -43,27 L -46,31 L -44,35" 
                stroke="#33691E" strokeWidth="0.4" fill="none" opacity="0.5"/>

          {/* HOJA LATERAL DERECHA 4 */}
          <path
            d="M 22,-10
               C 30,-3 40,12 48,30
               C 56,48 60,67 60,82
               C 60,90 58,96 55,100
               C 54,93 51,84 46,73
               C 41,62 35,50 28,40
               C 23,32 20,24 19,15
               C 19,8 20,0 22,-10 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.5"
            opacity="0.88"
          />
          
          {/* Vena lateral der 4 */}
          <path d="M 22,-8 Q 45,30 56,98" stroke="#558B2F" strokeWidth="1" opacity="0.5" fill="none"/>
          
          {/* Serrado lateral der 4 */}
          <path d="M 42,20 L 45,23 L 43,27 L 46,31 L 44,35" 
                stroke="#33691E" strokeWidth="0.4" fill="none" opacity="0.5"/>

          {/* TALLO */}
          <path
            d="M -2,55
               C -2.5,65 -3,80 -3,100
               C -2,100 -1,100 0,100
               C 1,100 2,100 3,100
               C 3,80 2.5,65 2,55 Z"
            fill="url(#greenGradient)"
            stroke="#33691E"
            strokeWidth="0.8"
          />
          
          {/* Línea central del tallo */}
          <line x1="0" y1="55" x2="0" y2="100" stroke="#33691E" strokeWidth="1" opacity="0.5"/>
        </g>

        {/* Efecto de brillo animado */}
        {animated && (
          <motion.ellipse
            cx="120"
            cy="120"
            rx="70"
            ry="85"
            fill="url(#leafHighlight)"
            opacity="0.15"
            animate={{
              opacity: [0.1, 0.25, 0.1],
              scale: [1, 1.03, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </svg>
    </Wrapper>
  );
}
