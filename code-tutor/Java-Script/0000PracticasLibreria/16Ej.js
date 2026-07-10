// ============================================================
// SETUP — Simulated APIs
// ============================================================

// 75% success rate — returns data for a given ID
function fetchData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.25
                ? resolve({ id, data: `Result for ${id}` })
                : reject(new Error(`Failed: ${id}`));
        }, 200 + Math.random() * 300);
    });
}

// 50% success rate — intentionally harder to test retry logic
function fragileFetch(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5
                ? resolve({ id, data: `Fragile result ${id}` })
                : reject(new Error(`Fragile failed: ${id}`));
        }, 100 + Math.random() * 200);
    });
}

// Wraps multiple fetches in Promise.allSettled
// Returns a Promise that resolves to an array of { status, value/reason }
function fetchAll(ids, fetcher) {
    // Step 1: map each ID to a promise
    const promises = ids.map(id => fetcher(id));
    // Step 2: wrap all promises so none can reject the group
    return Promise.allSettled(promises);
}

const MAX_RETRIES = 3;
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


// ============================================================
// UTILITY — extract failed IDs from allSettled results
// ============================================================
// Params:
//   results  — array from Promise.allSettled (each has .status)
//   original — the original array of IDs passed to fetchAll
// Returns: array of IDs that correspond to rejected promises
// Why this works: results[i] lines up with original[i] 1:1
function extractFailures(results, original) {
    return results.reduce((acc, p, i) => {
        if (p.status === 'rejected') acc.push(original[i]);
        return acc;
    }, []);
}


// ============================================================
// TASK 1: Basic fetch — one shot
// ============================================================
// Goal: call fetchAll once, separate successes from failures
console.log('=== TASK 1: One Shot ===');

fetchAll(ids, fetchData)
.then((results) => {
    // Step 1: filter fulfilled promises and unwrap their values
    const successes = results
        .filter(p => p.status === 'fulfilled')  // keep only successes
        .map(p => p.value);                      // extract the resolved value

    // Step 2: extract failed IDs using our utility
    const failures = extractFailures(results, ids);

    console.log(`Successes: ${successes.length}, Failures: ${failures.length}`);
    console.log('Successful data:', successes);
    console.log('Failed IDs:', failures);
});


// ============================================================
// TASK 2: One retry round
// ============================================================
// Goal: take failures from round 1, retry them, merge results
console.log('\n=== TASK 2: One Retry Round ===');

fetchAll(ids, fetchData)
.then((round1) => {
    // Extract successes and failures from round 1
    const successes1 = round1
        .filter(p => p.status === 'fulfilled')
        .map(p => p.value);

    const failures1 = extractFailures(round1, ids);

    console.log(`Round 1 — Successes: ${successes1.length}, Failures: ${failures1.length}`);

    // If nothing failed, we're done
    if (failures1.length === 0) {
        console.log('All succeeded on first try!');
        console.table(successes1);
        return;
    }

    // Retry only the failed IDs
    return fetchAll(failures1, fetchData).then((round2) => {
        const successes2 = round2
            .filter(p => p.status === 'fulfilled')
            .map(p => p.value);

        const failures2 = extractFailures(round2, failures1);

        // Merge: combine round 1 successes with round 2 successes
        const allSuccesses = successes1.concat(successes2);

        console.log(`Round 2 — Successes: ${successes2.length}, Still failed: ${failures2.length}`);
        console.log('Combined results:');
        console.table(allSuccesses);
    });
});


// ============================================================
// TASK 3: Recursive retry function
// ============================================================
// Goal: generic function that retries failed items recursively
// until all succeed or maxRetries is reached.
//
// Key insight: recursion lets us chain .then() calls naturally.
// Each recursive call only fires AFTER the previous fetch resolved.
// No while loop needed — the function calls itself from inside .then().
function retryFetch(items, fetcher, maxRetries) {
    // Step 1: define the recursive helper
    //   list     — IDs that still need to be fetched (shrinks each round)
    //   results  — accumulated successful results (grows each round)
    //   attempt  — current attempt number (1-based)
    function attempt(list, results, attemptNum) {
        // BASE CASE: stop when nothing left to fetch or max retries exceeded
        if (list.length === 0 || attemptNum > maxRetries) {
            console.log(`Done after ${attemptNum - 1} attempt(s). ` +
                `Total successes: ${results.length}`);

            if (list.length > 0) {
                console.warn(`Retries exhausted. ${list.length} item(s) still failed:`, list);
            }

            return results;  // return the accumulated array
        }

        // RECURSIVE CASE: fetch current list, then process results
        console.log(`Attempt ${attemptNum} for: ${list.join(', ')}`);

        // fetchAll returns a Promise — we chain .then() on it
        return fetchAll(list, fetcher).then((resolved) => {
            // Step A: extract new successes from the resolved promises
            const newSuccesses = resolved
                .filter(p => p.status === 'fulfilled')
                .map(p => p.value);

            // Step B: extract still-failing IDs using reduce
            // We pass 'list' (not the original items) because
            // resolved[i] corresponds to list[i] in this round
            const newFailures = extractFailures(resolved, list);

            // Step C: merge new successes into accumulated results
            const allResults = results.concat(newSuccesses);

            // Step D: recurse with new failures, accumulated results, next attempt
            return attempt(newFailures, allResults, attemptNum + 1);
        });
    }

    // Step 2: kick off the recursion with initial values
    //   list = items (all IDs), results = [], attempt = 1
    return attempt(items, [], 1);
}

// TASK 3 execution
console.log('\n=== TASK 3: Recursive Retry ===');

retryFetch(ids, fetchData, MAX_RETRIES)
.then((finalResults) => {
    console.log('TASK 3 — Final successful results:');
    console.table(finalResults);
});


// ============================================================
// TASK 4: Retry with fragile service (50% success)
// ============================================================
console.log('\n=== TASK 4: Fragile Service (50%) ===');

retryFetch(ids, fragileFetch, 5)
.then((finalResults) => {
    console.log('TASK 4 — Final results from fragile service:');
    console.table(finalResults);
});


// ============================================================
// TASK 5: Max retries exceeded — partial results
// ============================================================
console.log('\n=== TASK 5: Partial Results (maxRetries=2) ===');

retryFetch([1, 2, 3], fragileFetch, 2)
.then((finalResults) => {
    // At this point, some items may still be missing
    console.log('TASK 5 — Partial results (some may be missing):');
    console.table(finalResults);
});


// ============================================================
// TASK 6: Retry with progress callback (Bonus)
// ============================================================
// Enhanced version that calls onRetry before each attempt
function retryFetchWithCallback(items, fetcher, maxRetries, onRetry) {
    function attempt(list, results, attemptNum) {
        if (list.length === 0 || attemptNum > maxRetries) {
            console.log(`Done. Total successes: ${results.length}`);
            if (list.length > 0) {
                console.warn(`${list.length} item(s) still failed:`, list);
            }
            return results;
        }

        // Call the progress callback if provided
        if (onRetry) {
            onRetry(list, attemptNum);
        }

        return fetchAll(list, fetcher).then((resolved) => {
            const newSuccesses = resolved
                .filter(p => p.status === 'fulfilled')
                .map(p => p.value);

            const newFailures = extractFailures(resolved, list);

            return attempt(newFailures, results.concat(newSuccesses), attemptNum + 1);
        });
    }

    return attempt(items, [], 1);
}

console.log('\n=== TASK 6: With Progress Callback ===');

retryFetchWithCallback(ids, fragileFetch, 4, (failures, attempt) => {
    console.log(`📢 Callback — Retry ${attempt} for: ${failures.join(', ')}`);
})
.then((finalResults) => {
    console.log('TASK 6 — Final:');
    console.table(finalResults);
});


// ============================================================
// TASK 7: Retry with exponential backoff (Bonus)
// ============================================================
// Waits before each retry: 100ms, 200ms, 400ms, 800ms...
// This prevents hammering the server with rapid retries.
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function retryFetchWithBackoff(items, fetcher, maxRetries, onRetry) {
    function attempt(list, results, attemptNum) {
        if (list.length === 0 || attemptNum > maxRetries) {
            console.log(`Done. Total successes: ${results.length}`);
            if (list.length > 0) {
                console.warn(`${list.length} item(s) still failed:`, list);
            }
            return results;
        }

        if (onRetry) onRetry(list, attemptNum);

        // Wait before fetching (exponential backoff)
        // Only wait on retries (attemptNum > 1), not the first try
        const delay = attemptNum > 1 ? 100 * Math.pow(2, attemptNum - 1) : 0;

        const doFetch = () => fetchAll(list, fetcher).then((resolved) => {
            const newSuccesses = resolved
                .filter(p => p.status === 'fulfilled')
                .map(p => p.value);

            const newFailures = extractFailures(resolved, list);

            if (delay > 0) {
                console.log(`  Waited ${delay}ms before attempt ${attemptNum}`);
            }

            return attempt(newFailures, results.concat(newSuccesses), attemptNum + 1);
        });

        return delay > 0 ? wait(delay).then(doFetch) : doFetch();
    }

    return attempt(items, [], 1);
}

console.log('\n=== TASK 7: With Exponential Backoff ===');

retryFetchWithBackoff([1, 2, 3], fragileFetch, 4, (failures, attempt) => {
    console.log(`📢 Retry ${attempt} for: ${failures.join(', ')}`);
})
.then((finalResults) => {
    console.log('TASK 7 — Final:');
    console.table(finalResults);
});
