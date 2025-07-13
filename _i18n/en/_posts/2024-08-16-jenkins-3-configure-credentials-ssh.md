---
layout: post
title: "Jenkins 3: Configure SSH Credentials for Secure Git Code Retrieval"
date: 2024-12-09 20:00:00 +0800
description: "Learn how to configure SSH credentials in Jenkins for secure Git repository access. Step-by-step guide for setting up SSH keys, adding credentials, and configuring Jenkins jobs for secure code retrieval."
tags: [Jenkins, SSH, Credentials, Git, CI/CD, DevOps, Security, Authentication, SSH Keys, Repository Access]
categories: [DevOps, CI/CD, Security, Jenkins, Git, Authentication]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

> This comprehensive guide covers configuring SSH credentials in Jenkins for secure Git repository access, including key generation, credential management, and job configuration.

## Introduction: Secure Repository Access in Jenkins

In this article, we'll explore how to configure credentials (Credentials) in Jenkins so that Jenkins can securely pull code from version control systems (such as GitHub or GitLab) using SSH. This setup is essential for secure CI/CD pipelines and automated deployments.

## Why Use SSH for Git Access?

SSH (Secure Shell) provides several advantages over HTTPS for Git repository access:

- **Enhanced Security**: Encrypted communication between Jenkins and Git servers
- **No Password Storage**: Uses key-based authentication instead of storing passwords
- **Automated Access**: No manual intervention required for authentication
- **Audit Trail**: Better tracking of access and changes
- **Repository Access Control**: Granular permissions based on SSH keys

## Prerequisites

Before configuring SSH credentials, ensure you have:

- Jenkins server running and accessible
- Git repository with SSH access enabled
- Administrative access to Jenkins
- SSH client tools installed

## Step 1: Generate SSH Key Pair

First, we need to generate a pair of SSH keys. Open a terminal and execute the following command:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Follow the prompts to complete the key generation process and note the paths of the generated public and private keys.

### Key Generation Options

```bash
# Generate RSA key with 4096 bits (recommended)
ssh-keygen -t rsa -b 4096 -C "jenkins@company.com"

# Generate Ed25519 key (modern, more secure)
ssh-keygen -t ed25519 -C "jenkins@company.com"

# Generate key with custom filename
ssh-keygen -t rsa -b 4096 -f ~/.ssh/jenkins_rsa -C "jenkins@company.com"
```

### Understanding SSH Key Types

| Key Type | Security Level | Key Size | Compatibility |
|----------|----------------|----------|---------------|
| **RSA** | High | 2048-4096 bits | Universal |
| **Ed25519** | Very High | 256 bits | Modern systems |
| **ECDSA** | High | 256-521 bits | Most systems |
| **DSA** | Low | 1024 bits | Legacy (not recommended) |

## Step 2: Add Public Key to Version Control System

Copy the generated public key content and add it to your version control system. For example, in GitHub:

1. **Login to GitHub** and go to "Settings"
2. **Select "SSH and GPG keys"** from the left menu
3. **Click "New SSH key"** and paste the public key content
4. **Click "Add SSH key"**

### For Different Git Providers

#### GitHub
```bash
# Copy public key to clipboard
cat ~/.ssh/id_rsa.pub | pbcopy  # macOS
cat ~/.ssh/id_rsa.pub | xclip -selection clipboard  # Linux
```

#### GitLab
1. Go to User Settings → SSH Keys
2. Paste the public key content
3. Add a title for the key

#### Bitbucket
1. Go to Personal Settings → SSH Keys
2. Click "Add key"
3. Paste the public key content

## Step 3: Add Credentials to Jenkins

### 1. Access Jenkins Management Interface

1. **Open Jenkins**: Navigate to `http://localhost:8080/` in your browser
2. **Login**: Use your administrator account to log in
3. **Navigate to Credentials**: Click "Credentials" → "System" in the left menu

### 2. Create New Domain

1. **Click "Add domain"** next to "Domains"
2. **Fill in the domain name** (e.g., "GitHub")
3. **Click "OK"** to create the domain

### 3. Add SSH Credentials

1. **Select the new domain** and click "Add Credentials"
2. **Fill in credential information**:

| Field | Value | Description |
|-------|-------|-------------|
| **Kind** | SSH Username with private key | Type of credential |
| **Scope** | Global | Credential scope |
| **ID** | `github-ssh-key` | Unique identifier (optional) |
| **Description** | `SSH key for GitHub access` | Description for management |
| **Username** | `git` | Usually `git` for Git repositories |
| **Private Key** | Enter directly | Choose "Enter directly" and paste private key |

### 4. Private Key Format

The private key should be in the correct format:

```bash
# Copy private key content
cat ~/.ssh/id_rsa
```

Example private key format:
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
NhAAAAAwEAAQAAAYEAv7X9FJj7KQZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8
...
-----END OPENSSH PRIVATE KEY-----
```

## Step 4: Configure Jenkins Job to Use Credentials

### 1. Create or Edit Job

1. **Go to Jenkins homepage** and create or edit a job
2. **Select "Git"** in the "Source Code Management" section
3. **Enter Repository URL** in SSH format:

```bash
git@github.com:username/repository.git
```

### 2. Select Credentials

1. **Choose the SSH credential** from the "Credentials" dropdown menu
2. **Select the branch** you want to build
3. **Save the configuration**

### Example Job Configuration

```groovy
// Jenkinsfile example with SSH credentials
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'git@github.com:username/repository.git',
                        credentialsId: 'github-ssh-key'
                    ]]
                ])
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
    }
}
```

## Advanced SSH Configuration

### 1. SSH Config File

Create an SSH config file for better key management:

```bash
# ~/.ssh/config
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_rsa
    IdentitiesOnly yes

Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/gitlab_rsa
    IdentitiesOnly yes
```

### 2. Multiple SSH Keys

For managing multiple repositories with different keys:

```bash
# Generate separate keys for different services
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_rsa -C "jenkins@company.com"
ssh-keygen -t rsa -b 4096 -f ~/.ssh/gitlab_rsa -C "jenkins@company.com"
ssh-keygen -t rsa -b 4096 -f ~/.ssh/bitbucket_rsa -C "jenkins@company.com"
```

### 3. SSH Agent Configuration

Configure SSH agent for better key management:

```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add keys to agent
ssh-add ~/.ssh/github_rsa
ssh-add ~/.ssh/gitlab_rsa
```

## Security Best Practices

### 1. **Key Management**

- **Use dedicated keys**: Create separate SSH keys for Jenkins
- **Regular rotation**: Rotate SSH keys periodically
- **Key permissions**: Set correct file permissions (600 for private keys)
- **Secure storage**: Store private keys securely

```bash
# Set correct permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

### 2. **Access Control**

- **Principle of least privilege**: Grant minimal necessary permissions
- **Repository-specific keys**: Use different keys for different repositories
- **Audit access**: Regularly review SSH key access

### 3. **Monitoring**

- **Log monitoring**: Monitor SSH access logs
- **Key usage tracking**: Track which keys are used for which operations
- **Alerting**: Set up alerts for unusual SSH activity

## Troubleshooting Common Issues

### Issue 1: Permission Denied

**Problem**: `Permission denied (publickey)`

**Solutions**:
```bash
# Test SSH connection
ssh -T git@github.com

# Check key permissions
ls -la ~/.ssh/

# Verify key is added to agent
ssh-add -l
```

### Issue 2: Host Key Verification Failed

**Problem**: `Host key verification failed`

**Solution**:
```bash
# Add host to known_hosts
ssh-keyscan -H github.com >> ~/.ssh/known_hosts
```

### Issue 3: Credential Not Found

**Problem**: Jenkins can't find the SSH credential

**Solutions**:
1. Verify credential ID matches job configuration
2. Check credential scope (Global vs System)
3. Ensure credential is in the correct domain

### Issue 4: Authentication Timeout

**Problem**: SSH authentication times out

**Solutions**:
```bash
# Increase SSH timeout
ssh -o ConnectTimeout=30 git@github.com

# Check network connectivity
ping github.com
```

## Testing SSH Configuration

### 1. **Test SSH Connection**

```bash
# Test GitHub connection
ssh -T git@github.com

# Test GitLab connection
ssh -T git@gitlab.com

# Test with verbose output
ssh -vT git@github.com
```

### 2. **Test Git Operations**

```bash
# Clone repository using SSH
git clone git@github.com:username/repository.git

# Test push/pull operations
cd repository
git pull origin main
```

### 3. **Jenkins Test Job**

Create a simple test job to verify SSH configuration:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Test SSH') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'git@github.com:username/test-repo.git',
                        credentialsId: 'github-ssh-key'
                    ]]
                ])
                sh 'git log --oneline -5'
            }
        }
    }
}
```

## Performance Optimization

### 1. **SSH Connection Multiplexing**

Configure SSH for connection reuse:

```bash
# ~/.ssh/config
Host github.com
    HostName github.com
    User git
    ControlMaster auto
    ControlPath ~/.ssh/control-%h-%p-%r
    ControlPersist 1h
```

### 2. **Key Caching**

Use SSH agent for key caching:

```bash
# Add to ~/.bashrc or ~/.zshrc
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

## Integration with CI/CD Pipelines

### 1. **Multi-Branch Pipeline**

```groovy
// Jenkinsfile for multi-branch pipeline
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh'
            }
        }
    }
}
```

### 2. **Parameterized Builds**

```groovy
// Parameterized pipeline with SSH credentials
pipeline {
    agent any
    
    parameters {
        choice(
            name: 'BRANCH',
            choices: ['main', 'develop', 'feature/*'],
            description: 'Select branch to build'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${params.BRANCH}"]],
                    userRemoteConfigs: [[
                        url: 'git@github.com:username/repository.git',
                        credentialsId: 'github-ssh-key'
                    ]]
                ])
            }
        }
    }
}
```

## Monitoring and Maintenance

### 1. **Regular Maintenance Tasks**

- **Key rotation**: Rotate SSH keys every 6-12 months
- **Permission review**: Review repository access permissions
- **Log analysis**: Analyze SSH access logs for anomalies
- **Backup credentials**: Backup SSH keys securely

### 2. **Health Checks**

```bash
# Check SSH key validity
ssh-keygen -l -f ~/.ssh/id_rsa

# Test repository access
ssh -T git@github.com

# Verify Jenkins can access repositories
curl -u username:api_token http://jenkins:8080/job/test-job/lastBuild/api/json
```

## Conclusion

Through the steps outlined above, we've completed the full configuration process for Jenkins to use SSH to pull Git code securely. This not only enhances security but also makes the CI/CD process smoother. It's recommended that every Jenkins environment be properly configured with correct SSH credentials to avoid future authorization issues that could interrupt builds.

Key benefits of using SSH credentials in Jenkins:

- **Enhanced Security**: Encrypted communication and key-based authentication
- **Automated Access**: No manual intervention required
- **Better Audit Trail**: Improved tracking of repository access
- **Flexible Access Control**: Granular permissions based on SSH keys

## Related Articles

- [Jenkins 1: What is Jenkins](/2024-08-15-jenkins-1-what-is-jenkins/)
- [Jenkins 2: How to Setup Jenkins Server](/2024-08-15-jenkins-2-how-to-setup-jenkins-server/)
- [Git Security Best Practices](/2025-05-18-how-to-use-multiple-github-accounts-using-ssh/)
- [DevOps Security Guidelines](/2024-08-02-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8.8.md/)

> **Pro Tip**: For further information about Jenkins credential systems and advanced configuration, please refer to the [Jenkins Official Documentation](https://jenkins.io/doc/).
