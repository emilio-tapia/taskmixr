import { showToast } from "@/scripts/butterup/butterupSetup";

export async function getNetworkProps() {
  try {
    const props = navigator.connection || null;
    if (!!props) {
      return props;
    } else {
      throw "Unavailable Network Information API";
    }
  } catch (error) {
    showToast("error", `${error}`);
  }
}
