# Function Mapping & Code Organization Guide

## Overview

This document provides a systematic approach to organizing utility functions and preventing code duplication in AI-assisted development. Research shows AI generates 2.5x more duplicate code than humans - this guide helps prevent that.

## Function Categories

### 1. String Utilities (`/utils/string.js`)
```javascript
// Common string operations
formatCurrency(amount)         // $1,234.56
formatDate(date, format)       // Jan 1, 2024
slugify(text)                  // hello-world
truncate(text, length)         // Hello wo...
capitalize(text)               // Hello World
sanitizeHtml(html)            // Remove dangerous tags
escapeRegex(string)           // Escape special chars
```

### 2. Validation (`/utils/validation.js`)
```javascript
// Input validation functions
isEmail(email)                // RFC5322 compliant
isUrl(url)                    // Valid URL check
isPhone(phone, country)       // Country-specific
isPostalCode(code, country)   // Format validation
isStrongPassword(password)    // Complexity check
isCreditCard(number)          // Luhn algorithm
isUUID(string)                // v4 UUID check
```

### 3. Data Transformation (`/utils/transform.js`)
```javascript
// Data shape conversions
camelToSnake(obj)            // Convert object keys
snakeToCamel(obj)            // Convert object keys
flatten(obj, delimiter)       // Nested to flat
unflatten(obj, delimiter)     // Flat to nested
pick(obj, keys)              // Select properties
omit(obj, keys)              // Remove properties
mapKeys(obj, fn)             // Transform keys
```

### 4. Array Operations (`/utils/array.js`)
```javascript
// Array manipulation
chunk(array, size)           // Split into chunks
unique(array, key)           // Remove duplicates
groupBy(array, key)          // Group by property
sortBy(array, keys)          // Multi-key sort
difference(a, b)             // Items in A not in B
intersection(a, b)           // Common items
partition(array, predicate)  // Split by condition
```

### 5. API Utilities (`/utils/api.js`)
```javascript
// HTTP and API helpers
fetchWithRetry(url, options)  // Auto retry logic
batchRequests(requests)       // Parallel limiting
debounceApi(fn, delay)        // Rate limiting
cacheRequest(fn, ttl)         // Response caching
handleApiError(error)         // Consistent errors
buildQueryString(params)      // URL parameters
parseApiResponse(response)    // Standard parsing
```

### 6. Date/Time (`/utils/datetime.js`)
```javascript
// Date operations
addDays(date, days)          // Date arithmetic
formatRelative(date)         // "2 hours ago"
getTimezone()                // User timezone
convertTimezone(date, tz)    // Timezone conversion
isBusinessDay(date)          // Weekend check
getQuarter(date)             // Q1-Q4
parseISO(string)             // ISO8601 parsing
```

### 7. Security (`/utils/security.js`)
```javascript
// Security utilities
hashPassword(password)        // Bcrypt hashing
generateToken(length)         // Secure random
sanitizeInput(input)          // XSS prevention
validateCsrf(token)           // CSRF protection
encryptData(data, key)        // AES encryption
signJwt(payload, secret)      // JWT creation
verifyJwt(token, secret)      // JWT validation
```

### 8. File Operations (`/utils/file.js`)
```javascript
// File handling
readJsonFile(path)            // Parse JSON file
writeJsonFile(path, data)     // Write JSON
ensureDir(path)               // Create if missing
getFileExtension(filename)    // Extract extension
generateFilename(base)        // Unique names
validateFileType(file, types) // Type checking
compressImage(file, quality)  // Image optimization
```

## Function Mapping Process

### 1. Before Creating New Functions

```markdown
CHECKLIST:
[ ] Search existing utils folders
[ ] Check if similar function exists
[ ] Look for partial implementations
[ ] Consider extending existing function
```

### 2. Function Naming Convention

```javascript
// ✅ GOOD: Clear, specific, action-oriented
validateEmail()
formatCurrency()
parseQueryString()

// ❌ BAD: Vague, generic, unclear purpose
process()
handle()
doStuff()
```

### 3. Function Location Rules

```javascript
// Single-use: Keep in component
const formatPrice = (price) => `$${price.toFixed(2)}`;

// Multi-use (2+ places): Move to utils
// /utils/format.js
export const formatPrice = (price) => `$${price.toFixed(2)}`;

// Domain-specific: Create sub-folder
// /utils/ecommerce/pricing.js
export const calculateTax = (price, rate) => price * rate;
```

## AI-Specific Instructions

### Search Commands
```bash
# Before creating any utility function, run:
grep -r "function.*${FUNCTION_NAME}" ./src
grep -r "const.*${FUNCTION_NAME}" ./src
find ./src -name "*.js" -o -name "*.ts" | xargs grep -l "${KEYWORD}"
```

### Import Detection
```javascript
// Check for existing imports
// Look for these patterns:
import { functionName } from './utils/...'
import * as utils from './utils/...'
const { functionName } = require('./utils/...')
```

## Utility Index Template

Create `/utils/index.js` as central export:

```javascript
// String utilities
export * from './string.js';

// Validation utilities  
export * from './validation.js';

// Data transformation
export * from './transform.js';

// Array operations
export * from './array.js';

// API utilities
export * from './api.js';

// Date/time utilities
export * from './datetime.js';

// Security utilities
export * from './security.js';

// File operations
export * from './file.js';
```

## Function Documentation Template

```javascript
/**
 * Brief description of what function does
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 * @example
 * functionName('input') // 'output'
 */
export const functionName = (paramName) => {
  // Implementation
};
```

## Common Duplication Patterns to Avoid

### 1. Date Formatting
```javascript
// ❌ BAD: Duplicated everywhere
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
};

// ✅ GOOD: Centralized in utils/datetime.js
import { formatDate } from '@/utils/datetime';
```

### 2. API Error Handling
```javascript
// ❌ BAD: Repeated in every API call
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('API Error');
  return response.json();
} catch (error) {
  console.error('Error:', error);
  throw error;
}

// ✅ GOOD: Use centralized handler
import { apiCall } from '@/utils/api';
const data = await apiCall(url);
```

### 3. Form Validation
```javascript
// ❌ BAD: Custom validation in each form
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ✅ GOOD: Import from validation utils
import { isEmail } from '@/utils/validation';
```

## Refactoring Checklist

When you find duplicate code:

1. **Identify Pattern**
   - Same logic in 2+ places?
   - Similar but slightly different?
   - Could be parameterized?

2. **Extract Function**
   - Create in appropriate utils file
   - Add comprehensive tests
   - Document parameters/returns

3. **Replace Duplicates**
   - Import new function
   - Replace all instances
   - Verify functionality

4. **Update Imports**
   - Add to utils index
   - Update import statements
   - Remove old implementations

## Testing Requirements

Every utility function needs tests:

```javascript
// /tests/utils/string.test.js
import { formatCurrency } from '@/utils/string';

describe('formatCurrency', () => {
  test('formats positive numbers', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
  
  test('formats negative numbers', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });
  
  test('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
```

## Performance Considerations

### Memoization for Expensive Operations
```javascript
import { memoize } from '@/utils/performance';

const expensiveOperation = memoize((input) => {
  // Complex calculation
  return result;
});
```

### Batch Operations
```javascript
// Instead of multiple calls
for (const id of ids) {
  await fetchUser(id); // ❌ N+1 problem
}

// Use batch function
const users = await batchFetchUsers(ids); // ✅ Single call
```

## Quick Reference

```markdown
PREVENT DUPLICATION:
✅ Search before creating
✅ Check imports first
✅ Use central utils
✅ Document functions
✅ Write tests
✅ Export from index

AVOID:
❌ Copy-paste code
❌ Inline utilities
❌ Similar functions
❌ No documentation
❌ Untested utils
❌ Scattered helpers
```

## Integration with AI Tools

Add to your AI tool configuration:

```markdown
Before creating utility functions:
1. Search: grep -r "function.*{name}" ./src
2. Check: /utils folder for existing
3. Extend: Don't duplicate, enhance
4. Import: Use from utils, not inline
5. Test: Every util needs test file
```