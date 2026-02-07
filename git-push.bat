@echo off
echo ========================================
echo Git Push Script for Small Parcel Project
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing git repository...
    git init
    git remote add origin https://github.com/WYJade/Small-Parcel.git
)

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "feat: Complete Small Parcel UI implementation with Logistics navigation"

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Push completed!
echo ========================================
pause
