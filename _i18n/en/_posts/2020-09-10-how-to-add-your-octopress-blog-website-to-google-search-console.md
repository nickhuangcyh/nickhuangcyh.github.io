---
layout: post
title: "Complete Octopress SEO Tutorial: Google Search Console and Search Engine Indexing Optimization"
date: 2020-09-10 23:29:22 +0800
description: "Learn how to get your Octopress static website indexed and crawled by Google. Detailed analysis of Google Search Console setup, Sitemap submission, website verification, and SEO optimization processes. Includes robots.txt configuration, URL structure, and best practices."
tags: [Octopress SEO, Google Search Console, Search Engine Indexing, Static Site SEO, Website Visibility, Sitemap Optimization, Blog SEO, Search Marketing]
categories: [Blog]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## Can't Find My Blog on Google Search?

After we've set up our Octopress or Jekyll blog, we might encounter a situation where we search for our website name on Google but can't find it anywhere.

Don't worry, this doesn't mean there's something wrong with your website. The problem is that we haven't actively submitted it to Google's search engine yet.

Google doesn't automatically know your new website exists - we need to actively "tell" it.

---

## Add Website to Google Search Console

Google Search Console is a free tool provided by Google. It helps you monitor your website's performance in search results.

### Step 1: Access Search Console

First, open [Google Search Console](https://search.google.com/search-console/welcome?hl=zh-CN&utm_source=about-page&pli=1)

### Step 2: Add Website

Next, choose the "URL prefix" method to add your website. Fill in your blog domain name and press continue.

This method is more intuitive and suitable for personal blogs.

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

### Step 3: Verify Website Ownership

Google will ask you to download an HTML file, like this:

    googlexxxxxxxxxx.html

This file is used to prove that you actually own this website.

### Step 4: Upload Verification File

Put this file into your Octopress project folder:

    octopress/source/

### Step 5: Deploy to GitHub

Then remember to commit and push to GitHub:

```bash
rake gen_deploy
```

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console_verify.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

### Step 6: Complete Verification

After deployment is complete, return to Search Console and click "Verify."

If everything goes well, you'll see a success message 👍

This means Google has confirmed you as the website owner.

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console_verified.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

---

## What's Next?

Completing verification just lets Google recognize your website. This is only the first step, but a very important one.

Next you can:

- **Monitor indexing status**: See which pages have been indexed by Google
- **Analyze search performance**: Understand what keywords users use to find your website  
- **Submit sitemap**: Tell Google your website structure to speed up indexing
- **Fix errors**: Discover and resolve SEO issues

With this step, your website has truly taken its first step on the SEO journey!

> If you have different methods, encounter any problems, or want to exchange more SEO techniques, feel free to leave comments or email me. Let's research and improve together 🙂