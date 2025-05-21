import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "./ui/button";
import { CheckCircle, RefreshCcwIcon, Trash, X } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteTodo } from "../request";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function Todo({
  priority = "secondary",
  title = "Abdullohning qochishi",
  completed = false,
  id = 1,
}) {
  const dispatch = useDispatch();
  const [delLoading, setDelLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = {
    medium: "outline",
    high: "destructive",
    low: "secondary",
  };

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    if (!delLoading) setIsModalOpen(false);
  }

  function handleDelete() {
    setDelLoading(true);
    deleteTodo(id)
      .then((res) => {
        dispatch({ type: "delete", payload: res });
        toast.success("Todo muvaffaqiyatli o'chirildi 😜");
        closeModal();
      })
      .catch(() => {
        toast.error("O'chirishda xatolik yuz berdi!");
      })
      .finally(() => {
        setDelLoading(false);
      });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-5">
          <span>
            Muhimlilik darajasi:{" "}
            <Badge className={"uppercase"} variant={styles[priority]}>
              {priority}
            </Badge>
          </span>
          <span className="flex items-center gap-2">
            Holati:
            <Button size={"icon"} variant={completed ? "outline" : "secondary"}>
              {completed ? <CheckCircle /> : <X />}
            </Button>
          </span>
        </CardContent>
        <CardFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                disabled={delLoading}
                onClick={openModal}
                className={buttonVariants({ variant: "destructive" })}
              >
                {delLoading ? (
                  <RefreshCcwIcon className="animate-spin" />
                ) : (
                  <Trash />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>O'chirmoqchisiz?</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Tasdiqlash</h3>
            <p className="mb-6">Rostan ham o'chirmoqchimisiz?</p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={closeModal} disabled={delLoading}>
                Yo'q
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={delLoading}>
                {delLoading ? "O'chirilmoqda..." : "Ha, o'chir"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}