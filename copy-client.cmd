if not exist "FlashStudy.Web\client" mkdir FlashStudy.Web\client
del /f /s /q FlashStudy.Web\client\*.* > NUL
xcopy /q /e client\build\*.* FlashStudy.Web\client
dir FlashStudy.Web\client
