import { OrderListItem } from "~/api/types";

export const getStatusStyles = (status: OrderListItem["status"]) => {
  switch (status) {
    case "delivered":
      return {
        bg: "bg-primary",
        text: "text-primary-foreground",
      };
    case "preparing":
      return {
        bg: "bg-accent-3",
        text: "text-accent-3-foreground",
      };
    case "ready":
      return {
        bg: "bg-accent",
        text: "text-accent-foreground",
      };
    case "confirmed":
      return {
        bg: "bg-accent-2",
        text: "text-accent-2-foreground",
      };
    case "cancelled":
      return {
        bg: "bg-destructive",
        text: "text-destructive-foreground",
      };
    default:
      return {
        bg: "bg-muted",
        text: "text-muted-foreground",
      };
  }
};
