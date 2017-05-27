@ECHO OFF

set workingDirectory=%~dp0

REM Check if there are any uncommitted changes before pushing to github
REM git status --porcelain

@ECHO *** Pushing changes to Gitub repo ***

@ECHO *** Adding remote origin ***
git remote add origin https://github.com/fshaikh/FormBuilder.git

@ECHO *** Verifying if remote set correctly ***
git remote -v

@ECHO *** Pushing changes in local repo to the FormBuilder Github repo ***
git push -u origin master