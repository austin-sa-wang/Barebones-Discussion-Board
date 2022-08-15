import { useEffect, useState } from 'react';

type AppProps = {
  children?: React.ReactNode;
};

export default function ClientOnly({ children, ...delegated }: AppProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
