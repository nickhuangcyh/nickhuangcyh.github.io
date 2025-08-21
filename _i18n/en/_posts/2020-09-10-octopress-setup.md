---
layout: post
title: "Complete Octopress Static Blog Tutorial: GitHub Pages Deployment and Theme Customization Guide"
date: 2020-09-10 23:18:16 +0800
description: "Learn to build professional static blogs using the Octopress framework. Detailed analysis of Ruby environment setup, GitHub Pages deployment, theme customization, and content management workflow. Includes Markdown writing, website optimization, and maintenance techniques."
tags: [Octopress Framework, Static Site Generator, GitHub Pages, Blog Development, Ruby Environment, Markdown Writing, Website Deployment, Theme Customization]
categories: [Blog]
toc:
  # beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## Why Did I Start Writing a Blog?

In my work, I frequently benefit from many tutorial websites and technical blogs. Articles on platforms like Jianshu, CSDN, and Medium have helped me solve numerous problems.

To organize my learning insights and give back to the community, I decided to start managing my own technical blog.

Sharing knowledge not only helps others but also allows me to gain deeper understanding of technology.

---

## Why Choose Octopress for Website Building?

There are many free blogging platforms available on the market, such as Medium, Blogger, etc. However, I ultimately chose Octopress for several main reasons:

### Developer-Friendly Features

1. **Version Control Integration**: Can work with Git for version control and deploy to GitHub
2. **Markdown Support**: Write using Markdown, intuitive and easy-to-learn syntax
3. **Technical Learning Opportunity**: Can learn frontend and static website architecture during the setup process
4. **High Freedom**: Open source and free, with high flexibility

### Why These Advantages Matter?

For software developers, Git and GitHub are almost daily tools. Writing articles through Markdown can also improve my proficiency in writing READMEs or technical documentation.

Considering all these factors, I chose Octopress.

---

## Pre-Setup Preparation

---

### Register a [GitHub](https://github.com) Account

---

### Install [Git](https://git-scm.com)

```bash
brew install git
```

---

### Install [Ruby](https://www.ruby-lang.org/zh_tw/documentation/installation/)

```bash
brew install ruby
```

Confirm successful installation:

```bash
ruby --version
```

---

## Octopress Website Building Process

```bash
git clone git://github.com/imathis/octopress.git octopress
cd octopress
```

Next, install related packages:

```bash
gem install bundler
rbenv rehash
bundle install
```

Install default theme:

```bash
rake install
```

---

## What is GitHub Pages?

[GitHub Pages](https://pages.github.com/) is a free static website hosting service provided by GitHub.

### Why Choose GitHub Pages?

- **Completely Free**: No fees required
- **No Maintenance Needed**: No server setup or database support needed
- **Perfect for Personal Websites**: Very suitable for setting up personal blogs or technical pages

### Create GitHub Repository

1. Go to [GitHub](https://github.com/) to register an account
2. Create a new repo, name it `[your-username].github.io`

> Note: This naming format is important and must follow GitHub Pages rules.

After creation, you'll get the repo's SSH address:

    git@github.com:username/username.github.io.git

This URL is the remote location you'll need for future blog deployments.

---

## Deploy to GitHub Pages

---

### Set remote repository location:

```bash
rake setup_github_pages
```

Enter the SSH path you just got:

```bash
git@github.com:username/username.github.io.git
```

---

### Generate and deploy website content:

```bash
rake generate
rake deploy
```

These two commands will generate website files and automatically deploy the content to GitHub Pages.

After completion, you can open your browser and enter `http://username.github.io/` to see your blog!

Don't forget to also sync the source code to the source branch:

```bash
git add .
git commit -m 'init commit'
git push origin source
```

---

## How to Publish Articles?

Now let's learn how to write articles in Octopress.

All Octopress articles are stored in the `source/_posts` folder.

---

### Step 1: Create New Article

```bash
rake new_post["Article Title"]
```

This command will create a new file in `source/_posts/`. The file naming format is `YYYY-MM-DD-post-title.markdown`.

### Step 2: Edit Article Content

You can use Vim or any editor you like to open the file. I recommend using [VSCode](https://code.visualstudio.com/), which has excellent Markdown support.

```bash
cd source/_posts/
vim YYYY-MM-DD-post-title.markdown
```

### Step 3: Deploy Article

After writing the article, you need to generate static files and deploy them to the website.

**Complete commands**:
```bash
rake generate
rake deploy
```

**Simplified command**:
```bash
rake gen_deploy
```

> The `gen_deploy` command executes both generate and deploy simultaneously, making it more convenient.

### Step 4: Backup Source Code

Finally, don't forget to also push the source files to GitHub:

```bash
git add .
git commit -m 'Add new article'
git push origin source
```

> Why is this step needed? Because Octopress puts compiled files in the master branch, but source code needs to be stored independently in the source branch.

<div>
    {% include figure.liquid loading="eager" path="assets/img/octopress_github_pages.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

---

## Summary

The above is the complete process for setting up a GitHub Pages static blog using Octopress.

### Main Steps Review:

1. **Environment Preparation**: Git, Ruby installation
2. **Octopress Installation**: Download and setup
3. **GitHub Pages Setup**: Create repository and deploy
4. **Article Publishing**: Write and deploy articles

In the future, I'll continue researching more advanced settings and theme customization techniques to share with everyone.

> If you have different approaches, encounter problems, or have experiences you'd like to exchange, feel free to leave comments or write to me. Let's learn and exchange ideas together 🙂