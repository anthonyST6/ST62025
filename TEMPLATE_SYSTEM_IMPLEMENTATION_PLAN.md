# Template System Complete Redesign - Implementation Plan
**Status**: Ready for Implementation  
**Approach**: Complete Architectural Redesign  
**Timeline**: 16-24 hours (2-3 days focused effort)  
**Scope**: All 96 subcomponents with permanent structure + dynamic data pattern

---

## PHASE 1: STRUCTURAL FIX (2-3 hours)

### Task 1.1: Extract Template Routes from console.log

**Location**: `server.js` lines 3880-4141

**Current Problem**:
- Lines 3894-4132 contain template API routes INSIDE the console.log template literal
- Missing closing backtick at line 3893
- Server cannot start; routes are unreachable

**Solution**:
1. Close console.log properly at line 3893 with backtick
2. Move all template routes (lines 3894-4132) OUTSIDE the console.log
3. Place routes after the `});` that closes the app.listen callback

**Verification**:
- [ ] Server starts without syntax errors
- [ ] All 7 template API routes are accessible
- [ ] `GET /api/templates` returns all 96 templates
- [ ] `GET /api/templates/count` returns 96
- [ ] Individual template retrieval works

---

## PHASE 2: TEMPLATE-ANALYSIS FIELD MAPPING (3-4 hours)

### Task 2.1: Create Field Mapping Configuration

**File**: `scaleops6-platform/template-field-mapping.js`

**Purpose**: Define how analysis output fields map to template fields

**Structure**:
```javascript
const FIELD_MAPPING = {
    '1-1': {  // Problem Statement
        'score': 'overall_score',
        'detailedScores.clarity': 'problem_clarity_score',
        'detailedScores.validation': 'validation_score',
        'recommendations[0].area': 'primary_recommendation',
        'recommendations[0].impact': 'recommendation_impact'
    },
    '1-2': {  // Mission Statement
        'score': 'overall_score',
        'detailedScores.alignment': 'alignment_score',
        // ... more mappings
    },
    // ... mappings for all 96 subcomponents
};
```

**Key Mappings**:
- Analysis score → Template overall_score field
- Detailed scores → Specific section scores
- Recommendations → Recommendation fields
- Insights → Supporting evidence fields

### Task 2.2: Create Field Mapping Engine

**File**: `scaleops6-platform/template-field-mapper.js`

**Functionality**:
```javascript
class TemplateFieldMapper {
    mapAnalysisToTemplate(analysisData, subcomponentId) {
        // Get mapping configuration for this subcomponent
        // Extract values from analysis using dot notation
        // Return mapped data object
    }
    
    getUnmappedFields(subcomponentId) {
        // Return fields that don't have analysis data
        // These will be left empty for user to fill
    }
}
```

---

## PHASE 3: DATABASE PERSISTENCE LAYER (3-4 hours)

### Task 3.1: Create Database Schema

**File**: `scaleops6-platform/template-database-schema.sql`

**New Tables**:

```sql
-- Store template instances (user-specific template data)
CREATE TABLE template_instances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    subcomponent_id TEXT NOT NULL,
    template_id TEXT NOT NULL,
    analysis_id INTEGER,
    data JSON NOT NULL,
    format TEXT DEFAULT 'json',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, subcomponent_id)
);

-- Store user customizations to templates
CREATE TABLE template_customizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_instance_id INTEGER NOT NULL,
    field_name TEXT NOT NULL,
    original_value TEXT,
    customized_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id)
);

-- Track template versions for history
CREATE TABLE template_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_instance_id INTEGER NOT NULL,
    version_number INTEGER,
    data JSON NOT NULL,
    change_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id)
);

-- Track template downloads
CREATE TABLE template_downloads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_instance_id INTEGER NOT NULL,
    format TEXT NOT NULL,
    filename TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_instance_id) REFERENCES template_instances(id)
);

-- Create indexes for performance
CREATE INDEX idx_template_instances_user ON template_instances(user_id);
CREATE INDEX idx_template_instances_subcomponent ON template_instances(subcomponent_id);
CREATE INDEX idx_template_customizations_instance ON template_customizations(template_instance_id);
CREATE INDEX idx_template_versions_instance ON template_versions(template_instance_id);
```

### Task 3.2: Create Database Manager

**File**: `scaleops6-platform/template-database-manager.js`

**Functionality**:
```javascript
class TemplateDatabaseManager {
    // Save template instance
    saveTemplateInstance(userId, subcomponentId, data) {}
    
    // Get template instance
    getTemplateInstance(userId, subcomponentId) {}
    
    // Save customization
    saveCustomization(templateInstanceId, fieldName, value) {}
    
    // Get customizations
    getCustomizations(templateInstanceId) {}
    
    // Create version
    createVersion(templateInstanceId, data, description) {}
    
    // Get version history
    getVersionHistory(templateInstanceId) {}
    
    // Track download
    trackDownload(templateInstanceId, format, filename) {}
}
```

---

## PHASE 4: AUTO-POPULATION LOGIC (3-4 hours)

### Task 4.1: Create Template Auto-Population Engine

**File**: `scaleops6-platform/template-auto-populator.js`

**Functionality**:
```javascript
class TemplateAutoPopulator {
    // Main method: populate template from analysis
    populateFromAnalysis(analysisData, subcomponentId) {
        // 1. Get template definition
        // 2. Get field mapping
        // 3. Extract analysis values using mapping
        // 4. Populate template fields
        // 5. Return populated template
    }
    
    // Handle different field types
    populateTextField(field, value) {}
    populateNumberField(field, value) {}
    populateTextareaField(field, value) {}
    populateDateField(field, value) {}
    
    // Merge analysis data with user customizations
    mergeWithCustomizations(populatedData, customizations) {}
}
```

### Task 4.2: Integrate with Analysis Endpoints

**Location**: `server.js` - Modify analysis endpoints

**Changes**:
```javascript
// After analysis completes, trigger template auto-population
app.post('/api/analyze/problem-statement', async (req, res) => {
    // ... existing analysis code ...
    
    // NEW: Auto-populate template
    const autoPopulator = new TemplateAutoPopulator();
    const populatedTemplate = autoPopulator.populateFromAnalysis(
        analysis,
        subcomponentId
    );
    
    // NEW: Save to database
    const dbManager = new TemplateDatabaseManager();
    await dbManager.saveTemplateInstance(
        userId,
        subcomponentId,
        populatedTemplate
    );
    
    res.json(analysis);
});
```

---

## PHASE 5: TEMPLATE VERSIONING & CUSTOMIZATION (2-3 hours)

### Task 5.1: Create Customization API Endpoints

**New Endpoints**:

```javascript
// GET /api/templates/:subcomponentId/instance - Get user's template instance
app.get('/api/templates/:subcomponentId/instance', (req, res) => {
    // Get user's saved template instance
    // Include customizations and version history
});

// POST /api/templates/:subcomponentId/customize - Save customization
app.post('/api/templates/:subcomponentId/customize', (req, res) => {
    // Save field customization
    // Create new version
    // Return updated template
});

// GET /api/templates/:subcomponentId/versions - Get version history
app.get('/api/templates/:subcomponentId/versions', (req, res) => {
    // Return all versions of this template
    // Include timestamps and change descriptions
});

// POST /api/templates/:subcomponentId/rollback - Rollback to version
app.post('/api/templates/:subcomponentId/rollback', (req, res) => {
    // Restore previous version
    // Create new version entry
});
```

### Task 5.2: Implement Version Tracking

**Functionality**:
- Every time template is modified, create new version
- Store original and customized values
- Track change descriptions
- Allow rollback to any previous version

---

## PHASE 6: UI COMPONENTS (3-4 hours)

### Task 6.1: Create Template Preview Modal

**File**: `scaleops6-platform/template-preview-modal.html`

**Features**:
- Display all template sections
- Show populated fields with analysis data
- Highlight customizable fields
- Show best practices and recommendations
- Allow inline editing

### Task 6.2: Add Template Controls to block-detail.html

**Changes**:
1. Add "View Template" button for each subcomponent
2. Add "Download Template" button with format options (PDF, DOCX, JSON)
3. Add "Template History" link to show versions
4. Add "Customize Template" button to edit fields

**Button Placement**:
- Next to "Analyze" button in subcomponent detail view
- In template preview modal

### Task 6.3: Create Download Handler

**File**: `scaleops6-platform/template-download-handler.js`

**Functionality**:
```javascript
class TemplateDownloadHandler {
    // Generate PDF
    generatePDF(templateData) {}
    
    // Generate DOCX
    generateDOCX(templateData) {}
    
    // Generate JSON
    generateJSON(templateData) {}
    
    // Send file to client
    sendDownload(res, content, format, filename) {}
}
```

---

## PHASE 7: END-TO-END TESTING (4-6 hours)

### Test 1: Structural Fix Verification
- [ ] Server starts without errors
- [ ] All 7 template API routes accessible
- [ ] Template count returns 96
- [ ] Individual templates retrieve correctly

### Test 2: Field Mapping Verification
- [ ] Analysis data maps correctly to template fields
- [ ] All 96 subcomponents have proper mappings
- [ ] Unmapped fields identified correctly

### Test 3: Database Persistence
- [ ] Template instances save to database
- [ ] Customizations persist correctly
- [ ] Version history tracks all changes
- [ ] Rollback functionality works

### Test 4: Auto-Population
- [ ] Analysis triggers template auto-population
- [ ] Template fields populate with analysis data
- [ ] Customizations merge correctly
- [ ] All 96 templates auto-populate

### Test 5: UI Components
- [ ] Template preview modal displays correctly
- [ ] Download buttons generate valid files
- [ ] Version history displays properly
- [ ] Customization editing works

### Test 6: End-to-End Workflow
- [ ] User completes analysis
- [ ] Template auto-populates
- [ ] User can preview template
- [ ] User can customize fields
- [ ] User can download in all formats
- [ ] Version history tracks changes

### Test 7: All 96 Subcomponents
- [ ] Test Block 1 (6 templates) - Detailed
- [ ] Test Block 2 (6 templates) - Detailed
- [ ] Test Block 3 (6 templates) - Detailed
- [ ] Test Blocks 4-16 (72 templates) - Sampling

---

## PHASE 8: DEPLOYMENT & VALIDATION (2-3 hours)

### Task 8.1: Database Migration
- [ ] Run schema creation script
- [ ] Verify tables created
- [ ] Create indexes
- [ ] Test queries

### Task 8.2: Code Deployment
- [ ] Push all changes
- [ ] Verify no conflicts
- [ ] Run linter
- [ ] Test in development

### Task 8.3: Browser Validation
- [ ] Navigate to block-detail page
- [ ] Click on subcomponent
- [ ] Verify template appears
- [ ] Test preview functionality
- [ ] Test download in all formats
- [ ] Verify customization works
- [ ] Check version history

### Task 8.4: Production Monitoring
- [ ] Monitor server logs
- [ ] Check database performance
- [ ] Track user feedback
- [ ] Monitor error rates

---

## SUCCESS CRITERIA

### Phase 1: Structural Fix
✅ Server starts without errors  
✅ All 7 template API routes accessible  
✅ Template count returns 96  
✅ Individual templates retrieve correctly

### Phase 2: Field Mapping
✅ Analysis data maps to template fields  
✅ All 96 subcomponents have mappings  
✅ Unmapped fields identified

### Phase 3: Database Persistence
✅ Template instances save correctly  
✅ Customizations persist  
✅ Version history tracks changes  
✅ Rollback works

### Phase 4: Auto-Population
✅ Analysis triggers template generation  
✅ Fields auto-populate from analysis  
✅ Customizations merge correctly  
✅ All 96 templates work

### Phase 5: Versioning & Customization
✅ Customizations save correctly  
✅ Version history complete  
✅ Rollback functionality works  
✅ Change tracking accurate

### Phase 6: UI Components
✅ Preview modal displays correctly  
✅ Download buttons work  
✅ Version history displays  
✅ Customization editing works

### Phase 7: End-to-End Testing
✅ Complete workflow functions  
✅ All 96 templates tested  
✅ No errors in logs  
✅ Performance acceptable

### Phase 8: Deployment
✅ No errors in production  
✅ Database migrations successful  
✅ All endpoints responding  
✅ User feedback positive

---

## IMPLEMENTATION ORDER

1. **Phase 1**: Fix structural error (CRITICAL - blocks everything)
2. **Phase 3**: Create database schema (Foundation for persistence)
3. **Phase 2**: Implement field mapping (Enables auto-population)
4. **Phase 4**: Implement auto-population (Core functionality)
5. **Phase 5**: Add versioning & customization (Enhanced features)
6. **Phase 6**: Build UI components (User interface)
7. **Phase 7**: End-to-end testing (Quality assurance)
8. **Phase 8**: Deploy & validate (Production readiness)

---

## RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Structural fix breaks something | Low | High | Test thoroughly; have rollback plan |
| Field mapping incomplete | Medium | Medium | Start with Block 1; expand gradually |
| Database performance issues | Low | Medium | Add indexes; monitor queries |
| Template generation too slow | Low | Low | Implement caching; async generation |
| UI components not responsive | Low | Low | Test on multiple devices |

---

## DELIVERABLES

1. ✅ Root cause analysis document
2. ✅ Implementation plan (this document)
3. [ ] Fixed server.js with template routes extracted
4. [ ] Field mapping configuration
5. [ ] Field mapping engine
6. [ ] Database schema and manager
7. [ ] Auto-population engine
8. [ ] Customization API endpoints
9. [ ] Template preview modal
10. [ ] Download handler
11. [ ] UI components in block-detail.html
12. [ ] Comprehensive test suite
13. [ ] Deployment documentation

---

## NEXT STEPS

1. ✅ Review and approve this plan
2. [ ] Begin Phase 1: Fix structural error
3. [ ] Verify server starts and routes work
4. [ ] Proceed to Phase 3: Database schema
5. [ ] Continue through all phases sequentially
6. [ ] Deploy to production
7. [ ] Monitor and iterate

**Estimated Total Time**: 16-24 hours  
**Recommended Timeline**: 2-3 days with focused effort  
**Value**: Complete, production-ready template system for all 96 subcomponents
