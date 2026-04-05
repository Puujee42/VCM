import ProgramsClient from "./ProgramsClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Our Programs | Volunteer Center Mongolia",
        description: "Explore our diverse volunteering programs: EDU-Volunteer, AND, and V-Club.",
    };
}

export default function ProgramsPage() {
    return <ProgramsClient />;
}
