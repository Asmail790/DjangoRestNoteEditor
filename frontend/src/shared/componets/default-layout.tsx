import { AppShell, Header } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import React, { PropsWithChildren } from "react";
import { AcountStatus } from "./acount-status";

type DefaultLayoutProps = PropsWithChildren<{ navbar?: React.ReactElement }>;

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  return (
    <AppShell
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.black : theme.colors.gray[0],
      })}
      navbar={props.navbar}
      header={
        <Header height={0}>
          <div></div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
};

export { DefaultLayout };
