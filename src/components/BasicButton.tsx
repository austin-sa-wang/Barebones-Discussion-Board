import Link from 'next/link';

type Props = {
  children?: React.ReactNode;
  href: string;
  className?: string;
};

export const BasicLinkButton = ({
  children,
  href,
  className = `mt-4 cursor-pointer p-6 font-semibold text-md bg-cyan-500 hover:bg-sky-700 text-white rounded-full shadow-sm w-fit`,
}: Props) => {
  return (
    <Link href={href}>
      <div className={className}>{children}</div>
    </Link>
  );
};
