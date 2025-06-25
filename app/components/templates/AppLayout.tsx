import { ReactNode } from "react";

import { Avatar } from "../catalyst/avatar";
import { Navbar } from "../catalyst/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "../catalyst/sidebar";
import { SidebarLayout } from "../catalyst/sidebar-layout";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarLayout
      navbar={<Navbar />}
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarSection className="max-lg:hidden">
              <SidebarItem href="/">
                <Avatar src="/assets/profile-picture.jpg" />
                <SidebarLabel>Irving Dinh</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarHeader>
          <SidebarBody />
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
};
