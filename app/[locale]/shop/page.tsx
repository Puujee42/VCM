import { connectToDB } from "@/lib/db";
import ShoppingItem from "@/lib/models/ShoppingItem";
import ShopClient from "./ShopClient";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: "Shop - VISA",
    description: "Discover our premium items and exclusive offers.",
  };
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  await connectToDB();
  const res = await ShoppingItem.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  const items = res.map((item: any) => ({
    ...item,
    _id: item._id.toString(),
    createdAt: item.createdAt?.toISOString(),
    updatedAt: item.updatedAt?.toISOString(),
  }));

  return (
    <main className="min-h-screen pt-24 pb-12">
      <ShopClient items={items} locale={locale} />
    </main>
  );
}
