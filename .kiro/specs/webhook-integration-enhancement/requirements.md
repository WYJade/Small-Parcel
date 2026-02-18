# Requirements Document

## Introduction

本文档定义了OMS系统Webhook集成增强功能的需求。该功能旨在改进现有的Webhook配置页面，使其能够支持多种复杂的第三方系统集成场景，包括LMS、HelloFresh、Uber和Triaga等客户的特定集成需求。

增强后的系统将提供灵活的配置选项，支持多种认证方式（Basic Auth、API Key、Bearer Token等）、多种传输协议（HTTP/HTTPS Webhook、SFTP）、环境切换（Dev/Staging/Prod）以及自定义字段映射功能。

## Glossary

- **Webhook_System**: OMS系统中负责管理和执行Webhook配置的子系统
- **Configuration_Form**: 用于创建和编辑Webhook配置的用户界面表单
- **Integration_Scenario**: 特定第三方系统的集成配置模式，包含认证、传输协议和字段映射等信息
- **Authentication_Method**: 用于验证Webhook请求身份的机制（如Basic Auth、API Key、Bearer Token等）
- **Transport_Protocol**: 数据传输方式（HTTP/HTTPS Webhook或SFTP）
- **Environment**: 部署环境类型（Dev、Staging、Prod）
- **Field_Mapping**: 将OMS系统内部字段映射到第三方系统所需字段的配置
- **Tracking_Number**: 用于追踪包裹的唯一标识符
- **BillingRef**: OMS系统中的计费参考字段
- **Airbillno**: LSO系统的运单号字段
- **SFTP**: Secure File Transfer Protocol，安全文件传输协议
- **Base64_Encoding**: 一种将二进制数据编码为ASCII字符串的编码方式
- **API_Endpoint**: 第三方系统提供的API接口地址
- **Custom_Header**: HTTP请求中的自定义头部信息
- **Validation_Rule**: 用于验证表单输入数据有效性的规则

## Requirements

### Requirement 1: 多种认证方式支持

**User Story:** 作为系统管理员，我希望能够配置多种认证方式，以便与不同安全要求的第三方系统集成。

#### Acceptance Criteria

1. THE Configuration_Form SHALL provide authentication method selection including None, Basic Auth, Bearer Token, API Key, OAuth 2.0, and JWT
2. WHEN Basic Auth is selected, THE Configuration_Form SHALL display username and password input fields
3. WHEN Basic Auth credentials are saved, THE Webhook_System SHALL encode the credentials using Base64_Encoding before storage
4. WHEN API Key authentication is selected, THE Configuration_Form SHALL display API key input field and header name field
5. WHEN Bearer Token is selected, THE Configuration_Form SHALL display token input field
6. THE Configuration_Form SHALL validate that authentication credentials are provided when a non-None authentication method is selected

### Requirement 2: 多种传输协议支持

**User Story:** 作为系统管理员，我希望能够选择不同的传输协议，以便适应不同第三方系统的技术要求。

#### Acceptance Criteria

1. THE Configuration_Form SHALL provide transport protocol selection including HTTP Webhook, HTTPS Webhook, and SFTP
2. WHEN HTTP or HTTPS Webhook is selected, THE Configuration_Form SHALL display webhook URL input field
3. WHEN SFTP is selected, THE Configuration_Form SHALL display SFTP server, username, port, and directory path input fields
4. WHEN SFTP is selected, THE Configuration_Form SHALL hide HTTP-specific fields such as HTTP method and webhook URL
5. THE Webhook_System SHALL validate SFTP connection parameters before saving the configuration

### Requirement 3: 环境配置支持

**User Story:** 作为系统管理员，我希望能够为不同环境配置不同的Webhook端点，以便在开发、测试和生产环境中使用不同的配置。

#### Acceptance Criteria

1. THE Configuration_Form SHALL provide environment selection including Dev, Staging, and Prod
2. WHEN an environment is selected, THE Configuration_Form SHALL allow configuration of environment-specific webhook URLs or SFTP endpoints
3. THE Webhook_System SHALL store separate configurations for each environment
4. WHEN executing a webhook, THE Webhook_System SHALL use the configuration corresponding to the current active environment
5. THE Configuration_Form SHALL display a clear indicator showing which environment is currently being configured

### Requirement 4: 自定义字段映射

**User Story:** 作为系统管理员，我希望能够自定义字段映射，以便将OMS系统的内部字段映射到第三方系统所需的字段格式。

#### Acceptance Criteria

1. THE Configuration_Form SHALL provide a tracking number source field selection including Airbillno and BillingRef
2. WHEN BillingRef is selected as tracking number source, THE Webhook_System SHALL use the BillingRef field value as the tracking number in webhook payloads
3. WHEN Airbillno is selected as tracking number source, THE Webhook_System SHALL use the Airbillno field value as the tracking number in webhook payloads
4. THE Configuration_Form SHALL allow users to define custom field mappings through a mapping configuration interface
5. THE Webhook_System SHALL apply the configured field mappings when constructing webhook payloads

### Requirement 5: 客户代码过滤

**User Story:** 作为系统管理员，我希望能够配置客户代码过滤规则，以便只向特定客户的订单触发Webhook。

#### Acceptance Criteria

1. THE Configuration_Form SHALL provide a customer code input field supporting multiple comma-separated values
2. WHEN customer codes are configured, THE Webhook_System SHALL only trigger webhooks for orders matching the specified customer codes
3. WHEN no customer codes are configured, THE Webhook_System SHALL trigger webhooks for all orders matching other criteria
4. THE Configuration_Form SHALL validate that customer codes follow the expected format
5. THE Webhook_System SHALL log skipped webhook executions when orders do not match the customer code filter

### Requirement 6: LMS集成场景支持

**User Story:** 作为系统管理员，我希望能够配置LMS集成，以便向Last Mile Solutions推送订单追踪信息。

#### Acceptance Criteria

1. WHEN configuring LMS integration, THE Configuration_Form SHALL support separate Dev and Prod webhook URL configuration
2. WHEN configuring LMS integration, THE Configuration_Form SHALL support Basic Auth with username "ops@gros1ale.com" and password "DSGFP9LxW4DVa"
3. WHEN LMS integration is active, THE Webhook_System SHALL use BillingRef as the tracking number instead of Airbillno
4. THE Webhook_System SHALL encode LMS authentication credentials using Base64_Encoding before sending requests
5. THE Configuration_Form SHALL provide a preset template for LMS integration that pre-fills common configuration values

### Requirement 7: HelloFresh集成场景支持

**User Story:** 作为系统管理员，我希望能够配置HelloFresh集成，以便通过SFTP向Project44推送追踪数据。

#### Acceptance Criteria

1. WHEN configuring HelloFresh integration, THE Configuration_Form SHALL support SFTP protocol selection
2. WHEN configuring HelloFresh integration, THE Configuration_Form SHALL support multiple customer codes (518276, 518278, 518275, 518277)
3. WHEN HelloFresh integration is active, THE Webhook_System SHALL connect to SFTP server "ftp.getcenviy.com" on port 22
4. WHEN HelloFresh integration is active, THE Webhook_System SHALL upload tracking data files to directory "/upload/tilloaeesh/updates"
5. THE Configuration_Form SHALL provide a preset template for HelloFresh integration that pre-fills SFTP configuration values

### Requirement 8: Uber集成场景支持

**User Story:** 作为系统管理员，我希望能够配置Uber集成，以便向Uber的package-tracking API推送异步追踪状态更新。

#### Acceptance Criteria

1. WHEN configuring Uber integration, THE Configuration_Form SHALL support Uber package-tracking API endpoint configuration
2. WHEN Uber integration is active, THE Webhook_System SHALL include delivery verification fields for photo and signature image links
3. THE Configuration_Form SHALL provide a link to Uber developer documentation for reference
4. THE Webhook_System SHALL format webhook payloads according to Uber API specifications
5. THE Configuration_Form SHALL provide a preset template for Uber integration that pre-fills API endpoint and required fields

### Requirement 9: Triaga集成场景支持

**User Story:** 作为系统管理员，我希望能够配置Triaga集成，以便向Triaga系统推送事件数据。

#### Acceptance Criteria

1. WHEN configuring Triaga integration, THE Configuration_Form SHALL support customer code 618341
2. WHEN configuring Triaga integration, THE Configuration_Form SHALL support separate Staging and Prod URL configuration
3. WHEN Triaga integration is active, THE Webhook_System SHALL send API key through x-api-key header
4. THE Configuration_Form SHALL support Staging URL "https://hkdk.events/869ccxkk1672tq" and Prod URL "https://hkdk.events/lxegsmzv0wmeyjhkjb2dfhfghg"
5. THE Configuration_Form SHALL provide a preset template for Triaga integration that pre-fills environment URLs and authentication method

### Requirement 10: 表单验证和错误提示

**User Story:** 作为系统管理员，我希望表单能够实时验证输入并提供清晰的错误提示，以便快速发现和修正配置错误。

#### Acceptance Criteria

1. WHEN a required field is empty, THE Configuration_Form SHALL display an error message indicating the field is required
2. WHEN a URL field contains an invalid URL format, THE Configuration_Form SHALL display an error message indicating invalid URL format
3. WHEN authentication credentials are incomplete for the selected authentication method, THE Configuration_Form SHALL prevent form submission
4. WHEN SFTP port is not a valid number between 1 and 65535, THE Configuration_Form SHALL display an error message
5. THE Configuration_Form SHALL display validation errors inline below the corresponding input field
6. THE Configuration_Form SHALL disable the Save button when validation errors exist

### Requirement 11: 配置模板和预设

**User Story:** 作为系统管理员，我希望能够使用预设模板快速配置常见的集成场景，以便减少手动配置的时间和错误。

#### Acceptance Criteria

1. THE Configuration_Form SHALL provide a template selection dropdown including LMS, HelloFresh, Uber, Triaga, and Custom options
2. WHEN a template is selected, THE Configuration_Form SHALL auto-fill fields with template-specific default values
3. WHEN a template is selected, THE Configuration_Form SHALL allow users to modify auto-filled values
4. THE Webhook_System SHALL store the selected template name with the configuration for future reference
5. THE Configuration_Form SHALL display a description of each template when hovering over template options

### Requirement 12: 自定义HTTP头部支持

**User Story:** 作为系统管理员，我希望能够配置自定义HTTP头部，以便满足第三方系统的特殊要求。

#### Acceptance Criteria

1. THE Configuration_Form SHALL provide a custom headers input field accepting JSON format
2. WHEN custom headers are provided, THE Webhook_System SHALL validate the JSON format before saving
3. WHEN executing a webhook, THE Webhook_System SHALL include all configured custom headers in the HTTP request
4. THE Configuration_Form SHALL display an error message when custom headers JSON is malformed
5. THE Configuration_Form SHALL provide examples of common custom header formats in placeholder text

### Requirement 13: Webhook测试功能

**User Story:** 作为系统管理员，我希望能够在保存配置前测试Webhook，以便验证配置的正确性。

#### Acceptance Criteria

1. THE Configuration_Form SHALL provide a "Test Webhook" button
2. WHEN the Test Webhook button is clicked, THE Webhook_System SHALL send a test payload to the configured endpoint
3. WHEN the test succeeds, THE Configuration_Form SHALL display a success message with response status code
4. WHEN the test fails, THE Configuration_Form SHALL display an error message with failure reason
5. THE Webhook_System SHALL use the currently configured authentication and transport settings for the test
6. THE Configuration_Form SHALL allow testing even when the configuration has not been saved yet

### Requirement 14: 配置信息分组和布局

**User Story:** 作为系统管理员，我希望配置表单有清晰的信息分组和布局，以便快速找到需要配置的选项。

#### Acceptance Criteria

1. THE Configuration_Form SHALL organize fields into logical sections including Basic Information, Transport Configuration, Authentication Configuration, Field Mapping, and Advanced Options
2. THE Configuration_Form SHALL display section titles with clear visual separation between sections
3. THE Configuration_Form SHALL use consistent spacing and alignment for all form fields
4. THE Configuration_Form SHALL display help text or tooltips for complex configuration options
5. THE Configuration_Form SHALL support scrolling when content exceeds viewport height while keeping the header and action buttons visible

### Requirement 15: 数据持久化和检索

**User Story:** 作为系统管理员，我希望配置能够被正确保存和检索，以便在需要时查看和修改现有配置。

#### Acceptance Criteria

1. WHEN the Save button is clicked, THE Webhook_System SHALL persist all configuration data to the database
2. WHEN a saved configuration is opened for editing, THE Configuration_Form SHALL populate all fields with the stored values
3. THE Webhook_System SHALL encrypt sensitive data such as passwords and API keys before storage
4. WHEN retrieving a configuration, THE Webhook_System SHALL decrypt sensitive data for display in the form
5. THE Webhook_System SHALL maintain an audit log of all configuration changes including timestamp and user information

## Non-Functional Requirements

### Performance

1. THE Configuration_Form SHALL load and display within 2 seconds under normal network conditions
2. THE Webhook_System SHALL validate form inputs within 500 milliseconds of user input
3. THE Webhook_System SHALL execute test webhooks within 10 seconds or display a timeout message

### Usability

1. THE Configuration_Form SHALL follow the existing OMS design system and visual style
2. THE Configuration_Form SHALL be responsive and usable on screen widths of 1280px and above
3. THE Configuration_Form SHALL provide clear labels and placeholder text for all input fields
4. THE Configuration_Form SHALL use consistent terminology throughout the interface

### Security

1. THE Webhook_System SHALL encrypt all authentication credentials at rest using AES-256 encryption
2. THE Webhook_System SHALL transmit sensitive data only over HTTPS connections
3. THE Webhook_System SHALL validate and sanitize all user inputs to prevent injection attacks
4. THE Webhook_System SHALL implement role-based access control for webhook configuration management

### Compatibility

1. THE Configuration_Form SHALL be compatible with modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+
2. THE Webhook_System SHALL integrate with the existing OMS backend API architecture
3. THE Configuration_Form SHALL use the existing Ant Design component library for UI consistency

### Maintainability

1. THE Configuration_Form SHALL use TypeScript for type safety and code maintainability
2. THE Webhook_System SHALL follow the existing OMS codebase structure and conventions
3. THE Configuration_Form SHALL include inline comments for complex logic
4. THE Webhook_System SHALL provide clear error messages and logging for troubleshooting

## Technical Constraints

1. The implementation MUST use React 18+ and TypeScript for the frontend
2. The implementation MUST use Ant Design 5+ component library for UI components
3. The implementation MUST integrate with the existing Express.js backend API
4. The implementation MUST store configuration data in the existing PostgreSQL database
5. The implementation MUST follow the existing project folder structure (frontend/src/pages/Webhook/)
6. The implementation MUST be compatible with the existing authentication and authorization system
7. The implementation MUST support the existing OMS deployment infrastructure
