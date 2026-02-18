import React, { useEffect, useState } from 'react';
import { Button, Card, Loader, ConfirmModal } from '../common/index';
import { useProject } from '../../context/ProjectContext';
import { realWorldFacts, realWorldConflicts } from '../../data/realWorldData';

/**
 * Step 1: Data Extraction Component
 * Shows extracted facts and allows deletion
 */
export function DataExtraction({ onNext }) {
  const { facts, addFact, removeFact } = useProject();
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [factToRemove, setFactToRemove] = useState(null);
  const [factsLoaded, setFactsLoaded] = useState(false);

  // Simulate data extraction loading - only run once when component mounts
  useEffect(() => {
    if (!factsLoaded && facts.length === 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        // Add dummy facts from real-world data
        realWorldFacts.slice(0, 8).forEach((fact) => {
          addFact(fact);
        });
        setFactsLoaded(true);
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [factsLoaded, facts.length, addFact]);

  // Handle fact removal with confirmation
  const handleRemoveFact = (factId) => {
    setFactToRemove(factId);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    if (factToRemove) {
      removeFact(factToRemove);
      setShowConfirm(false);
      setFactToRemove(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Step 1: Data Extraction
        </h2>
        <p className="text-text-secondary">
          Review the facts extracted from your conversations
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <Card className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader size="lg" />
            <p className="text-text-secondary mt-4">Extracting facts...</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Facts List */}
          <div className="space-y-4">
            {facts.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-text-secondary">No facts extracted yet</p>
              </Card>
            ) : (
              facts.map((fact) => (
                <Card key={fact.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-text-primary font-medium flex-1">{fact.content}</p>
                      <div className="flex gap-2 ml-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          fact.priority === 'critical' ? 'bg-red-100 text-danger' :
                          fact.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-primary'
                        }`}>
                          {fact.priority?.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-text-secondary">
                          {fact.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                      <span>📍 {fact.source}</span>
                      <span>📅 {formatDate(fact.timestamp)}</span>
                      <span>🏷️ {fact.platform}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFact(fact.id)}
                    className="text-danger hover:bg-red-50 px-4 py-2 rounded-lg transition-colors ml-4 flex-shrink-0"
                    title="Delete fact"
                  >
                    🗑️
                  </button>
                </Card>
              ))
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <Button variant="secondary" onClick={() => window.scrollTo(0, 0)}>
              Back
            </Button>
            <Button onClick={onNext} disabled={facts.length === 0}>
              Next: Conflict Detection
            </Button>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Fact"
        message="Are you sure you want to remove this fact? This action cannot be undone."
        onConfirm={confirmRemove}
        onCancel={() => setShowConfirm(false)}
        isDangerous
      />
    </div>
  );
}

/**
 * Step 2: Conflict Detection Component
 * Shows conflicts and allows resolution
 */
export function ConflictDetection({ onNext, onPrev }) {
  const { resolveConflict, setProjectConflicts } = useProject();
  const [isLoading, setIsLoading] = useState(true);
  const [localConflicts, setLocalConflicts] = useState([]);
  const [comments, setComments] = useState({});
  const [conflictsLoaded, setConflictsLoaded] = useState(false);

  // Simulate conflict detection loading - only run once
  useEffect(() => {
    if (!conflictsLoaded && localConflicts.length === 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        // Use real-world conflicts
        const conflicts = realWorldConflicts.slice(0, 3);
        setLocalConflicts(conflicts);
        setProjectConflicts(conflicts);
        setConflictsLoaded(true);
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [conflictsLoaded, localConflicts.length, setProjectConflicts]);

  // Handle conflict resolution
  const handleResolveConflict = (conflictId, selectedFactId) => {
    const comment = comments[conflictId] || '';
    resolveConflict(conflictId, selectedFactId, comment);
    setLocalConflicts(localConflicts.filter((c) => c.id !== conflictId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Step 2: Conflict Detection
        </h2>
        <p className="text-text-secondary">
          Review and resolve conflicting requirements
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <Card className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader size="lg" />
            <p className="text-text-secondary mt-4">Detecting conflicts...</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Conflicts List */}
          <div className="space-y-4">
            {localConflicts.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-text-secondary">No conflicts detected</p>
              </Card>
            ) : (
              localConflicts.map((conflict) => (
                <Card key={conflict.id} className="space-y-4">
                  {/* Conflict Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-text-primary mb-1">
                        {conflict.title}
                      </h3>
                      <p className="text-sm text-text-secondary">{conflict.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${
                      conflict.severity === 'high' ? 'bg-danger text-white' :
                      conflict.severity === 'medium' ? 'bg-warning text-black' :
                      'bg-blue-100 text-primary'
                    }`}>
                      {conflict.severity?.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary italic">Impact: {conflict.impact}</p>

                  {/* Fact A */}
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name={conflict.id}
                        value={conflict.factA.id}
                        onChange={() =>
                          handleResolveConflict(conflict.id, conflict.factA.id)
                        }
                        className="mt-1 w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">
                          Option A: {conflict.factA.content}
                        </p>
                        <p className="text-xs text-text-secondary mt-2">
                          📍 {conflict.factA.source} • 📅 {formatDate(conflict.factA.timestamp)} • 🏷️ {conflict.factA.platform}
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Separator */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-text-secondary text-xs font-medium">vs</span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>

                  {/* Fact B */}
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name={conflict.id}
                        value={conflict.factB.id}
                        onChange={() =>
                          handleResolveConflict(conflict.id, conflict.factB.id)
                        }
                        className="mt-1 w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">
                          Option B: {conflict.factB.content}
                        </p>
                        <p className="text-xs text-text-secondary mt-2">
                          📍 {conflict.factB.source} • 📅 {formatDate(conflict.factB.timestamp)} • 🏷️ {conflict.factB.platform}
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Comment Box */}
                  <div>
                    <label className="text-sm font-medium text-text-primary block mb-2">
                      Add Your Resolution Reasoning (Optional)
                    </label>
                    <textarea
                      placeholder="Explain why you chose this option and any important context..."
                      value={comments[conflict.id] || ''}
                      onChange={(e) =>
                        setComments({
                          ...comments,
                          [conflict.id]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
                    />
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-3 pt-6">
            <Button variant="secondary" onClick={onPrev}>
              Back to Extraction
            </Button>
            <Button onClick={onNext}>
              Next: Final Summary
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Step 3: Final Summary Component
 * Shows review of extracted facts and resolved conflicts
 */
export function FinalSummary({ onNext, onPrev }) {
  const { facts, resolvedConflicts, generateBRD } = useProject();
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle BRD generation
  const handleGenerateBRD = async () => {
    setIsGenerating(true);
    await generateBRD();
    setIsGenerating(false);
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Step 3: Final Summary
        </h2>
        <p className="text-text-secondary">
          Review the extracted requirements and resolved conflicts
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <p className="text-text-secondary text-sm">Total Facts</p>
          <p className="text-3xl font-bold text-text-primary">{facts.length}</p>
        </Card>
        <Card>
          <p className="text-text-secondary text-sm">Conflicts Resolved</p>
          <p className="text-3xl font-bold text-text-primary">
            {resolvedConflicts.length}
          </p>
        </Card>
      </div>

      {/* Selected Facts */}
      <Card>
        <h3 className="font-semibold text-lg text-text-primary mb-4">
          Selected Facts ({facts.length})
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {facts.map((fact) => (
            <div key={fact.id} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-text-primary font-medium">{fact.content}</p>
              <p className="text-xs text-text-secondary mt-1">{fact.source}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Resolved Conflicts */}
      {resolvedConflicts.length > 0 && (
        <Card>
          <h3 className="font-semibold text-lg text-text-primary mb-4">
            Resolved Conflicts ({resolvedConflicts.length})
          </h3>
          <div className="space-y-3">
            {resolvedConflicts.map((resolution) => (
              <div key={resolution.conflictId} className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-success font-medium">✓ Resolved</p>
                {resolution.comment && (
                  <p className="text-sm text-text-secondary mt-1">{resolution.comment}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3 pt-6">
        <Button variant="secondary" onClick={onPrev}>
          Back to Conflicts
        </Button>
        <Button onClick={handleGenerateBRD} disabled={isGenerating}>
          {isGenerating ? <Loader size="sm" /> : 'Generate BRD'}
        </Button>
      </div>
    </div>
  );
}

/**
 * Step 4: BRD Generated Component
 * Shows the final BRD document with editing capabilities
 */
export function BRDGenerated({ onPrev }) {
  const { brdDocument, editBRDWithAI, editCount, maxEdits } = useProject();
  const [editInstruction, setEditInstruction] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState('');

  // Handle BRD editing with AI
  const handleEditBRD = async (e) => {
    e.preventDefault();
    if (!editInstruction.trim()) return;

    setIsEditing(true);
    setEditError('');
    const result = await editBRDWithAI(editInstruction);

    if (result.success) {
      setEditInstruction('');
    } else {
      setEditError(result.error);
    }
    setIsEditing(false);
  };

  // Handle PDF export (simulated)
  const handleExportPDF = () => {
    alert('PDF export would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Step 4: BRD Generated
          </h2>
          <p className="text-text-secondary">
            Your Business Requirements Document is ready
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Save Changes</Button>
          <Button onClick={handleExportPDF}>📥 Export PDF</Button>
        </div>
      </div>

      {/* BRD Document */}
      {brdDocument && (
        <Card className="space-y-6">
          {/* Title */}
          <div className="border-b border-border pb-4">
            <h1 className="text-3xl font-bold text-text-primary">
              {brdDocument.title}
            </h1>
            <p className="text-text-secondary text-sm mt-2">
              Last updated: {new Date(brdDocument.lastUpdated).toLocaleDateString()}
            </p>
          </div>

          {/* Executive Summary */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Executive Summary
            </h3>
            <p className="text-text-secondary">{brdDocument.executiveSummary}</p>
          </div>

          {/* Business Objectives */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Business Objectives
            </h3>
            <ul className="space-y-2">
              {brdDocument.businessObjectives.map((obj, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span>•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stakeholder Analysis */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Stakeholder Analysis
            </h3>
            <div className="space-y-2">
              {brdDocument.stakeholderAnalysis.map((stakeholder, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <p className="font-medium text-text-primary">
                    {stakeholder.role}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {stakeholder.responsibility}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Functional Requirements */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Functional Requirements
            </h3>
            <ul className="space-y-2">
              {brdDocument.functionalRequirements.map((req, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span>•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Functional Requirements */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Non-Functional Requirements
            </h3>
            <ul className="space-y-2">
              {brdDocument.nonFunctionalRequirements.map((req, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span>•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Assumptions */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Assumptions
            </h3>
            <ul className="space-y-2">
              {brdDocument.assumptions.map((assumption, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span>•</span>
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Timeline
            </h3>
            <div className="space-y-2">
              {Object.values(brdDocument.timeline).map((phase, idx) => (
                <p key={idx} className="text-text-secondary">• {phase}</p>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Success Metrics
            </h3>
            <ul className="space-y-2">
              {brdDocument.successMetrics.map((metric, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span>•</span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* Natural Language Edit Section */}
      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Edit with Natural Language
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          Remaining edits: {maxEdits - editCount}/{maxEdits}
        </p>

        <form onSubmit={handleEditBRD} className="space-y-3">
          <textarea
            placeholder="e.g., 'Make the executive summary more concise' or 'Add performance requirements'"
            value={editInstruction}
            onChange={(e) => setEditInstruction(e.target.value)}
            disabled={isEditing || editCount >= maxEdits}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
          />
          {editError && (
            <p className="text-danger text-sm">{editError}</p>
          )}
          <Button
            type="submit"
            disabled={isEditing || editCount >= maxEdits || !editInstruction.trim()}
          >
            {isEditing ? 'Editing...' : 'Apply Edit'}
          </Button>
        </form>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3 pt-6">
        <Button variant="secondary" onClick={onPrev}>
          Back to Summary
        </Button>
      </div>
    </div>
  );
}

/**
 * Helper function to format date
 */
function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
