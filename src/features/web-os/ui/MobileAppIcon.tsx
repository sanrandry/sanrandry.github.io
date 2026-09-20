import Image from "next/image";
import { Icon, type IconName } from "./Icon";
export function MobileAppIcon({
  item,
  android,
}: {
  item: IconName | "cv";
  android: boolean;
}) {
  return (
    <span className={`ios-app-icon ios-icon-${item}`} aria-hidden="true">
      {item === "home" && android ? (
        <Icon name="globe" size={32} />
      ) : item === "home" ? (
        <span className="ios-compass" />
      ) : item === "about" ? (
        <Image src="/images/avatar.webp" alt="" width={64} height={64} />
      ) : item === "cv" ? (
        <span className="ios-pdf">
          PDF
          <i />
          <i />
        </span>
      ) : item === "settings" ? (
        <span className="ios-gear">⚙</span>
      ) : (
        <Icon name={item} size={30} />
      )}
    </span>
  );
}
