---
layout: post
title: "Complete Jekyll Website Creation Tutorial: Building a Blog with Minimal Mistakes Theme on GitHub Pages"
date: 2021-12-29 15:45:03 +0800
description: "Learn to build a personal blog from scratch using Jekyll and the Minimal Mistakes theme. Detailed analysis of GitHub Pages deployment, theme customization, website configuration, and content management workflow. Includes Ruby environment setup, Markdown writing, and SEO optimization."
tags:
  [Jekyll Tutorial, Minimal Mistakes Theme, GitHub Pages, Static Site Generator, Blog Setup, Ruby Development, Markdown Writing, Website Deployment]
categories: [Blog]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## Why Write a Blog?

In my work, I frequently gain inspiration and help from technical websites and blog articles. These quality content pieces not only solve my problems but also teach me new technologies.

To record the knowledge I've learned and for future review, I decided to start writing a technical blog. At the same time, I hope to help other developers by sharing my experiences.

---

## Why Choose Jekyll + Minimal Mistakes?

Among the many blog setup options, Jekyll paired with the Minimal Mistakes theme is an excellent combination. Let's look at their respective advantages.

---

### Jekyll's Advantages:

1. **Simple and Easy**: Supports Markdown writing, automatically converts to HTML static pages
2. **Community Support**: Active community, rich themes, easy to find solutions when encountering problems
3. **Highly Flexible**: Highly customizable, meets various customization needs

---

### Minimal Mistakes Features:

1. **Widely Popular**: Over 9k GitHub stars, many users, representing reliable quality
2. **Modern Design**: Supports Dark Mode, aligns with current design trends
3. **Quality Experience**: Image zoom functionality, reading experience similar to Medium platform

> **Personal Experience Sharing**  
> I originally used Octopress, but due to discontinued maintenance and fewer themes, I ultimately chose Jekyll to rebuild my blog 👉 [Octopress](http://octopress.org/)

Now, let's build our own blog step by step!

---

## Why Use GitHub Pages?

GitHub Pages is an excellent choice for hosting static websites, with the following main advantages:

**Completely Free**: No fees required, no need to manage servers or SSL certificates yourself. Just push your code to GitHub, and GitHub Pages will automatically build and deploy your website.

**Good Scalability**: If you want to use your own domain name in the future, you can easily bind custom domains and SSL certificates.

---

## Prerequisites

Before starting to build your blog, we need to prepare the development environment. This section will guide you through installing all necessary tools and software step by step.

---

### Register GitHub Account

First, you need a GitHub account to host your blog code.

👉 [Go to Register](https://github.com)

If you already have a GitHub account, you can skip this step.

---

### Install Git for Version Control

Git is an essential version control tool used to manage your code changes.

```bash
brew install git
git --version
```

Run `git --version` to confirm successful installation, which should display Git's version number.

---

### Install rbenv (Ruby Version Management Tool)

rbenv helps you manage different versions of Ruby, avoiding version conflicts.

```bash
brew install rbenv
rbenv init

# If using Zsh, add to ~/.zshrc
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc

rbenv -v
```

After installation, reload terminal settings or restart the terminal.

---

### Install Ruby

Jekyll requires a Ruby environment to run. We use rbenv to install a specific version of Ruby.

```bash
rbenv install 3.0.0
rbenv global 3.0.0
rbenv rehash
```

This step may take several minutes, please wait patiently for compilation to complete.

---

### Check if RubyGems is Working Properly

RubyGems is Ruby's package management system, ensure it's working properly.

```bash
gem update --system
gem -v
```

If it displays a version number, RubyGems is ready.

---

### Confirm GCC / Make Installation Status

These compilation tools are necessary when installing certain Ruby gems.

```bash
gcc -v
g++ -v
make -v
```

Each command should display corresponding version information.

> ##### Important Reminder
>
> If any of the above environment components are missing, it may cause errors during Jekyll installation. It's recommended to ensure all tools are correctly installed before proceeding to the next step.
> {: .block-warning }

---

## Create Jekyll Blog Website

Now that the environment is prepared, we can start creating the Jekyll website. This section will follow GitHub's officially recommended approach to build the website.

Reference official tutorial: [Creating a GitHub Pages site with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

---

### Switch to Your Development Folder

First, move to the directory where you want to store your project.

```bash
cd PARENT-FOLDER
```

Please replace `PARENT-FOLDER` with your actual project directory path.

---

### Initialize Git Project

Create a new Git project folder and enter that directory.

```bash
git init blog
cd blog
```

This will create a folder named `blog`, you can also change it to another name you prefer.

---

### Create gh-pages Branch (as GitHub Pages Source)

GitHub Pages can automatically deploy websites from the `gh-pages` branch.

```bash
git checkout --orphan gh-pages
```

This command will create a completely new branch with no history records.

---

### Create Jekyll Website (Skip Initial Bundle)

Use Jekyll command to create basic website structure.

```bash
jekyll new --skip-bundle .
```

The `--skip-bundle` parameter lets us install gem packages later, avoiding version conflicts.

---

### Modify Gemfile, Add GitHub Pages Gem

Edit the `Gemfile` file, comment out the original jekyll gem, and use github-pages instead.

```ruby
# gem "jekyll"
gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins
```

> ⚠️ **Version Number Update**  
> Please replace `GITHUB-PAGES-VERSION` with the latest version number listed [here](https://pages.github.com/versions/)

---

### Install All Gem Packages

Execute bundle install to install all dependent packages.

```bash
bundle install
```

This step will download and install Jekyll and related gem packages.

---

### Modify `_config.yml`

Edit Jekyll's main configuration file, add your website information.

```yaml
domain: my-site.github.io
url: https://my-site.github.io
baseurl: /blog/
```

Please replace `my-site` with your GitHub username, and `blog` with your project name.

---

### Add webrick Gem (Avoid Serve Errors)

In newer versions of Ruby, webrick is no longer a default package and needs to be added manually.

```bash
bundle add webrick
```

This step can avoid errors when running `jekyll serve`.

---

### Avoid favicon.ico Error Messages

Create an empty favicon.ico file to avoid error messages when browsers can't find the icon.

```bash
touch favicon.ico
```

This is a small detail, but makes the website more complete.

---

## Test Jekyll Website Locally

After completing basic setup, let's test whether the website works properly in the local environment. This is an important step to confirm everything works before uploading to GitHub.

First, ensure all packages are installed, then start the local server:

```bash
bundle install
bundle exec jekyll serve
```

Jekyll will compile your website and start a local server. The terminal will display information similar to the following:

```bash
Server address: http://127.0.0.1:4000/
```

Open this URL in your browser to see your website! If everything is normal, you'll see Jekyll's default homepage.

{% include figure.liquid path="assets/img/jekyll_local_test.png" title="Local Jekyll Website Test" %}

---

## Upload to GitHub, Let GitHub Pages Automatically Build Blog

After successful local testing, we now need to deploy the website to GitHub Pages. This process includes three main steps: creating a GitHub repository, linking the local project, and setting up GitHub Pages.

---

### 1️⃣ Create a GitHub Repository

Log into your GitHub account and create a new repository.

**Repository Setup Recommendations:**

- Choose **Public**, so you can use the free GitHub Pages service
- Repository name can be freely chosen, for example: `blog` or `my-website`
- No need to initialize README, .gitignore, or license (since we already have a local project)

{% include figure.liquid path="assets/img/create_a_new_repo_on_github.png" title="Create New Repo on GitHub" %}

---

### 2️⃣ Link Local Project with GitHub Repo

After creating the repository, we need to push the local code to GitHub.

```bash
git add .
git commit -m "[feature] Initial GitHub Pages site with Jekyll"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin gh-pages
```

Remember to replace `USERNAME` with your GitHub username and `REPOSITORY` with the repository name you just created.

> **Important Reminder**  
> Make sure you're pushing to the `gh-pages` branch, as we'll later set GitHub Pages to deploy the website from this branch.

---

### 3️⃣ Open URL to Preview Website

After successfully pushing the code, you need to enable the Pages feature on GitHub.

**Setup Steps:**

1. Return to the GitHub project page
2. Click the **Settings** option at the top
3. Find and click **Pages** in the left menu
4. In the Source settings, select the `gh-pages` branch
5. After saving settings, GitHub will display your website URL

The default website URL format will be:

```
https://USERNAME.github.io/REPOSITORY/
```

{% include figure.liquid path="assets/img/jekyll_github_pages.png" title="Successfully Deploy Jekyll Website to GitHub Pages" %}

The GitHub Pages build process may take several minutes. After building is complete, you can access your website through the above URL!

🎉 Congratulations, your website is officially online!

---

## Beautify Blog: Install Minimal Mistakes Theme

So far, we've successfully created a basic Jekyll website. But the default styling is quite plain, so now let's install the Minimal Mistakes theme to beautify the website.

Minimal Mistakes is a modern-designed, powerful Jekyll theme. We'll use the "Remote Theme" method for installation, which is simpler and convenient for future theme updates.

📚 Official Documentation: [Minimal Mistakes Quick-Start Guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

---

### 1️⃣ Edit `Gemfile`

First, we need to modify the `Gemfile` to add necessary gem packages.

```bash
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
```

`jekyll-include-cache` is a package required by the Minimal Mistakes theme that can improve website performance.

---

### 2️⃣ Edit `_config.yml`

Next, modify Jekyll's configuration file to enable the Minimal Mistakes theme.

```yaml
remote_theme: "mmistakes/minimal-mistakes@4.24.0"

plugins:
  - jekyll-include-cache
```

Add the above settings to `_config.yml`. Remember the following important points:

> **Important Reminder**
>
> - Remove other `theme:` or `remote_theme:` settings to avoid conflicts
> - Keep your previously set `domain`, `url`, `baseurl` and other basic settings

---

### 3️⃣ Fetch and Install All Gems

Execute bundle install to install newly added packages.

```bash
bundle install
```

This step will download the Minimal Mistakes theme and related dependency packages.

---

### 4️⃣ Adjust Necessary File Structure

To make the theme work properly, we need to adjust some files:

**Adjust Homepage:**

- Replace `index.md` with a template provided by Minimal Mistakes, or create a new homepage according to theme documentation

**Modify Article Format:**

- Edit `_posts/0000-00-00-welcome-to-jekyll.md` (date may differ)
- Ensure article frontmatter includes correct layout:
  ```yaml
  layout: post
  ```

**Clean Up Unnecessary Files:**

- Delete `about.md` (if you don't plan to use the default about page)

---

### 🔁 Start Website Again, Check Effects!

Now let's test whether the theme was successfully installed.

```bash
bundle exec jekyll serve
```

If everything goes well, you'll see that the website has applied Minimal Mistakes' modern design. The theme includes responsive design, dark mode support, and many practical features.

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_local_test.png" title="Minimal Mistakes Theme Successfully Applied" %}

---

### ✅ Finally Upload to GitHub Again

After successful local testing, push the changes to GitHub so the online website also applies the new theme.

```bash
git add .
git commit -m "[feature] Add Minimal Mistakes theme to Jekyll"
git push origin gh-pages
```

Wait for GitHub Pages to rebuild (usually takes several minutes), then refresh your website page.

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_github_pages.png" title="New Look After Deployment!" %}

---

## Complete!

🎉🎉🎉 Congratulations! You've successfully set up a modern technical blog using Jekyll + Minimal Mistakes on GitHub Pages!

**Features you now have:**

- Responsive design with good experience on both mobile and desktop
- Dark mode toggle support
- Image zoom functionality
- Complete SEO optimization
- Article categorization and tagging system
- Comment functionality (optional)

**Next Step Recommendations:**

- Start writing your first technical article
- Customize theme settings according to your needs
- Add Google Analytics to track website traffic
- Set up custom domain name

> **Need Help?**  
> If you have different implementation methods, encounter technical issues, or want to further customize the theme, feel free to leave comments or email me. Let's grow and exchange ideas together! 🙂
