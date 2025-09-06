import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, isValidPhone } from '../src/lib/validators.js';

test('valid email passes', () => {
  assert.ok(isValidEmail('user@example.com'));
});

test('invalid email fails', () => {
  assert.ok(!isValidEmail('invalid'));
});

test('valid phone passes', () => {
  assert.ok(isValidPhone('050-123-4567'));
});

test('invalid phone fails', () => {
  assert.ok(!isValidPhone('123'));
});
