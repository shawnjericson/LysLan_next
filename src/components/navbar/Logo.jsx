'use client';
import { useTranslations } from '@/lib/useTranslations';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Logo() {
    const t = useTranslations('navbar');
    const { locale } = useParams();
    return (
        <div>
            <Link href={`/${locale}`} aria-label={t('logo.arialink')}>
                <video
                    aria-label={t('logo.ariavideo')}
                    autoPlay
                    loop
                    muted
                    playsInline
                    width="120"
                    priority="true">
                    <source src="/Logo/logo LYSLAN ok-01_1.webm" type="video/webm" />
                    {t('logo.note')}
                </video>
                <noscript>
                    <Image
                        src="/Logo/logo01.png"
                        alt={t('logo.logoalt')}
                        width={120}
                        height={60}
                    />
                </noscript>
            </Link>
        </div>
    );
}