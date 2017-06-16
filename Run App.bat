set workingDirectory=%~dp0

@ECHO *** Running Node Server ***
START CALL "LaunchServer.bat"

@ECHO *** Running Form Designer ***
START CALL "Launch Form Designer.bat"

EXIT