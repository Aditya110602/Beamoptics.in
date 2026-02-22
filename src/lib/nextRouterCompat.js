"use client";

import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";

export function Link({ to, href, children, ...props }) {
  const resolvedHref = typeof to === "string" ? to : href;
  return (
    <NextLink href={resolvedHref || "#"} {...props}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  const pathname = usePathname() || "/";
  const [search, setSearch] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateLocationState = () => {
      setSearch(window.location.search || "");
      setHash(window.location.hash || "");
    };

    updateLocationState();
    window.addEventListener("hashchange", updateLocationState);
    window.addEventListener("popstate", updateLocationState);

    return () => {
      window.removeEventListener("hashchange", updateLocationState);
      window.removeEventListener("popstate", updateLocationState);
    };
  }, [pathname]);

  return useMemo(
    () => ({
      pathname,
      search,
      hash,
    }),
    [pathname, search, hash]
  );
}

export function useNavigate() {
  const router = useRouter();

  return (to, options = {}) => {
    if (typeof to === "number") {
      if (to === -1) {
        router.back();
        return;
      }
      if (to === 1) {
        router.forward();
        return;
      }
      window.history.go(to);
      return;
    }

    const target = typeof to === "string" ? to : "/";
    if (options?.replace) {
      router.replace(target, options?.scroll === false ? { scroll: false } : undefined);
      return;
    }

    router.push(target, options?.scroll === false ? { scroll: false } : undefined);
  };
}

export function useParams() {
  return useNextParams();
}
