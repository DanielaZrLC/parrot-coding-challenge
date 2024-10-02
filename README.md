## Parrot challenge

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Dependencies
To install the project dependencies, run:
```bash
npm install
```
This will install all necessary packages, including Jest for testing, Husky for Git hooks, and Commitlint for ensuring standardized commit messages.



## Git Workflow
This project follows a branch-based workflow. Developers should follow these guidelines when contributing:
  -Feature Development:
    Create a new branch for each feature or fix:
    
```bash
git checkout -b feature/my-feature
```
  -Push changes to the new branch and open a pull request to merge into the main branch.

Pull Requests:
  -All changes should be made via pull requests targeting the main branch.
  -The project uses GitHub Actions to automatically run tests and build the project on each pull request.



## GitHub Actions (CI/CD)
A GitHub Actions workflow is set up to automatically build and test the project on every pull request to the main branch. The workflow performs the following steps:
  -Install dependencies.
  -Run tests (npm run test).
  -Build the project (npm run build).
  -Verify that the build has succeeded.

This ensures that only tested and buildable code gets merged into the main branch.



## Commit Message Conventions
This project uses Commitizen and Commitlint to enforce standardized commit messages. This ensures that all commits follow the Conventional Commits format.
-To commit changes, use the following command to trigger the Commitizen prompt:

```bash
git commit -m ""
```
-You will be prompted to select the type of change (e.g., feat, fix, etc.) and enter a commit message. This standardizes commit messages and helps with generating changelogs.



## Pre-commit and Commit-msg Hooks (Husky)
The project uses Husky to enforce certain checks before committing:

- Pre-commit: Lints the staged files using lint-staged before committing to ensure code quality.
- Commit-msg: Ensures that commit messages follow the conventional format via Commitlint.



## Node Version

This project uses a specific version of Node.js, defined in the .nvmrc file. To ensure you're using the correct Node.js version:

- Install nvm (Node Version Manager) if you don’t have it installed. You can find installation instructions [here](https://github.com/nvm-sh/nvm#installing-and-updating)
- Once nvm is installed, run the following command to switch to the correct Node.js version:

```bash
nvm use
```

To run the project use:

```bash
npm run dev
```


## You can check the guideline styles in this Miro app board: 
[https://miro.com/app/board/uXjVN9sbtHQ=/](https://miro.com/app/board/uXjVN9sbtHQ=/)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
