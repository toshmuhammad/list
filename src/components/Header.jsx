import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
export default function Header() {
    return (
        <header className="py-5 shadow-md">
            <div className="container mx-auto px-5 flex items-center justify-between">
                <h1 className="font-medium text-3xl">Todo app</h1>
                <Button>
                    <PlusCircle />
                    New
                </Button>
            </div>
        </header>
    );
}