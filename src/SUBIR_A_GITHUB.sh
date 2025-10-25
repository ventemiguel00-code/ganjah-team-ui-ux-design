#!/bin/bash

# ============================================
# Script para subir GANJAH TEAM a GitHub
# Repositorio: https://github.com/ventemiguel00-code/ganjah-team
# ============================================

echo "🚀 GANJAH TEAM - Configuración de GitHub"
echo "=========================================="
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encuentra package.json"
    echo "   Asegúrate de estar en el directorio raíz del proyecto"
    exit 1
fi

echo "✅ Directorio verificado"
echo ""

# Configurar Git (si no está configurado)
echo "📝 Configurando Git..."
git config user.name "ventemiguel00-code" 2>/dev/null || true
git config user.email "ventemiguel00@gmail.com" 2>/dev/null || true

# Inicializar repositorio si no existe
if [ ! -d ".git" ]; then
    echo "🔧 Inicializando repositorio Git..."
    git init
    echo "✅ Repositorio inicializado"
else
    echo "✅ Repositorio Git ya existe"
fi

# Verificar que .env no se suba
if [ -f ".env" ]; then
    echo ""
    echo "⚠️  ADVERTENCIA: Se detectó archivo .env"
    echo "   Verificando que esté en .gitignore..."
    
    if grep -q "^\.env$" .gitignore 2>/dev/null; then
        echo "✅ .env está protegido en .gitignore"
    else
        echo "❌ ¡PELIGRO! .env NO está en .gitignore"
        echo "   Agregando .env a .gitignore..."
        echo ".env" >> .gitignore
        echo "✅ .env agregado a .gitignore"
    fi
fi

echo ""
echo "📦 Agregando archivos al repositorio..."
git add .

echo ""
echo "💾 Creando commit inicial..."
git commit -m "Initial commit: GANJAH TEAM v1.0 - Aplicación de gestión deportiva completa" || {
    echo "⚠️  Ya existe un commit o no hay cambios"
}

# Cambiar a rama main
echo ""
echo "🌿 Configurando rama principal como 'main'..."
git branch -M main

# Conectar con GitHub
echo ""
echo "🔗 Conectando con GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/ventemiguel00-code/ganjah-team.git

echo ""
echo "📤 Subiendo código a GitHub..."
echo "   Repositorio: https://github.com/ventemiguel00-code/ganjah-team"
echo ""

git push -u origin main --force

echo ""
echo "=========================================="
echo "✅ ¡COMPLETADO!"
echo "=========================================="
echo ""
echo "🎉 Tu proyecto GANJAH TEAM está en GitHub"
echo ""
echo "🔗 Ver repositorio:"
echo "   https://github.com/ventemiguel00-code/ganjah-team"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Ve a tu repositorio en GitHub"
echo "   2. Verifica que todos los archivos estén ahí"
echo "   3. Despliega en Vercel (ver DEPLOYMENT.md)"
echo ""
echo "⚽🌿 ¡Disfruta GANJAH TEAM!"
echo ""
