type Callback = (query: string) => void;

const subscribers = new Set<Callback>();

export function publishSearchQuery(query: string) {
  for (const subscriber of subscribers) {
    subscriber(query);
  }
}

export function subscribeToSearch(callback: Callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback); // unsubscribe
}
