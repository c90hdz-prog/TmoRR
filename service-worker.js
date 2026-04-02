const CACHE_NAME = "t-ready-v1";

const APP_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./src/main.js",
  "./src/app.js",
  "./src/styles/tokens.css",
  "./src/styles/base.css",
  "./src/styles/layout.css",
  "./src/styles/components.css",
  "./src/state/initialState.js",
  "./src/state/actions.js",
  "./src/state/reducer.js",
  "./src/state/selectors.js",
  "./src/state/store.js",
  "./src/state/storage.js",
  "./src/data/openingTasks.js",
  "./src/data/closingTasks.js",
  "./src/data/occasionalTasks.js",
  "./src/features/home/homeScreen.js",
  "./src/features/employees/employeesScreen.js",
  "./src/features/employees/addEmployeeSheet.js",
  "./src/features/shifts/shiftSetupScreen.js",
  "./src/features/checklist/checklistScreen.js",
  "./src/features/checklist/taskCard.js",
  "./src/features/checklist/taskActionSheet.js",
  "./src/features/checklist/assignEmployeeSheet.js",
  "./src/features/checklist/assignSectionSheet.js",
  "./src/features/checklist/addOccasionalTaskSheet.js",
  "./src/features/review/endShiftReview.js",
  "./src/features/history/historyScreen.js",
  "./src/features/history/historyDetailScreen.js",
  "./src/ui/bottomSheet.js",
  "./src/ui/modal.js",
  "./src/ui/toast.js",
  "./src/ui/emptyState.js",
  "./src/utils/id.js",
  "./src/utils/date.js",
  "./src/utils/tasks.js",
  "./src/utils/history.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});