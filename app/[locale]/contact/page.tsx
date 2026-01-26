import { getTranslations } from "next-intl/server";
import ContactClient from "./ContactClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "ContactPage.metadata" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function ContactPage() {
    return <ContactClient />;
}
