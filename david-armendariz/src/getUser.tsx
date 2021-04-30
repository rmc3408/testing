export type User = {
  id: number;
  name: string;
};

export function getUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Raph" }), 2000);
  });
}
