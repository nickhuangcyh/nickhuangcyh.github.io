---
layout: post
title: "Complete Android CHIPTool Build Tutorial: Matter Development Tool Compilation Guide from Source Code"
date: 2024-07-16 19:50:00 +0800
description: "Learn how to compile CHIPTool Android APK from Matter source code. Detailed solutions for common environment configuration, dependency packages, and troubleshooting issues during compilation. Includes complete development environment setup, compilation commands, and practical tips."
tags: [Android Development, CHIPTool, Matter Protocol, IoT Development, Android Build, Source Code Compilation, Smart Home, Connected Devices]
categories: [Tools]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/matter.jpg
---

## Introduction

Recently, due to work requirements, I researched how to build CHIPTool Android APK from source code. Although the official documentation provides the basic process, there are some unmentioned errors that occur during actual operation.

These issues cost me considerable time to resolve one by one. Therefore, this article will help everyone avoid these common pitfalls while also serving as a convenient reference for future review.

---

## Overview

Matter (formerly Project CHIP, Connected Home over IP) is an open-source connectivity standard. Its main purpose is to improve interoperability and compatibility between smart home devices.

This standard is initiated by the Connectivity Standards Alliance (CSA), with members including Apple, Google, Amazon, Zigbee, and other industry giants. Matter's core advantages lie in its emphasis on security, usability, and developer-friendliness.

It supports mainstream communication protocols like Thread and Wi-Fi, laying an important foundation for building cross-brand smart home ecosystems.

---

## Prerequisites

Building directly in the local environment can easily disrupt existing configurations, especially important environment variables like ANDROID_HOME and ANDROID_NDK_HOME.

To avoid environment pollution issues, this article recommends using the official Docker image provided by CHIP. This approach not only ensures a clean environment but also avoids conflicts with existing development environments.

---

### Required Tools:

- Docker

---

## Download Docker Image

First, you need to download the official Docker image. This step will take some time, so you might want to grab a cup of coffee.

```bash
docker pull ghcr.io/project-chip/chip-build-android:latest
```

This image contains all necessary build tools and pre-configured environments, greatly simplifying subsequent setup steps.

---

## Launch Container

After the download is complete, use the following command to launch the Docker container:

```bash
docker run -it -v ~/workspace/connectedhomeip:/connectedhomeip ghcr.io/project-chip/chip-build-android:latest
```

This command will mount the local `~/workspace/connectedhomeip` directory to the `/connectedhomeip` path inside the container. After execution, we have a clean and complete CHIPTool build environment.

---

## Configure Git Safe Directory

In the container environment, Git may consider certain directories as unsafe. To smoothly proceed with subsequent Git operations, we need to mark relevant directories as safe:

```bash
git config --global --add safe.directory /connectedhomeip
git config --global --add safe.directory /connectedhomeip/third_party/pigweed/repo
```

This configuration ensures we can normally execute Git commands inside the container, avoiding permission-related error messages.

---

## Download Source Code and Submodules

Next, we need to download the complete source code of the Matter project. Since the Matter project contains a large number of third-party dependencies, the data volume is quite substantial.

```bash
git clone https://github.com/project-chip/connectedhomeip.git
cd connectedhomeip
git submodule sync && git submodule update --init
```

This process may take a considerable amount of time, so you might want to handle other tasks first. Download time depends on network speed, typically ranging from 30 minutes to several hours.

---

## Accept Android SDK License Terms

Before starting the build, you must first accept the Android SDK license terms. If you skip this step, the build process will fail with the following error message:

```bash
> Failed to install the following Android SDK packages as some licences have not been accepted.
> build-tools;30.0.2 Android SDK Build-Tools 30.0.2
> platforms;android-31 Android SDK Platform 31
```

To resolve this issue, first add the Android SDK tools path to the environment variables:

```bash
export PATH=$PATH:/opt/android/sdk/tools/bin
```

Then execute the following command to accept all necessary license terms:

```bash
sdkmanager --licenses
```

During execution, the system will ask whether you agree to various license terms. Enter `y` or `yes` to complete the setup.

---

## Verify Environment Variables

One major advantage of using the official Docker image is that both Android SDK and NDK are pre-configured. We can verify that environment variables are set correctly with the following commands:

```bash
echo $ANDROID_HOME
# /opt/android/sdk

echo $ANDROID_NDK_HOME
# /opt/android/android-ndk-r23c
```

Once these paths are confirmed correct, it indicates that the build environment is ready, and we can proceed to the next phase.

---

## Pre-Build Preparation

Before starting the actual build, we need to complete several important preparation steps.

First, switch to the Matter project's root directory:

```bash
cd /connectedhomeip
```

Then execute the bootstrap script to initialize the build environment. This step is necessary for first-time builds:

```bash
source scripts/bootstrap.sh
```

The bootstrap process will download and configure all necessary build tools and dependencies. Similarly, this step also requires some time to complete.

---

## Build Android CHIPTool

Now we can start executing the actual build process. Use the official build script to generate the CHIPTool APK:

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

### Resolving Common Build Errors

When executing the above command, you will likely encounter the following error:

```bash
ninja: error: loading 'build.ninja': No such file or directory
```

This issue is not mentioned in the official documentation but can be resolved by manually generating the `build.ninja` file.

First, switch to the build output directory:

```bash
cd /connectedhomeip/out/android-arm64-chip-tool
```

Then execute the GN tool to generate necessary build files:

```bash
gn gen .
```

Next, return to the project root directory:

```bash
cd ../..
```

Finally, re-execute the build command:

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

### Get Build Results

After the build is complete, you can find the generated APK file at the following path:

```
out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk
```

> ##### TIP
>
> If you encounter `build.ninja` related errors during the build process, remember to manually run `gn gen .` first before continuing. This is a necessary step not mentioned in the current official documentation!
> {: .block-tip }

---

## References

- [CHIP Android Building](https://github.com/project-chip/connectedhomeip/blob/master/docs/guides/android_building.md)
- [CHIP Issue #28317](https://github.com/project-chip/connectedhomeip/issues/28317)
- [CHIP Issue #21093](https://github.com/project-chip/connectedhomeip/issues/21093)
- [CHIP Issue #32794](https://github.com/project-chip/connectedhomeip/issues/32795)
- [CHIP Docker Versions](https://github.com/project-chip/connectedhomeip/pkgs/container/chip-build-android/versions?filters%5Bversion_type%5D=tagged)