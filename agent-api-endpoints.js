
const express = require('express');
const router = express.Router();
const { generateAgentAnalysis } = require('./agent-configs');


// API endpoint for 1a
app.post('/api/analyze/1a', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('1a', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 1b
app.post('/api/analyze/1b', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('1b', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 1c
app.post('/api/analyze/1c', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('1c', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 1d
app.post('/api/analyze/1d', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('1d', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 1e
app.post('/api/analyze/1e', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('1e', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 1f
app.post('/api/analyze/1f', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('1f', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 2a
app.post('/api/analyze/2a', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('2a', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 2b
app.post('/api/analyze/2b', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('2b', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 2c
app.post('/api/analyze/2c', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('2c', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 2d
app.post('/api/analyze/2d', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('2d', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 2e
app.post('/api/analyze/2e', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('2e', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 2f
app.post('/api/analyze/2f', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('2f', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 3a
app.post('/api/analyze/3a', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('3a', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 3b
app.post('/api/analyze/3b', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('3b', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 3c
app.post('/api/analyze/3c', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('3c', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 3d
app.post('/api/analyze/3d', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('3d', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 3e
app.post('/api/analyze/3e', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('3e', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// API endpoint for 3f
app.post('/api/analyze/3f', async (req, res) => {
    try {
        const { worksheetData, subcomponentId } = req.body;
        
        // Generate analysis using agent-specific logic
        const analysis = generateAgentAnalysis('3f', worksheetData);
        
        // Save to database
        await saveAnalysis(subcomponentId, analysis);
        
        // Return analysis results
        res.json({
            success: true,
            score: analysis.overallScore,
            analysis: analysis.dimensions,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            recommendations: analysis.recommendations
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

module.exports = router;
