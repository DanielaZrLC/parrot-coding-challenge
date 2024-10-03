# ![Parrot Logo](./public/parrot_software_cover.jpeg) Parrot Challenge

## Table of Contents
1. [Style Guidelines](#style-guidelines)
2. [Dependencies](#dependencies)
3. [Git Workflow](#git-workflow)
4. [GitHub Actions (CI/CD)](#github-actions-cicd)
5. [Commit Message Conventions](#commit-message-conventions)
6. [Pre-commit and Commit-msg Hooks (Husky)](#pre-commit-and-commit-msg-hooks-husky)
7. [Node Version](#node-version)


<hr style="border: 2px solid #EF4C4D;" />

## 💅 Style Guidelines
You can check the guideline styles and some mockups in this Miro app board: 
[https://miro.com/app/board/uXjVN9sbtHQ=/](https://miro.com/app/board/uXjVN9sbtHQ=/)

<hr style="border: 2px solid #EF4C4D;" />

## 🚀  Dependencies
To install the project dependencies, run:
```bash
npm install
```
This will install all necessary packages, including:
- 🧪 Jest for testing
- 🔧 Husky for Git hooks
- 📝 Commitlint for ensuring standardized commit messages


## 💻 Git Workflow
This project follows a branch-based workflow. This are the guidelines to contribute:

- <p style="color: #F7F6FC"> Feature Development: </p> Create a new branch for each feature or fix:
    
```bash
git checkout -b feature/my-feature
```
Push changes to the new branch and open a pull request to merge into the main branch.


- <p style="color: #F7F6FC"> Pull Requests:</p> 
  -All changes should be made via pull requests targeting the main branch. <br/>
  -The project uses GitHub Actions to automatically run tests and build the project on each pull request.

<hr style="border: 2px solid #EF4C4D;" />

## 📦 GitHub Actions (CI/CD)
A GitHub Actions workflow is set up to automatically build and test the project on every pull request to the main branch. The workflow performs the following steps:
1. Install dependencies.
2. Run tests (npm run test).
3. Build the project (npm run build).
4. Verify the build has succeeded.

This ensures that only tested and buildable code gets merged into the main branch.


## 📝 Commit Message Conventions
This project uses Commitizen and Commitlint to enforce standardized commit messages. This ensures that all commits follow the Conventional Commits format.
-To commit changes, use the following command to trigger the Commitizen prompt:

```bash
git commit -m ""
```
-You will be prompted to select the type of change (e.g., feat, fix, etc.) and enter a commit message. This standardizes commit messages and helps with generating changelogs.

<hr style="border: 2px solid #EF4C4D;" />

## 🛡️ Pre-commit and Commit-msg Hooks (Husky)
The project uses Husky to enforce certain checks before committing:

- Pre-commit: Lints the staged files using lint-staged before committing to ensure code quality.
- Commit-msg: Ensures that commit messages follow the conventional format via Commitlint.



## 🛠️ Node Version 

This project uses a specific version of Node.js, defined in the .nvmrc file. To ensure you're using the correct Node.js version:

- Install nvm (Node Version Manager) if you don’t have it installed. You can find installation instructions [here](https://github.com/nvm-sh/nvm#installing-and-updating)
- Once nvm is installed, run the following command to switch to the correct Node.js version:

```bash
nvm use
```

## To run the project use:

```bash
npm run dev
```

<hr style="border: 2px solid #EF4C4D;" />
