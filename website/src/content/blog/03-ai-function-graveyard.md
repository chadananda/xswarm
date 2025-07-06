---
title: 'I Found 15 Different Email Validation Functions in My AI-Generated Code'
description: "Analysis of code duplication patterns in AI-generated codebases reveals excessive recreation of utility functions. Multi-pass planning approaches demonstrate how extracting pure functions early reduces redundancy."
publishDate: 2024-01-17
author: 'XSwarm Team'
image: '/images/blog/ai-function-graveyard-hero.jpg'
imageAlt: 'Cyberpunk graveyard of duplicated functions with neon tombstones'
tags: ['AI Development', 'Cyberpunk', 'Code Reuse', 'Pure Functions']
---

Last week, I found something that made me physically ill. Fifteen different email validation functions. In the same project. All written by AI. Each one slightly different, all essentially identical.

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-8 p-6 bg-gray-900 rounded-lg border border-purple-500/30">
  <div class="bg-black/60 p-4 rounded-lg border border-red-500/50 text-center transform hover:scale-105 transition-transform">
    <div class="text-red-400 font-mono text-lg mb-2">validateEmail()</div>
    <div class="text-gray-500 text-sm">Born: Jan 2024</div>
    <div class="text-red-300 text-sm">Died: Never used</div>
  </div>
  <div class="bg-black/60 p-4 rounded-lg border border-red-500/50 text-center transform hover:scale-105 transition-transform">
    <div class="text-red-400 font-mono text-lg mb-2">isValidEmail()</div>
    <div class="text-gray-500 text-sm">Born: Jan 2024</div>
    <div class="text-red-300 text-sm">Died: Duplicate #2</div>
  </div>
  <div class="bg-black/60 p-4 rounded-lg border border-red-500/50 text-center transform hover:scale-105 transition-transform">
    <div class="text-red-400 font-mono text-lg mb-2">checkEmail()</div>
    <div class="text-gray-500 text-sm">Born: Feb 2024</div>
    <div class="text-red-300 text-sm">Died: Forgotten</div>
  </div>
  <div class="bg-black/60 p-4 rounded-lg border border-red-500/50 text-center transform hover:scale-105 transition-transform">
    <div class="text-red-400 font-mono text-lg mb-2">emailIsValid()</div>
    <div class="text-gray-500 text-sm">Born: Feb 2024</div>
    <div class="text-red-300 text-sm">Died: Redundant</div>
  </div>
  <div class="bg-black/60 p-4 rounded-lg border border-red-500/50 text-center transform hover:scale-105 transition-transform">
    <div class="text-red-400 font-mono text-lg mb-2">verifyEmail()</div>
    <div class="text-gray-500 text-sm">Born: Mar 2024</div>
    <div class="text-red-300 text-sm">Died: Abandoned</div>
  </div>
  <div class="bg-black/60 p-4 rounded-lg border border-purple-500/50 text-center animate-pulse">
    <div class="text-purple-400 font-mono text-lg mb-2">+10 more...</div>
    <div class="text-gray-500 text-sm">All doing the</div>
    <div class="text-purple-300 text-sm">same thing</div>
  </div>
</div>

<div class="my-8">
  <h3 class="text-xl font-bold text-cyan-400 mb-4">Same Function, Different Day</h3>
  <div class="grid md:grid-cols-3 gap-4">
    <div class="bg-gray-900 rounded-lg border border-cyan-500/30 overflow-hidden">
      <div class="bg-cyan-900/30 p-3 border-b border-cyan-500/30">
        <h4 class="text-cyan-400 font-semibold">Claude (Monday)</h4>
      </div>
      <pre class="p-4 text-sm overflow-x-auto"><code class="language-javascript">const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};</code></pre>
      <div class="bg-gray-800/50 p-3 text-sm text-gray-400 border-t border-cyan-500/30">
        Complexity: Low | Tokens: 147
      </div>
    </div>
    <div class="bg-gray-900 rounded-lg border border-cyan-500/30 overflow-hidden">
      <div class="bg-cyan-900/30 p-3 border-b border-cyan-500/30">
        <h4 class="text-cyan-400 font-semibold">GPT-4 (Tuesday)</h4>
      </div>
      <pre class="p-4 text-sm overflow-x-auto"><code class="language-javascript">function isValidEmail(emailAddress) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(emailAddress);
}</code></pre>
      <div class="bg-gray-800/50 p-3 text-sm text-gray-400 border-t border-cyan-500/30">
        Complexity: Medium | Tokens: 156
      </div>
    </div>
    <div class="bg-gray-900 rounded-lg border border-cyan-500/30 overflow-hidden">
      <div class="bg-cyan-900/30 p-3 border-b border-cyan-500/30">
        <h4 class="text-cyan-400 font-semibold">Copilot (Wednesday)</h4>
      </div>
      <pre class="p-4 text-sm overflow-x-auto"><code class="language-javascript">export const checkEmail = (str) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(str);
}</code></pre>
      <div class="bg-gray-800/50 p-3 text-sm text-gray-400 border-t border-cyan-500/30">
        Complexity: Medium | Tokens: 152
      </div>
    </div>
  </div>
  <div class="mt-4 p-4 bg-red-900/20 border-l-4 border-red-500 flex justify-between items-center">
    <span class="text-red-400 font-bold">Wasted Tokens:</span>
    <span class="text-xl">455 tokens for the same functionality</span>
  </div>
</div>

Welcome to the AI Function Graveyard, where perfectly good utilities go to die... repeatedly.

## The Token Holocaust

<blockquote class="my-8 p-6 border-l-4 border-red-500 bg-red-900/10 text-lg font-semibold relative">
  <p class="mb-2">"One mid-sized project burned through <strong class="text-red-400">$847</strong> just regenerating utility functions"</p>
  <cite class="block text-sm font-normal text-gray-400 italic">— Not including actual business logic</cite>
</blockquote>

Let's do the math that nobody wants to do. Each email validation function costs approximately 150 tokens to generate (prompt + response). Fifteen versions? That's 2,250 tokens. At current GPT-4 rates, you just spent $0.07 regenerating the same damn function.

"Seven cents?" you scoff. "That's nothing."

<div class="my-8 p-6 bg-gray-900 border border-gray-700 rounded-lg">
  <h3 class="text-xl font-bold text-cyan-400 mb-4">The Real Cost of Duplicate Functions</h3>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-800">
          <th class="p-3 text-left border-b border-gray-700">Function Type</th>
          <th class="p-3 text-left border-b border-gray-700">Duplicates Found</th>
          <th class="p-3 text-left border-b border-gray-700">Avg Tokens Each</th>
          <th class="p-3 text-left border-b border-gray-700">Total Tokens</th>
          <th class="p-3 text-left border-b border-gray-700">Cost (GPT-4)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-gray-800/50">
          <td class="p-3 border-b border-gray-700">Email Validation</td>
          <td class="p-3 border-b border-gray-700">15</td>
          <td class="p-3 border-b border-gray-700">150</td>
          <td class="p-3 border-b border-gray-700">2,250</td>
          <td class="p-3 border-b border-gray-700">$0.07</td>
        </tr>
        <tr class="hover:bg-gray-800/50">
          <td class="p-3 border-b border-gray-700">Date Formatting</td>
          <td class="p-3 border-b border-gray-700">23</td>
          <td class="p-3 border-b border-gray-700">200</td>
          <td class="p-3 border-b border-gray-700">4,600</td>
          <td class="p-3 border-b border-gray-700">$0.14</td>
        </tr>
        <tr class="hover:bg-gray-800/50">
          <td class="p-3 border-b border-gray-700">String Truncation</td>
          <td class="p-3 border-b border-gray-700">18</td>
          <td class="p-3 border-b border-gray-700">120</td>
          <td class="p-3 border-b border-gray-700">2,160</td>
          <td class="p-3 border-b border-gray-700">$0.06</td>
        </tr>
        <tr class="hover:bg-gray-800/50">
          <td class="p-3 border-b border-gray-700">Deep Object Clone</td>
          <td class="p-3 border-b border-gray-700">31</td>
          <td class="p-3 border-b border-gray-700">350</td>
          <td class="p-3 border-b border-gray-700">10,850</td>
          <td class="p-3 border-b border-gray-700">$0.33</td>
        </tr>
        <tr class="hover:bg-gray-800/50">
          <td class="p-3 border-b border-gray-700">URL Parsing</td>
          <td class="p-3 border-b border-gray-700">12</td>
          <td class="p-3 border-b border-gray-700">180</td>
          <td class="p-3 border-b border-gray-700">2,160</td>
          <td class="p-3 border-b border-gray-700">$0.06</td>
        </tr>
        <tr class="font-bold bg-red-900/20 border-t-2 border-red-500">
          <td class="p-3 text-red-400">Project Total</td>
          <td class="p-3 text-red-400">99 functions</td>
          <td class="p-3 text-red-400">-</td>
          <td class="p-3 text-red-400">282,300</td>
          <td class="p-3 text-red-400">$847</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="text-sm text-gray-400 italic mt-2">* Based on GPT-4 pricing at $0.03/1K tokens</p>
</div>

Now multiply that by every utility function in your codebase. Date formatting? I counted 23 versions. String truncation? 18. Deep object cloning? Don't get me started – 31 variations, each more convoluted than the last.

One mid-sized project I audited had burned through $847 in tokens just regenerating utility functions. That's not counting the actual business logic. That's just AI rewriting `leftPad` for the thousandth time.

## The Maintenance Nightmare

But tokens are just the appetizer. The real feast of suffering comes during debugging.

<div class="my-8 p-6 bg-red-900/5 border-2 border-red-500 rounded-lg">
  <h4 class="text-xl font-bold text-red-400 text-center mb-4">🚨 Production Bug Timeline 🚨</h4>
  <div class="space-y-3">
    <div class="flex items-center p-3 bg-gray-800/50 rounded-lg border-l-3 border-gray-600">
      <span class="font-bold text-cyan-400 mr-4 min-w-[80px]">09:00 AM</span>
      <span class="flex-1">Customer reports email validation failing</span>
    </div>
    <div class="flex items-center p-3 bg-gray-800/50 rounded-lg border-l-3 border-gray-600">
      <span class="font-bold text-cyan-400 mr-4 min-w-[80px]">09:15 AM</span>
      <span class="flex-1">grep "email" returns 15 validation functions</span>
    </div>
    <div class="flex items-center p-3 bg-gray-800/50 rounded-lg border-l-3 border-gray-600">
      <span class="font-bold text-cyan-400 mr-4 min-w-[80px]">10:30 AM</span>
      <span class="flex-1">Found 3 different functions in use across app</span>
    </div>
    <div class="flex items-center p-3 bg-gray-800/50 rounded-lg border-l-3 border-gray-600">
      <span class="font-bold text-cyan-400 mr-4 min-w-[80px]">11:45 AM</span>
      <span class="flex-1">Discovered regex differences causing failures</span>
    </div>
    <div class="flex items-center p-3 bg-red-900/20 rounded-lg border-l-3 border-red-500">
      <span class="font-bold text-red-400 mr-4 min-w-[80px]">12:00 PM</span>
      <span class="flex-1 text-red-300">3 hours lost to "Trace the Import Chain"</span>
    </div>
  </div>
</div>

Picture this: Production bug. Customer data isn't validating correctly. You grep for email validation. Fifteen results. Which one is actually being used? Time to play everyone's favorite game: "Trace the Import Chain."

Three hours later, you discover that `validateEmail`, `isValidEmail`, and `checkEmail` are all being used in different parts of the app. Two of them have subtle regex differences that cause edge case failures. One allows unicode, two don't. Your QA team is having a meltdown because test coverage differs for each function.

<blockquote class="my-8 p-6 border-l-4 border-cyan-500 bg-cyan-900/10 text-lg font-semibold">
  <p>"This isn't hypothetical. This is <strong class="text-cyan-400">Tuesday.</strong>"</p>
</blockquote>

## Why AI Can't Remember

Here's the dirty secret: AI has goldfish memory. Every new session, it's like meeting your utility functions for the first time. "Email validation? Never heard of her. Let me write you a fresh one!"

Current AI coding assistants have no concept of your existing codebase's utility ecosystem. They can't search for existing implementations. They definitely can't remember what they wrote last week. So they do what they do best: generate new code from scratch.

It's like having a brilliant developer with severe amnesia. Every morning they wake up and reimplement quicksort because they forgot it exists.

## Enter Multi-Pass Planning

This is where xSwarm gets interesting. Instead of letting AI freestyle your utilities into oblivion, we enforce a three-pass epoch planning system:

**Pass 1: Pure Function Extraction**
Before writing a single line of feature code, xSwarm scans for and extracts every pure function opportunity. Email validation? That's a pure function. Date formatting? Pure. String manipulation? Pure as driven snow.

**Pass 2: Function Registry Building**
Every extracted function gets cataloged with:

- Semantic fingerprint (what it actually does)
- Complexity score (how gnarly is this beast?)
- Reusability index (will we need this again?)
- Dependency graph (what else does it need?)

**Pass 3: Implementation with Reuse**
Only now does xSwarm start building features. But here's the kicker – before generating any utility, it searches the registry. Found a match? Reuse it. No match? Generate it once, catalog it forever.

## The 60% Solution

<div class="grid md:grid-cols-3 gap-6 my-8">
  <div class="p-6 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500 rounded-lg text-center">
    <span class="block text-4xl font-bold text-cyan-400 mb-2">60%+</span>
    <span class="block text-lg font-medium mb-1">Code Reuse Rate</span>
    <span class="block text-sm text-gray-400">More than half your codebase already exists</span>
  </div>
  <div class="p-6 bg-gray-900 border border-gray-700 rounded-lg text-center">
    <span class="block text-4xl font-bold text-cyan-400 mb-2">83%</span>
    <span class="block text-lg font-medium mb-1">Fewer Functions</span>
    <span class="block text-sm text-gray-400">1,847 → 312 unique implementations</span>
  </div>
  <div class="p-6 bg-gray-900 border border-gray-700 rounded-lg text-center">
    <span class="block text-4xl font-bold text-cyan-400 mb-2">71%</span>
    <span class="block text-lg font-medium mb-1">Token Cost Reduction</span>
    <span class="block text-sm text-gray-400">Stop paying for duplicate generation</span>
  </div>
</div>

We're seeing 60%+ code reuse rates in projects using multi-pass planning. Let that sink in. More than half your codebase doesn't need to be written because it already exists.

<div class="my-8 p-6 bg-green-900/5 border-2 border-green-500 rounded-lg">
  <h4 class="text-xl font-bold text-green-400 mb-4">Real World Impact</h4>
  <div class="grid md:grid-cols-2 gap-6">
    <div class="p-4 bg-red-900/10 border border-red-500 rounded-lg">
      <h5 class="text-red-400 font-bold mb-3">Before Multi-Pass</h5>
      <ul class="space-y-2">
        <li class="relative pl-6"><span class="absolute left-0">❌</span> 1,847 utility functions</li>
        <li class="relative pl-6"><span class="absolute left-0">❌</span> $2,400/month in tokens</li>
        <li class="relative pl-6"><span class="absolute left-0">❌</span> 3-5 hours debugging duplicates</li>
        <li class="relative pl-6"><span class="absolute left-0">❌</span> Developers crying in code reviews</li>
      </ul>
    </div>
    <div class="p-4 bg-green-900/10 border border-green-500 rounded-lg">
      <h5 class="text-green-400 font-bold mb-3">After Multi-Pass</h5>
      <ul class="space-y-2">
        <li class="relative pl-6"><span class="absolute left-0">✅</span> 312 unique implementations</li>
        <li class="relative pl-6"><span class="absolute left-0">✅</span> $696/month in tokens</li>
        <li class="relative pl-6"><span class="absolute left-0">✅</span> 30 minutes to find functions</li>
        <li class="relative pl-6"><span class="absolute left-0">✅</span> Developers actually smiling</li>
      </ul>
    </div>
  </div>
</div>

One team reduced their utility generation from 1,847 functions to 312 unique implementations. That's 83% fewer functions to maintain, test, and debug. Their token costs dropped by 71%. Their developers stopped crying during code reviews.

## Building Digital Memory

The magic isn't just in the extraction – it's in the memory. xSwarm's function registry becomes your team's collective unconscious. Every pure function ever written, searchable, reusable, battle-tested.

No more "I swear we wrote this last sprint." No more utility sprawl. No more token bleeding. Just clean, reusable code that accumulates value over time instead of technical debt.

Your codebase transforms from a graveyard into a library. A living, breathing repository of solved problems.

<div class="my-12 p-8 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border-2 border-cyan-500 rounded-lg text-center">
  <blockquote class="mb-6 p-6 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text">
    <p class="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">"Stop feeding the graveyard. Start building foundations."</p>
  </blockquote>
  <div class="flex justify-center items-center gap-4 text-lg">
    <span class="font-bold text-cyan-400">Save 71% on tokens</span>
    <span class="text-gray-500">•</span>
    <span class="font-bold text-cyan-400">Reduce functions by 83%</span>
    <span class="text-gray-500">•</span>
    <span class="font-bold text-cyan-400">Achieve 60%+ code reuse</span>
  </div>
</div>
