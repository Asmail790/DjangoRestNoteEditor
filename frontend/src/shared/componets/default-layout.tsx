import { AppShell } from "@mantine/core";
import React, { PropsWithChildren } from "react";

type DefaultLayoutProps = PropsWithChildren<{ navbar: React.ReactElement }>;

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  return <AppShell navbar={props.navbar}>{props.children}</AppShell>;
};

export { DefaultLayout };
