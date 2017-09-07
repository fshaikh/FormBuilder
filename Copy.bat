set workingDirectory=%~dp0


@ECHO *** Copy Form Designer Build to Public Folder ***

@ECHO *** Delete Existing files ***
DEL %~dp0\Code\Server\FormBuilder.Server\public\formDesigner\*.* /f /q

XCOPY %workingDirectory%\build\FormDesigner %~dp0\Code\Server\FormBuilder.Server\public\formDesigner /S /R /I /Y

