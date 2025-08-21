---
layout: post
title: "Complete OpenSSH 8.8 RSA Encryption Support Guide: Solving Compatibility Issues and Security Configuration"
date: 2024-08-02 19:50:00 +0800
description: "Learn how to solve the problem of RSA encryption algorithms being disabled in OpenSSH 8.8. Detailed analysis of security considerations, compatibility solutions, and best practices. Includes practical scenarios for Jenkins CI/CD, Docker environments, and GitLab integration."
tags: [OpenSSH Security, RSA Encryption, SSH Configuration, System Administration, DevOps, Jenkins CI/CD, Docker Security, GitLab Integration]
categories: [Cryptography, OpenSSH, Security]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/rsa-algorithm.jpg
---

## Introduction

Recently, while modifying our company's Jenkins CI/CD architecture to dockerize the Android building environment, I launched a Debian 12 container. However, when configuring RSA keys for the GitLab server, I discovered that source code couldn't be pulled.

This article documents the complete resolution process, allowing me to quickly review it in the future. I also hope it can help developers encountering the same issue, especially system administrators who need to maintain legacy Git servers.

### Root Cause of the Problem

After thorough investigation, I found that Debian 12 uses OpenSSH version 8.8 or newer. OpenSSH 8.8 disabled RSA encryption algorithms by default for security reasons.

This change is mainly because RSA with SHA-1 is considered a less secure encryption method. However, in real-world environments, many internal GitLab servers are still older and only support RSA key authentication.

Therefore, we need to manually re-enable RSA support to maintain compatibility with legacy servers.

---

## Preparation

> ##### TIP
>
> If you already have an environment, you can skip this step and go directly to the testing and fix section.
> {: .block-tip }

To demonstrate this problem and solution, let's first create a testing environment. This step will help you reproduce the issue and verify the effectiveness of the solution.

### Creating Test Environment

First, I'll launch a Debian 12 container using Docker:

```bash
docker pull debian:bookworm
docker run -it --name debian-bookworm-for-test-openssh debian:bookworm
```

### Basic System Configuration

Update the package list to ensure we install the latest versions:

```bash
apt update
```

Install Git tools (needed for SSH connection testing):

```bash
apt install git
```

### Verify OpenSSH Version

Check the OpenSSH version in the system to confirm if it's version 8.8 or newer:

```bash
ssh -V
# Expected output: OpenSSH_9.2p1 Debian-2+deb12u3, OpenSSL 3.0.13
```

This version indeed disables RSA algorithm support.

### Create SSH RSA Key

Now we need to generate an RSA key pair for testing. Using a 4096-bit key length can improve security:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

These commands will generate an RSA key pair and add the private key to the SSH agent.

### Configure Git Server Authentication

Copy the public key to prepare for uploading to the Git server:

```bash
cat ~/.ssh/id_rsa.pub
```

Copy the displayed public key content completely and paste it into the SSH settings of your Git server account. Make sure not to miss any characters, including the leading `ssh-rsa` and the trailing email address.

---

## Testing SSH Connection

Now let's test the SSH connection to see if we encounter the RSA algorithm disabled issue.

### Execute Connection Test

Use verbose mode to connect to the Git server, which allows us to see the detailed connection process (replace `x.x.x.x` with the actual IP or domain):

```bash
ssh -T -v git@x.x.x.x
```

The `-T` parameter means no TTY allocation, and the `-v` parameter displays detailed debugging messages. These debugging messages are crucial for diagnosing connection issues.

### Identify Error Messages

After executing the command, if you see the following error message:

```bash
debug1: send_pubkey_test: no mutual signature algorithm
```

This error message means: there's no commonly supported signature algorithm between your SSH client and server.

### Problem Analysis

This error occurs because: RSA algorithms have been disabled by default in OpenSSH 8.8, but the Git server still only supports RSA authentication. Therefore, both sides cannot find a common encryption algorithm to complete the authentication process, resulting in connection failure.

---

## Solution

The good news is that the OpenSSH official documentation provides a solution to this compatibility issue. Let's see how to re-enable RSA support.

### Consulting Official Documentation

Opening the official documentation: [OpenSSH 8.8 Release Notes](https://www.openssh.com/txt/release-8.8), we can see the following explanation:

> ...it may be necessary to selectively re-enable RSA/SHA1 to allow connection and/or user authentication via the HostkeyAlgorithms and PubkeyAcceptedAlgorithms options...

This explanation tells us that we can selectively re-enable the RSA/SHA1 algorithm. This is exactly the solution we need.

### Configure SSH Client

We can manually enable the `ssh-rsa` algorithm by modifying the `.ssh/config` configuration file. Create or edit this file in your home directory:

```bash
Host x.x.x.x
  HostkeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
```

The meaning of this configuration is:

- `HostkeyAlgorithms +ssh-rsa`: Allow using RSA algorithm for host authentication
- `PubkeyAcceptedAlgorithms +ssh-rsa`: Allow using RSA algorithm for public key authentication
- The `+` symbol means **adding** this option to the existing algorithm list, rather than completely replacing it

### Verify the Solution

After saving the configuration file, run the connection test again:

```bash
ssh -T -v git@x.x.x.x
```

This time you should see a successful login message, indicating that the RSA algorithm has been successfully re-enabled and the connection issue has been resolved.

---

## References

- [OpenSSH 8.8 Release Document](https://www.openssh.com/txt/release-8.8)
