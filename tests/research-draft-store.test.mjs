import { test } from 'node:test';
import assert from 'node:assert/strict';
import { draftKey, legacyDraftKey, restoredHypothesis } from '../src/utils/research-draft-store.ts';

test('different questions using the same source do not share a draft key', () => {
  const a = { sourceId: 'same', seminarNum: 1, questionNum: 1, topic: 'first' };
  const b = { sourceId: 'same', seminarNum: 1, questionNum: 3, topic: 'second' };
  assert.notEqual(draftKey(a), draftKey(b));
  assert.notEqual(draftKey(a), legacyDraftKey(a));
});

test('a deliberately empty hypothesis stays empty', () => {
  assert.equal(restoredHypothesis('', 'suggestion'), '');
  assert.equal(restoredHypothesis(undefined, 'suggestion'), 'suggestion');
});
