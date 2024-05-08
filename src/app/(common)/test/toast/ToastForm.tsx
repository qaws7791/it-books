"use client";
import Button from "@/src/shared/components/ui/Button";
import { toast } from "sonner";

export default function ToastForm() {
  return (
    <div>
      <Button onClick={() => toast("Event has been created")}>default</Button>
      <Button
        onClick={() =>
          toast.message("Event has been created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        description
      </Button>
      <Button onClick={() => toast.success("Event has been created")}>
        success
      </Button>
      <Button onClick={() => toast.info("Event has been created")}>info</Button>
      <Button onClick={() => toast.warning("Event has been created")}>
        warning
      </Button>
      <Button onClick={() => toast.error("Event has been created")}>
        error
      </Button>
      <Button
        onClick={() =>
          toast("Event has been created", {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        action
      </Button>
      <Button
        onClick={() => toast(<div>A custom toast with default styling</div>)}
      >
        custom
      </Button>
    </div>
  );
}
