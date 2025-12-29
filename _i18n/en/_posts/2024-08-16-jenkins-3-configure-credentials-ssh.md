---
layout: post
title: "Jenkins (3) Complete SSH Credentials Configuration Guide: Secure Git Repository Connection Implementation Tutorial"
date: 2024-12-09 20:00:00 +0800
description: "In-depth analysis of Jenkins SSH credentials configuration techniques, learn how to securely connect to GitHub GitLab and other Git repositories through SSH keys, master authentication and code pulling best practices in CI/CD workflows."
tags: [Jenkins, CI/CD, DevOps, SSH Keys, Git Integration, Credentials Management, GitHub, GitLab, Automation, Security]
categories: [DevOps]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## How to Configure Credentials to Pull Code from Git via SSH

In previous articles, we learned about [Jenkins basic concepts](/en/blog/2024/jenkins-1-what-is-jenkins/) and [successfully set up a Jenkins server](/en/blog/2024/jenkins-2-how-to-setup-jenkins-server/). Now we're stepping into an important practical application phase: enabling Jenkins to securely pull code from Git repositories.

### Why Do We Need SSH Credentials?

When Jenkins needs to pull code from private Git repositories (such as GitHub, GitLab), it requires proper authentication. SSH (Secure Shell) provides a secure and convenient authentication method:

- **High Security**: Uses public key encryption, avoiding password leak risks
- **Automation Friendly**: No need for manual password input, suitable for CI/CD workflows
- **Permission Control**: Can set different access permissions for specific repositories

This article will explain in detail how to set up SSH credentials to enable your Jenkins to integrate smoothly with Git repositories.

---

### Step 1: Generate SSH Key

SSH keys use asymmetric encryption, including a pair of related keys:

- **Private Key**: Stored on the Jenkins server, used for authentication
- **Public Key**: Uploaded to Git service providers (like GitHub), used to verify the legitimacy of the private key

#### Generate Key Pair

Open your terminal and execute the following command to generate SSH keys:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

#### Parameter Explanation

- `-t rsa`: Specify encryption type as RSA
- `-b 4096`: Set key length to 4096 bits (more secure)
- `-C "your_email@example.com"`: Add comment, usually using your email

#### Generation Process

After executing the command, the system will ask several questions:

1. **Storage Location**: Default is `~/.ssh/id_rsa`, usually press Enter to use default location
2. **Password Protection**: You can set a password to additionally protect the private key, or press Enter to skip
3. **Confirm Password**: If you set a password in the previous step, you need to confirm it again here

After completion, you'll see two files in the specified directory:

- `id_rsa`: Private key file (keep secret)
- `id_rsa.pub`: Public key file (can be shared publicly)

---

### Step 2: Add Public Key to Version Control System

Now we need to upload the public key to the Git service provider so it can recognize and trust our private key. The following uses GitHub as an example to explain the setup process:

#### Copy Public Key Content

First, we need to get the public key content:

```bash
cat ~/.ssh/id_rsa.pub
```

This will display content similar to the following:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDTgvwj... your_email@example.com
```

Select and copy the entire content (from `ssh-rsa` to your email).

#### Add SSH Key on GitHub

Next, configure on GitHub:

1. **Enter GitHub Settings**

   - Log into your GitHub account
   - Click your profile picture in the top right corner, select "Settings"

2. **Find SSH Settings Page**

   - Click "SSH and GPG keys" in the left sidebar

3. **Add SSH Key**
   - Click the "New SSH key" button
   - **Title**: Give this key a meaningful name (like "Jenkins Server")
   - **Key**: Paste the public key content you just copied
   - Click "Add SSH key" to complete the addition

#### Other Git Service Providers

If you use other Git service providers, the setup process is similar:

- **GitLab**: User Settings → SSH Keys
- **Bitbucket**: Personal settings → SSH keys
- **Azure DevOps**: User settings → SSH public keys

---

### Step 3: Add Credentials in Jenkins

Now we need to add the private key to Jenkins' credential system. This is the core step of the entire setup process.

#### Enter Jenkins Credentials Management Interface

1. **Log into Jenkins**

   - Open `http://localhost:8080/` in your browser
   - Log in using the administrator account you created during initial setup

2. **Enter Credentials Management**

   - Click "Manage Jenkins" in the left sidebar
   - Click "Credentials" in the system configuration section

3. **Select Credential Storage Location**
   - Click "System"
   - Click "Global credentials (unrestricted)"

#### Add SSH Credentials

Click the "Add Credentials" button, then fill in the following information:

**Basic Settings**

- **Kind**: Select "SSH Username with private key"
- **Scope**: Select "Global (Jenkins, nodes, items, all child items, etc)"

**Identity Information**

- **ID**: Set an easily identifiable ID (e.g., `github-ssh-key`)
- **Description**: Enter description for easier future management (e.g., "GitHub SSH Key for Jenkins")
- **Username**: Enter `git` (this is the standard username for Git service providers)

**Private Key Settings**

- **Private Key**: Select "Enter directly"
- Click the "Add" button
- Paste the complete private key content generated in step 1

#### Get Private Key Content

If you forgot the private key content, you can view it with the following command:

```bash
cat ~/.ssh/id_rsa
```

The private key content will look like this:

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAA...
-----END OPENSSH PRIVATE KEY-----
```

Please ensure you include the beginning and ending marker lines and copy all content completely.

#### Complete Setup

After filling in all information, click the "OK" button to save the credential settings.

---

### Step 4: Configure Jenkins Job to Use Credentials

Now that the credentials are set up, let's create a test Job to verify that the SSH connection is working properly.

#### Create New Jenkins Job

1. **Return to Jenkins Homepage**

   - Click the "Jenkins" logo in the top left to return to the main page

2. **Create New Job**
   - Click "New Item"
   - Enter Job name (e.g., `test-ssh-connection`)
   - Select "Freestyle project"
   - Click "OK"

#### Configure Git Repository Connection

In the Job configuration page:

1. **Find Source Code Management Section**

   - Select the "Git" option

2. **Set Repository Information**

   - **Repository URL**: Enter SSH format Git repository link

   ```bash
   git@github.com:username/repository.git
   ```

   Note: SSH format URLs are characterized by starting with `git@`, not `https://`

3. **Select Credentials**

   - In the "Credentials" dropdown menu, select the SSH credential you just created
   - If configured correctly, you should see an option like "github-ssh-key (GitHub SSH Key for Jenkins)"

4. **Other Settings**
   - **Branch Specifier**: Usually keep default `*/main` or `*/master`
   - Other advanced settings can remain at default values for now

#### Test Connection

1. **Save Settings**

   - Click the "Save" button at the bottom of the page

2. **Execute Build**

   - Click "Build Now" to start the first build

3. **Check Results**
   - Click the build number in "Build History"
   - Click "Console Output" to view detailed execution logs
   - If you see messages indicating successful code pulling, it means SSH credentials are configured successfully!

#### Common URL Format Reference

| Git Service Provider | SSH URL Format                              |
| -------------------- | ------------------------------------------- |
| GitHub               | `git@github.com:username/repository.git`    |
| GitLab               | `git@gitlab.com:username/repository.git`    |
| Bitbucket            | `git@bitbucket.org:username/repository.git` |

---

## Summary

Congratulations on completing the complete configuration of Jenkins SSH credentials! This is an important milestone in making Jenkins practical. Let's review the key steps we completed:

### What We Learned

1. **SSH Key Principles**: Understanding the pairing mechanism of public and private keys and how they provide secure authentication
2. **Key Generation and Management**: Learning to use `ssh-keygen` to generate SSH key pairs with appropriate strength
3. **Git Service Provider Setup**: Correctly uploading public keys to GitHub and other Git service providers
4. **Jenkins Credential System**: Creating and managing SSH credentials in Jenkins
5. **Practical Application Testing**: Creating test Jobs to verify that SSH connections work properly

### Security Improvements

By using SSH credentials, we achieved the following security advantages:

- **No Password Risk**: Avoid exposing passwords in code or configuration
- **Automation Friendly**: CI/CD processes can execute automatically without human intervention
- **Access Control**: Can use different SSH keys for different projects

### Next Steps to Explore

Now you have the core Jenkins skills:

- ✅ Understanding Jenkins basic concepts
- ✅ Successfully setting up Jenkins server
- ✅ Configuring SSH credential system

Next, you can start exploring more advanced features such as creating Pipelines, setting up automated testing, or integrating deployment processes. Jenkins' powerful capabilities are waiting for you to discover!

---

## Jenkins Series Article Navigation

Congratulations on completing the foundational trilogy of the Jenkins tutorial series!

1. **[Jenkins (1) What is Jenkins](/en/blog/2024/jenkins-1-what-is-jenkins/)** - Jenkins basic concepts and core feature introduction ✅
2. **[Jenkins (2) How to Set Up Jenkins Server](/en/blog/2024/jenkins-2-how-to-setup-jenkins-server/)** - Quick Jenkins environment setup using Docker ✅
3. **Jenkins (3) Complete SSH Credentials Configuration Guide** ← You are reading ✅

### Recommended Related Technical Articles

- [Using SSH to Manage Multiple GitHub Accounts](/en/blog/2025/how-to-use-multiple-github-accounts-using-ssh/) - Advanced SSH key management techniques
- [Getting Started with GitHub Container Registry](/en/blog/2024/getting-started-with-github-container-registry/) - Container deployment integration
- [Enabling RSA Encryption Algorithm in OpenSSH 8.8](/en/blog/2024/how-to-enable-rsa-encryption-algorithm-key-in-openssh-8.8/) - SSH compatibility issue resolution
- [Design Patterns Series](/en/blog/2024/design-pattern-2-design-principle/) - Software design best practices

Now you have all the necessary skills to use Jenkins for basic CI/CD. This complete set of Jenkins foundational tutorials has laid a solid foundation for your DevOps automation journey.

> ##### TIP
>
> For further understanding of Jenkins credential system and advanced configuration, please refer to the [Jenkins Official Documentation](https://jenkins.io/doc/).
> {: .block-tip }
