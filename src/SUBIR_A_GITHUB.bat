@echo off
REM ============================================
REM Script para subir GANJAH TEAM a GitHub (Windows)
REM Repositorio: https://github.com/ventemiguel00-code/ganjah-team
REM ============================================

echo.
echo ============================================
echo   GANJAH TEAM - Configuracion de GitHub
echo ============================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist "package.json" (
    echo ERROR: No se encuentra package.json
    echo Asegurate de estar en el directorio raiz del proyecto
    pause
    exit /b 1
)

echo [OK] Directorio verificado
echo.

REM Configurar Git
echo Configurando Git...
git config user.name "ventemiguel00-code"
git config user.email "ventemiguel00@gmail.com"

REM Inicializar repositorio si no existe
if not exist ".git" (
    echo Inicializando repositorio Git...
    git init
    echo [OK] Repositorio inicializado
) else (
    echo [OK] Repositorio Git ya existe
)

REM Verificar .gitignore
if exist ".env" (
    echo.
    echo ADVERTENCIA: Se detecto archivo .env
    echo Verificando que este en .gitignore...
    findstr /C:".env" .gitignore >nul 2>&1
    if errorlevel 1 (
        echo PELIGRO: .env NO esta en .gitignore
        echo Agregando .env a .gitignore...
        echo .env >> .gitignore
        echo [OK] .env agregado a .gitignore
    ) else (
        echo [OK] .env esta protegido en .gitignore
    )
)

echo.
echo Agregando archivos al repositorio...
git add .

echo.
echo Creando commit inicial...
git commit -m "Initial commit: GANJAH TEAM v1.0 - Aplicacion de gestion deportiva completa"

echo.
echo Configurando rama principal como 'main'...
git branch -M main

echo.
echo Conectando con GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/ventemiguel00-code/ganjah-team.git

echo.
echo Subiendo codigo a GitHub...
echo Repositorio: https://github.com/ventemiguel00-code/ganjah-team
echo.

git push -u origin main --force

echo.
echo ============================================
echo   COMPLETADO!
echo ============================================
echo.
echo Tu proyecto GANJAH TEAM esta en GitHub
echo.
echo Ver repositorio:
echo https://github.com/ventemiguel00-code/ganjah-team
echo.
echo Proximos pasos:
echo 1. Ve a tu repositorio en GitHub
echo 2. Verifica que todos los archivos esten ahi
echo 3. Despliega en Vercel (ver DEPLOYMENT.md)
echo.
pause
