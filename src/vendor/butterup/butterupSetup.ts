import { butterup } from "@/scripts/butterup/butterup.js";

type typeToast = "warning" | "success" | "error" | "info";

export function showToast(type: typeToast, message: string) {
  return butterup.toast({
    title: capitalizeFirstLetter(type.toString()),
    message: message,
    location: "bottom-left",
    icon: false,
    customIcon: "",
    dismissable: false,
    type: type,
  });
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
