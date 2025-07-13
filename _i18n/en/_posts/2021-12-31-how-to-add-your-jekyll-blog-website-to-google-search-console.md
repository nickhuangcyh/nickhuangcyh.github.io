---
layout: post
title: "SEO Guide: Add Your Jekyll Blog to Google Search Console and Submit Sitemap"
date: 2021-12-31 11:26:00 +0800
description: "Complete step-by-step guide to make your Jekyll blog discoverable on Google. Learn how to verify site ownership with Google Search Console and submit XML sitemaps for better SEO indexing."
tags: [Jekyll, Google Search Console, SEO, Sitemap, XML, Web Development, Blog Optimization, Search Engine]
categories: [SEO, Web Development]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## Can't Find Your Blog on Google?

Have you ever experienced the frustration of building a Jekyll website only to find it completely invisible on Google search results? Don't worry - this doesn't mean your site is broken. It simply means you haven't properly introduced your website to Google's search engine yet.

To make search engines aware of your website's existence, you need to complete two essential steps:

1. **Submit your site to Google Search Console**
2. **Submit your Sitemap (XML site map)**

---

## Why SEO Matters for Your Blog

Search Engine Optimization (SEO) is crucial for any website's success:

- **Increased Visibility**: Help users find your content
- **Organic Traffic**: Drive free, targeted visitors
- **Credibility**: Higher rankings build trust
- **Long-term Growth**: Sustainable traffic source

---

## Step 1: Add Your Site to Google Search Console

Visit 👉 [Google Search Console](https://search.google.com/search-console/welcome?hl=en&utm_source=about-page&pli=1)

Choose the "URL prefix" method and enter your blog URL (recommended to use HTTPS format), then click continue.

{% include figure.liquid path="assets/img/google_search_console.png" title="Add Website to Google Search Console" %}

Google will ask you to download a verification file named `googlexxxxxxxxxx.html`. Place this file in your Jekyll root directory.

```bash
# Move to project root directory
mv ~/Downloads/googlexxxxxxxxxx.html ./googlexxxxxxxxxx.html

# Ensure file is in version control and push
git add googlexxxxxxxxxx.html
git commit -m "[seo] Add Google Search Console verification file"
git push origin main  # or your branch name
```

Return to Search Console and click the "Verify" button.

{% include figure.liquid path="assets/img/google_search_console_verify.png" title="Verify Website Ownership" %}

After successful verification, you'll see this confirmation:

{% include figure.liquid path="assets/img/google_search_console_verified.png" title="Verification Successful!" %}

---

## Step 2: Submit Your Sitemap

A Sitemap is an XML file that tells search engines about all your website content, including each page's URL, last update time, and more. This helps Google crawl and index your blog faster and more comprehensively.

📖 [Google Official Documentation: What is a Sitemap?](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=en)

### What is an XML Sitemap?

An XML sitemap is a structured file that:
- Lists all your website pages
- Provides metadata about each page
- Helps search engines understand your site structure
- Improves crawling efficiency

### 1️⃣ Edit `Gemfile` to Add Sitemap Plugin

```ruby
group :jekyll_plugins do
  gem "jekyll-sitemap"
end
```

### 2️⃣ Add Plugin to `_config.yml`

```yaml
plugins:
  - jekyll-sitemap
```

### 3️⃣ Install Plugin and Rebuild Site

```bash
bundle install
bundle exec jekyll serve
```

You'll now find `sitemap.xml` in your `_site/` folder, indicating successful sitemap generation.

### 4️⃣ Submit Sitemap to Google

Return to Search Console's "Sitemaps" section and enter:

```
sitemap.xml
```

Then click submit.

{% include figure.liquid path="assets/img/google_search_console_sitemap.png" title="Submit Sitemap" %}

---

## Advanced SEO Configuration

### Custom Sitemap Configuration

```yaml
# _config.yml
sitemap:
  exclude: ["/admin/", "/private/"]
  include: ["/important-page/"]
  changefreq: weekly
  priority: 0.8
```

### Robots.txt Setup

Create a `robots.txt` file in your root directory:

```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Meta Tags Optimization

```yaml
# In your post front matter
title: "Your SEO-Optimized Title"
description: "Compelling meta description under 160 characters"
keywords: "relevant, keywords, for, your, content"
```

---

## Monitoring Your SEO Performance

### Google Search Console Features

- **Performance Reports**: Track search queries and clicks
- **Coverage Reports**: Monitor indexed pages
- **Core Web Vitals**: Check page speed metrics
- **Mobile Usability**: Ensure mobile-friendly design

### Key Metrics to Monitor

- **Search Impressions**: How often your site appears in search
- **Click-Through Rate (CTR)**: Percentage of clicks from impressions
- **Average Position**: Your ranking position in search results
- **Indexed Pages**: Number of pages Google has indexed

---

## Common SEO Issues and Solutions

### Site Not Indexed

**Problem**: Your site doesn't appear in search results
**Solutions**:
- Verify Google Search Console setup
- Check robots.txt for blocking directives
- Ensure site is accessible to crawlers
- Submit sitemap manually

### Low Search Rankings

**Problem**: Site appears but ranks poorly
**Solutions**:
- Optimize page titles and meta descriptions
- Improve content quality and relevance
- Build quality backlinks
- Enhance page loading speed

### Duplicate Content Issues

**Problem**: Multiple URLs with similar content
**Solutions**:
- Use canonical tags
- Implement proper redirects
- Consolidate similar content
- Use hreflang for multilingual sites

---

## Best Practices for Jekyll SEO

### Content Optimization

- **Keyword Research**: Use relevant, searchable terms
- **Quality Content**: Provide valuable, comprehensive information
- **Regular Updates**: Keep content fresh and current
- **Internal Linking**: Connect related posts and pages

### Technical SEO

- **Fast Loading**: Optimize images and minimize HTTP requests
- **Mobile Responsive**: Ensure mobile-friendly design
- **Structured Data**: Implement schema markup
- **Clean URLs**: Use descriptive, keyword-rich URLs

### Performance Optimization

```yaml
# _config.yml optimization
compress_html:
  clippings: all
  comments: all
  endings: all
  profile: false
  blanklines: false
  ignore:
    envs: []
```

---

## Troubleshooting SEO Issues

### Verification File Not Working

```bash
# Check if file is accessible
curl https://yourdomain.com/googlexxxxxxxxxx.html

# Ensure proper file permissions
chmod 644 googlexxxxxxxxxx.html
```

### Sitemap Generation Errors

```bash
# Check Jekyll build logs
bundle exec jekyll build --verbose

# Verify plugin installation
bundle list | grep sitemap
```

### Search Console Errors

- Check for DNS propagation delays
- Verify HTTPS certificate validity
- Ensure no redirect chains
- Confirm proper canonical URLs

---

## SEO Tools and Resources

### Free SEO Tools

- **Google Search Console**: Official SEO monitoring
- **Google PageSpeed Insights**: Performance analysis
- **Google Mobile-Friendly Test**: Mobile optimization
- **Schema.org Validator**: Structured data testing

### Paid SEO Tools

- **Ahrefs**: Comprehensive SEO analysis
- **SEMrush**: Keyword research and competitor analysis
- **Moz Pro**: SEO metrics and tracking
- **Screaming Frog**: Technical SEO audit

---

## Related Articles

- [Complete Guide: Build a Professional Blog with Jekyll + Minimal Mistakes on GitHub Pages](/2021-12-30-creating_a_github_pages_with_jekyll_and_minimal_mistakes/)
- [How to Optimize Images for Web Performance](/2024-01-27-advanced-images/)
- [Setting Up Custom Domains for GitHub Pages](/2022-02-01-redirect/)

---

## ✅ Congratulations! You've Completed Basic SEO Setup!

Google will now begin crawling your website content. While it won't appear in search results immediately, with consistent updates and valuable content, your site will gradually be indexed and ranked.

### Next Steps

1. **Monitor Performance**: Check Search Console regularly
2. **Optimize Content**: Focus on quality and relevance
3. **Build Backlinks**: Earn links from reputable sites
4. **Track Progress**: Monitor rankings and traffic

> ##### TIP
>
> If you have different verification methods, want to learn more about SEO settings, or need help with advanced optimization, feel free to leave a comment or email me. Let's work together to improve your blog's visibility! ��
> {: .block-tip }
