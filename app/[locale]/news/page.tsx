import { getTranslations } from "next-intl/server";
import NewsClient from "./NewsClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "NewsPage.metadata" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function NewsPage() {
    return <NewsClient />;
}
