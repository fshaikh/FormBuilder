set workingDirectory=%~dp0

@ECHO *** Changing directory to Form Designer ***
cd code/FrontEnd/FormDesigner

@ECHO *** Production Build for Form Designer ***
npm run build && CD %workingDirectory% && START CALL Copy.bat && ECHO Complete

@ECHO *** Build Artifacts copied to ../../../build/FormDesigner

ECHO Complete
