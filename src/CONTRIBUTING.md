# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a GANJAH TEAM! 

## 📝 Cómo Contribuir

### 1. Fork el Proyecto

Haz clic en el botón "Fork" en la parte superior derecha de la página del repositorio.

### 2. Clona tu Fork

```bash
git clone https://github.com/tu-usuario/ganjah-team.git
cd ganjah-team
```

### 3. Crea una Rama

```bash
git checkout -b feature/nueva-funcionalidad
```

### 4. Realiza tus Cambios

- Asegúrate de seguir las convenciones de código del proyecto
- Escribe código limpio y bien documentado
- Agrega comentarios cuando sea necesario

### 5. Commit y Push

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 6. Crea un Pull Request

Ve a tu fork en GitHub y haz clic en "New Pull Request".

---

## 🎨 Convenciones de Código

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan funcionalidad)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

Ejemplos:
```
feat: agregar filtro de búsqueda en jugadores
fix: corregir cálculo de equipos en sorteo
docs: actualizar README con nuevas instrucciones
```

### Estructura de Componentes

```tsx
import React from 'react';
import { ComponentProps } from './types';

/**
 * Descripción del componente
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks primero
  const [state, setState] = useState();
  
  // Funciones después
  const handleClick = () => {
    // ...
  };
  
  // Return al final
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Estilos Tailwind

- NO uses clases de font-size, font-weight o line-height a menos que sea necesario
- Usa las clases definidas en `styles/globals.css`
- Prefiere componentes de `components/ui` cuando sea posible

---

## 🧪 Testing

Antes de hacer commit:

1. Verifica que la aplicación compile sin errores
2. Prueba la funcionalidad en móvil y desktop
3. Asegúrate de no romper funcionalidades existentes

---

## 📚 Áreas de Contribución

### Bugs y Mejoras
- Reporta bugs en Issues
- Incluye pasos para reproducir
- Agrega capturas de pantalla si es posible

### Nuevas Funcionalidades
- Abre un Issue para discutir la idea primero
- Espera feedback antes de implementar
- Asegúrate de que se alinee con el propósito del proyecto

### Documentación
- Mejora el README
- Agrega ejemplos de uso
- Traduce a otros idiomas

### UI/UX
- Mejoras de diseño
- Nuevos temas visuales
- Animaciones

---

## ❓ ¿Preguntas?

Si tienes dudas, abre un Issue con la etiqueta `question`.

---

¡Gracias por contribuir a GANJAH TEAM! ⚽🌿
