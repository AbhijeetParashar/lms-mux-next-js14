import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    // <Image
    // width={130}
    // height={130}
    // alt="logo"
    // src="/logo.svg"
    // />
    <Link href="/" className="flex items-center gap-4">
      <Image src="/logo.svg" alt="logo" width={28} height={28} />
      <p className="text-heading3-bold text-light-1 text-[#0369a1] max-xs:hidden">
        LearnSync
      </p>
    </Link>
  );
};

export default Logo;
