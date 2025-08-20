# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal academic website built with the **al-folio** Jekyll theme, specifically Nick Huang's portfolio site. The site uses Jekyll to generate static content and is deployed to GitHub Pages. It includes blog posts, CV, projects, and publications sections with multilingual support (English and Chinese).

## Common Development Commands

### Local Development with Docker (Recommended)
```bash
# Pull and run the latest pre-built image
docker compose pull
docker compose up

# Or use the slim image
docker compose -f docker-compose-slim.yml up

# Build custom image
docker compose up --build
```

### Local Development (Legacy)
```bash
# Install dependencies
bundle install
pip install jupyter

# Serve the site locally
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# CSS optimization (optional)
purgecss -c purgecss.config.js
```

### Code Formatting
```bash
# Format code with Prettier (required for PRs)
npx prettier . --check
npx prettier . --write
```

## Architecture and Structure

### Jekyll Theme Framework
- Based on **al-folio** theme with extensive customizations
- Uses Liquid templating engine with `.liquid` files
- Supports responsive design with Bootstrap
- Multi-language support (English/Chinese) via `_i18n/` structure

### Key Content Organization
- **Posts**: Blog entries in `_posts/` with date-based naming (`YYYY-MM-DD-title.md`)
- **Projects**: Portfolio items in `_projects/` with custom layouts
- **CV Data**: Dual format support - JSON (`assets/json/resume.json`) and YAML (`_data/cv.yml`)
- **Publications**: BibTeX format in `_bibliography/papers.bib` with Jekyll Scholar integration
- **Collections**: Custom collections for books, news, and projects

### Layouts and Components
- **Layouts**: Core page templates in `_layouts/` (about, post, cv, distill, etc.)
- **Includes**: Reusable components in `_includes/` (header, footer, CV sections, etc.)
- **Sass Styling**: Modular styles in `_sass/` with theme customization support

### Configuration System
- Main config in `_config.yml` with extensive plugin configuration
- Data files in `_data/` for CV, repositories, social links
- Plugin ecosystem including Jekyll Scholar, Archives, and custom plugins

### Build and Deployment
- GitHub Actions workflow for automatic deployment to `gh-pages` branch
- Docker containerization for consistent development environment
- Jekyll-based static site generation with plugin pipeline

### Content Management
- Markdown-based content with YAML frontmatter
- BibTeX bibliography management with custom fields
- Image optimization with responsive WebP generation
- Search functionality across posts and bibliography

### Development Notes
- The site uses Jekyll's collections feature extensively
- Custom plugins in `_plugins/` extend functionality
- Theme supports dark/light mode switching
- Extensive configuration options in `_config.yml` for customization