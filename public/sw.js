self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Alarm";
  const options = {
    body: data.body || "It's time! 🔔",
    vibrate: [200, 100, 200],
    tag: "alarm-notification",
  };

  event.waitUntil(self.registration.showNotification(title, options));

  // Send message to all open pages to play audio
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage({ type: "play-audio" }));
  });
});
