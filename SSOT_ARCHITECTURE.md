# SSOT Architecture Documentation

## Overview
This document describes the Single Source of Truth (SSOT) architecture for the ScaleOps6 platform, ensuring consistent data across all 96 subcomponents.

## Problem Solved
Previously, the system had **multiple conflicting data sources**:
- SSOT registry (server-side)
- Client-side hardcoded template mappings
- Various scattered configuration files

This caused **misalignment** where the UI displayed different templates than what the SSOT defined.

## Architecture Principles

### 1. Single Source of Truth
`core/complete-ssot-registry.js` is the **authoritative source** for all subcomponent data.

### 2. Server Authority
The server owns and serves SSOT data through the API. No client-side overrides are permitted.

### 3. Client Rendering
The client renders data directly from the API response without modifications.

### 4. Validation at Boundaries
Data is validated at three points:
- **Generation**: When SSOT is created
- **API**: When server serves data
- **Render**: When client displays data

### 5. Fail Fast
Misalignments are detected immediately and logged for correction.

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│  Source Data Files                                       │
│  - agent-library.js                                      │
│  - educational-content.js                                │
│  - agent-generated-questions-complete.js                 │
│  - subcomponent-names-mapping.js                         │
│  - agent-correct-mapping.js                              │
│  - core/template-registry.js                             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  SSOT Generator                                          │
│  core/generate-complete-ssot.js                          │
│  - Ingests all source data                               │
│  - Validates consistency                                 │
│  - Generates complete registry                           │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  SSOT Registry (Generated)                               │
│  core/complete-ssot-registry.js                          │
│  - 96 subcomponents                                      │
│  - Complete data for each                                │
│  - Validation metadata                                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Server API                                              │
│  server-with-backend.js                                  │
│  GET /api/subcomponents/:id                              │
│  - Loads from SSOT registry                              │
│  - Returns complete data                                 │
│  - Includes validation metadata                          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Client UI                                               │
│  subcomponent-detail.html                                │
│  - Fetches from API                                      │
│  - Validates SSOT alignment                              │
│  - Renders without overrides                             │
└─────────────────────────────────────────────────────────┘
```

## File Structure

### Core Files

#### `core/template-registry.js`
- Maps domain names to templates
- Ensures domain-template alignment
- Provides validation functions

#### `core/generate-complete-ssot.js`
- Generates the SSOT registry
- Integrates all source data
- Validates consistency

#### `core/complete-ssot-registry.js` (Generated)
- The authoritative SSOT
- Contains all 96 subcomponents
- Includes validation metadata

#### `core/validate-ssot-alignment.js`
- Validates SSOT integrity
- Checks domain consistency
- Verifies template alignment

### Server Files

#### `server-with-backend.js`
- Loads SSOT registry
- Serves data via API
- No data transformation

### Client Files

#### `subcomponent-detail.html`
- Fetches from API
- Validates SSOT alignment
- Renders directly from API data

## Key Concepts

### Domain Alignment
Every subcomponent has a **domain name** (e.g., "Jobs to be Done"). This domain name must be consistent across:
- Agent domain
- Education title
- Workspace domain
- Analysis domain
- Resources domain
- Outputs domain

### Template Consistency
Templates must match between:
- Resources tab
- Output tab
- Template registry

### Validation Metadata
Every API response includes `_ssot` metadata:
```json
{
  "_ssot": {
    "version": "2.0.0",
    "lastValidated": "2025-10-06T19:00:00.000Z",
    "isComplete": true,
    "dataSource": "complete-ssot-registry"
  }
}
```

## Usage

### Regenerating SSOT
When source data changes:
```bash
node core/generate-complete-ssot.js
```

### Validating SSOT
Before commits:
```bash
node core/validate-ssot-alignment.js
```

For specific subcomponent:
```bash
node core/validate-ssot-alignment.js 2-1
```

### Adding New Templates
1. Update `core/template-registry.js`
2. Regenerate SSOT: `node core/generate-complete-ssot.js`
3. Validate: `node core/validate-ssot-alignment.js`
4. Restart server

## Validation Checks

The validation system checks:

1. **Domain Consistency**: All sections use the same domain name
2. **Templates Exist**: Every domain has templates defined
3. **Templates Match**: Resources and outputs have identical templates
4. **Completeness**: Subcomponent has all required data

## Prevention Measures

### Pre-commit Hook
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
node core/validate-ssot-alignment.js
if [ $? -ne 0 ]; then
    echo "❌ SSOT validation failed. Commit rejected."
    exit 1
fi
```

### CI/CD Pipeline
Add to `.github/workflows/validate-ssot.yml`:
```yaml
name: Validate SSOT
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: node core/validate-ssot-alignment.js
```

## Troubleshooting

### Templates Not Showing
1. Check server logs for SSOT loading
2. Validate SSOT: `node core/validate-ssot-alignment.js`
3. Check browser console for validation errors
4. Verify API response includes templates

### Domain Mismatch
1. Check `agent-subcomponent-mapping.js` for correct domain
2. Update `core/template-registry.js` to match domain
3. Regenerate SSOT
4. Validate

### Client Override Issues
1. Ensure `fix-remove-three-templates.js` is NOT loaded
2. Check browser console for SSOT validation
3. Verify API response has `_ssot` metadata

## Success Metrics

After implementation:
- ✅ 100% domain alignment across all 96 subcomponents
- ✅ Zero template mismatches between Resources and Output tabs
- ✅ Single source of truth - no client-side overrides
- ✅ Automated validation preventing future regressions
- ✅ Clear audit trail of data sources

## Migration Notes

### What Changed
1. **Removed**: `fix-remove-three-templates.js` (client-side override)
2. **Added**: `core/template-registry.js` (domain-aligned templates)
3. **Updated**: `core/generate-complete-ssot.js` (template integration)
4. **Updated**: `server-with-backend.js` (SSOT consumption)
5. **Updated**: `subcomponent-detail.html` (SSOT validation)

### Backward Compatibility
The server still loads legacy files for backward compatibility but prioritizes SSOT data.

## Future Enhancements

1. **Real-time Validation**: WebSocket-based validation alerts
2. **Visual Diff Tool**: Compare SSOT vs rendered data
3. **Automated Fixes**: Auto-correct minor misalignments
4. **Performance Monitoring**: Track SSOT load times
5. **Version Control**: Track SSOT changes over time

## Support

For issues or questions:
1. Check validation output: `node core/validate-ssot-alignment.js`
2. Review server logs for SSOT loading
3. Check browser console for client-side validation
4. Refer to this documentation

---

**Last Updated**: 2025-10-06  
**Version**: 1.0.0  
**Status**: Production Ready