# Palindrome Checker Exercise

## Requirements

Build a web app with:

1. **Text input field** — user types words into it
2. **Add button** — adds the word to the list
3. **Duplicate removal** — if the word was already entered, it is ignored (not added again)
4. **Palindrome display** — for each word, show:
   - The original word
   - Its reverse (palindrome)
   - Whether it is a palindrome (`true`/`false`)
5. **Clear/reset option** — optional, to clear all words

## Learning objectives

- DOM manipulation: `getElementById`, `innerHTML`/`textContent`
- Event handling: `onclick` or `addEventListener`
- String methods: `split()`, `reverse()`, `join()`
- Array methods: `includes()`
- Conditionals: palindrome check (word === reversed)
- State management: keeping an array of unique words

## Example flow

```
Input: "radar"
Output: radar | radar | true

Input: "hello"
Output: radar | radar | true
        hello | olleh | false

Input: "radar" (again)
Output: (ignored — duplicate)
```

## Stretch goals (optional)

- Ignore case when comparing duplicates: `word.toLowerCase()`
- Ignore spaces/punctuation for palindrome check
- Animate new entries appearing
- Allow removing individual words from the list
