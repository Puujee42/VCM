import { getTranslations } from "next-intl/server";
import LessonsClient from "./LessonsClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "LessonsPage.metadata" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function LessonsPage() {
    return <LessonsClient />;
}
