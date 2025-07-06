# Unit Testing Strategy for AI-Generated Code

## Overview

This strategy addresses the 41% higher bug rate in AI-generated code through comprehensive testing. Unlike TDD (Test-Driven Development), this is a broad testing approach applied after code generation to catch AI-specific issues.

## Core Principles

### 1. Test After Generation, Not Before
- AI writes code first
- Tests verify correctness after
- Focus on catching AI mistakes
- Not about driving design

### 2. Broad Coverage Over Deep Testing
- Test many scenarios quickly
- Catch obvious AI errors
- Verify basic functionality
- Edge cases second priority

### 3. AI-Specific Test Patterns
- Test for hallucinated behaviors
- Verify promised functionality
- Check for silent failures
- Validate error handling

## Testing Categories

### 1. Smoke Tests (First Priority)
```javascript
// Does it even work?
describe('Basic Functionality', () => {
  test('function exists', () => {
    expect(typeof functionName).toBe('function');
  });
  
  test('returns expected type', () => {
    const result = functionName('input');
    expect(typeof result).toBe('string');
  });
  
  test('handles basic input', () => {
    expect(functionName('test')).toBe('expected');
  });
});
```

### 2. Input Validation Tests
```javascript
// AI often forgets validation
describe('Input Validation', () => {
  test('handles null input', () => {
    expect(() => functionName(null)).not.toThrow();
  });
  
  test('handles undefined input', () => {
    expect(() => functionName(undefined)).not.toThrow();
  });
  
  test('handles empty string', () => {
    expect(() => functionName('')).not.toThrow();
  });
  
  test('handles wrong type', () => {
    expect(() => functionName(123)).toThrow(TypeError);
  });
});
```

### 3. Edge Case Tests
```javascript
// AI misses edge cases
describe('Edge Cases', () => {
  test('handles maximum values', () => {
    expect(functionName(Number.MAX_VALUE)).toBeDefined();
  });
  
  test('handles minimum values', () => {
    expect(functionName(Number.MIN_VALUE)).toBeDefined();
  });
  
  test('handles special characters', () => {
    expect(functionName('!@#$%')).toBeDefined();
  });
  
  test('handles unicode', () => {
    expect(functionName('🎉')).toBeDefined();
  });
});
```

### 4. Error Handling Tests
```javascript
// AI often has poor error handling
describe('Error Handling', () => {
  test('throws meaningful errors', () => {
    expect(() => functionName(invalid))
      .toThrow('Expected string but received number');
  });
  
  test('does not swallow errors', async () => {
    const mockFn = jest.fn().mockRejectedValue(new Error('API Error'));
    await expect(functionWithApi(mockFn)).rejects.toThrow('API Error');
  });
  
  test('cleans up on error', async () => {
    const cleanup = jest.fn();
    try {
      await functionWithCleanup(throwingInput, cleanup);
    } catch (e) {
      expect(cleanup).toHaveBeenCalled();
    }
  });
});
```

### 5. Integration Tests
```javascript
// AI misses system interactions
describe('Integration', () => {
  test('works with real dependencies', async () => {
    const result = await functionName(realDatabase);
    expect(result).toMatchSnapshot();
  });
  
  test('handles network errors', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    await expect(fetchData()).rejects.toThrow('Network error');
  });
  
  test('respects timeouts', async () => {
    const slowFn = () => new Promise(resolve => setTimeout(resolve, 5000));
    await expect(withTimeout(slowFn, 1000)).rejects.toThrow('Timeout');
  });
});
```

## AI-Specific Test Patterns

### 1. Hallucination Tests
```javascript
// Test for features AI claims exist but don't
describe('Claimed Features', () => {
  test('supports promised options', () => {
    // If AI says it supports 'format' option
    const result = functionName('input', { format: 'uppercase' });
    expect(result).toBe('INPUT');
  });
  
  test('returns documented properties', () => {
    // If AI documents certain return properties
    const result = functionName();
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('data');
  });
});
```

### 2. Consistency Tests
```javascript
// AI sometimes generates inconsistent behavior
describe('Consistency', () => {
  test('same input produces same output', () => {
    const input = 'test';
    const result1 = functionName(input);
    const result2 = functionName(input);
    expect(result1).toBe(result2);
  });
  
  test('maintains state correctly', () => {
    const instance = new AIGeneratedClass();
    instance.setValue('test');
    expect(instance.getValue()).toBe('test');
  });
});
```

### 3. Performance Tests
```javascript
// AI often creates inefficient code
describe('Performance', () => {
  test('completes in reasonable time', () => {
    const start = Date.now();
    functionName(largeDataset);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000); // 1 second max
  });
  
  test('does not leak memory', () => {
    const initialMemory = process.memoryUsage().heapUsed;
    for (let i = 0; i < 1000; i++) {
      functionName(data);
    }
    global.gc(); // Requires --expose-gc flag
    const finalMemory = process.memoryUsage().heapUsed;
    expect(finalMemory).toBeLessThan(initialMemory * 1.5);
  });
});
```

## Test Generation Workflow

### 1. Immediate Tests (Within 5 minutes)
```bash
# Right after AI generates code:
npm test functionName.test.js  # Run basic tests
npm test -- --coverage        # Check coverage
```

### 2. Test Template for AI Code
```javascript
// tests/ai-generated/[functionName].test.js
import { functionName } from '../src/ai-generated/functionName';

describe('AI-Generated: functionName', () => {
  // Marking as AI-generated helps track quality
  
  describe('Smoke Tests', () => {
    test('exists and is callable', () => {
      expect(functionName).toBeDefined();
      expect(() => functionName()).not.toThrow();
    });
  });
  
  describe('Basic Functionality', () => {
    // Test claimed features
  });
  
  describe('Error Cases', () => {
    // Test error handling
  });
  
  describe('Edge Cases', () => {
    // Test boundaries
  });
});
```

### 3. Coverage Requirements
```json
// jest.config.js
{
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    },
    "./src/ai-generated/**/*.js": {
      "branches": 90,  // Higher for AI code
      "functions": 90,
      "lines": 90,
      "statements": 90
    }
  }
}
```

## Quick Test Checklist

```markdown
## 🧪 AI CODE TEST CHECKLIST

### ✅ BASIC TESTS (Must Have)
□ Function exists
□ Returns correct type
□ Handles happy path
□ Handles null/undefined
□ Has error messages

### 🛡️ SAFETY TESTS (Important)
□ No infinite loops
□ No memory leaks
□ No side effects
□ Cleans up resources
□ Handles timeouts

### 🎯 ACCURACY TESTS (Verify Claims)
□ All parameters work
□ All options supported
□ Documentation matches
□ Examples work
□ Return values correct

### 🚀 PERFORMANCE TESTS (Nice to Have)
□ Reasonable speed
□ Scales properly
□ Efficient memory use
□ Handles large inputs
□ Concurrent safe
```

## Test Patterns by AI Issue Type

### 1. Package Hallucinations
```javascript
// Test that imports actually work
test('imported functions exist', () => {
  expect(importedFunction).toBeDefined();
  expect(typeof importedFunction).toBe('function');
});
```

### 2. Incomplete Implementation
```javascript
// Test all documented methods
const documentedMethods = ['create', 'read', 'update', 'delete'];
documentedMethods.forEach(method => {
  test(`${method} is implemented`, () => {
    expect(instance[method]).toBeDefined();
    expect(() => instance[method]()).not.toThrow('Not implemented');
  });
});
```

### 3. Wrong Assumptions
```javascript
// Test AI's assumptions
test('works without optional dependencies', () => {
  jest.mock('optional-package', () => {
    throw new Error('Module not found');
  });
  expect(() => functionName()).not.toThrow();
});
```

## Testing Tools for AI Code

### 1. Mutation Testing
```bash
# Catches weak tests
npm install --save-dev stryker-mutator
npx stryker run
```

### 2. Property-Based Testing
```javascript
// Finds edge cases AI missed
import fc from 'fast-check';

test('handles any string input', () => {
  fc.assert(
    fc.property(fc.string(), (input) => {
      const result = functionName(input);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    })
  );
});
```

### 3. Snapshot Testing
```javascript
// Catches behavior changes
test('output matches expected', () => {
  const result = functionName(complexInput);
  expect(result).toMatchSnapshot();
});
```

## CI/CD Integration

```yaml
# .github/workflows/test-ai-code.yml
name: Test AI Code
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run tests with coverage
        run: npm test -- --coverage --testPathPattern=ai-generated
      - name: Check coverage thresholds
        run: npm test -- --coverage --coverageReporters=text-summary
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Test Review Questions

Before accepting AI-generated code:

1. **Does every function have tests?**
2. **Are error cases tested?**
3. **Is coverage above 90%?**
4. **Do tests actually assert behavior?**
5. **Are edge cases covered?**

## Red Flags in AI Tests

```javascript
// 🚨 Bad AI-generated tests:

test('works', () => {
  functionName();  // No assertion!
});

test('returns value', () => {
  expect(functionName()).toBeTruthy();  // Too vague!
});

test('handles error', () => {
  try {
    functionName(badInput);
  } catch (e) {
    // Empty catch!
  }
});
```

## Quick Commands for AI

```markdown
After generating code:
1. "Write comprehensive tests for this function"
2. "Include edge case tests"
3. "Add error handling tests"
4. "Test with invalid inputs"
5. "Add performance tests"
6. "Achieve 90% code coverage"
```

Remember: AI code has 41% more bugs. Test accordingly.