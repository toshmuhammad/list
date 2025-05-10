import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { CheckCircle, FileX, Trash, X } from "lucide-react";
import { Badge } from "./ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { deleteTodo } from "../request";
import { useState } from "react";


export default function Todo({
    priority = "secondary",
    title = "Abdullohning qochishi",
    completed = false,
    id = 1,
}) {

    const [ delLoading, setDelLoading ] = useState(true);
    const styles = {
        medium: "outline",
        high: "destructive",
        low: "secondary",
    };

    function handleDelete(id) {
        setDelLoading(true);
        deleteTodo(id)
        .then(() => {})
        .catch(() => {})
        .finally(() => {
            setDelLoading(false);
        });
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-5">
                <span>
                    Muhimlilik darajasi: <Badge className={"uppercase"} variant={styles[priority]}>{priority}</Badge>
                </span>
                <span className="flex items-center gap-2">
                    Holati:
                    <Button size={"icon"} variant={completed ? "outline" : "secondary"}>{completed ? <CheckCircle /> : <X />}</Button>
                </span>
            </CardContent>
            <CardFooter>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger
                            onClick={() => handleDelete(id)}
                            className={buttonVariants({ variant: "destructive" })}>
                            <Trash />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>O'chirmoqchisiz?</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    );
}