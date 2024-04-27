import { mq1024, mq768 } from "@/utils/client/accessibilty";

export function getResFromNetwork(type: string) {
  // RETURN IF CONNECTION IS TOO SLOW
  if (type === "slow-2g") return null;

  const resolutionOptions = {
    high_hd: 1080,
    low_hd: 720,
    md: 540,
    sd: 480,
  };

  const isTablet = mq1024().matches;
  const isMobile = mq768().matches;
  if (!isTablet) {
    if (type === "4g") return resolutionOptions.high_hd;
    if (type === "3g") return resolutionOptions.low_hd;
    if (type === "2g") return resolutionOptions.sd;
  }
  // TABLET
  if (isTablet && !isMobile) {
    if (type === "4g") return resolutionOptions.high_hd;
    if (type === "3g") return resolutionOptions.low_hd;
    if (type === "2g") return resolutionOptions.sd;
  }
  if (isMobile) {
    if (type === "4g") return resolutionOptions.low_hd;
    if (type === "3g") return resolutionOptions.sd;
    if (type === "2g") return resolutionOptions.sd;
  }

  return null;
}
