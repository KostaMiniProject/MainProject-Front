import { useRouter } from 'next/router';

const router = useRouter();

export function pageRouter(path: string) {
  router.push(path);
}
