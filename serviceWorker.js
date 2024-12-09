self.addEventListener("install", (event) => {
  console.log("Service Worker installed.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  event.waitUntil(
    new Promise((resolve) => {
      const request = indexedDB.open("notifications", 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("notifications")) {
          db.createObjectStore("notifications", { keyPath: "id", autoIncrement: true });
        }
      };
      request.onsuccess = () => resolve();
    })
  );
});

self.addEventListener("push", (event) => {
  const message = event.data ? event.data.text() : "No payload";

  const request = indexedDB.open("notifications", 1);
  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction("notifications", "readwrite");
    const store = transaction.objectStore("notifications");
    store.add({ message, timestamp: new Date() });
  };

  const options = {
    body: message,
    icon: "favicon.ico",
    badge: "favicon.ico",
  };

  event.waitUntil(self.registration.showNotification("New Notification", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow("http://127.0.0.1:8000/dashboard")
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "show-notifications") {
    event.waitUntil(
      new Promise((resolve, reject) => {
        const request = indexedDB.open("notifications", 1);
        request.onsuccess = (e) => {
          const db = e.target.result;
          const transaction = db.transaction("notifications", "readonly");
          const store = transaction.objectStore("notifications");
          const allNotifications = store.getAll();

          allNotifications.onsuccess = () => {
            allNotifications.result.forEach((notification) => {
              new Notification("Missed Notification", {
                body: notification.message,
                icon: "favicon.ico",
              });
            });
            resolve();
          };

          allNotifications.onerror = reject;
        };
      })
    );
  }
});
