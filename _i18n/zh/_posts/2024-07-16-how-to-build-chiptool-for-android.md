---
layout: post
title: "How to Build CHIPTool for Android: Complete Guide to Matter Protocol Development"
date: 2024-07-16 19:50:00 +0800
description: "Learn how to build CHIPTool APK for Android from source code. Step-by-step guide for Matter protocol development, Docker setup, and troubleshooting common build issues."
tags: [CHIP, Matter, Android Development, IoT, Smart Home, Connected Home over IP, Docker, Build Process, Protocol Development, Home Automation]
categories: [Android Development, IoT, Smart Home, Development Tools, Protocol Development]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/matter.jpg
---

> This comprehensive guide covers building CHIPTool for Android, including Docker setup, source code compilation, and troubleshooting common issues encountered during the build process.

## Introduction: Understanding Matter Protocol

Recently, due to work requirements, I researched how to build CHIPTool Android APK from source code. While official documentation provides basic workflows, I encountered several undocumented errors during actual implementation that required significant time to resolve. This article aims to help you avoid these pitfalls and serves as a convenient reference for future review.

## What is Matter Protocol?

Matter (formerly Project CHIP, Connected Home over IP) is an open-source connectivity standard designed to improve interoperability and compatibility between smart home devices. This standard was initiated by the Connectivity Standards Alliance (CSA), with members including Apple, Google, Amazon, and Zigbee, among other industry leaders.

Matter emphasizes security, usability, and developer-friendliness, supporting Thread and Wi-Fi communication protocols as the foundation for building cross-brand smart homes.

### Key Features of Matter Protocol

- **Interoperability**: Works across different brands and ecosystems
- **Security**: Built-in security features for device communication
- **Multiple Transport Layers**: Supports Thread, Wi-Fi, and Ethernet
- **Open Standard**: Vendor-neutral and open-source
- **Developer-Friendly**: Comprehensive SDKs and tools

## Prerequisites and Environment Setup

Since building directly in a local environment can easily disrupt settings (such as ANDROID_HOME, ANDROID_NDK_HOME), I recommend using the official CHIP Docker image to avoid environment pollution.

### Required Tools

- **Docker**: For containerized build environment
- **Git**: For source code management
- **Sufficient Disk Space**: At least 10GB for the complete build

### System Requirements

| Component | Minimum Requirement | Recommended |
|-----------|-------------------|-------------|
| **RAM** | 8GB | 16GB+ |
| **Storage** | 10GB free space | 20GB+ |
| **CPU** | 4 cores | 8 cores+ |
| **OS** | Linux/macOS/Windows | Linux |

## Step 1: Pull Docker Image

This step will take some time - perfect for grabbing a coffee while it downloads.

```bash
docker pull ghcr.io/project-chip/chip-build-android:latest
```

## Step 2: Run Container

```bash
docker run -it -v ~/workspace/connectedhomeip:/connectedhomeip ghcr.io/project-chip/chip-build-android:latest
```

After execution, you'll have a clean, ready-to-use development environment for building CHIPTool.

## Step 3: Configure Git Safe Directories

Mark directories as safe for git operations:

```bash
git config --global --add safe.directory /connectedhomeip
git config --global --add safe.directory /connectedhomeip/third_party/pigweed/repo
```

## Step 4: Download Source Code and Submodules

The data volume is very large, so this step may take a while. You can handle other tasks or take a nap while it downloads.

```bash
git clone https://github.com/project-chip/connectedhomeip.git
cd connectedhomeip
git submodule sync && git submodule update --init
```

### Understanding the Repository Structure

```
connectedhomeip/
├── examples/           # Example applications
│   └── chip-tool/     # CHIPTool application
├── src/               # Core Matter implementation
├── third_party/       # Third-party dependencies
├── scripts/           # Build and utility scripts
└── docs/              # Documentation
```

## Step 5: Accept Android SDK Licenses

If you don't accept licenses first, the build process will fail with errors like:

```bash
> Failed to install the following Android SDK packages as some licences have not been accepted.
> build-tools;30.0.2 Android SDK Build-Tools 30.0.2
> platforms;android-31 Android SDK Platform 31
```

To avoid this issue, first add the path to environment variables:

```bash
export PATH=$PATH:/opt/android/sdk/tools/bin
```

Then accept all licenses:

```bash
sdkmanager --licenses
```

During the process, input `y` or `yes` as needed.

## Step 6: Verify Environment Variables

One of the biggest advantages of using the official Docker image is that SDK and NDK are already configured, eliminating the need for manual setup:

```bash
echo $ANDROID_HOME
# /opt/android/sdk

echo $ANDROID_NDK_HOME
# /opt/android/android-ndk-r23c
```

## Step 7: Prepare for Build

1. **Switch to Matter project directory**:

```bash
cd /connectedhomeip
```

2. **Execute bootstrap (required for first time)**:

```bash
source scripts/bootstrap.sh
```

This step will also take some time.

## Step 8: Build Android CHIPTool Using Official Script

1. **Execute build script**:

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

However, it will fail at the end with the following error:

```bash
ninja: error: loading 'build.ninja': No such file or directory
```

This appears to be a missing step in the official documentation. My solution is to manually execute the following command in the target directory to generate `build.ninja`:

```bash
cd /connectedhomeip/out/android-arm64-chip-tool
gn gen .
```

Then return to the project root:

```bash
cd ../..
```

Execute the build again:

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

After completion, you can find the APK at:

```
out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk
```

> **Pro Tip**: If you encounter `build.ninja` related errors during the build process, remember to manually run `gn gen .` first before continuing. This is a necessary step not mentioned in the current official documentation!

## Advanced Build Configuration

### Custom Build Targets

You can build for different architectures:

```bash
# ARM64 (recommended for most devices)
./scripts/build/build_examples.py --target android-arm64-chip-tool build

# ARM32 (for older devices)
./scripts/build/build_examples.py --target android-arm32-chip-tool build

# x86 (for emulators)
./scripts/build/build_examples.py --target android-x64-chip-tool build
```

### Debug vs Release Builds

```bash
# Debug build (default)
./scripts/build/build_examples.py --target android-arm64-chip-tool build

# Release build
./scripts/build/build_examples.py --target android-arm64-chip-tool build --release
```

### Build with Custom Options

```bash
# Build with specific features enabled
./scripts/build/build_examples.py --target android-arm64-chip-tool build \
  --enable-ble \
  --enable-wifi \
  --enable-thread
```

## Troubleshooting Common Issues

### Issue 1: Build.ninja Missing

**Problem**: `ninja: error: loading 'build.ninja': No such file or directory`

**Solution**: 
```bash
cd /connectedhomeip/out/android-arm64-chip-tool
gn gen .
cd ../..
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

### Issue 2: SDK License Not Accepted

**Problem**: Build fails with license acceptance errors

**Solution**:
```bash
export PATH=$PATH:/opt/android/sdk/tools/bin
sdkmanager --licenses
```

### Issue 3: Insufficient Memory

**Problem**: Build fails due to memory constraints

**Solution**:
```bash
# Increase swap space or use a machine with more RAM
# Consider building with fewer parallel jobs
./scripts/build/build_examples.py --target android-arm64-chip-tool build --jobs 2
```

### Issue 4: Network Timeout

**Problem**: Git submodule update fails

**Solution**:
```bash
# Retry with increased timeout
git config --global http.postBuffer 524288000
git submodule sync && git submodule update --init
```

## Testing the Built APK

### Install on Device

```bash
# Install via ADB
adb install out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk

# Or transfer and install manually
adb push out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk /sdcard/
```

### Verify Installation

```bash
# Check if app is installed
adb shell pm list packages | grep chip

# Launch the app
adb shell am start -n com.matter.example.chip.tool/.MainActivity
```

## Development Workflow

### 1. **Making Changes**

```bash
# Edit source code in your local workspace
# Changes are reflected in the Docker container via volume mount
```

### 2. **Incremental Builds**

```bash
# Rebuild only changed components
./scripts/build/build_examples.py --target android-arm64-chip-tool build --incremental
```

### 3. **Clean Build**

```bash
# Clean all build artifacts
./scripts/build/build_examples.py --target android-arm64-chip-tool clean
```

## Performance Optimization

### Build Time Optimization

| Optimization | Command | Impact |
|--------------|---------|--------|
| **Parallel Build** | `--jobs 8` | Faster compilation |
| **Incremental Build** | `--incremental` | Skip unchanged files |
| **CCache** | `--enable-ccache` | Cache compiled objects |
| **Distributed Build** | `--distributed` | Use multiple machines |

### Memory Optimization

```bash
# Reduce memory usage during build
export MAKEFLAGS="-j2"
./scripts/build/build_examples.py --target android-arm64-chip-tool build --jobs 2
```

## Best Practices

### 1. **Use Docker for Consistency**

- Ensures reproducible builds across different environments
- Avoids conflicts with local Android SDK installations
- Provides isolated development environment

### 2. **Regular Updates**

```bash
# Update source code regularly
git pull origin master
git submodule update --init --recursive
```

### 3. **Backup Important Configurations**

```bash
# Save your build configuration
cp ~/.gn /backup/gn_config
cp ~/.gclient /backup/gclient_config
```

### 4. **Monitor Build Logs**

```bash
# Save build logs for debugging
./scripts/build/build_examples.py --target android-arm64-chip-tool build 2>&1 | tee build.log
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Build CHIPTool
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive
      
      - name: Build CHIPTool
        run: |
          docker pull ghcr.io/project-chip/chip-build-android:latest
          docker run -v ${{ github.workspace }}:/connectedhomeip \
            ghcr.io/project-chip/chip-build-android:latest \
            bash -c "cd /connectedhomeip && \
                     source scripts/bootstrap.sh && \
                     ./scripts/build/build_examples.py --target android-arm64-chip-tool build"
      
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: chiptool-apk
          path: out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk
```

## Related Technologies

- **Thread Protocol**: Low-power mesh networking
- **Wi-Fi**: High-bandwidth communication
- **Bluetooth LE**: Device discovery and pairing
- **Zigbee**: Legacy smart home protocol

## Conclusion

Building CHIPTool for Android from source code is a comprehensive process that requires careful attention to environment setup and build configuration. Using the official Docker image significantly simplifies the process and ensures consistency across different development environments.

Key takeaways:

- **Use Docker**: Avoid environment conflicts and ensure reproducibility
- **Accept Licenses**: Don't skip the Android SDK license acceptance step
- **Handle Build.ninja**: Manually generate build files when needed
- **Monitor Resources**: Ensure sufficient memory and storage for builds
- **Follow Best Practices**: Use incremental builds and proper error handling

This guide should help you successfully build CHIPTool and contribute to the Matter protocol ecosystem.

## References

- [CHIP Android Building](https://github.com/project-chip/connectedhomeip/blob/master/docs/guides/android_building.md)
- [CHIP Issue #28317](https://github.com/project-chip/connectedhomeip/issues/28317)
- [CHIP Issue #21093](https://github.com/project-chip/connectedhomeip/issues/21093)
- [CHIP Issue #32794](https://github.com/project-chip/connectedhomeip/issues/32795)
- [CHIP Docker Versions](https://github.com/project-chip/connectedhomeip/pkgs/container/chip-build-android/versions?filters%5Bversion_type%5D=tagged)

## Related Articles

- [Matter Protocol Overview](/2024-07-05-google-wallet-smart-tap-exploring/)
- [Android Development Best Practices](/2024-01-11-setup-development-environment-on-a-new-macos/)
- [IoT Development Guide](/2024-07-23-getting-started-with-github-container-registry/)
