import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware navigation helpers. <Link> preserves the active locale and
// switching locale is a normal link that swaps the path segment.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
