
-- Database schema for agent analysis storage
CREATE TABLE IF NOT EXISTS agent_analyses (
    id SERIAL PRIMARY KEY,
    subcomponent_id VARCHAR(10) NOT NULL,
    agent_name VARCHAR(255) NOT NULL,
    worksheet_data JSONB NOT NULL,
    analysis_results JSONB NOT NULL,
    overall_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subcomponent ON agent_analyses(subcomponent_id);
CREATE INDEX idx_agent ON agent_analyses(agent_name);
CREATE INDEX idx_score ON agent_analyses(overall_score);

-- Score history table
CREATE TABLE IF NOT EXISTS score_history (
    id SERIAL PRIMARY KEY,
    subcomponent_id VARCHAR(10) NOT NULL,
    score INTEGER NOT NULL,
    dimensions JSONB,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_history_subcomponent ON score_history(subcomponent_id);
CREATE INDEX idx_history_date ON score_history(recorded_at);
