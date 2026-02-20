import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../contexts/LanguageContext';

interface SEOProps {
    title?: string;
    description?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
}

export const SEO = ({ title, description, ogImage, ogType = 'website' }: SEOProps) => {
    const { t } = useLanguage();

    const siteTitle = t('2065年のSci-Fi世界設定', 'Sci-Fi World Settings for 2065');
    const defaultDescription = t(
        '2065年、パーソナル・リアリティが交差する多層現実（Layered Realities）の社会を描くサイファイ・プロトタイピング・プロジェクト。',
        'A sci-fi prototyping project depicting a layered-reality society in 2065 where personal realities intersect.'
    );

    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || defaultDescription;
    const url = 'https://sci-fi-world-building-2065.vercel.app/';

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Helmet>
    );
};
