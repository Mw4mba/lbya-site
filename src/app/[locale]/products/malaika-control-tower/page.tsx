import { permanentRedirect } from 'next/navigation';
import { asLocale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type Props = { params: Promise<{ locale: string }> };

export default async function MalaikaControlTowerRedirect({ params }: Props) {
  const { locale } = await params;
  const activeLocale = asLocale(locale);
  permanentRedirect(localizePath(activeLocale, activeLocale === 'sv' ? '/products/nbc' : '/products/mct'));
}
