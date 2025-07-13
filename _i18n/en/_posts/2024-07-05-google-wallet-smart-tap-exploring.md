---
layout: post
title: "Google Wallet Smart Tap Deep Dive: Exploring the Future of Contactless Payments"
date: 2024-07-05 20:00:00 +0800
description: "Explore Google Wallet Smart Tap technology and how it's revolutionizing payment systems. Learn about NFC communication, terminal integration, and the future of contactless transactions."
tags: [Google Wallet, Smart Tap, NFC, Contactless Payments, Payment Systems, Mobile Payments, Digital Wallets, Payment Technology, Terminal Integration, Security]
categories: [Payments, Technology, Mobile Development, Digital Wallets]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/mika-baumeister-m7HWPWVjfJ4-unsplash.jpg
---

> This article explores the technical implementation of Google Wallet Smart Tap technology, providing insights for developers and businesses interested in contactless payment integration.

## Introduction: The Evolution of Contactless Payments

Recently, due to work requirements, I conducted in-depth research on Google Wallet Smart Tap technology. This article serves as both a personal review and a resource to help other developers understand this innovative payment technology.

## What is NFC?

NFC (Near Field Communication) is a short-range wireless communication technology that enables two devices to communicate within a few centimeters. It's widely used in payments, ticketing, data exchange, and other applications.

## Google Wallet Smart Tap Overview

Smart Tap is a proprietary communication protocol developed by Google using NFC technology. It allows users to perform fast and secure transactions and data exchanges through mobile devices on supported terminals.

> **Important Note for Terminal Providers**: If your company is implementing the Terminal side, you must obtain certification to use this protocol. I contacted Google and received the following response: "If you are a terminal provider and would like to certify your terminal for use with Google Wallet, please provide more details about your terminal, intended functionality and target country/region. The documentation needed for Smart Tap certification is locked behind an NDA. Once I have this information, my team and I will review and if the decision is to move forward with your request, we will begin the process of onboarding, starting with an NDA."

## Prerequisites

To begin Smart Tap setup, we need to complete two conditions:

1. **Create pass class and pass object(s)**
2. **Establish partnership with Smart Tap-supported terminal providers**

Currently supported Smart Tap providers include:

- Verifone
- Ingenico
- Pax
- HID
- Equinox
- XAC
- ... (and others)

## Identifiers

Before creating pass class and pass object(s), we need to understand some identifiers used by the Smart Tap protocol:

- **Redemption Issuer ID** (兌換核發機構 ID)
- **Collector ID**
- **Pass class ID**

### Issuer ID (核發機構 ID)

The Issuer ID is a unique identifier for Google Wallet card issuers, which can be found in the [Google Pay & Wallet Console](https://pay.google.com/business/console/home?hl=zh-cn).

### Redemption Issuer ID (兌換核發機構 ID)

The Redemption Issuer ID is a specific type of Issuer ID. You can think of the Redemption Issuer ID as a single merchant, while the Issuer is a "collection of merchants" platform that stores multiple merchants' pass classes.

Issuer ID can represent merchants, offer providers, shopping malls (e.g., SOGO), terminal manufacturers, etc. After pass class & object(s) are developed, they will be associated with the Redemption Issuer ID. The Issuer ID contains pass class IDs and object IDs.

| ID | Format | Notes |
|----|--------|-------|
| Class ID | `issuerId.classSuffix` | The classSuffix is a unique, developer-defined value for a specific pass class (e.g., a loyalty tier) |
| Object ID | `issuerId.objectSuffix` | The objectSuffix is a unique, developer-defined value for a specific pass object (such as a user ID) |

### Collector ID (收款方 ID)

- When a merchant's terminal supports Smart Tap, the Redemption Issuer will have a Collector ID
- The Collector ID is an 8-digit ID
- When a user touches their device to a Smart Tap-supported terminal, the terminal sends the Collector ID to the user's device. The device then uses the public key of that Collector ID to authenticate with the terminal (communication flow will be discussed later)

> **Important Notes**:
> 1. One Issuer ID can only be assigned one Collector ID
> 2. Collector ID is unique across all Issuer IDs

### Pass Class ID (票證類 ID)

Used to identify specific tiers or pass types. Uses the following format:

> `issuerId.classSuffix`

The classSuffix is a unique value defined by developers for this pass class. Object classes created through this pass class can be saved to the Google Wallet App.

> Pass Class ID belongs to a single Issuer account but can be associated with multiple Redemption Issuers

## Communication Flow

The terminal uses the Collector ID to identify itself. The Collector ID maps to a Redemption Issuer ID. When Smart Tap occurs, the terminal transmits its Collector ID to the user's device. The Google Wallet App then checks each pass class ID and Collector ID stored on the device. It finds one or more matching passes and transmits these matching passes to the terminal.

### Example 1: Single Redemption Issuer

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example1.png" title="Single Redemption Issuer communication flow" %}

The diagram shows two different Issuers:

- Issuer `2018` is the pass developer (Aggregator)
- Issuer `1990` is the merchant fooPizza (Redemption Issuer)

The Redemption Issuer - fooPizza wants to enable Smart Tap functionality for their passes. The Aggregator and Redemption Issuer must complete the following steps to enable Smart Tap for merchant terminals:

| Step | Role | Description |
|:----:|:----:|:------------|
| 1 | Aggregator | Create pass class and objects (abc and 123 in the diagram respectively). |
| 2 | Aggregator | Add the Redemption Issuer's ID to the pass class's `redemptionIssuers` property. This tells Google Wallet that Issuer ID 1990 can redeem pass objects that reference this class. |
| 3 | Redemption Issuer | Obtain Collector ID (12345678 in the diagram). |
| 4 | Redemption Issuer | Configure Collector ID 12345678 on each Smart Tap-supported terminal to be used. Any object with class ID abc and Collector ID 12345678 will be transmitted to the Reader. |

### Example 2: Multiple Redemption Issuers

A pass class can have multiple Redemption Issuers. To be able to redeem a specific pass class, the Redemption Issuer ID must be included in the `redemptionIssuers` property when creating the pass class. Each Redemption Issuer then has its own Collector ID, which is configured on terminals.

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example2.png" title="Multiple Redemption Issuers communication flow" %}

The diagram shows three different Issuers:

- Issuer `8088` is the pass developer (Aggregator)
- Issuer `1990` is the merchant fooPizza (Redemption Issuer)
- Issuer `2018` is the merchant yumPie (Redemption Issuer)

The Aggregator and Redemption Issuers must complete the following steps to enable Smart Tap for merchant terminals:

| Step | Role | Description |
|:----:|:----:|:------------|
| 1 | Aggregator | Create pass class and objects (abc and 123 in the diagram respectively). |
| 2 | Aggregator | Add Redemption Issuer IDs to the pass class's `redemptionIssuers` property. This tells Google Wallet that Issuer IDs 1990 and 2018 can redeem pass objects that reference this class. |
| 3 | Redemption Issuer | Obtain Collector IDs (12345678 for fooPizza and 18802001 for yumPie in the diagram). |
| 4 | Redemption Issuer | Configure the corresponding Collector ID on each Smart Tap-supported terminal. Any object with class ID abc and a matching Collector ID will be transmitted to the Reader. |

### Example 3: No Aggregator (Direct Issuer)

We can also use the same Issuer account to develop and issue pass classes without an Aggregator managing multiple Redemption Issuers' pass classes. To redeem a specific pass class, developers must include their Issuer ID in the class's `redemptionIssuers` property. Developers must obtain a Collector ID and configure it on Smart Tap terminals.

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example3.png" title="No Aggregator mode" %}

The pass developer must complete the following steps to enable Smart Tap for merchant terminals:

| Step | Role | Description |
|:----:|:----:|:------------|
| 1 | Pass Developer | Create pass class and objects (abc and 123 in the diagram respectively). |
| 2 | Pass Developer | Add their Issuer ID to the pass class's `redemptionIssuers` property. This tells Google Wallet that Issuer ID 2018 is authorized to redeem pass objects that reference this class. |
| 3 | Pass Developer | Obtain Collector ID (12345678 in the diagram). |
| 4 | Pass Developer | Configure the corresponding Collector ID on each Smart Tap-supported terminal. Any object with class ID abc and a matching Collector ID will be transmitted to the Reader. |

## User Experience and Behavior

The content and behavior transmitted between terminals and the Google Wallet app depend on how users interact with the Google Wallet app at that moment.

### Scenario 1: User Opens Specific Pass

| Step | Role | Description |
|:----:|:----:|:------------|
| 1 | User | Selects a specific pass in the Google Wallet app. |
| 2 | User | Touches a Smart Tap-supported contactless reader. |
| 3 | Terminal | (Collector ID matches) Pass is transmitted to terminal.<br>(Collector ID doesn't match) Pass is not transmitted to terminal. |

> If the Collector ID on the pass matches the terminal's Collector ID, the pass will be transmitted regardless of whether the pass is valid (e.g., if the pass object has expired).

### Scenario 2: Google Wallet Home Tab or Unlocked Screen View

| Step | Role | Description |
|:----:|:----:|:------------|
| 1 | User | Opens the "Home" tab in the Google Wallet app, or unlocks the device screen. |
| 2 | User | Touches a Smart Tap-supported contactless reader. |
| 3 | Terminal | (Single valid Collector ID match) Pass is transmitted to terminal.<br>(Multiple valid Collector ID matches) Shows rotating interface of valid passes and transmits the user's selected item. |

### Scenario 3: Locked Screen

| Step | Role | Description |
|:----:|:----:|:------------|
| 1 | User | Device screen is locked. |
| 2 | User | Touches a Smart Tap-supported contactless reader. |
| 3 | Terminal | (Single valid Collector ID match) Pass is transmitted to terminal.<br>(Multiple valid Collector ID matches) Shows rotating interface of valid passes and transmits the user's selected item. |

## Technical Implementation

### Pass Class Configuration

```json
{
  "issuerId": "2018",
  "classId": "2018.abc",
  "redemptionIssuers": ["1990", "2018"],
  "reviewStatus": "UNDER_REVIEW",
  "allowMultipleUsersPerObject": true,
  "redemptionChannel": "ONLINE",
  "enableSmartTap": true
}
```

### Pass Object Configuration

```json
{
  "issuerId": "2018",
  "classId": "2018.abc",
  "objectId": "2018.123",
  "state": "ACTIVE",
  "heroImage": {
    "sourceUri": {
      "uri": "https://example.com/hero.jpg"
    }
  },
  "textModulesData": [
    {
      "header": "LOYALTY POINTS",
      "body": "500 points"
    }
  ]
}
```

## Security Considerations

### 1. **Authentication Flow**

1. Terminal sends Collector ID to user device
2. Device validates Collector ID against stored passes
3. Device uses Collector ID's public key for authentication
4. Secure transmission of pass data to terminal

### 2. **Data Protection**

- Pass data is encrypted during transmission
- Collector IDs are unique and non-reusable
- Terminal authentication prevents unauthorized access

### 3. **Privacy Controls**

- Users control which passes are transmitted
- No personal data is shared without user consent
- Pass transmission is limited to matching Collector IDs

## Best Practices for Implementation

### 1. **Terminal Configuration**

```bash
# Example terminal configuration
COLLECTOR_ID=12345678
REDEMPTION_ISSUER_ID=1990
TERMINAL_TYPE=VERIFONE
LOCATION_ID=STORE_001
```

### 2. **Pass Development**

```kotlin
// Example pass creation
class SmartTapPassBuilder {
    fun createPass(
        issuerId: String,
        classSuffix: String,
        redemptionIssuers: List<String>
    ): PassClass {
        return PassClass(
            issuerId = issuerId,
            classId = "$issuerId.$classSuffix",
            redemptionIssuers = redemptionIssuers,
            enableSmartTap = true
        )
    }
}
```

### 3. **Error Handling**

```kotlin
// Example error handling
sealed class SmartTapError {
    object CollectorIdMismatch : SmartTapError()
    object PassExpired : SmartTapError()
    object TerminalNotSupported : SmartTapError()
    object NetworkError : SmartTapError()
}

fun handleSmartTapError(error: SmartTapError) {
    when (error) {
        is SmartTapError.CollectorIdMismatch -> {
            // Handle mismatch
        }
        is SmartTapError.PassExpired -> {
            // Handle expired pass
        }
        // ... other cases
    }
}
```

## Performance Considerations

| Aspect | Impact | Optimization |
|--------|--------|--------------|
| **NFC Communication** | Low latency required | Optimize data transmission size |
| **Pass Validation** | Real-time processing | Cache validation results |
| **Terminal Response** | User experience critical | Implement timeout handling |
| **Battery Usage** | NFC consumes power | Minimize active NFC time |

## Common Issues and Solutions

### 1. **Collector ID Mismatch**

**Problem**: Pass not transmitting to terminal
**Solution**: Verify Collector ID configuration on both terminal and pass

### 2. **Pass Not Found**

**Problem**: User has pass but terminal doesn't receive it
**Solution**: Check pass class redemptionIssuers configuration

### 3. **Terminal Not Responding**

**Problem**: NFC communication fails
**Solution**: Verify terminal certification and NFC hardware

## Future Developments

### 1. **Enhanced Security**

- Biometric authentication integration
- Advanced encryption protocols
- Real-time fraud detection

### 2. **Expanded Use Cases**

- Transportation systems
- Access control
- Event ticketing
- Healthcare applications

### 3. **Cross-Platform Integration**

- iOS compatibility
- Wearable device support
- IoT device integration

## Related Technologies

- **NFC Standards**: ISO/IEC 14443, ISO/IEC 7816
- **Payment Protocols**: EMV, PCI DSS
- **Mobile Platforms**: Android HCE, iOS Core NFC
- **Security Standards**: FIDO, OAuth 2.0

## Conclusion

Google Wallet Smart Tap represents a significant advancement in contactless payment technology, offering secure, fast, and user-friendly transaction experiences. Understanding the technical implementation and communication flow is essential for developers and businesses looking to integrate this technology.

Key benefits of Smart Tap include:

- **Enhanced Security**: Multi-layered authentication and encryption
- **Improved User Experience**: Seamless, fast transactions
- **Flexible Integration**: Support for multiple terminal providers
- **Scalable Architecture**: Easy addition of new merchants and passes

As contactless payments continue to grow in popularity, Smart Tap technology will play an increasingly important role in shaping the future of digital payments.

## Related Articles

- [Mobile Payment Security Best Practices](/2024-12-01-google-adsense/)
- [NFC Technology Implementation Guide](/2024-07-16-how-to-build-chiptool-for-android/)
- [Digital Wallet Development](/2024-07-23-getting-started-with-github-container-registry/)
