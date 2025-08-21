---
layout: post
title: "Jenkins (2) Complete Server Setup Guide: Docker Environment Quick Deployment Tutorial"
date: 2024-08-15 17:00:00 +0800
description: "Comprehensive analysis of Jenkins server setup steps, learn to quickly deploy Jenkins CI/CD environment using Docker, including standard version and Android build environment configuration, master DevOps automation infrastructure building techniques."
tags: [Jenkins, CI/CD, DevOps, Docker, Server Setup, Automation, Container, Infrastructure, Build Environment, Development Tools]
categories: [DevOps]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## How to Set Up Jenkins Server

In the [previous article](/en/blog/2024/jenkins-1-what-is-jenkins/), we learned about Jenkins' basic concepts and core features. Now, let's enter the practical phase and learn how to set up our own Jenkins server.

This article will introduce the method of setting up Jenkins using Docker. We choose Docker for three reasons:

- **Environment Consistency**: You can get the same execution environment on Windows, macOS, or Linux
- **Quick Deployment**: Installation can be completed with just a few commands, eliminating complex environment configuration
- **Easy Maintenance**: You can easily upgrade, backup, or redeploy

---

### Step 1: Pull Docker Image

Before starting, please ensure that Docker is installed on your computer. If not yet installed, please go to the [Docker official website](https://www.docker.com/get-started) to download and install it.

Next, we need to pull the Jenkins Docker image from the official repository. Open your terminal (or command prompt) and execute one of the following commands:

#### Option 1: Standard Jenkins Environment

```bash
docker pull jenkins/jenkins:lts-jdk17
```

This is the official maintained standard Jenkins image, including Java 17 runtime environment, suitable for most general purposes.

#### Option 2: Jenkins + Android Build Environment

```bash
docker pull ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17
```

This is a customized image that includes Android build tools. If you need to build Android applications, we recommend using this version.

---

### Step 2: Run Jenkins Container

Now we're going to start the Jenkins container. Before executing the command, please prepare a local folder to store Jenkins data, so that even if the container restarts, your settings and data won't be lost.

#### Prepare Data Storage Directory

First, create a folder to store Jenkins data:

```bash
# Create jenkins_home folder in your home directory
mkdir ~/jenkins_home
```

#### Start Container

Based on the image you chose in step 1, execute the corresponding command:

**Using Standard Jenkins Environment:**

```bash
docker run -d \
  --name jenkins \
  -v ~/jenkins_home:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  jenkins/jenkins:lts-jdk17
```

**Using Jenkins + Android Environment:**

```bash
docker run -d \
  --name jenkins \
  -v ~/jenkins_home:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17
```

#### Parameter Explanation

Let's understand the meaning of these parameters:

- `-d`: Run the container in the background
- `--name jenkins`: Give the container a name for easier management later
- `-v ~/jenkins_home:/var/jenkins_home`: Mount the local folder to the Jenkins data directory inside the container
- `-p 8080:8080`: Map container port 8080 to local port 8080, used for accessing Jenkins Web interface
- `-p 50000:50000`: Map container port 50000 to local, used for Jenkins Agent communication

---

### Step 3: Access Jenkins

After the container starts, we need to wait for Jenkins to fully load. You can use the following command to check container status:

```bash
docker logs jenkins
```

When you see a message like `Jenkins is fully up and running`, it means Jenkins is ready.

#### Open Jenkins Web Interface

Open [http://localhost:8080](http://localhost:8080) in your browser to access Jenkins' Web interface. When accessing for the first time, you'll see a page asking for the initial administrator password.

{% include figure.liquid path="assets/img/jenkins_setup_initialAdminPassword.png" title="Jenkins Initial Password Page" %}

#### Get Initial Password

There are two ways to get the initial administrator password:

**Method 1: Get from Docker logs**

```bash
docker logs jenkins | grep -A 5 -B 5 "password"
```

**Method 2: Get from stored file**

```bash
cat ~/jenkins_home/secrets/initialAdminPassword
```

> ##### TIP
>
> Remember the data storage directory `~/jenkins_home` we set in step 2? The initial password is stored in the `secrets/initialAdminPassword` file under this directory.
> {: .block-tip }

#### Complete Initial Setup

1. **Enter Password**: Input the obtained password into the password field
2. **Install Plugins**: We recommend selecting "Install suggested plugins" to install commonly used plugins
3. **Create Admin Account**: Set your administrator username and password
4. **Set Jenkins URL**: Usually keep the default value

After completing these steps, you have successfully set up Jenkins!

{% include figure.liquid path="assets/img/jenkins_setup_main_page.png" title="Jenkins Initial Homepage" %}

---

## Summary

Congratulations! Through this article, we have successfully completed Jenkins server setup. Let's review the important steps we completed:

### What We Accomplished

1. **Chose Appropriate Docker Image**: Selected standard version or version with Android environment based on needs
2. **Correctly Configured Container Parameters**: Including important settings like data persistence and port mapping
3. **Completed Initial Setup Process**: From getting password to installing plugins, establishing complete Jenkins environment

### Advantages of Using Docker

- **Quick Deployment**: Complete installation process with just a few commands
- **Environment Isolation**: Won't affect your local system environment
- **Easy Maintenance**: Easy to backup, restore, or upgrade

### Next Steps

Now you have a running Jenkins server. Next, we will learn [how to configure the credential system](/en/blog/2024/jenkins-3-configure-credentials-ssh/) to enable Jenkins to securely pull code from Git repositories. This is a crucial step in implementing automated build processes.

Ready to move to the next stage? Let's continue exploring Jenkins' powerful features!

---

## Jenkins Series Article Navigation

1. **[Jenkins (1) What is Jenkins](/en/blog/2024/jenkins-1-what-is-jenkins/)** - Jenkins basic concepts and core feature introduction ✅
2. **Jenkins (2) Complete Server Setup Guide** ← You are reading ✅
3. **[Jenkins (3) Complete SSH Credentials Configuration Guide](/en/blog/2024/jenkins-3-configure-credentials-ssh/)** - Next step: Setting up secure code access

### Recommended Related Technical Articles

- [Getting Started with GitHub Container Registry](/en/blog/2024/getting-started-with-github-container-registry/) - Advanced container deployment applications
- [Using SSH to Manage Multiple GitHub Accounts](/en/blog/2025/how-to-use-multiple-github-accounts-using-ssh/) - Git multi-account management techniques
- [Setting Up Development Environment on New macOS](/en/blog/2024/setup-development-environment-on-a-new-macos/) - Complete development environment building guide

> ##### TIP
>
> For more information about Jenkins, please refer to the [Jenkins Official Documentation](https://jenkins.io/doc/).
> {: .block-tip }
