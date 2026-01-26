import { getTranslations } from "next-intl/server";
import EventsClient from "./EventsClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "EventsPage.metadata" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function EventsPage() {
    return <EventsClient />;
}
