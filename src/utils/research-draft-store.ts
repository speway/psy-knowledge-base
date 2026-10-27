export interface DraftContext {
  sourceId?: string;
  topic?: string;
  seminarNum?: number;
  questionNum?: number;
}

const PREFIX = 'psy_kb_research_draft_';

export function legacyDraftKey(context: DraftContext): string {
  return context.sourceId ? PREFIX + context.sourceId : context.topic ? PREFIX + encodeURIComponent(context.topic.slice(0, 30)) : PREFIX + 'general';
}

export function draftKey(context: DraftContext): string {
  const identity = context.seminarNum != null && context.questionNum != null
    ? ['seminar', context.seminarNum, context.questionNum]
    : ['context', context.sourceId || '', context.topic || ''];
  return PREFIX + 'v2_' + encodeURIComponent(JSON.stringify(identity));
}

export function restoredHypothesis(saved: string | undefined, starter = ''): string {
  return saved ?? starter;
}
