---
layout: post
title: macOS 開發環境完整設定教學：行動裝置開發工具鏈配置指南
date: 2025-01-11 15:00:00 +0800
description: 學會在新 macOS 系統上建置完整的行動裝置開發環境。詳細解析 Homebrew、Git、Xcode、Android Studio 等工具的安裝與配置。包含終端優化、環境變數設定與最佳實踐。
tags: [macOS Setup, Development Environment, Mobile Development, iOS Development, Android Development, Homebrew, Developer Tools, System Configuration]
categories: [Setup Guide]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/raul-per-e-K2w9VegUIb0-unsplash.jpg
---

# Setup Development Environment on a New macOS

Setting up a comprehensive development environment on a fresh macOS installation can be overwhelming. This guide walks you through the essential tools and configurations needed for mobile development, providing a solid foundation for iOS and Android projects.

The setup process is organized into logical sections, starting with fundamental tools like Homebrew and Git, then progressing to terminal enhancements and mobile-specific development tools. Each step builds upon the previous one, ensuring a smooth and efficient setup experience.

---

## Install [Homebrew](https://brew.sh/index_zh-tw)

Homebrew serves as the foundation of our development environment setup. It's a package manager that simplifies the installation and management of development tools on macOS. Most of the software we'll install in this guide depends on Homebrew, making it our first essential step.

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

The installation script will guide you through the process and may prompt for your password to install command line developer tools.

---

### Common Issue

After installation, you might encounter this warning message:

```zsh
Warning: /opt/homebrew/bin is not in your PATH
```

This occurs because Homebrew installs to `/opt/homebrew` on Apple Silicon Macs, but your shell doesn't know to look there for commands. To resolve this issue, you need to add Homebrew's binary directory to your system PATH:

```zsh
vim ~/.zshrc
export PATH=/opt/homebrew/bin:$PATH
:wq
source ~/.zshrc
```

After making this change, restart your terminal or run `source ~/.zshrc` to apply the new PATH configuration. You can verify Homebrew is working correctly by running `brew --version`.

Refer to [this StackOverflow thread](https://stackoverflow.com/questions/65487249/getting-a-warning-when-installing-homebrew-on-macos-big-sur-m1-chip) for more details.

---

## Install Git

Git is essential for version control and collaboration in modern development workflows. While macOS includes a basic version of Git, installing the latest version through Homebrew ensures you have access to the newest features and security updates.

```zsh
brew install git
```

This command installs the most recent version of Git and automatically handles any dependencies.

---

### [Setup Git Email & Name](https://stackoverflow.com/questions/46941346/how-to-know-the-git-username-and-email-saved-during-configuration/53940971)

Before making your first commit, Git requires you to configure your identity. This information will be attached to all commits you create, making it essential for project collaboration and commit tracking.

```zsh
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

Replace the placeholder values with your actual email address and full name. The `--global` flag applies these settings to all Git repositories on your system.

---

### [Setup Git Alias](https://stackoverflow.com/questions/2553786/how-do-i-alias-commands-in-git)

Git aliases are shortcuts that make common Git commands faster to type. These aliases can significantly speed up your daily workflow by reducing the keystrokes needed for frequently used commands.

```zsh
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.br branch
```

With these aliases configured, you can use `git st` instead of `git status`, `git co` instead of `git checkout`, and so on. Feel free to customize these aliases based on your personal preferences and workflow.

---

## Install [iTerm2](https://formulae.brew.sh/cask/iterm2)

While macOS comes with a built-in Terminal application, iTerm2 offers superior functionality for developers. It provides features like split panes, search functionality, better color support, and extensive customization options that enhance your command-line experience.

```zsh
brew tap homebrew/cask
brew install --cask iterm2
```

Once installed, you can find iTerm2 in your Applications folder. We recommend switching from the default Terminal to iTerm2 for all development work, as the upcoming configurations are optimized for iTerm2's enhanced capabilities.

---

## iTerm2 + Zsh Setup

Now that we have a powerful terminal emulator, let's enhance the shell experience. The following steps will transform your command-line interface into a modern, efficient, and visually appealing development environment with advanced features like syntax highlighting and intelligent autocompletion.

---

### Install [Zsh](https://formulae.brew.sh/formula/zsh#default)

Zsh (Z Shell) is an extended version of the Bourne Shell with numerous improvements. It offers better tab completion, spelling correction, and serves as the foundation for powerful frameworks like Oh My Zsh.

```zsh
brew install zsh
```

While macOS Big Sur and later versions include Zsh as the default shell, installing the latest version through Homebrew ensures you have access to the most recent features and bug fixes.

---

### Install [Oh-My-Zsh](https://ohmyz.sh/#install)

Oh My Zsh is a framework that makes Zsh configuration much easier and more powerful. It provides hundreds of plugins and themes that can dramatically improve your terminal productivity and appearance.

```zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

The installer will automatically configure your shell and create a `.zshrc` configuration file in your home directory. This file will be used to customize your shell experience throughout the rest of the setup process.

---

### Setup Colors

A well-configured color scheme improves readability and reduces eye strain during long coding sessions. iTerm2 comes with several built-in color schemes, with Solarized being one of the most popular choices among developers.

Navigate to Preferences -> Profiles -> Colors -> Select 'Solarized'.

The Solarized color scheme provides excellent contrast and has been scientifically designed to reduce eye fatigue. You can also explore other built-in themes or import custom ones based on your preferences.

---

### Install Fonts

Modern terminal themes often rely on special fonts that include additional symbols and icons. Nerd Fonts are patched fonts that include a high number of glyphs (icons) from popular icon fonts, making your terminal more visually informative.

```zsh
brew tap homebrew/cask-fonts
brew search font-meslo-lg-nerd-font
brew install --cask font-meslo-lg-nerd-font
```

After installation, you need to configure iTerm2 to use this font. Navigate to Preferences -> Profiles -> Text -> Font and set your terminal font to `font-meslo-lg-nerd-font`. This font will properly display the icons and symbols used by modern terminal themes.

---

### Install [Powerlevel10k](https://github.com/romkatv/powerlevel10k) Theme

Powerlevel10k is a highly customizable and fast Zsh theme that provides rich information about your development environment. It displays git status, execution time, error codes, and much more in an elegant and informative way.

```zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

After downloading the theme, you need to activate it by updating your Zsh configuration:

```zsh
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Once activated, restart your terminal and run the configuration wizard to customize the theme's appearance:

```zsh
p10k configure
```

The configuration wizard will guide you through various options to personalize your prompt. You can always reconfigure it later by running the same command.

---

### Install [Zsh-Syntax-Highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

Syntax highlighting helps prevent command-line errors by visually indicating valid commands, invalid syntax, and different command components as you type. This plugin colors your terminal input in real-time, making it easier to spot typos and syntax errors before executing commands.

```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

To enable this plugin, you need to add it to your plugins list in the `~/.zshrc` file:

```zsh
plugins=(... zsh-syntax-highlighting)
```

Valid commands will appear in green, while invalid or misspelled commands will appear in red, providing immediate visual feedback.

---

### Install [Zsh-Autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

Autosuggestions dramatically speed up your command-line workflow by suggesting commands as you type based on your command history and completions. This feature is especially useful for repeating long or complex commands without having to remember them exactly.

```zsh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

Add the plugin to your `~/.zshrc` configuration:

```zsh
plugins=(... zsh-autosuggestions)
```

After installation, you'll see grayed-out suggestions appear as you type. Press the right arrow key or Tab to accept suggestions, significantly reducing typing time for frequently used commands.

Restart your terminal to apply all changes and begin enjoying your enhanced command-line experience.

---

## iOS Environment: Install Xcode

With our terminal environment optimized, let's set up the tools needed for iOS development. Xcode is Apple's integrated development environment and is essential for building iOS applications. However, managing multiple Xcode versions can be challenging, which is where specialized tools become valuable.

---

### Install Xcodes Tool

The Xcodes command-line tool simplifies the process of installing and managing multiple versions of Xcode. This is particularly useful when working on projects that require different Xcode versions or when testing compatibility across iOS versions.

```zsh
brew install robotsandpencils/made/xcodes
```

This tool allows you to download and install Xcode versions directly from the command line, avoiding the need to use the slow Apple Developer portal downloads.

---

### Common Issue

You might encounter this error when using the Xcodes tool:

```zsh
error: terminated(72): /usr/bin/xcrun --sdk macosx --find xctest output:
    xcrun: error: unable to find utility "xctest", not a developer tool or in PATH
```

This error typically occurs when the Xcode command line tools are not properly installed or configured. The issue stems from missing developer tools that Xcodes expects to be available on the system.

Refer to [this GitHub issue](https://github.com/RobotsAndPencils/xcodes/issues/148) for detailed resolution steps.

---

### Alternative: Use XcodesApp

If command-line tools continue to present issues, you can fall back to the traditional installation method. Download Xcode directly via the [App Store](https://apps.apple.com/), though be prepared for potentially slower download speeds compared to the Xcodes tool.

The App Store method is more reliable but less flexible for managing multiple Xcode versions, which might be necessary for maintaining legacy projects or testing across different iOS versions.

---

## Install JetBrains Toolbox

JetBrains Toolbox serves as a centralized launcher and updater for JetBrains IDEs. Instead of managing individual IDE installations, Toolbox provides a unified interface for downloading, installing, and updating development environments like Android Studio, IntelliJ IDEA, and PyCharm.

```zsh
brew install --cask jetbrains-toolbox
```

Once installed, launch JetBrains Toolbox from your Applications folder. From there, you can easily install Android Studio for Android development, IntelliJ IDEA for Java/Kotlin projects, PyCharm for Python development, or any other JetBrains IDE you need.

The Toolbox also handles automatic updates and allows you to maintain multiple versions of the same IDE, which is particularly useful when working on projects with different requirements.

---

## Install OpenJDK

Java Development Kit (JDK) is essential for Android development and many other programming tasks. While macOS used to include Java, modern versions require manual installation. OpenJDK provides an open-source implementation that's fully compatible with Oracle's JDK.

```zsh
brew install openjdk@11
```

After installation, you need to make Java accessible from the command line by adding it to your system PATH:

```zsh
echo 'export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
```

For development tools that need to compile against Java libraries, you should also set the compiler flags:

```zsh
export CPPFLAGS="-I/opt/homebrew/opt/openjdk@11/include"
```

Restart your terminal or run `source ~/.zshrc` to apply these changes. You can verify the installation by running `java -version` and `javac -version` to confirm both the runtime and compiler are available.

---

## SSH Key Setup

SSH keys provide secure, password-free authentication to remote Git repositories and servers. Setting up unique SSH keys for different platforms enhances security and makes it easier to manage access across multiple services. This approach also allows you to revoke access to specific services without affecting others.

Creating separate keys for each platform (GitHub, GitLab, etc.) is a security best practice that helps isolate potential compromises and makes key management more organized.

---

### GitHub

GitHub provides comprehensive documentation for SSH key setup, covering key generation, adding keys to the SSH agent, and configuring your GitHub account to use SSH authentication.

Follow [GitHub's guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

The process involves generating a new SSH key pair, adding the private key to your SSH agent, and uploading the public key to your GitHub account. Once configured, you can clone repositories using SSH URLs instead of HTTPS, eliminating the need to enter credentials repeatedly.

---

### GitLab

Similar to GitHub, GitLab requires SSH key configuration for secure repository access. The setup process is nearly identical, but you'll need to upload your public key to your GitLab profile instead.

Follow [GitLab's SSH setup guide](http://10.1.2.150:53180/help/ssh/README).

Remember to generate a separate key pair for GitLab to maintain proper security isolation between different Git hosting services.

---

## Android Build Issue

When working with Android projects on Apple Silicon Macs, you might encounter native library compatibility issues. This particular error is common when Android projects include dependencies that haven't been fully updated for ARM64 architecture:

```zsh
Caused by: java.lang.Exception: No native library is found for os.name=Mac and os.arch=aarch64. path=/org/sqlite/native/Mac/aarch64
```

This error typically occurs with older Android projects or dependencies that include native libraries compiled only for Intel-based Macs. The issue often affects SQLite and other native components used in Android development.

Refer to [this StackOverflow solution](https://stackoverflow.com/questions/68884589/caused-by-java-lang-exception-no-native-library-is-found-for-os-name-mac-and-o) for detailed troubleshooting steps and workarounds specific to your project setup.

---

## Conclusion

🎉 Your macOS development environment setup is complete!

You now have a fully configured development environment with modern terminal enhancements, version control tools, and the necessary components for both iOS and Android development. This setup provides a solid foundation for mobile development projects while offering the flexibility to customize and extend based on your specific needs.

The tools and configurations in this guide will significantly improve your development workflow, from enhanced command-line productivity to streamlined IDE management. As you begin working on projects, you may discover additional tools and configurations that suit your specific development style - this foundation makes it easy to build upon and customize further.
