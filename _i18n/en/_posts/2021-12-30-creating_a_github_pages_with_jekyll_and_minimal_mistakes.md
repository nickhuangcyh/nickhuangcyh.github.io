---
layout: post
title: "Complete Guide: Build a Professional Blog with Jekyll + Minimal Mistakes on GitHub Pages"
date: 2021-12-29 15:45:03 +0800
description: "Step-by-step tutorial to create a modern, SEO-friendly blog using Jekyll and Minimal Mistakes theme on GitHub Pages. Learn Ruby setup, theme customization, and deployment best practices for developers."
tags: [Jekyll, GitHub Pages, Minimal Mistakes, Ruby, Static Site Generator, Blog Setup, Web Development, SEO]
categories: [Web Development, Tutorial]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## Why Start a Technical Blog?

In my professional work, I frequently gain inspiration and help from technical websites and blog articles. These resources have solved countless problems for me over the years.

To document my learning, review knowledge, and help others, I decided to create my own technical blog.

### Benefits of Technical Blogging

A well-maintained blog offers several benefits:

- **Knowledge Documentation**: Preserve your learning journey and insights
- **Community Building**: Share insights with fellow developers worldwide
- **Career Growth**: Establish thought leadership in your field
- **Skill Development**: Improve writing and communication skills
- **Learning Reinforcement**: Teaching others helps solidify your own understanding

---

## Why Choose Jekyll + Minimal Mistakes?

### Why Jekyll?

Jekyll is a static site generator that offers several key advantages:

1. **Markdown Support**: Write content in Markdown, automatically converted to HTML
2. **Active Community**: Large ecosystem with extensive documentation and support
3. **Highly Customizable**: Complete control over design and functionality
4. **Performance**: Fast loading times and excellent SEO out of the box
5. **Developer-Friendly**: Git integration means version control for your entire website

### Why Minimal Mistakes Theme?

Minimal Mistakes is one of the most popular Jekyll themes for good reason:

1. **Proven Track Record**: 9k+ GitHub Stars and widely adopted
2. **Modern Features**: Dark mode support and responsive design
3. **User Experience**: Medium-like image viewing experience
4. **SEO Ready**: Built-in SEO features and structured data
5. **Well-Maintained**: Regular updates and active community support

> I previously used Octopress, but since it's no longer maintained and has limited themes, I chose Jekyll to rebuild my blog 👉 [Octopress](http://octopress.org/)

Now, let's build your professional blog step by step!

---

## Why Use GitHub Pages?

GitHub Pages is the perfect hosting solution for Jekyll sites. It's completely **free** and integrates seamlessly with your development workflow.

### What Makes GitHub Pages Special?

Unlike traditional web hosting, GitHub Pages requires no server management or SSL certificates. It automatically builds and deploys your site with just one push to your repository.

**Key Benefits:**

- **Zero Cost**: Completely free hosting with generous bandwidth
- **Automatic Deployment**: Push to trigger builds - no manual deployment needed
- **Security Built-in**: HTTPS by default for all sites
- **Custom Domains**: Easy setup for your own domain name
- **Developer-Friendly**: Full Git integration and version control
- **Reliable**: Backed by GitHub's infrastructure

---

## Prerequisites

Before we start building your Jekyll blog, let's make sure you have all the necessary tools installed.

### 1. Register a GitHub Account

If you don't already have one, create a free GitHub account:
👉 [Register here](https://github.com)

### 2. Install Git for Version Control

Git is essential for managing your blog's source code and deploying to GitHub Pages.

```bash
# macOS
brew install git
git --version

# Ubuntu/Debian
sudo apt-get install git

# Windows
# Download from https://git-scm.com/
```

### Install rbenv (Ruby Version Manager)

```bash
# macOS
brew install rbenv
rbenv init

# Add to shell configuration
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc

# Verify installation
rbenv -v
```

### Install Ruby

```bash
# Install Ruby 3.0.0 (or latest stable version)
rbenv install 3.0.0
rbenv global 3.0.0
rbenv rehash

# Verify installation
ruby -v
```

### Check RubyGems

```bash
gem update --system
gem -v
```

### Verify GCC/Make Installation

```bash
gcc -v
g++ -v
make -v
```

> ##### WARNING
>
> Missing any of the above environment components may cause errors during Jekyll installation.
> {: .block-warning }

---

## Create Your Jekyll Blog

Reference official tutorial: [Creating a GitHub Pages site with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

### Navigate to Your Development Folder

```bash
cd PARENT-FOLDER
```

### Initialize Git Repository

```bash
git init blog
cd blog
```

### Create gh-pages Branch

```bash
git checkout --orphan gh-pages
```

### Create Jekyll Site (Skip Initial Bundle)

```bash
jekyll new --skip-bundle .
```

### Modify Gemfile for GitHub Pages

```ruby
# gem "jekyll"
gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins
```

> ⚠️ Replace `GITHUB-PAGES-VERSION` with the version listed [here](https://pages.github.com/versions/)

### Install All Gems

```bash
bundle install
```

### Configure `_config.yml`

```yaml
domain: my-site.github.io
url: https://my-site.github.io
baseurl: /blog/
```

### Add webrick Gem (Avoid Serve Errors)

```bash
bundle add webrick
```

### Create favicon.ico

```bash
touch favicon.ico
```

---

## Test Jekyll Site Locally

After initialization, you can preview your site using Jekyll's built-in server.

```bash
bundle install
bundle exec jekyll serve
```

The terminal will display:

```bash
Server address: http://127.0.0.1:4000/
```

Open this URL to see your website!

{% include figure.liquid path="assets/img/jekyll_local_test.png" title="Local Jekyll Site Testing" %}

---

## Deploy to GitHub Pages

Next, we'll deploy the site to GitHub.

### 1️⃣ Create a GitHub Repository

- Recommended: Use public repository
- Name it freely, e.g., `blog`

{% include figure.liquid path="assets/img/create_a_new_repo_on_github.png" title="Create New Repository on GitHub" %}

### 2️⃣ Link Local Project to GitHub Repository

```bash
git add .
git commit -m "[feature] Initial GitHub Pages site with Jekyll"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin gh-pages
```

> Note: If you choose `gh-pages` as the deployment source, ensure GitHub Pages settings select the `gh-pages` branch

### 3️⃣ Access Your Live Site

Return to your GitHub repository page and click:

```
Settings ➝ Pages ➝ Site URL
```

Default URL will be:

```
https://USERNAME.github.io/REPOSITORY/
```

{% include figure.liquid path="assets/img/jekyll_github_pages.png" title="Successfully Deployed Jekyll Site to GitHub Pages" %}

🎉 Congratulations! Your site is now live!

---

## Beautify Your Blog: Install Minimal Mistakes Theme

Minimal Mistakes is a modern, feature-rich Jekyll theme. We'll install it using the "Remote Theme" method.

📚 Official Documentation: [Minimal Mistakes Quick-Start Guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

### 1️⃣ Edit `Gemfile`

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
```

### 2️⃣ Edit `_config.yml`

```yaml
remote_theme: "mmistakes/minimal-mistakes@4.24.0"

plugins:
  - jekyll-include-cache
```

> ❗ Remove other `theme:` or `remote_theme:` settings to avoid conflicts  
> 🧩 Keep your previous `domain`, `url`, `baseurl` settings

### 3️⃣ Install All Gems

```bash
bundle install
```

### 4️⃣ Adjust File Structure

- Replace `index.md` with Minimal Mistakes template (or create new pages)
- Modify `_posts/0000-00-00-welcome-to-jekyll.md`:
  ```yaml
  layout: post
  ```
- Delete `about.md` (if you don't plan to use it)

### 🔁 Restart Site and Check Results!

```bash
bundle exec jekyll serve
```

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_local_test.png" title="Minimal Mistakes Theme Successfully Applied" %}

### ✅ Final GitHub Upload

```bash
git add .
git commit -m "[feature] Add Minimal Mistakes theme to Jekyll"
git push origin gh-pages
```

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_github_pages.png" title="New Appearance After Deployment!" %}

🎉🎉🎉 Done! You've successfully created a modern technical blog using Jekyll + Minimal Mistakes on GitHub Pages!

---

## Advanced Customization Tips

### SEO Optimization

```yaml
# _config.yml
title: "Your Blog Title"
description: "Your blog description for search engines"
author:
  name: "Your Name"
  avatar: "/assets/images/bio-photo.jpg"
  bio: "Your bio"
  location: "Your Location"
  links:
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: "https://github.com/yourusername"
```

### Custom Domain Setup

1. Purchase domain from provider (Namecheap, GoDaddy, etc.)
2. Add CNAME record pointing to `username.github.io`
3. Create `CNAME` file in repository root with your domain
4. Enable custom domain in GitHub Pages settings

### Performance Optimization

- **Image Optimization**: Use WebP format and lazy loading
- **Minification**: Enable CSS/JS minification
- **CDN**: Use GitHub Pages CDN for global distribution
- **Caching**: Implement proper cache headers

---

## Troubleshooting Common Issues

### Bundle Install Errors

```bash
# Clear gem cache
gem cleanup
bundle clean --force

# Reinstall gems
bundle install
```

### Jekyll Serve Issues

```bash
# Check Ruby version compatibility
ruby -v
gem list jekyll

# Update Jekyll
gem update jekyll
```

### GitHub Pages Build Failures

- Check GitHub Pages build logs
- Ensure all gems are in `Gemfile`
- Verify `_config.yml` syntax
- Check for unsupported plugins

---

## Best Practices for Blog Maintenance

### Content Strategy

- **Regular Updates**: Post consistently (weekly/monthly)
- **Quality Content**: Focus on value, not quantity
- **SEO Optimization**: Use proper headings, meta descriptions
- **Internal Linking**: Link between related posts

### Technical Maintenance

- **Regular Updates**: Keep Jekyll and gems updated
- **Backup Strategy**: Use Git for version control
- **Performance Monitoring**: Check site speed regularly
- **Security**: Keep dependencies updated

---

## Related Resources

- [Jekyll Official Documentation](https://jekyllrb.com/docs/)
- [Minimal Mistakes Theme](https://mmistakes.github.io/minimal-mistakes/)
- [GitHub Pages Documentation](https://pages.github.com/)
- [Ruby Installation Guide](https://www.ruby-lang.org/en/documentation/installation/)
- [Markdown Guide](https://www.markdownguide.org/)

> If you have different methods, questions, or want to further customize your theme, feel free to leave a comment or email me. Let's grow and learn together! 🙂
