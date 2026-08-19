Theory: https://www.w3resource.com/javascript/cookies/introduction-cookies.php

Exercises: https://www.w3resource.com/index.php

The information on JavaScript cookies can be summarized into several core areas: what they are, their limitations, how they are structured, and how to manage them using JavaScript.

### 1. What are Cookies?
A cookie is a small piece of text stored on a visitor's computer by their web browser. Because the data is saved on the hard drive, it can be accessed later, even if the computer has been restarted.
* **Purpose:** Authenticating users, tracking sessions, and remembering specific information like usernames, passwords, or preferences.
* **Nature:** They are simple text files, meaning they are **not executable** and cannot carry viruses.



### 2. Limitations and Scope
* **Capacity:** Browsers can typically store at least 300 cookies total, with a limit of about 20 cookies per domain. Each cookie can be up to 4KB in size.
* **Privacy:** They identify the *computer* or browser being used, not the specific individual.
* **Isolation:** A website can only read and set its own cookies; it cannot access cookies created by other domains.
* **User Control:** Users can disable cookies entirely through their browser's privacy settings.

### 3. The Structure of a Cookie
A cookie string consists of six potential parts, though only the first two are required:
1.  **Name (Required):** The name used to identify the cookie.
2.  **Value (Required):** The data stored in the cookie.
3.  **Expires:** The date when the cookie will be deleted. If left blank, the cookie expires when the browser is closed (a "session cookie").
4.  **Path:** The directory or page for which the cookie is valid.
5.  **Domain:** The domain name of the site.
6.  **Secure:** If present, the cookie is only sent over secure (HTTPS) connections.

### 4. Basic Management in JavaScript
JavaScript uses the `document.cookie` property to interact with cookies.

* **Creating/Setting:** You assign a string to `document.cookie` using a specific format:
    `document.cookie = "username=JohnDoe; expires=Thu, 18 Dec 2026 12:00:00 UTC; path=/";`
* **Handling Special Characters:** Since cookies cannot contain commas, semicolons, or whitespace, you should use `encodeURIComponent()` when saving data and `decodeURIComponent()` when reading it.
* **Reading:** Accessing `document.cookie` returns a single string containing all cookies for that domain, separated by semicolons. You must typically write a small function to "parse" (split) this string to find a specific value.
* **Deleting:** To delete a cookie, you simply set its `expires` date to a time in the past.

### 5. Storage Location
During a browsing session, cookies are kept in the computer's memory. When the browser is closed, any cookies that haven't expired are written to a text file on the hard drive (often named `cookies.txt` or stored within a specific browser profile database).