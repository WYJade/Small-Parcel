@echo off
echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    exit /b %errorlevel%
)
echo.
echo Frontend dependencies installed successfully!
echo.
echo You can now run the development server with:
echo   cd frontend
echo   npm run dev
pause
