@ECHO *** List Branches ***
git branch

@ECHO *** Create branch <branch name> ***
git branch <BRANCH_NAME> <Base_BRANCH>

@ECHO *** Switch to new branch ***
git checkout <BRANCH_NAME>

@ECHO *** Fetching and merging latest changes from Gitub repo ***

@ECHO *** Adding remote origin ***
git remote add origin https://github.com/fshaikh/FormBuilder.git

@ECHO *** Verifying if remote set correctly ***
git remote -v

@ECHO *** Fetching latest changes in local repo from FormBuilder Github repo ***
git pull origin <BRANCH_NAME>