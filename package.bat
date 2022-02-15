@echo off
del /f "D:\Work\project\kitty\IDE\package\resources\app.asar"
@REM cd renderer
@REM npm run build
@REM cp renderer "D:\Work\project\kitty\IDE\main\renderer"
@REM cd ..

powershell -ExecutionPolicy Bypass -File "C:\Users\Takiuddin Ahmed\AppData\Roaming\npm\asar.ps1" pack main "D:\Work\project\kitty\IDE\package\resources\app.asar"