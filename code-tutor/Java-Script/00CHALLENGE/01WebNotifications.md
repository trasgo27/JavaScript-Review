The **Web Notifications API** allows websites to send information to the user's device at the system level, even when the browser tab is not active. It is a powerful tool for engagement, but it is strictly regulated by browser security policies.

---

## 🛠️ Essential Methods

To work with notifications, you primarily interact with the global `Notification` object.

* **`Notification.requestPermission()`**: This is the "gatekeeper." It triggers a browser prompt asking the user for permission to show notifications. It returns a **Promise** that resolves to the user's choice: `'granted'`, `'denied'`, or `'default'`.
* **`new Notification(title, options)`**: This is the constructor used to actually display the alert. It requires a **title** (string) and accepts an optional **options** object for further customization.
* **`close()`**: A method on the notification instance used to programmatically dismiss the alert before it expires naturally.

---

## 📋 Key Properties

The API uses properties to check status and define how the notification looks.

### Static Properties (Global Status)

* **`Notification.permission`**: A read-only string indicating the current permission state (`granted`, `denied`, or `default`).

### Instance Options (Visual Elements)

When creating a `new Notification`, you can pass these common properties in the `options` object:

* **`body`**: The main text content or description shown below the title.
* **`icon`**: A URL for an image to be displayed within the notification (usually a logo or avatar).
* **`badge`**: A small image URL used to represent the notification when there is not enough space to display the notification itself (mostly on mobile).
* **`tag`**: A unique ID for the notification. If a new notification has the same tag as an existing one, the old one is replaced instead of showing a second alert.

---

## 🖱️ Event Handlers

Notifications are interactive. You can react to user behavior using these handlers:

* **`onclick`**: Fires when the user clicks the notification. This is commonly used to focus the browser tab or open a specific URL.
* **`onshow`**: Fires the moment the notification is displayed to the user.
* **`onerror`**: Fires if the notification fails to display (e.g., due to a blocked permission).
* **`onclose`**: Fires when the user dismisses the notification.

---

## ⚠️ Important Constraints

1. **Secure Context (HTTPS)**: Most modern browsers require the site to be served over **HTTPS** to use notifications for security reasons.
2. **User Interaction**: You cannot usually call `requestPermission()` automatically on page load. Most browsers require a "User Gesture" (like a button click) to trigger the prompt.
3. **Ephemeral vs. Persistent**: Simple Web Notifications (as shown in your code) are ephemeral and may disappear. For notifications that work even when the browser is closed, you would need to use **Service Workers** and the **Push API**.